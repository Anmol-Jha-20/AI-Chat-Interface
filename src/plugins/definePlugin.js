export const definePlugin = {
  name: "define",
  trigger: /^\/define\s+(.+)/i,

  async execute(match) {
    const word = match[1].trim();
    const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${encodeURIComponent(
      word
    )}`;

    try {
      const res = await fetch(url);
      const data = await res.json();

      if (
        data.title === "No Definitions Found" ||
        !Array.isArray(data) ||
        !data[0]?.meanings?.length
      ) {
        return {
          type: "plugin",
          pluginName: "define",
          pluginData: {
            error: `Definition for "${word}" not found.`,
          },
        };
      }

      const definition =
        data[0]?.meanings[0]?.definitions[0]?.definition ||
        "No definition found.";
      const partOfSpeech = data[0]?.meanings[0]?.partOfSpeech || "unknown";

      return {
        type: "plugin",
        pluginName: "define",
        pluginData: {
          word,
          definition,
          partOfSpeech,
        },
      };
    } catch (err) {
      return {
        type: "plugin",
        pluginName: "define",
        pluginData: {
          error: "Failed to fetch definition.",
        },
      };
    }
  },
};
