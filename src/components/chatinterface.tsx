import { Loader2, ThumbsDown, ThumbsUp } from "lucide-react";
import type { ChatMessage } from "../types/global";

type ChatInterfaceProps = {
    messages: ChatMessage[];
    input: string;
    loading: boolean;
    error: string | null;
    onChange: (value: string) => void;
    onSubmit: () => void;
    onClear: () => void;
    onLike: (id: string) => void;
    onDislike: (id: string) => void;
};

export default function ChatInterface({
    messages,
    input,
    loading,
    error,
    onChange,
    onSubmit,
    onClear,
    onLike,
    onDislike,
}: ChatInterfaceProps) {
    return (
        <>
            {messages.length > 0 && (
                <div className="flex justify-end px-6 py-2">
                    <button
                        onClick={onClear}
                        className="rounded-lg px-3 py-1 text-xs text-slate-600 hover:bg-slate-200 shadow-sm"
                    >
                        Clear
                    </button>
                </div>
            )}

            <div className="flex-1 overflow-y-auto px-6 py-6">
                <div className="mx-auto flex w-full max-w-5xl flex-col gap-4">
                    {messages.length === 0 && !loading && (
                        <div className="text-sm text-slate-500">Hi, I am your AI assistant. How can I help you today?</div>
                    )}

                    {messages.map((message) => {
                        const isAssistant = message.role === "assistant";

                        return (
                            <div key={message.id} className="flex flex-col gap-1">
                                <div
                                    className={`flex ${isAssistant ? "justify-start" : "justify-end"
                                        }`}
                                >
                                    <div
                                        className={`max-w-[95%] rounded-2xl px-4 py-3 text-sm ${isAssistant
                                            ? "bg-white-900 text-black"
                                            : "bg-gray-200 text-slate-800 shadow-sm"
                                            }`}
                                    >
                                        {message.content}
                                    </div>
                                </div>

                                {isAssistant && (
                                    <div className="flex justify-start gap-2 pr-2">
                                        <button
                                            onClick={() => onLike(message.id)}
                                            className={`rounded p-1 transition ${message.reaction === "like"
                                                ? "text-green-600"
                                                : "text-slate-400 hover:bg-slate-200"
                                                }`}
                                        >
                                            <ThumbsUp
                                                size={16}
                                                fill={message.reaction === "like" ? "currentColor" : "none"}
                                            />
                                        </button>

                                        <button
                                            onClick={() => onDislike(message.id)}
                                            className={`rounded p-1 transition ${message.reaction === "dislike"
                                                ? "text-red-600"
                                                : "text-slate-400 hover:bg-slate-200"
                                                }`}
                                        >
                                            <ThumbsDown
                                                size={16}
                                                fill={message.reaction === "dislike" ? "currentColor" : "none"}
                                            />
                                        </button>
                                    </div>
                                )}
                            </div>
                        );
                    })}

                    {error && (
                        <div className="flex justify-start">
                            <div className="max-w-[75%] rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-600 shadow-sm">
                                {error}
                            </div>
                        </div>
                    )}

                    {loading && (
                        <div className="flex justify-start">
                            <div className="flex items-center gap-2 rounded-2xl bg-slate-900 px-4 py-3 text-sm text-white shadow-sm">
                                <Loader2 size={16} className="animate-spin" />
                                Processing your request...
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <div className="px-6 py-4">
                <div className="mx-auto flex w-full max-w-5xl items-center gap-3 rounded-xl bg-white p-3 shadow-sm">
                    <input
                        type="text"
                        value={input}
                        placeholder="Type your message..."
                        onChange={(e) => onChange(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter" && !e.shiftKey) {
                                e.preventDefault();
                                onSubmit();
                            }
                        }}
                        className="flex-1 bg-transparent px-2 py-2 text-sm outline-none placeholder:text-slate-400"
                    />

                    <button
                        onClick={onSubmit}
                        disabled={loading || !input.trim()}
                        className="rounded-lg bg-slate-900 px-4 py-2 text-sm text-white hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        {loading ? "Sending..." : "Send"}
                    </button>
                </div>
            </div>
        </>
    );
}