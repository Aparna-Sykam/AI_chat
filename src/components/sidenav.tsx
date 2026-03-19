import { UserCircle, PanelLeftClose, PenSquare } from "lucide-react";

type SidenavProps = {
    collapsed: boolean;
    onToggle: () => void;
};

export default function Sidenav({ collapsed, onToggle }: SidenavProps) {
    return (
        <div
            className={`shrink-0 flex h-screen flex-col border-r border-blue-100 bg-blue-50 text-slate-800 transition-all duration-300 ${collapsed ? "w-[80px]" : "w-[260px]"
                }`}
        >
            <div className="flex shrink-0 items-center justify-between px-4 py-3">
                {!collapsed && (
                    <h1 className="!m-0 !text-left !text-[24px] !leading-none font-medium text-slate-700">
                        AI Chat
                    </h1>
                )}

                <button
                    onClick={onToggle}
                    className="rounded-lg p-2 text-slate-600 transition hover:bg-blue-100 hover:text-slate-800"
                >
                    <PanelLeftClose size={18} />
                </button>
            </div>

            <div className="flex-1 overflow-y-auto px-3 py-3">
                <div className="mb-3">
                    <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-sm text-slate-700 transition hover:bg-blue-100">
                        <PenSquare size={18} />
                        {!collapsed && <span>New Chat</span>}
                    </button>
                </div>

            </div>

            <div className="shrink-0 border-t border-blue-100 p-3">
                <div className="flex items-center gap-3 rounded-lg px-2 py-2 transition hover:bg-blue-100">
                    <UserCircle size={24} />
                    {!collapsed && (
                        <div>
                            <p className="text-sm font-medium">Aparna Sykam</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}