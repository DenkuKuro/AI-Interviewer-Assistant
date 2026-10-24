import { Suspense } from "react"
import { Spinner } from "@/components/ui/spinner";
import { createClient } from "@/lib/server";
import { redirect } from "next/navigation";
import { ProblemFilters } from "./components/problem-filters";
import { ProblemPagination } from "./components/problem-pagination";
import { ProblemTable } from "./components/problem-table";
import type { ProblemData } from "./types";
import { filterProblems, PAGE_SIZE, paginate, parseQuery, type ProblemQuery } from "./utils";

// The external API has no combined title/difficulty/topic filter, so fetch the (cached) full list and filter here
async function getProblems(query: ProblemQuery): Promise<ProblemData[]> {
    const baseUrl = process.env.PROBLEMS_API_URL;
    if (!baseUrl) throw new Error("PROBLEMS_API_URL is not set");

    const response = await fetch(baseUrl, { next: { revalidate: 3600 } });
    if (!response.ok) throw new Error(`Failed to load problems (${response.status})`);
    const problems: ProblemData[] = await response.json();

    return filterProblems(problems, query);
}

// Topic names for the filter, most common first. Falls back to no options if the API is unavailable.
async function getTags(): Promise<string[]> {
    const baseUrl = process.env.PROBLEMS_API_URL;
    if (!baseUrl) return [];
    try {
        const response = await fetch(new URL("/tags", baseUrl), { next: { revalidate: 86400 } });
        if (!response.ok) return [];
        const tags: { name: string }[] = await response.json();
        return tags.map((tag) => tag.name);
    } catch {
        return [];
    }
}

async function ProblemResults({ query }: { query: ProblemQuery }) {
    const matching = await getProblems(query);
    const { page, totalPages, items } = paginate(matching, query.page);

    return (
        <>
            <ProblemTable problems={items} />
            <ProblemPagination
                page={page}
                totalPages={totalPages}
                totalItems={matching.length}
                pageSize={PAGE_SIZE}
                filters={query}
            />
        </>
    );
}

export default async function ProblemsPage(props: PageProps<"/problems">) {
  const supabase = await createClient()

  const { data, error } = await supabase.auth.getClaims()
  if (error || !data?.claims) {
    redirect('/auth/login')
  }

  const query = parseQuery(await props.searchParams)
  const tags = await getTags()

    return (
        <div className="flex flex-col h-full mx-auto w-full max-w-5xl px-6">
            <div className="my-10">
                <h1 className="text-5xl">Problems</h1>
                <h2 className="text-3xl">Pick a problem to start a mock interview.</h2>
            </div>
            <div className="mb-6">
                <ProblemFilters tags={tags} />
            </div>
            {/* key remounts the boundary so the spinner shows again whenever a filter changes */}
            <Suspense
                key={`${query.q ?? ""}|${query.difficulty ?? ""}|${query.tags.join(",")}|${query.page}`}
                fallback={<div className="flex justify-center p-8"><Spinner /></div>}
            >
                <ProblemResults query={query} />
            </Suspense>
        </div>
    )
}
