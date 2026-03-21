import OpenAI from "openai";
import type { ChatMessage } from "../types/global";

const client = new OpenAI({
    baseURL: import.meta.env.VITE_BASE_URL,
    apiKey: import.meta.env.VITE_API_KEY,
    dangerouslyAllowBrowser: true,
});

function getApiErrorMessage(error: unknown): string {
    if (!error || typeof error !== "object") {
        return "Something went wrong while getting the response.";
    }

    const displayError = error as {
        message?: string;
        status?: number;
        error?: { message?: string };
        response?: {
            data?: {
                error?: string | { message?: string };
                message?: string;
            };
            status?: number;
        };
    };

    if (displayError.response?.data?.error) {
        const apiError = displayError.response.data.error;

        if (typeof apiError === "string") {
            return apiError;
        }

        if (typeof apiError === "object" && apiError.message) {
            return apiError.message;
        }
    }

    if (displayError.response?.data?.message) {
        return displayError.response.data.message;
    }

    if (displayError.error?.message) {
        return displayError.error.message;
    }

    if (displayError.message) {
        return displayError.message;
    }

    return "Something went wrong while getting the response.";
}

export async function generateChatResponse(
    messages: ChatMessage[]
): Promise<string> {
    try {
        const response = await client.chat.completions.create({
            model: "openai/gpt-oss-20b",
            messages: messages.map((message) => ({
                role: message.role,
                content: message.content,
            })),
            temperature: 0.7,
            max_tokens: 300,
        });

        return (
            response.choices?.[0]?.message?.content?.trim() || "No response received."
        );
    } catch (error) {
        throw new Error(getApiErrorMessage(error));
    }
}