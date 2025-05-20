import js from "@eslint/js";
import globals from "globals";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs}"],
    plugins: { js },
    extends: ["js/recommended"],
    rules: {
      quotes: ["error", "double"]
    },
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: "module",
      globals: {
        ...globals.node,
        ...globals.browser,
        ...globals.jest
      }
    }
  },

  {
    files: ["**/*.js"],
    languageOptions: {
      sourceType: "commonjs"
    }
  }
]);