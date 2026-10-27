import { createClient } from "@/lib/server";
import { redirect } from "next/navigation";
import { SavedProblem } from "../types";
import { SavedProblemsList } from "./saved-problems-list";


const mockSavedProblems: SavedProblem[] = [
  { id: 1, name: "Two Sum", difficulty: "Easy", savedAt: "2026-10-21T14:32:00Z" },
  { id: 2, name: "Add Two Numbers", difficulty: "Medium", savedAt: "2026-10-20T09:15:00Z" },
  { id: 4, name: "Median of Two Sorted Arrays", difficulty: "Hard", savedAt: "2026-10-18T22:05:00Z" },
  { id: 20, name: "Valid Parentheses", difficulty: "Easy", savedAt: "2026-10-15T11:40:00Z" },
  { id: 146, name: "LRU Cache", difficulty: "Medium", savedAt: "2026-10-12T17:20:00Z" },
  {
    id: 1235,
    name: "Maximum Profit in Job Scheduling with Overlapping Intervals and Weighted Constraints",
    difficulty: "Hard",
    savedAt: "2026-10-01T08:00:00Z",
  },
]

async function getSavedProblems(access_token: string): Promise<SavedProblem[]> {
    const baseUrl = process.env.QUACKY_API_URL_DEV;
    if (!baseUrl) throw new Error("QUACKY_API_URL_DEV is not set");

    // const response = await fetch(`${baseUrl}/users/me/problems`, { 
    //   headers: {
    //     "Content-Type": "application/json",
    //     "authorization": access_token 
    //   }
    // });

    // if (!response.ok) 
    //     throw new Error(`Failed to load problems (${response.status})`);

    return mockSavedProblems;
}

export async function SavedProblems() {
  const supabase = await createClient()

  const { data, error } = await supabase.auth.getSession()
  if (error || !data?.session) {
    redirect('/auth/login')
  }
  const { access_token } = data.session;
  const problems = await getSavedProblems(access_token);


  return <SavedProblemsList problems={problems} />
}