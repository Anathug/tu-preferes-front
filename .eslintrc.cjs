module.exports = {
    env: {
        browser: true,
        es2021: true,
    },
    extends: [`airbnb-base`, `eslint:recommended`, `plugin:vue/vue3-essential`, `prettier`],
    overrides: [
        {
            env: {
                node: true,
            },
            files: [`.eslintrc.{js,cjs}`],
            parserOptions: {
                sourceType: `script`,
            },
        },
    ],
    parserOptions: {
        ecmaVersion: `latest`,
        sourceType: `module`,
    },
    plugins: [`vue`, `prettier`],
    rules: {
        "prettier/prettier": `error`,
        quotes: [`error`, `backtick`],
        "no-console": `off`,
        "no-undef": `off`,
    },
};
