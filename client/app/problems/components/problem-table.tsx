import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import type { ProblemData } from "../types";

const DIFFICULTY_STYLES: Record<string, string> = {
    Easy: "text-emerald-400",
    Medium: "text-amber-400",
    Hard: "text-red-400",
}

export function ProblemTable({ problems }: { problems: ProblemData[] }) {
    return (
        <div className="w-full overflow-hidden rounded-xl border">
            <Table>
                <TableHeader>
                    <TableRow className="hover:bg-transparent">
                        <TableHead className="h-12 w-24 px-6 text-muted-foreground">#</TableHead>
                        <TableHead className="h-12 px-6 text-muted-foreground">Title</TableHead>
                        <TableHead className="h-12 px-6 text-muted-foreground">Topic</TableHead>
                        <TableHead className="h-12 px-6 text-muted-foreground">Difficulty</TableHead>
                        <TableHead className="h-12 px-6 text-right text-muted-foreground">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {problems.length === 0 ? (
                        <TableRow className="hover:bg-transparent">
                            <TableCell colSpan={5} className="h-24 px-6 text-center text-muted-foreground">
                                No Problems Available
                            </TableCell>
                        </TableRow>
                    ) : (
                        problems.map((problem) => (
                            <TableRow key={problem.id}>
                                <TableCell className="px-6 py-6 font-mono text-muted-foreground">{problem.id}</TableCell>
                                <TableCell className="px-6 py-6 font-semibold whitespace-normal">{problem.title}</TableCell>
                                <TableCell className="px-6 py-6 text-muted-foreground whitespace-normal">{problem.topic_tags.join(", ")}</TableCell>
                                <TableCell className={`px-6 py-6 text-xs font-semibold ${DIFFICULTY_STYLES[problem.difficulty] ?? ""}`}>
                                    {problem.difficulty}
                                </TableCell>
                                <TableCell className="px-6 py-6 text-right">
                                    <a
                                        href={problem.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="font-semibold text-red-400 hover:underline"
                                    >
                                        Start →
                                    </a>
                                </TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>
        </div>
    )
}
