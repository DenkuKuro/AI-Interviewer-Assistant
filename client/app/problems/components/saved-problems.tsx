
import { createClient } from "@/lib/server";
import { redirect } from "next/navigation";
import { SavedProblem } from "../types";


async function getSavedProblems(access_token: string): Promise<SavedProblem[]> {
    const baseUrl = process.env.QUACKY_API_URL_DEV;
    if (!baseUrl) throw new Error("QUACKY_API_URL_DEV is not set");

    const response = await fetch(`${baseUrl}/users/:id/problems`);

    if (!response.ok) 
        throw new Error(`Failed to load problems (${response.status})`);

    return response.json();
}

export default async function SaveProblems() {
  const supabase = await createClient()

  const { data, error } = await supabase.auth.getSession()
  if (error || !data?.session) {
    redirect('/auth/login')
  }
  const { access_token } = data.session;
  const savedProblems = await getSavedProblems(access_token);


  return (
    <div>

    </div>
  )
}