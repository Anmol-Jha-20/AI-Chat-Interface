// const calcPlugin = {
//   name: "calc",
//   trigger: /^\/calc\s+(.+)/i,
//   execute: async ([_, expression]) => {
//     try {
//       const result = Function('"use strict"; return (' + expression + ")")();
//       if (typeof result !== "number" || isNaN(result)) throw new Error();
//       return { output: `Result: ${result}` };
//     } catch {
//       return {
//         output:
//           "❌ Invalid expression. Please try something like /calc 5 * (2 + 3).",
//       };
//     }
//   },
// };
// export default calcPlugin;

const calcPlugin = {
  name: "calc",
  trigger: /^\/calc\s+(.+)/i,
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
