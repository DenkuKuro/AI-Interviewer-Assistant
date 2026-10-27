import { DIFFICULTIES, type Difficulty } from "./types";

const MAX_QUERY_LENGTH = 100;
const MAX_TAGS = 10;
const MAX_TAG_LENGTH = 50;

export const PAGE_SIZE = 20;

export type ProblemQuery = {
    q?: string,
    difficulty?: Difficulty,
    // topic slugs, e.g. "hash-table"
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

export function totalPagesFor(totalItems: number) {
    return Math.max(1, Math.ceil(totalItems / PAGE_SIZE));
}
