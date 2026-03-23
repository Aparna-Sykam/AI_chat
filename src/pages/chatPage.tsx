import { useEffect } from "react";
import { useParams } from "react-router-dom";
import ChatInterface from "../components/chatinterface";
import { useChatInterface } from "../hooks/useChatInterface";

export default function ChatPage() {
    const { id } = useParams();

    const {
        input,
        loading,
        error,
        messages,
        handleInputChange,
        handleSelectChat,
        submitPrompt,
        handleClearChat,
        handleReaction,
    } = useChatInterface();

    useEffect(() => {
        if (id) {
            handleSelectChat(id);
        }
    }, [id, handleSelectChat]);

    return (
        <div className="flex h-full min-w-0 flex-1 flex-col overflow-hidden bg-white border-l border-slate-200">

            <ChatInterface
                messages={messages}
                input={input}
                loading={loading}
                error={error}
                onChange={handleInputChange}
                onSubmit={submitPrompt}
                onClear={handleClearChat}
                onLike={(messageId: any) => handleReaction(messageId, "like")}
                onDislike={(messageId: any) => handleReaction(messageId, "dislike")}
            />
        </div>
    );
}