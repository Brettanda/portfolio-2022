import { defineNuxtConfig } from 'nuxt'

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  // target: "static",
  // titleTemplate: '%s | Brett Anda\'s Portfolio',

  modules: [
    '@nuxt/content',
    '@nuxtjs/color-mode',
    '@nuxt/image-edge',
  ],

  // experimental: {
  //   viteNode: true
  // },

  runtimeConfig: {
    captchaKey: '',
    emailUsername: '',
    emailPassword: '',
    public: {
      captchaSiteKey: '',
    }
  },

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

  build: {
    transpile: [
      '@fortawesome/vue-fontawesome',
      '@fortawesome/fontawesome-svg-core',
      '@fortawesome/free-solid-svg-icons',
      '@fortawesome/free-brands-svg-icons',
    ]
  },

  content: {
    // documentDriven: true,
    highlight: {
      preload: ["csharp", "md", "javascript", "python"],
      theme: 'github-dark',
      // theme: {
      //   // Default theme (same as single string)
      //   default: 'github-light',
      //   // Theme used if `html.dark`
      //   dark: 'material-darker',
      // }
    }
  },

  nitro: {
    preset: 'cloudflare',
    prerender: {
      routes: ['/sitemap.xml']
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

