"use client"

import { useEffect, useOptimistic, useState, useTransition } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ChevronDownIcon, SearchIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { DIFFICULTIES, type Tag } from "../types";

const SEARCH_DEBOUNCE_MS = 300;

type ParamChanges = Record<string, string | string[] | null>;

export function ProblemFilters({ tags }: { tags: Tag[] }) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const [, startTransition] = useTransition();

    const urlQuery = searchParams.get("q") ?? "";
    const activeDifficulty = searchParams.get("difficulty") ?? "All";
    const [query, setQuery] = useState(urlQuery);

    // Selected tag slugs. Show checkbox changes immediately while the server re-renders the results
    const [selectedTags, setSelectedTags] = useOptimistic(searchParams.getAll("tags"));
    const [tagSearch, setTagSearch] = useState("");

    function updateParams(changes: ParamChanges) {
        const params = new URLSearchParams(searchParams.toString());
        // Any filter change can shrink the result set, so go back to the first page
        params.delete("page");
        for (const [key, value] of Object.entries(changes)) {
            params.delete(key);
            if (Array.isArray(value)) value.forEach((item) => params.append(key, item));
            else if (value) params.set(key, value);
        }
        const queryString = params.toString();
        router.replace(queryString ? `${pathname}?${queryString}` : pathname, { scroll: false });
    }

    function toggleTag(tag: string) {
        const next = selectedTags.includes(tag)
            ? selectedTags.filter((selected) => selected !== tag)
            : [...selectedTags, tag];
        startTransition(() => {
            setSelectedTags(next);
            updateParams({ tags: next });
        });
    }

    function clearTags() {
        startTransition(() => {
            setSelectedTags([]);
            updateParams({ tags: null });
        });
    }

    // Debounce typing so we don't refetch on every keystroke
    useEffect(() => {
        if (query.trim() === urlQuery) return;
        const timer = setTimeout(() => updateParams({ q: query.trim() || null }), SEARCH_DEBOUNCE_MS);
        return () => clearTimeout(timer);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [query]);

    const visibleTags = tags.filter((tag) => tag.name.toLowerCase().includes(tagSearch.trim().toLowerCase()));
    const hasTags = selectedTags.length > 0;

    return (
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <div className="relative w-full lg:max-w-md lg:flex-1">
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
            <div className="flex flex-wrap gap-2">
                <Popover>
                    <PopoverTrigger
                        render={
                            <Button
                                type="button"
                                variant="outline"
                                className={
                                    hasTags
                                        ? "h-14 rounded-xl border-red-600 px-5 text-base font-semibold text-foreground"
                                        : "h-14 rounded-xl px-5 text-base text-muted-foreground"
                                }
                            />
                        }
                    >
                        Topics{hasTags ? ` (${selectedTags.length})` : ""}
                        <ChevronDownIcon className="size-4" />
                    </PopoverTrigger>
                    <PopoverContent className="w-80">
                        <Input
                            type="search"
                            value={tagSearch}
                            onChange={(event) => setTagSearch(event.target.value)}
                            placeholder="Filter topics"
                            aria-label="Filter topics"
                            className="mb-2 h-9"
                        />
                        <div className="max-h-64 overflow-y-auto" role="group" aria-label="Topics">
                            {visibleTags.length === 0 ? (
                                <p className="px-2 py-4 text-center text-sm text-muted-foreground">No topics found</p>
                            ) : (
                                visibleTags.map((tag) => (
                                    <label
                                        key={tag.slug}
                                        className="flex cursor-pointer items-center gap-2 rounded-md px-2 py-1.5 text-sm hover:bg-muted"
                                    >
                                        <input
                                            type="checkbox"
                                            checked={selectedTags.includes(tag.slug)}
                                            onChange={() => toggleTag(tag.slug)}
                                            className="size-4 accent-red-600"
                                        />
                                        {tag.name}
                                    </label>
                                ))
                            )}
                        </div>
                        {hasTags && (
                            <Button type="button" variant="ghost" size="sm" onClick={clearTags} className="mt-2 w-full">
                                Clear topics
                            </Button>
                        )}
                    </PopoverContent>
                </Popover>
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
