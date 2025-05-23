const calcPlugin = {
  name: "calc",
  trigger: /^\/calc\s+(.+)/i,
  match(input) {
    const regex =
      /(?:what(?:'s| is)\s+)?([\d\s\+\-\*\/\.\(\)]+)\s*(?:equal\s*to)?\s*\?/i;
    const match = input.match(regex);
    return match ? [null, match[1]] : false;
  },
  execute: async ([_, expression]) => {
    try {
      const result = Function('"use strict"; return (' + expression + ")")();
      if (typeof result !== "number" || isNaN(result)) throw new Error();

      const output = `Result: ${result}`;
      return {
        output,
        pluginName: "calc",
        pluginData: {
          output,
        },
      };
    } catch {
      const output =
        "❌ Invalid expression. Please try something like /calc 5 * (2 + 3).";
      return {
        output,
        pluginName: "calc",
        pluginData: {
          output,
        },
      };
    }
  },
};

export default calcPlugin;
