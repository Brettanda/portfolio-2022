<template>
  <CCarousel
    :items-to-show="1"
    :autoplay="5000"
    :wrap-around="true"
    class="carousel"
  >
    <CSlide
      v-for="(item, index) of flatUnwrap($slots.default(), ['p'])"
      :key="index"
      class="carousel-item"
    >
      <Markdown :use="() => item" unwrap="li" />
    </CSlide>
    <template #addons="{ slidesCount }">
      <CNavigation v-if="slidesCount > 1" />
      <CPagination />
    </template>
  </CCarousel>
</template>

<script setup lang="ts">
import "vue3-carousel/dist/carousel.css";
// Utils from Nuxt Content
const { flatUnwrap } = useUnwrap();
</script>


<style lang="scss">
.carousel {
  width: 100%;
  height: 500px;
  background: var(--background-accent);
}

.carousel-item {
  max-height: 500px;
  width: auto;
  height: auto;
  margin-right: 10px;
  display: inline-flex;
  object-fit: contain;

  & > img {
    max-height: 500px;
    width: auto;
    height: auto;
  }
}

.carousel__prev,
.carousel__next {
  box-sizing: content-box;
  border: 5px solid var(--background-colour);
  background-color: var(--background-accent-two);
}

.carousel__pagination-button {
  background-color: var(--background-accent);
}

.carousel__pagination-button--active {
  background-color: var(--background-accent-two);
}
</style>