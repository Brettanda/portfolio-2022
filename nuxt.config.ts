// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  // titleTemplate: '%s | Brett Anda\'s Portfolio',

  site: { url: 'https://brettanda.ca' },

  modules: [
    '@nuxtjs/sitemap',
    '@nuxt/content',
    '@nuxtjs/color-mode',
    '@nuxt/image',
    // '@nuxtjs/html-validator',
    // 'nuxt-turnstile',
    // '@zadigetvoltaire/nuxt-gtm',
    "@nuxtjs/tailwindcss"
  ],

  // gtm: {
  //   id: 'GTM-5TZJ7JJ',
  // },

  app: {
    head: {
      link: [
        {
          rel: "preload",
          href: "/_nuxt/entry.iAFtUSu0.css",
          as: "style"
        },
        {
          rel: "preload",
          href: "/fonts/BaiJamjuree-Bold.woff2",
          as: 'font',
          type: 'font/woff2',
          crossorigin: true
        },
        {
          rel: "preload",
          href: "/fonts/BaiJamjuree-Medium.woff2",
          as: 'font',
          type: 'font/woff2',
          crossorigin: true
        },
      ]
    }
  },

  runtimeConfig: {
    captchaKey: '',
    emailUsername: '',
    emailPassword: '',
    public: {
      captchaSiteKey: '',
    },
    // turnstile: {
    //   secretKey: process.env.NUXT_TURNSTILE_SECRET_KEY || '',
    // },
  },

  // turnstile: {
  //   siteKey: process.env.NUXT_TURNSTILE_SITE_KEY || '',
  // },

  typescript: {
    strict: true,
    shim: false
  },

  // https://image.nuxtjs.org
  image: {
    inject: true,
  },

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
    build: {
      markdown: {
        highlight: {
          preload: ["csharp", "md", "javascript", "python"],
          theme: {
            default: 'github-light',
            dark: 'dark-plus',
          },
        },
      },
    },
  },

  nitro: {
    preset: 'vercel',
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

  compatibilityDate: '2025-04-25',
})
