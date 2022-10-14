// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  // titleTemplate: '%s | Brett Anda\'s Portfolio',

  modules: [
    '@nuxt/content',
    '@nuxtjs/color-mode',
    '@nuxtjs/html-validator',
    // 'nuxt-turnstile',
  ],

  runtimeConfig: {
    captchaKey: '',
    emailUsername: '',
    emailPassword: '',
    public: {
      captchaSiteKey: '',
    },
    turnstile: {
      secretKey: process.env.NUXT_TURNSTILE_SECRET_KEY || '',
    },
  },

  turnstile: {
    siteKey: process.env.NUXT_TURNSTILE_SITE_KEY || '',
  },

  typescript: {
    strict: true,
    shim: false
  },

  // https://image.nuxtjs.org
  // image: {
  //   // Options
  // },

  colorMode: {
    preference: "system",
    fallback: "light",
    // for the theme in content
    classSuffix: ''
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
    highlight: {
      preload: ["csharp", "md", "javascript", "python"],
      theme: {
        default: 'github-light',
        dark: 'dark-plus',
      }
    },
    navigation: {
      fields: ['image', 'draft', 'description', 'category']
    }
  },

  nitro: {
    preset: 'cloudflare',
    prerender: {
      routes: ['/sitemap.xml', '/robots.txt']
    }
  },

  css: [
    '@/assets/styles/global.scss'
  ],

  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "@/assets/styles/_variables.scss" as *;',
        },
      },
    },
  },
})

