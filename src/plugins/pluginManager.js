import calcPlugin from "./calcPlugin.js";
import { weatherPlugin } from "./weatherPlugin.js";
import { definePlugin } from "./definePlugin.js";

const plugins = [weatherPlugin, calcPlugin, definePlugin];

export const handleCommand = async (input) => {
  for (const plugin of plugins) {
    let match = plugin.trigger?.test(input)
      ? input.match(plugin.trigger)
      : null;

    // If match() method exists and trigger didn't match
    if (!match && typeof plugin.match === "function") {
      match = plugin.match(input);
    }
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
