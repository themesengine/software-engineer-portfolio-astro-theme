import js from "@eslint/js";
import astro from "eslint-plugin-astro";
import globals from "globals";

const eslintConfig = [
    {
        ignores: [
            ".astro/**",
            "dist/**",
            "node_modules/**",
            "documentation/**"
        ]
    },
    js.configs.recommended,
    ...astro.configs.recommended,
    {
        languageOptions: {
            globals: {
                ...globals.browser,
                ...globals.node
            }
        }
    }
];

export default eslintConfig;
