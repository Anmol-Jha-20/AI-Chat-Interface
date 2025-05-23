import { useState, useEffect } from "react";
import ChatInput from "./components/ChatInput.jsx";
import ChatMessage from "./components/ChatMessage.jsx";
import { handleCommand } from "./plugins/pluginManager.js";
import "./App.css";

function App() {
  const [messages, setMessages] = useState([]);

  const addMessage = (content, sender = "user") => {
    const message = {
      id: Date.now().toString(),
      sender,
      content,
      type: "text",
      timestamp: new Date().toISOString(),
    };
    setMessages((prev) => [...prev, message]);
    return message;
  };

  const handleSend = async (text) => {
    const userMsg = addMessage(text);

    const loadingMsg = {
      id: `loading-${Date.now()}`,
      sender: "assistant",
      content: "Thinking...",
      type: "text",
      timestamp: new Date().toISOString(),
    };
    setMessages((prev) => [...prev, loadingMsg]);

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
  };

  useEffect(() => {
    const stored = localStorage.getItem("chat");
    if (stored) setMessages(JSON.parse(stored));
  }, []);

  useEffect(() => {
    localStorage.setItem("chat", JSON.stringify(messages));
  }, [messages]);

  return (
    <div className="flex flex-col h-screen">
      <div className="flex-1 overflow-y-auto p-4 space-y-2 bg-gray-50">
        {messages.map((msg) => (
          <ChatMessage key={msg.id} message={msg} />
        ))}
      </div>
      <ChatInput onSend={handleSend} />
    </div>
  );
}

export default App;
