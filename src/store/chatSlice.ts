import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { ChatMessage, ChatSession, ChatState } from "../types/global";

const STORAGE_KEY = "store_chat_sessions";

function loadInitialState(): ChatState {
    try {
        const stored = localStorage.getItem(STORAGE_KEY);

        if (stored) {
            return JSON.parse(stored) as ChatState;
        }
    } catch {
        // ignore parse errors
    }

    return {
        input: "",
        loading: false,
        error: null,
        activeChatId: null,
        sessions: [],
        cache: {},
    };
}

const initialState: ChatState = loadInitialState();

const chatSlice = createSlice({
    name: "chat",
    initialState,
    reducers: {
        setInput: (state, action: PayloadAction<string>) => {
            state.input = action.payload;
        },
        clearInput: (state) => {
            state.input = "";
        },
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        },
        setError: (state, action: PayloadAction<string | null>) => {
            state.error = action.payload;
        },
        createNewChat: (state, action: PayloadAction<ChatSession>) => {
            state.sessions.unshift(action.payload);
            state.activeChatId = action.payload.id;
            state.error = null;
            state.input = "";
        },
        setActiveChat: (state, action: PayloadAction<string>) => {
            state.activeChatId = action.payload;
            state.error = null;
            state.input = "";
        },
        updateMessages: (
            state,
            action: PayloadAction<{ chatId: string; messages: ChatMessage[]; title?: string }>
        ) => {
            state.sessions = state.sessions.map((session) =>
                session.id === action.payload.chatId
                    ? {
                        ...session,
                        messages: action.payload.messages,
                        title: action.payload.title ?? session.title,
                        updatedAt: new Date().toISOString(),
                    }
                    : session
            );
        },
        clearCurrentChat: (state) => {
            state.sessions = state.sessions.map((session) =>
                session.id === state.activeChatId
                    ? {
                        ...session,
                        title: "New Chat",
                        messages: [],
                        liked: null,
                        updatedAt: new Date().toISOString(),
                    }
                    : session
            );
            state.error = null;
        },
        setReaction: (state, action: PayloadAction<boolean | null>) => {
            state.sessions = state.sessions.map((session) =>
                session.id === state.activeChatId
                    ? {
                        ...session,
                        liked: action.payload,
                        updatedAt: new Date().toISOString(),
                    }
                    : session
            );
        },
        saveCache: (
            state,
            action: PayloadAction<{ prompt: string; response: string }>
        ) => {
            state.cache[action.payload.prompt.trim().toLowerCase()] =
                action.payload.response;
        },
        deleteChat: (state, action: PayloadAction<string>) => {
            const chatId = action.payload;
            state.sessions = state.sessions.filter((session) => session.id !== chatId);

            if (state.activeChatId === chatId) {
                state.activeChatId = state.sessions[0]?.id ?? null;
            }

            state.error = null;
            state.input = "";
        },
    },
});

export const {
    setInput,
    clearInput,
    setLoading,
    setError,
    createNewChat,
    setActiveChat,
    updateMessages,
    clearCurrentChat,
    setReaction,
    saveCache,
    deleteChat,
} = chatSlice.actions;

export { STORAGE_KEY };
export default chatSlice.reducer;