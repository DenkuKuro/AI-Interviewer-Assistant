import Link from "next/link";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "cn";

type ProblemPaginationProps = {
    page: number,
    totalPages: number,
    totalItems: number,
    pageSize: number,
    // Current filters, so every page link keeps them in the URL
    filters: { q?: string, difficulty?: string, tags: string[] },
}

function buildHref(page: number, { q, difficulty, tags }: ProblemPaginationProps["filters"]) {
    const params = new URLSearchParams();
    if (q) params.set("q", q);
    if (difficulty) params.set("difficulty", difficulty);
    tags.forEach((tag) => params.append("tags", tag));
    if (page > 1) params.set("page", String(page));
    const queryString = params.toString();
    return queryString ? `/problems?${queryString}` : "/problems";
}

// Always show first, last and the current page with its neighbours, with "…" over any gap
function getPageItems(current: number, total: number): (number | "ellipsis")[] {
    const pages = [...new Set([1, total, current - 1, current, current + 1])]
        .filter((page) => page >= 1 && page <= total)
        .sort((a, b) => a - b);

    const items: (number | "ellipsis")[] = [];
    pages.forEach((page, index) => {
        if (index > 0 && page - pages[index - 1] > 1) items.push("ellipsis");
        items.push(page);
    });
    return items;
}

const navButton = cn(buttonVariants({ variant: "outline" }), "h-10 rounded-lg px-3");

export function ProblemPagination({ page, totalPages, totalItems, pageSize, filters }: ProblemPaginationProps) {
    if (totalItems === 0) return null;

    const first = (page - 1) * pageSize + 1;
    const last = Math.min(page * pageSize, totalItems);

    return (
        <div className="my-6 flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="text-sm text-muted-foreground">
                Showing {first}–{last} of {totalItems} problems
            </p>
            {totalPages > 1 && (
                <nav aria-label="Pagination" className="flex items-center gap-1">
                    {page > 1 ? (
                        <Link href={buildHref(page - 1, filters)} className={navButton} aria-label="Previous page">
                            <ChevronLeftIcon />
                        </Link>
                    ) : (
                        <span aria-disabled="true" className={cn(navButton, "pointer-events-none opacity-50")}>
                            <ChevronLeftIcon />
                        </span>
                    )}
                    {getPageItems(page, totalPages).map((item, index) =>
                        item === "ellipsis" ? (
                            <span key={`ellipsis-${index}`} className="px-2 text-muted-foreground">…</span>
                        ) : (
                            <Link
                                key={item}
                                href={buildHref(item, filters)}
                                aria-current={item === page ? "page" : undefined}
                                className={cn(
                                    navButton,
                                    "min-w-10 justify-center",
                                    item === page && "border-red-600 bg-red-600 font-semibold text-white hover:bg-red-600/90 dark:border-red-600 dark:bg-red-600 dark:hover:bg-red-600/90"
                                )}
                            >
                                {item}
                            </Link>
                        )
                    )}
                    {page < totalPages ? (
                        <Link href={buildHref(page + 1, filters)} className={navButton} aria-label="Next page">
                            <ChevronRightIcon />
                        </Link>
                    ) : (
                        <span aria-disabled="true" className={cn(navButton, "pointer-events-none opacity-50")}>
                            <ChevronRightIcon />
                        </span>
                    )}
                </nav>
            )}
        </div>
    )
}
