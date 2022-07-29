export default defineNuxtPlugin(nuxtApp => {
  let offsetTop = 0;

  const onScroll = (el) => {
    offsetTop = window.pageYOffset || document.documentElement.scrollTop;
    callbackFunc();
  }
  const isElementInViewport = el => {
    const rect = el.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <=
      (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <=
      (window.innerWidth || document.documentElement.clientWidth)
    );
  }
  const callbackFunc = () => {
    console.log("callback")
    const items = document.querySelectorAll(".not-in-view");
    for (var i = 0; i < items.length; i++) {
      if (isElementInViewport(items[i])) {
        items[i].classList.add("in-view");
      }
    }
  };
  nuxtApp.vueApp.directive('inview', {
    created(el) {
      el.classList.add('not-in-view')
    },
    mounted(el) {
      window.addEventListener("scroll", onScroll);
      onScroll(el);
    },
    unmounted() {
      window.removeEventListener("scroll", onScroll);
    },
  })
})