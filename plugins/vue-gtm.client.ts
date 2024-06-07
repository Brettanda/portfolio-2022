import { createGtm } from '@gtm-support/vue-gtm'

export default defineNuxtPlugin((nuxtApp) => {
    if (useRuntimeConfig().public.appendix !== 'production') return
    nuxtApp.vueApp.use(createGtm({
        id:'GTM-5TZJ7JJ',
        defer: false,
        compatibility: false,
        enabled: true,
        debug: true,
        loadScript: true,
        vueRouter:useRouter(),
        trackOnNextTick: false,
    }))
})