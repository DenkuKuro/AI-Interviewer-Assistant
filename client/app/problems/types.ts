export const DIFFICULTIES = ["Easy", "Medium", "Hard"] as const;

export type Difficulty = (typeof DIFFICULTIES)[number];

export type ProblemData = {
    id: number,
    title: string,
    tags: string[],
    difficulty: Difficulty,
    url: string,
}
