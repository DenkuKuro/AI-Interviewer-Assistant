import { NextRequest, NextResponse } from "next/server";
import { DIFFICULTIES, type ProblemData } from "@/app/problems/types";

// Mock API standing in for the NestJS backend. Swap PROBLEMS_API_URL to the real endpoint later.
const MOCK_PROBLEMS: ProblemData[] = [
    { id: 1, title: "Two Sum", tags: ["Array", "Hash Table"], difficulty: "Easy", url: "https://leetcode.com/problems/two-sum/" },
    { id: 20, title: "Valid Parentheses", tags: ["String", "Stack"], difficulty: "Easy", url: "https://leetcode.com/problems/valid-parentheses/" },
    { id: 21, title: "Merge Two Sorted Lists", tags: ["Linked List", "Recursion"], difficulty: "Easy", url: "https://leetcode.com/problems/merge-two-sorted-lists/" },
    { id: 121, title: "Best Time to Buy and Sell Stock", tags: ["Array"], difficulty: "Easy", url: "https://leetcode.com/problems/best-time-to-buy-and-sell-stock/" },
    { id: 3, title: "Longest Substring Without Repeating Characters", tags: ["Sliding Window", "Hash Table"], difficulty: "Medium", url: "https://leetcode.com/problems/longest-substring-without-repeating-characters/" },
    { id: 15, title: "3Sum", tags: ["Array", "Two Pointers"], difficulty: "Medium", url: "https://leetcode.com/problems/3sum/" },
    { id: 200, title: "Number of Islands", tags: ["Graph", "DFS"], difficulty: "Medium", url: "https://leetcode.com/problems/number-of-islands/" },
    { id: 42, title: "Trapping Rain Water", tags: ["Array", "Two Pointers"], difficulty: "Hard", url: "https://leetcode.com/problems/trapping-rain-water/" },
    { id: 23, title: "Merge k Sorted Lists", tags: ["Linked List", "Heap"], difficulty: "Hard", url: "https://leetcode.com/problems/merge-k-sorted-lists/" },
];

export async function GET(request: NextRequest) {
    const q = request.nextUrl.searchParams.get("q")?.trim().toLowerCase() ?? "";
    const difficulty = request.nextUrl.searchParams.get("difficulty");

    const problems = MOCK_PROBLEMS.filter((problem) => {
        const matchesDifficulty =
            !difficulty ||
            !DIFFICULTIES.includes(difficulty as (typeof DIFFICULTIES)[number]) ||
            problem.difficulty === difficulty;
        const matchesQuery =
            !q ||
            problem.title.toLowerCase().includes(q) ||
            problem.tags.some((tag) => tag.toLowerCase().includes(q));
        return matchesDifficulty && matchesQuery;
    });

    return NextResponse.json(problems);
}
