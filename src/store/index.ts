import { configureStore } from "@reduxjs/toolkit";
import chatReducer, { STORAGE_KEY } from "./chatSlice";

export const store = configureStore({
    reducer: {
        chat: chatReducer,
    },
});

store.subscribe(() => {
    try {
        const state = store.getState().chat;
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
        // ignore storage errors
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;