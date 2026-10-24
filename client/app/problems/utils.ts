import { DIFFICULTIES, type Difficulty, type ProblemData } from "./types";

const MAX_QUERY_LENGTH = 100;
const MAX_TAGS = 10;
const MAX_TAG_LENGTH = 50;

export const PAGE_SIZE = 20;

export type ProblemQuery = {
    q?: string,
    difficulty?: Difficulty,
    tags: string[],
    page: number,
}

// Search params can be string | string[] | undefined; take the first value and validate it
export function parseQuery(params: Record<string, string | string[] | undefined>): ProblemQuery {
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

// The external API has no combined title/difficulty/topic filter, so filter the full list here
export function filterProblems(problems: ProblemData[], { q, difficulty, tags }: ProblemQuery): ProblemData[] {
    const needle = q?.toLowerCase();
    return problems.filter((problem) =>
        (!difficulty || problem.difficulty === difficulty) &&
        (!needle || problem.title.toLowerCase().includes(needle)) &&
        // a problem must have every selected topic
        tags.every((tag) => problem.topic_tags.includes(tag))
    );
}

// Clamps the page so a stale or hand-edited ?page=999 shows the last page instead of an empty table
export function paginate<T>(items: T[], requestedPage: number) {
    const totalPages = Math.max(1, Math.ceil(items.length / PAGE_SIZE));
    const page = Math.min(requestedPage, totalPages);
    return { page, totalPages, items: items.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE) };
}
