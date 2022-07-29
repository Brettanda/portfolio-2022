import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel';

export default defineNuxtPlugin(nuxtApp => {
  nuxtApp.vueApp.component("CCarousel", Carousel);
  nuxtApp.vueApp.component("CSlide", Slide);
  nuxtApp.vueApp.component("CPagination", Pagination);
  nuxtApp.vueApp.component("CNavigation", Navigation);
})