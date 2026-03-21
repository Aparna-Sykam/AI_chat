import { lazy, Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Sidenav from "./components/sidenav";

const ChatPage = lazy(() => import("./pages/chatPage"));

export default function App() {
  return (
    <div className="flex h-screen w-full overflow-hidden bg-slate-100">
      <Sidenav />
      <main className="min-w-0 flex-1 overflow-hidden">
        <Routes>
          <Route path="/" element={<Navigate to="/chat" replace />} />
          <Route path="/chat" element={<ChatPage />} />
          <Route path="*" element={<Navigate to="/chat" replace />} />
        </Routes>
      </main>
    </div>
  );
}