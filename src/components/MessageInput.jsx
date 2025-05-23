import { useState } from "react";
import { useChat } from "../context/ChatContext";
import { handleCommand } from "../plugins/pluginManager";

const MessageInput = () => {
  const [text, setText] = useState("");
  const { addMessage, setMessages } = useChat();

  const handleSend = async () => {
    if (!text.trim()) return;

    const userMsg = {
      id: Date.now().toString(),
      sender: "user",
      content: text,
      type: "text",
      timestamp: new Date().toISOString(),
    };
    addMessage(userMsg);

    const loadingMsg = {
      id: `loading-${Date.now()}`,
      sender: "assistant",
      content: "Thinking...",
      type: "text",
      timestamp: new Date().toISOString(),
    };
    addMessage(loadingMsg);

    const pluginResult = await handleCommand(text);

    setMessages((prev) =>
      prev.map((msg) =>
        msg.id === loadingMsg.id
          ? pluginResult || {
              ...loadingMsg,
              content: "Sorry, I couldn't understand that.",
            }
          : msg
      )
    );

    setText("");
  };

  return (
    <div className="p-4 bg-white flex gap-2">
      <input
        type="text"
        className="flex-1 border rounded p-2"
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSend()}
        placeholder="Type your message..."
      />
      <button
        onClick={handleSend}
        className="bg-blue-500 text-white px-4 rounded"
      >
        Send
      </button>
    </div>
  );
};

export default MessageInput;
