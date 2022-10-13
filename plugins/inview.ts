export default defineNuxtPlugin(nuxtApp => {
  let observer: IntersectionObserver;

  nuxtApp.vueApp.directive('inview', {
    mounted(el) {
      el.classList.add('not-in-view')
      observer = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view")
        } else {
          entry.target.classList.remove("in-view")
        }
      }, {
        root: null,
        rootMargin: '1000px 0px 0px 0px',
        threshold: 0.25
      })
      observer.observe(el);
    },
    unmounted() {
      observer.disconnect()
    },
  })
})