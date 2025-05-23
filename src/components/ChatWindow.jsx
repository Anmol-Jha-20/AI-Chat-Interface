// src/components/ChatWindow.jsx
import { useContext } from "react";
import { ChatContext } from "../context/ChatContext.jsx";

const ChatWindow = () => {
  const { messages } = useContext(ChatContext);

  return (
    <div className="chat-window">
      {messages.map((msg) => (
        <div key={msg.id} className={`message ${msg.sender}`}>
          <strong>{msg.sender}:</strong> {msg.content}
        </div>
      ))}
    </div>
  );
};

export default ChatWindow;
