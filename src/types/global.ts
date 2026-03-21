export type Role = "user" | "assistant" | "system";

export interface ChatMessage {
    id: string;
    role: Role;
    content: string;
    createdAt: string;
    reaction?: "like" | "dislike" | null;
}

export interface ChatSession {
    id: string;
    title: string;
    messages: ChatMessage[];
    liked: boolean | null;
    createdAt: string;
    updatedAt: string;
}

export interface ChatState {
    input: string;
    loading: boolean;
    error: string | null;
    activeChatId: string | null;
    sessions: ChatSession[];
    cache: Record<string, string>;
}