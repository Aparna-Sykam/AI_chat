import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { PanelLeftClose, PanelLeftOpen, PenSquare, UserCircle, Trash2 } from "lucide-react";
import { useChatInterface } from "../hooks/useChatInterface";

export default function Sidenav() {
    const [collapsed, setCollapsed] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    const {
        sessions,
        activeChatId,
        handleCreateNewChat,
        handleSelectChat,
        handleDeleteChat,
    } = useChatInterface();

    const menuClass = (active: boolean) =>
        `flex w-full items-center gap-3 rounded-xl px-3 py-2 text-sm transition ${active
            ? "bg-blue-100 text-slate-900"
            : "text-slate-700 hover:bg-blue-100"
        }`;

    return (
        <aside
            className={`flex h-screen shrink-0 flex-col bg-blue-50 transition-all duration-300 ${collapsed ? "w-[84px]" : "w-[260px]"
                }`}
        >
            <div className="flex shrink-0 items-center justify-between px-3 py-4">
                {!collapsed && (
                    <h1 className="px-2 text-lg font-semibold text-slate-800">AI Chat</h1>
                )}

                <button
                    onClick={() => setCollapsed((prev) => !prev)}
                    className="rounded-lg p-2 text-slate-600 hover:bg-blue-100"
                    title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
                >
                    {collapsed ? <PanelLeftOpen size={18} /> : <PanelLeftClose size={18} />}
                </button>
            </div>

            <div className="flex min-h-0 flex-1 flex-col px-3">
                <div className="shrink-0">
                    <button
                        onClick={() => {
                            handleCreateNewChat();
                            navigate("/chat");
                        }}
                        className={menuClass(location.pathname === "/chat")}
                        title="New Chat"
                    >
                        <PenSquare size={18} />
                        {!collapsed && <span>New Chat</span>}
                    </button>
                </div>

                <div className="mt-6 min-h-0 flex-1 overflow-y-auto">
                    {!collapsed && (
                        <div className="px-3 pb-2 text-xs font-medium uppercase tracking-wide text-slate-500">
                            History
                        </div>
                    )}

                    <div className="space-y-1">
                        {sessions.length === 0 ? (
                            !collapsed && (
                                <div className="px-3 py-2 text-sm text-slate-500">
                                    No saved chats
                                </div>
                            )
                        ) : (
                            sessions.map((session) => (
                                <div
                                    key={session.id}
                                    className={`group flex items-center rounded-lg transition ${session.id === activeChatId ? "bg-blue-100" : "hover:bg-blue-100"
                                        }`}
                                >
                                    <button
                                        onClick={() => {
                                            handleSelectChat(session.id);
                                            navigate("/chat");
                                        }}
                                        className={`min-w-0 flex-1 px-3 py-2 text-left text-sm ${session.id === activeChatId
                                            ? "text-slate-900"
                                            : "text-slate-700"
                                            }`}
                                        title={session.title}
                                    >
                                        {collapsed ? (
                                            <span className="block truncate text-center">•</span>
                                        ) : (
                                            <span className="block truncate">{session.title}</span>
                                        )}
                                    </button>

                                    {!collapsed && (
                                        <button
                                            onClick={() => handleDeleteChat(session.id)}
                                            className="mr-2 rounded p-1 text-slate-500 opacity-0 transition hover:bg-blue-200 hover:text-slate-700 group-hover:opacity-100"
                                            title="Delete chat"
                                        >
                                            <Trash2 size={14} />
                                        </button>
                                    )}
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>

            <div className="shrink-0 px-3 py-3">
                <div className="flex items-center gap-3 rounded-xl px-3 py-2 text-slate-700 hover:bg-blue-100">
                    <UserCircle size={20} />
                    {!collapsed && <span className="text-sm font-medium">Profile</span>}
                </div>
            </div>
        </aside>
    );
}