import { Suspense } from "react"
import { Spinner } from "@/components/ui/spinner";
import { createClient } from "@/lib/server";
import { redirect } from "next/navigation";
import { ProblemFilters } from "./components/problem-filters";
import { ProblemPagination } from "./components/problem-pagination";
import { ProblemTable } from "./components/problem-table";
import { DIFFICULTIES, type Difficulty, type ProblemData } from "./types";

const MAX_QUERY_LENGTH = 100;
const MAX_TAGS = 10;
const MAX_TAG_LENGTH = 50;
const PAGE_SIZE = 20;

type ProblemQuery = {
    q?: string,
    difficulty?: Difficulty,
    tags: string[],
    page: number,
}

// Search params can be string | string[] | undefined; take the first value and validate it
function parseQuery(params: Record<string, string | string[] | undefined>): ProblemQuery {
    const first = (value: string | string[] | undefined) => (Array.isArray(value) ? value[0] : value);
    const q = first(params.q)?.trim().slice(0, MAX_QUERY_LENGTH);
    const difficulty = first(params.difficulty);
    const rawTags = Array.isArray(params.tags) ? params.tags : params.tags ? [params.tags] : [];
    const page = Number.parseInt(first(params.page) ?? "", 10);
    return {
        q: q || undefined,
        difficulty: DIFFICULTIES.find((d) => d === difficulty),
        tags: rawTags.slice(0, MAX_TAGS).map((tag) => tag.trim().slice(0, MAX_TAG_LENGTH)).filter(Boolean),
        // missing, non-numeric or < 1 falls back to the first page
        page: Number.isFinite(page) && page >= 1 ? page : 1,
    };
}

// The external API has no combined title/difficulty/topic filter, so fetch the (cached) full list and filter here
async function getProblems({ q, difficulty, tags }: ProblemQuery): Promise<ProblemData[]> {
    const baseUrl = process.env.PROBLEMS_API_URL;
    if (!baseUrl) throw new Error("PROBLEMS_API_URL is not set");

    const response = await fetch(baseUrl, { next: { revalidate: 3600 } });
    if (!response.ok) throw new Error(`Failed to load problems (${response.status})`);
    const problems: ProblemData[] = await response.json();

    const needle = q?.toLowerCase();
    return problems.filter((problem) =>
        (!difficulty || problem.difficulty === difficulty) &&
        (!needle || problem.title.toLowerCase().includes(needle)) &&
        // a problem must have every selected topic
        tags.every((tag) => problem.topic_tags.includes(tag))
    );
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

    // Clamp so a stale or hand-edited ?page=999 shows the last page instead of an empty table
    const totalPages = Math.max(1, Math.ceil(matching.length / PAGE_SIZE));
    const page = Math.min(query.page, totalPages);
    const problems = matching.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

    return (
        <>
            <ProblemTable problems={problems} />
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
