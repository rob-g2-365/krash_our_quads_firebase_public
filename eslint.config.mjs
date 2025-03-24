import globals from "globals";
import pluginJs from "@eslint/js";


/** @type {import('eslint').Linter.Config[]} */
export default [
  {     
    rules: {
      "no-unused-vars": ["error", { "argsIgnorePattern": "callback|event"}]
    },

    languageOptions: { globals: globals.browser }
  },
  pluginJs.configs.recommended,
];