// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },
  modules: [
    "@nuxtjs/tailwindcss",
    "@nuxtjs/color-mode",
    "shadcn-nuxt",
    "@nuxtjs/eslint-module",
    "@vee-validate/nuxt"
  ],
  colorMode: {
    classSuffix: "",
    preference: "system",
    fallback: "light",
  },
  tailwindcss: {
    cssPath: ["assets/css/tailwind.css", { injectPosition: "first" }],
    configPath: "tailwind.config",
    exposeConfig: false,
    viewer: true,
  },
  shadcn: {
    prefix: "Ui",
    componentDir: "components/ui",
  },
  vite: {
    optimizeDeps: {
      exclude: [
          "vee-validate"
      ]
    }
  }
});