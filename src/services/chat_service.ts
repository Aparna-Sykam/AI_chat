import OpenAI from "openai";

export type ChatRole = "user" | "assistant" | "system";

export type ChatMessage = {
    role: ChatRole;
    content: string;
};

const token = import.meta.env.VITE_API_KEY;
const url = import.meta.env.VITE_BASE_URL;

const client = new OpenAI({
    baseURL: url,
    apiKey: token,
    dangerouslyAllowBrowser: true,
});

export async function sendChatToHuggingFace(
    messages: ChatMessage[]
): Promise<string> {
    const response = await client.chat.completions.create({
        model: "openai/gpt-oss-20b",
        messages,
        max_tokens: 300,
        temperature: 0.7,
    });

    return response.choices?.[0]?.message?.content?.trim() || "No response received.";
}