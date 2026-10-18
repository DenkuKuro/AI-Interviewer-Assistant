import { Suspense } from "react"
import { Spinner } from "@/components/ui/spinner";
import { createClient } from "@/lib/server";
import { redirect } from "next/navigation";
import { ProblemFilters } from "./components/problem-filters";
import { ProblemTable } from "./components/problem-table";
import { DIFFICULTIES, type Difficulty, type ProblemData } from "./types";

const MAX_QUERY_LENGTH = 100;

type ProblemQuery = {
    q?: string,
    difficulty?: Difficulty,
}

// Search params can be string | string[] | undefined; take the first value and validate it
function parseQuery(params: Record<string, string | string[] | undefined>): ProblemQuery {
    const first = (value: string | string[] | undefined) => (Array.isArray(value) ? value[0] : value);
    const q = first(params.q)?.trim().slice(0, MAX_QUERY_LENGTH);
    const difficulty = first(params.difficulty);
    return {
        q: q || undefined,
        difficulty: DIFFICULTIES.find((d) => d === difficulty),
    };
}

async function getProblems({ q, difficulty }: ProblemQuery): Promise<ProblemData[]> {
    const baseUrl = process.env.PROBLEMS_API_URL;
    if (!baseUrl) throw new Error("PROBLEMS_API_URL is not set");

    const url = new URL(baseUrl);
    if (q) url.searchParams.set("q", q);
    if (difficulty) url.searchParams.set("difficulty", difficulty);

    const response = await fetch(url, { cache: "no-store" });
    if (!response.ok) throw new Error(`Failed to load problems (${response.status})`);
    return response.json();
}

async function ProblemResults({ query }: { query: ProblemQuery }) {
    const problems = await getProblems(query);
    return <ProblemTable problems={problems} />;
}

export default async function ProblemsPage(props: PageProps<"/problems">) {
  const supabase = await createClient()

  const { data, error } = await supabase.auth.getClaims()
  if (error || !data?.claims) {
    redirect('/auth/login')
  }

  const query = parseQuery(await props.searchParams)

    return (
        <div className="flex flex-col h-full mx-auto w-full max-w-5xl px-6">
            <div className="my-10">
                <h1 className="text-6xl">Problems</h1>
                <h2 className="text-4xl">Pick a problem to start a mock interview.</h2>
            </div>
            <div className="mb-6">
                <ProblemFilters />
            </div>
            {/* key remounts the boundary so the spinner shows again whenever a filter changes */}
            <Suspense
                key={`${query.q ?? ""}|${query.difficulty ?? ""}`}
                fallback={<div className="flex justify-center p-8"><Spinner /></div>}
            >
                <ProblemResults query={query} />
            </Suspense>
        </div>
    )
}
