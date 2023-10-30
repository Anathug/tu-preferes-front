const defaultTheme = require(`tailwindcss/defaultTheme`);

export default {
    theme: {
        fontFamily: {
            heading: [`"Lilita One"`],
        },
        extend: {
            fontFamily: {
                sans: [`Roboto`, ...defaultTheme.fontFamily.sans],
            },
        },
    },
};
