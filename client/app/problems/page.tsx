import { Suspense } from "react"
import { Spinner } from "@/components/ui/spinner";
import { createClient } from "@/lib/server";
import { redirect } from "next/navigation";
import { ProblemFilters } from "./components/problem-filters";
import { ProblemPagination } from "./components/problem-pagination";
import { ProblemTable } from "./components/problem-table";
import { SavedProblems } from "./components/saved-problems";
import { getProblemPage, getTags } from "./leetcode";
import type { Tag } from "./types";
import { PAGE_SIZE, parseQuery, totalPagesFor, type ProblemQuery } from "./utils";

// Topics for the filter. Falls back to no options if LeetCode is unavailable.
async function getTagOptions(): Promise<Tag[]> {
    try {
        return await getTags();
    } catch {
        return [];
    }
}

async function ProblemResults({ query }: { query: ProblemQuery }) {
    let page = query.page;
    let { total, problems } = await getProblemPage(query, page);

    // A stale or hand-edited ?page=999 shows the last page instead of an empty table
    const totalPages = totalPagesFor(total);
    if (page > totalPages) {
        page = totalPages;
        ({ total, problems } = await getProblemPage(query, page));
    }

    return (
        <>
            <ProblemTable problems={problems} />
            <ProblemPagination
                page={page}
                totalPages={totalPages}
                totalItems={total}
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
  const tags = await getTagOptions()

    return (
        <div className="flex flex-col h-full mx-auto w-full max-w-5xl px-6">
            <div className="my-10">
                <h1 className="text-5xl">Problems</h1>
                <h2 className="text-3xl">Pick a problem to start a mock interview.</h2>
            </div>
            <SavedProblems/>
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
