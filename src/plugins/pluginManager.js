import calcPlugin from "./calcPlugin.js";
import { weatherPlugin } from "./weatherPlugin.js";
import { definePlugin } from "./definePlugin.js";

const plugins = [weatherPlugin, calcPlugin, definePlugin];

export const handleCommand = async (input) => {
  for (const plugin of plugins) {
    const match = input.match(plugin.trigger);
    if (match) {
      const result = await plugin.execute(match);
      return {
        id: Date.now().toString(),
        sender: "assistant",
        content: result.output,
        type: "plugin",
        pluginName: result.pluginName,
        pluginData: result.pluginData,
        timestamp: new Date().toISOString(),
      };
    }
  }
  return null;
};
