# 🧠 AI Chat Interface with Plugin Support

A sleek AI chat interface built with React that supports plugin-style tools using commands like `/calc`, `/define`, and `/weather`. Each plugin fetches and displays rich, card-based responses in the chat UI.

---

## 🚀 Features

- Plugin-style commands using natural chat input (e.g., `/calc`, `/define`, `/weather`)
- Clean, responsive UI with card components for each plugin
- Persisted chat history using `localStorage`
- Modular architecture for adding new plugins easily

---

## 🛠 Setup & Running Instructions

### 1. **Clone the Repository**

```bash
git clone https://github.com/your-username/ai-chat-plugins.git
cd ai-chat-plugins
```

### 2. **Install Dependencies**

```bash
npm install
```

### 3. **Start the Development Server**

```bash
npm run dev
```

This will start the app at `http://localhost:5173` if you're using Vite.

---

## 🧩 Plugin Architecture

Plugins are modular and follow a common structure:

```js
const samplePlugin = {
  name: "pluginName",
  trigger: /your-regex/,
  execute: async (matchArray) => {
    // Return a result with output & pluginData
    return {
      output: "Formatted response text",
      pluginName: "pluginName",
      pluginData: { ... }
    };
  }
};
```

### 🔍 Parsing Logic

1. **Input Command** (e.g., `/calc 5+3`)
2. **`handleCommand(input)`** in `pluginManager.js`:
   - Iterates through available plugins
   - Matches the `trigger` regex
   - Executes the matched plugin
   - Returns a structured plugin message
3. **PluginCard** renders a rich UI based on `pluginName` and `pluginData`

---

## 🧠 Implemented Plugins

### 1. `/calc` – Calculator

- **Command**: `/calc 5 * (2 + 3)`
- **Function**: Evaluates basic math expressions
- **API Used**: None (uses JavaScript's `Function` safely)

### 2. `/define` – Dictionary

- **Command**: `/define ephemeral`
- **Function**: Fetches the definition of a word
- **API Used**: [Free Dictionary API](https://dictionaryapi.dev/)

### 3. `/weather` – Weather Info

- **Command**: `/weather Mumbai`
- **Function**: Shows current weather for a city
- **API Used**: [OpenWeatherMap API](https://openweathermap.org/api)
  - You’ll need an API key[VITE_OPENWEATHERMAP_API_KEY]. Store it securely (e.g., `.env`)

---

## 📁 Project Structure (Relevant Parts)

```
src/
│
├── components/
│   ├── ChatInput.jsx
│   ├── ChatMessage.jsx
│   ├── ChatWindow.jsx
│   ├── MessageInput.jsx
│   └── PluginCard.jsx
│
├── context/
|   ├── ChatContext.jsx
|
├── plugins/
│   ├── calcPlugin.js
│   ├── definePlugin.js
│   ├── weatherPlugin.js
│   └── pluginManager.js
│
|
├── App.jsx
└── main.jsx
```

---

## 📜 License

MIT License — free to use and modify.
