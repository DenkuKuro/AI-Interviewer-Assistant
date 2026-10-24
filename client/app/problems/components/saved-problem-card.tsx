"use client";

import type { Difficulty } from "../types";

const DIFFICULTY_COLORS: Record<Difficulty, string> = {
    Easy: "text-[#5CC8A8]",
    Medium: "text-[#F2B544]",
    Hard: "text-[#FF6B6E]",
}

type SavedProblemCardProps = {
    id: number,
    name: string,
    difficulty: Difficulty,
    savedAt: string | Date,
}

function formatSavedDate(savedAt: string | Date) {
    return new Date(savedAt).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
    });
}

export function SavedProblemCard({ id, name, difficulty, savedAt }: SavedProblemCardProps) {
    return (
        <div className="flex flex-col gap-2.5 rounded-xl border border-[#2A2A2A] bg-[#131313] px-[18px] py-4">
            <div className="flex items-baseline justify-between gap-2">
                <span className="font-mono text-[13px] text-[#8C8C8C]">#{id}</span>
                <span className="text-xs text-[#8C8C8C]">Saved {formatSavedDate(savedAt)}</span>
            </div>
            <h3 className="text-base leading-[1.35] font-semibold text-[#EDEDED] truncate">{name}</h3>
            <div className="mt-auto flex items-center justify-between">
                <span className={`text-[13px] font-semibold ${DIFFICULTY_COLORS[difficulty]}`}>{difficulty}</span>
                <button
                    type="button"
                    onClick={() => console.log(id)}
                    className="cursor-pointer rounded-sm text-sm font-semibold text-[#FF6B6E] hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FF6B6E]"
                >
                    Start →
                </button>
            </div>
        </div>
    )
}
