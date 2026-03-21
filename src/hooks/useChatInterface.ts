import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import type { RootState } from "../store/index";
import {
    clearCurrentChat,
    clearInput,
    createNewChat,
    deleteChat,
    saveCache,
    setActiveChat,
    setError,
    setInput,
    setLoading,
    updateMessages,
} from "../store/chatSlice";
import { generateChatResponse } from "../services/chatService";
import type { ChatMessage, ChatSession } from "../types/global";

function buildNewSession(): ChatSession {
    const now = new Date().toISOString();

    return {
        id: uuidv4(),
        title: "New Chat",
        messages: [],
        liked: null,
        createdAt: now,
        updatedAt: now,
    };
}

export function useChatInterface() {
    const dispatch = useDispatch();

    const { input, loading, error, activeChatId, sessions, cache } = useSelector(
        (state: RootState) => state.chat
    );

    const activeSession = useMemo(() => {
        return sessions.find((session) => session.id === activeChatId) ?? null;
    }, [sessions, activeChatId]);

    const messages = activeSession?.messages ?? [];

    const ensureActiveChat = (): string => {
        if (activeSession) return activeSession.id;

        const newSession = buildNewSession();
        dispatch(createNewChat(newSession));
        return newSession.id;
    };

    const handleInputChange = (value: string) => {
        dispatch(setInput(value));
    };

    const handleCreateNewChat = () => {
        dispatch(createNewChat(buildNewSession()));
    };

    const handleSelectChat = (chatId: string) => {
        dispatch(setActiveChat(chatId));
    };

    const handleDeleteChat = (chatId: string) => {
        dispatch(deleteChat(chatId));
    };

    const handleClearChat = () => {
        dispatch(clearCurrentChat());
    };

    const handleReaction = (
        messageId: string,
        value: "like" | "dislike"
    ) => {
        if (!activeSession) return;

        const updatedMessages = activeSession.messages.map((message) =>
            message.id === messageId && message.role === "assistant"
                ? {
                    ...message,
                    reaction: message.reaction === value ? null : value,
                }
                : message
        );

        dispatch(
            updateMessages({
                chatId: activeSession.id,
                messages: updatedMessages,
            })
        );
    };
    const submitPrompt = async () => {
        const prompt = input.trim();
        if (!prompt || loading) return;

        dispatch(setError(null));
        dispatch(setLoading(true));

        const chatId = ensureActiveChat();

        const currentSession =
            sessions.find((session) => session.id === chatId) ?? null;

        const userMessage: ChatMessage = {
            id: uuidv4(),
            role: "user",
            content: prompt,
            createdAt: new Date().toISOString(),
        };

        const updatedMessages = [...(currentSession?.messages ?? []), userMessage];

        dispatch(
            updateMessages({
                chatId,
                messages: updatedMessages,
                title:
                    (currentSession?.messages.length ?? 0) === 0
                        ? prompt.slice(0, 30)
                        : currentSession?.title,
            })
        );

        dispatch(clearInput());

        try {
            const cacheKey = prompt.toLowerCase();
            const cachedResponse = cache[cacheKey];

            const reply =
                cachedResponse ?? (await generateChatResponse(updatedMessages));

            if (!cachedResponse) {
                dispatch(saveCache({ prompt, response: reply }));
            }

            const assistantMessage: ChatMessage = {
                id: uuidv4(),
                role: "assistant",
                content: reply,
                createdAt: new Date().toISOString(),
            };

            dispatch(
                updateMessages({
                    chatId,
                    messages: [...updatedMessages, assistantMessage],
                })
            );
        } catch (error) {
            const message =
                error instanceof Error
                    ? error.message
                    : "Something went wrong while getting the response.";

            dispatch(setError(message));
        } finally {
            dispatch(setLoading(false));
        }
    };

    return {
        input,
        loading,
        error,
        sessions,
        activeChatId,
        activeSession,
        messages,
        handleInputChange,
        handleCreateNewChat,
        handleSelectChat,
        handleDeleteChat,
        handleClearChat,
        handleReaction,
        submitPrompt,
    };
}