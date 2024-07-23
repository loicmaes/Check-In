import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginVue from "eslint-plugin-vue";

export default [
  {
    ignores: [
      "**/.nuxt/*",
      "**/node_modules/*",
      "**/.idea/*",
      "**/.git/*"
    ]
  },
  {
    files: ["**/*.{js,mjs,cjs,ts,vue}"],
  },
  {languageOptions: { globals: {...globals.browser, ...globals.node} }},
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  ...pluginVue.configs["flat/essential"],
  {files: ["**/*.vue"], languageOptions: {parserOptions: {parser: tseslint.parser}}},
  {
    rules: {
      "semi": ["error", "always"],
      "quotes": ["error", "double"],
      "vue/multi-word-component-names": "off",
      "no-unused-import": "error"
    }
  }
];
