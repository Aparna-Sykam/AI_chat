export default function ChatInterface() {
    return (
        <div className="flex h-full w-full min-w-0 flex-col overflow-hidden bg-slate-100">

            <div className="min-w-0 flex-1 overflow-y-auto overflow-x-hidden px-6 py-6 bg-white">
                <div className="mx-auto w-full max-w-5xl rounded-2xl bg-white">
                    {/* content */}
                </div>
            </div>

            <div className="bg-white px-6 py-4">
                <div className="mx-auto flex w-full max-w-5xl min-w-0 items-center gap-3 bg-white p-3">
                    <input
                        type="text"
                        placeholder="Type your message..."
                        className="min-w-0 flex-1 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none placeholder:text-slate-400 focus:border-blue-500 focus:bg-white"
                    />
                    <button className="shrink-0 rounded-xl bg-slate-900 px-5 py-3 text-sm font-medium text-white transition hover:bg-slate-800">
                        Send
                    </button>
                </div>
            </div>
        </div>
    );
}