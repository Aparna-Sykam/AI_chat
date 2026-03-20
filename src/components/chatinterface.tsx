import useChatInterface from "../hooks/useChatInterface";

export default function ChatInterface() {
    const { messages, input, loading, setInput, sendMessage } =
        useChatInterface();

    return (
        <div className="flex h-full w-full min-w-0 flex-col bg-slate-100">

            {/* Messages */}
            <div className="min-w-0 flex-1 overflow-y-auto overflow-x-hidden px-6 py-6">
                <div className="mx-auto flex w-full max-w-5xl flex-col gap-4">

                    {messages.length === 0 && (
                        <div className="text-sm text-slate-500">
                            Hi, I'm your AI assistant. How can I help you today?
                        </div>
                    )}

                    {messages.map((message, index) => (
                        <div
                            key={`${message.role}-${index}`}
                            className={`flex ${message.role === "user" ? "justify-end" : "justify-start"
                                }`}
                        >
                            <div
                                className={`max-w-[75%] rounded-2xl px-4 py-3 text-sm ${message.role === "user"
                                    ? "bg-slate-900 text-white"
                                    : "bg-white text-slate-800"
                                    }`}
                            >
                                {message.content}
                            </div>
                        </div>
                    ))}

                    {loading && (
                        <div className="text-sm text-slate-500">
                            Thinking...
                        </div>
                    )}

                </div>
            </div>

            {/* Input */}
            <div className="px-6 py-4">
                <div className="mx-auto flex w-full max-w-5xl items-center gap-3 bg-white p-3 rounded-xl">

                    <input
                        type="text"
                        placeholder="Type your message..."
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter" && !e.shiftKey) {
                                e.preventDefault();
                                sendMessage();
                            }
                        }}
                        className="flex-1 bg-transparent px-2 py-2 text-sm outline-none placeholder:text-slate-400"
                    />

                    <button
                        onClick={sendMessage}
                        disabled={loading || !input.trim()}
                        className="rounded-lg bg-slate-900 px-4 py-2 text-sm text-white hover:bg-slate-800 disabled:opacity-50"
                    >
                        Send
                    </button>

                </div>
            </div>

        </div>
    );
}