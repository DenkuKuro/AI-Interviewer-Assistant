import type { ProblemData, Tag } from "./types";
import { PAGE_SIZE, type ProblemQuery } from "./utils";

// Query shapes come from https://github.com/akarsh1995/leetcode-graphql-queries
const LEETCODE_GRAPHQL_URL = "https://leetcode.com/graphql";
const LEETCODE_PROBLEM_URL = "https://leetcode.com/problems";

const PROBLEM_LIST_QUERY = `
query problemsetQuestionList($categorySlug: String, $limit: Int, $skip: Int, $filters: QuestionListFilterInput) {
  problemsetQuestionList: questionList(categorySlug: $categorySlug, limit: $limit, skip: $skip, filters: $filters) {
    total: totalNum
    questions: data {
      difficulty
      frontendQuestionId: questionFrontendId
      title
      titleSlug
      topicTags { name }
    }
  }
}`;

const TAG_LIST_QUERY = `
query questionTopicTags {
  questionTopicTags { edges { node { name slug } } }
}`;

type ProblemListResponse = {
    problemsetQuestionList: {
        total: number,
        questions: {
            difficulty: ProblemData["difficulty"],
            frontendQuestionId: string,
            title: string,
            titleSlug: string,
            topicTags: { name: string }[],
        }[],
    },
};

type TagListResponse = {
    questionTopicTags: { edges: { node: Tag }[] },
};

// LeetCode's GraphQL endpoint is POST-only, so caching has to be forced; the body is part of the cache key
async function leetcodeQuery<T>(query: string, variables: Record<string, unknown>, revalidate: number): Promise<T> {
    const response = await fetch(LEETCODE_GRAPHQL_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json", Referer: "https://leetcode.com/problemset/" },
        body: JSON.stringify({ query, variables }),
        cache: "force-cache",
        next: { revalidate },
    });
    if (!response.ok) throw new Error(`LeetCode request failed (${response.status})`);

    // GraphQL reports query errors with a 200 status, so check the body too
    const { data, errors }: { data?: T, errors?: { message: string }[] } = await response.json();
    if (errors?.length || !data) throw new Error(`LeetCode query failed: ${errors?.[0]?.message ?? "no data"}`);
    return data;
}

// Filtering and pagination happen on LeetCode's side, so only one page of problems is fetched
export async function getProblemPage({ q, difficulty, tags }: ProblemQuery, page: number) {
    const filters = {
        ...(q && { searchKeywords: q }),
        ...(difficulty && { difficulty: difficulty.toUpperCase() }),
        ...(tags.length > 0 && { tags }),
    };
    const { problemsetQuestionList: list } = await leetcodeQuery<ProblemListResponse>(
        PROBLEM_LIST_QUERY,
        { categorySlug: "", limit: PAGE_SIZE, skip: (page - 1) * PAGE_SIZE, filters },
        3600,
    );

    const problems: ProblemData[] = list.questions.map((question) => ({
        id: question.frontendQuestionId,
        title: question.title,
        title_slug: question.titleSlug,
        topic_tags: question.topicTags.map((tag) => tag.name),
        difficulty: question.difficulty,
        url: `${LEETCODE_PROBLEM_URL}/${question.titleSlug}/`,
    }));
    return { total: list.total, problems };
}

export async function getTags(): Promise<Tag[]> {
    const data = await leetcodeQuery<TagListResponse>(TAG_LIST_QUERY, {}, 86400);
    return data.questionTopicTags.edges.map((edge) => edge.node);
}
