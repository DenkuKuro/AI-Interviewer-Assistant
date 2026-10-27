export const DIFFICULTIES = ["Easy", "Medium", "Hard"] as const;

export type Difficulty = (typeof DIFFICULTIES)[number];

export type ProblemData = {
    id: string,
    title: string,
    title_slug: string,
    topic_tags: string[],
    difficulty: Difficulty,
    url: string,
}

export type Tag = {
    name: string,
    slug: string,
}

export type codeSnippet = {
    lang: string,
    langSlug: string,
    code: string
}

export type problemSolution = {
    content: string
}

export type ProblemContent = {
    id: string,
    title: string,
    content: string,
    hints: string[],
    topicTags: string[],
    codeSnippets: codeSnippet[],
    difficulty: Difficulty
}

export type SavedProblem = {
    id: number;
    name: string;
    difficulty: Difficulty;
    savedAt: string;
}
