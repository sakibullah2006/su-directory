/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { cn } from "@/lib/utils"
import ReactMarkdown from "react-markdown"

interface MarkdownRendererProps {
    content: string
    className?: string
}

export function MarkdownRenderer({ content, className }: MarkdownRendererProps) {
    return (
        <div className={cn("prose prose-slate max-w-none dark:prose-invert", className)}>
            <ReactMarkdown
                components={{
                    h1: ({ node, ...props }) => <h1 className="text-3xl font-bold tracking-tight mb-4 mt-6" {...props} />,
                    h2: ({ node, ...props }) => <h2 className="text-2xl font-bold tracking-tight mb-3 mt-6" {...props} />,
                    h3: ({ node, ...props }) => <h3 className="text-xl font-bold mb-3 mt-5" {...props} />,
                    p: ({ node, ...props }) => <p className="mb-4 leading-7" {...props} />,
                    ul: ({ node, ...props }) => <ul className="list-disc pl-6 mb-4" {...props} />,
                    ol: ({ node, ...props }) => <ol className="list-decimal pl-6 mb-4" {...props} />,
                    li: ({ node, ...props }) => <li className="mb-1" {...props} />,
                    a: ({ node, ...props }) => (
                        <a
                            className="text-primary underline underline-offset-4 hover:text-primary/80 transition-colors"
                            {...props}
                        />
                    ),
                    blockquote: ({ node, ...props }) => (
                        <blockquote className="border-l-4 border-slate-300 dark:border-slate-700 pl-4 italic my-4" {...props} />
                    ),
                    code: ({ node, inline, ...props }) => {
                        return inline ? (
                            <code className="bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded text-sm font-mono" {...props} />
                        ) : (
                            <code
                                className="block bg-slate-100 dark:bg-slate-800 p-3 rounded-md text-sm font-mono overflow-x-auto my-4"
                                {...props} />
                        )
                    },
                    pre: ({ node, ...props }) => (
                        <pre className="bg-slate-100 dark:bg-slate-800 p-4 rounded-md overflow-x-auto my-4" {...props} />
                    ),
                    hr: ({ node, ...props }) => <hr className="my-6 border-slate-200 dark:border-slate-800" {...props} />,
                    img: ({ node, ...props }) => (
                        <img className="rounded-md my-4 max-w-full h-auto" {...props} alt={props.alt || ""} />
                    ),
                    table: ({ node, ...props }) => (
                        <div className="overflow-x-auto my-4">
                            <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-800" {...props} />
                        </div>
                    ),
                    th: ({ node, ...props }) => (
                        <th className="px-4 py-3 text-left text-sm font-semibold bg-slate-50 dark:bg-slate-800" {...props} />
                    ),
                    td: ({ node, ...props }) => (
                        <td className="px-4 py-3 text-sm border-t border-slate-200 dark:border-slate-800" {...props} />
                    ),
                }}
            >
                {content}
            </ReactMarkdown>
        </div>
    )
}
