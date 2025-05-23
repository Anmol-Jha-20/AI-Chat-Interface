import { createContext, useContext, useEffect, useState } from "react";

export const ChatContext = createContext(); // <-- Add this export

export const ChatProvider = ({ children }) => {
  const [messages, setMessages] = useState(() => {
    const stored = localStorage.getItem("chat");
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem("chat", JSON.stringify(messages));
  }, [messages]);

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

  return (
    <ChatContext.Provider value={{ messages, addMessage, setMessages }}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => useContext(ChatContext);
