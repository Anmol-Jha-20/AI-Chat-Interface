import PluginCard from "./PluginCard.jsx";
import { format } from "date-fns";

export default function ChatMessage({ message }) {
  const isUser = message.sender === "user";
  const timestamp = format(new Date(message.timestamp), "hh:mm a");

  return (
    <div
      className={`flex ${isUser ? "justify-end" : "justify-start"} mb-3 px-2`}
    >
      {!isUser && (
        <div className="w-8 h-8 rounded-full bg-blue-200 text-blue-700 flex items-center justify-center font-bold mr-2">
          A
        </div>
      )}

      <div>
        <div
          className={`inline-block px-4 py-2 rounded-2xl shadow ${
            isUser
              ? "bg-blue-100 text-blue-900"
              : message.type === "plugin"
              ? "bg-transparent p-0"
              : "bg-gray-100 text-gray-900"
          }`}
        >
          {message.type === "plugin" ? (
            <PluginCard
              key={message.pluginName + JSON.stringify(message.pluginData)}
              pluginName={message.pluginName}
              pluginData={message.pluginData}
            />
          ) : message.content === "Thinking..." ? (
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 border-2 border-t-transparent border-blue-500 rounded-full animate-spin"></span>
              <span>Thinking...</span>
            </div>
          ) : (
            message.content
          )}
        </div>

        <div className="text-xs text-gray-400 mt-1 text-right">{timestamp}</div>
      </div>

      {isUser && (
        <div className="w-8 h-8 rounded-full bg-green-200 text-green-700 flex items-center justify-center font-bold ml-2">
          U
        </div>
      )}
    </div>
  );
}
