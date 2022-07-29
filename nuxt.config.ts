import { defineNuxtConfig } from 'nuxt'

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  // target: "static",
  // titleTemplate: '%s | Brett Anda\'s Portfolio',
  modules: [
    '@nuxt/content',
    '@nuxtjs/color-mode',
    '@nuxt/image-edge',
    // '@nuxtjs/recaptcha',
  ],

  typescript: {
    strict: true
  },

  // https://image.nuxtjs.org
  image: {
    // Options
  },

  colorMode: {
    preference: "system",
    fallback: "light",
  },

  // https://www.npmjs.com/package/@nuxtjs/recaptcha
  // recaptcha: {
  //   /* reCAPTCHA options */
  // },

  build: {
    transpile: [
      '@fortawesome/vue-fontawesome',
      '@fortawesome/fontawesome-svg-core',
      '@fortawesome/free-solid-svg-icons',
      '@fortawesome/free-brands-svg-icons',
    ]
  },

  experimental: {
    viteNode: true
  },

  content: {
    // documentDriven: true,
    highlight: {
      preload: ["csharp","md","javascript"],
      // theme: 'dracula',
      theme: {
        // Default theme (same as single string)
        default: 'github-light',
        // Theme used if `html.dark`
        dark: 'material-darker',
      }
    }
  },
  css: [
    '@/assets/styles/global.scss'
  ],
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@import "@/assets/styles/_variables.scss";',
        },
      },
    },
  },
})

