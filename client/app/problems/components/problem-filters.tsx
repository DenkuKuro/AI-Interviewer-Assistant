"use client"

import { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { SearchIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DIFFICULTIES } from "../types";

const SEARCH_DEBOUNCE_MS = 300;

export function ProblemFilters() {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const urlQuery = searchParams.get("q") ?? "";
    const activeDifficulty = searchParams.get("difficulty") ?? "All";
    const [query, setQuery] = useState(urlQuery);

    function updateParams(changes: Record<string, string | null>) {
        const params = new URLSearchParams(searchParams.toString());
        for (const [key, value] of Object.entries(changes)) {
            if (value) params.set(key, value);
            else params.delete(key);
        }
        const queryString = params.toString();
        router.replace(queryString ? `${pathname}?${queryString}` : pathname, { scroll: false });
    }

    // Debounce typing so we don't refetch on every keystroke
    useEffect(() => {
        if (query.trim() === urlQuery) return;
        const timer = setTimeout(() => updateParams({ q: query.trim() || null }), SEARCH_DEBOUNCE_MS);
        return () => clearTimeout(timer);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [query]);

    return (
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="relative w-full sm:max-w-lg sm:flex-1">
                <SearchIcon className="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                    type="search"
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    placeholder="Search problems"
                    aria-label="Search problems"
                    className="h-14 rounded-xl bg-card pl-11 text-base md:text-base"
                />
            </div>
            <div className="flex gap-2">
                {["All", ...DIFFICULTIES].map((difficulty) => {
                    const isActive = activeDifficulty === difficulty;
                    return (
                        <Button
                            key={difficulty}
                            type="button"
                            variant="outline"
                            aria-pressed={isActive}
                            onClick={() => updateParams({ difficulty: difficulty === "All" ? null : difficulty })}
                            className={
                                isActive
                                    ? "h-14 rounded-xl border-red-600 bg-red-600 px-5 text-base font-semibold text-white hover:bg-red-600/90 hover:text-white dark:border-red-600 dark:bg-red-600 dark:hover:bg-red-600/90"
                                    : "h-14 rounded-xl px-5 text-base text-muted-foreground"
                            }
                        >
                            {difficulty}
                        </Button>
                    );
                })}
            </div>
        </div>
    )
}
