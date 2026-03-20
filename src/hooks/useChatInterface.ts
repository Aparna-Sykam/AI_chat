import { useState } from "react";
import {
    sendChatToHuggingFace,
    type ChatMessage,
} from "../services/chat_service";

export default function useChatInterface() {
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);

    const sendMessage = async () => {
        const trimmedInput = input.trim();

        if (!trimmedInput || loading) return;

        const userMessage: ChatMessage = {
            role: "user",
            content: trimmedInput,
        };

        const updatedMessages = [...messages, userMessage];

        setMessages(updatedMessages);
        setInput("");
        setLoading(true);

        try {
            const reply = await sendChatToHuggingFace(updatedMessages);

            setMessages([
                ...updatedMessages,
                {
                    role: "assistant",
                    content: reply,
                },
            ]);
        } catch (error: unknown) {
            console.error("Hugging Face chat error:", error);

            let errorMessage = "Something went wrong while getting the response.";

            if (error instanceof Error) {
                errorMessage = error.message;
            }

            setMessages([
                ...updatedMessages,
                {
                    role: "assistant",
                    content: errorMessage,
                },
            ]);
        } finally {
            setLoading(false);
        }
    };

    return {
        messages,
        input,
        loading,
        setInput,
        sendMessage,
    };
}