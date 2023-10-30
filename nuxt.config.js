// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
    devtools: { enabled: true },
    modules: [`@nuxt/ui`, `@nuxtjs/device`, `@nuxtjs/google-fonts`, `nuxt-primevue`],
    primevue: {
        cssLayerOrder: `tailwind-base, primevue, tailwind-utilities`,
        options: {
            unstyled: false,
            ripple: true,
            inputStyle: `filled`,
        },
    },
    runtimeConfig: {
        public: {
            API_URL: process.env.API_URL,
        },
    },
    googleFonts: {
        display: `swap`,
        families: {
            "Lilita+One": true,
        },
    },
    tailwindcss: {},
    css: [`assets/css/tailwind.css`, `primevue/resources/themes/lara-dark-teal/theme.css`],
});
