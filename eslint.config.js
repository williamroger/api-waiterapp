import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs,ts,mts,cts}"],
    plugins: { js },
    rules: {
      "indent": ["error", 2],
      "no-undef": "error",
      "no-unused-vars": "error",
      "linebreak-style": ["error", "unix"],
      "quotes": ["error", "single"],
      "semi": ["error", "always"],
    },
    extends: ["js/recommended"],
    languageOptions: { globals: globals.node }
  },
  tseslint.configs.recommended,
]);
