<template>
  <Head>
    <Script src="assets/scripts/canvas.ts" async defer></Script>
  </Head>
  <div class="skew-container">
    <div class="skew-parallelogram">
      <canvas
        v-bind:height="height"
        v-bind:width="width"
        class="backface"
        id="backface"
        >This browser was not able to load this canvas element</canvas
      >
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      height: window.innerHeight,
      width: window.innerWidth,
    };
  },
  mounted() {
    this.$nextTick(() => {
      window.addEventListener("resize", this.onResize);
    });
  },
  beforeUnmount() {
    window.removeEventListener("resize", this.onResize);
  },
  methods: {
    onResize() {
      this.height = window.innerHeight;
      this.width = window.innerWidth;
    },
  },
};
</script>

<style lang="scss" scoped>
.skew-container {
  height: 100vh;
  width: 100vw;
  max-width: 100%;
  position: absolute;
  overflow: hidden;
  transform: skewY(-3deg);
  // background: var(--background-accent);
  top: -10rem;
}
.backface {
  transform-origin: top left;
  height: 100vh;
  width: 100vw;
  // max-width: 100%;
  position: relative;
  transform: skew(0, 3deg);
  // opacity: 0.6;
}
</style>

<style lang="scss">
// .light-mode {
//   .backface {
//     opacity: 0.6;
//   }
// }
</style>