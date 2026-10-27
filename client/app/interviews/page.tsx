

function ProblemDescription() {
    return (
        <>
            <div className="text-center w-full h-full bg-amber-600">
                Problem Section
            </div>
        </>
    )
}

function CodeEditor() {
    return (
        <>
            <div className="text-center w-full h-full bg-blue-800">
                Code Editor
            </div>
        </>
    )
}

function ChatBox() {
    return (
        <>
            <div className="text-center w-full h-full bg-red-800">
                ChatBox
            </div>
        </>
    )
}

export default function InterviewsPage() {
    return (
        <>
            <div className="">
                <ProblemDescription />
                <CodeEditor />
                <ChatBox />
            </div>
        </>
    )
}