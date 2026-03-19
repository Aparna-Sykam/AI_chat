import { useState } from "react";
import Sidenav from "./components/sidenav";
import ChatInterface from "./components/chatinterface";
import "./styles/common.css";

export default function App() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="flex h-screen w-full overflow-hidden bg-slate-100">
      <Sidenav
        collapsed={collapsed}
        onToggle={() => setCollapsed(!collapsed)}
      />
      <div className="min-w-0 flex-1 overflow-hidden">
        <ChatInterface />
      </div>
    </div>
  );
}