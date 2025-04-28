<template>
  <NuxtPicture
    class="image"
    :imgAttrs="{
      class: 'image',
      style: 'max-width: 100%;max-height: 500px;margin: 0 auto;display: block;',
    }"
    :src="src"
    :alt="alt"
    :width="width"
    :height="height"
    loading="lazy"
    format="avif,webp"
  />
</template>

<script setup lang="ts">
defineProps({
  src: {
    type: String,
    default: "",
  },
  alt: {
    type: String,
    default: "",
  },
  width: {
    type: [String, Number],
    default: undefined,
  },
  height: {
    type: [String, Number],
    default: undefined,
  },
});
</script>


<style lang="scss" scoped>
.image {
  max-width: 50%;
  // max-height: 500px;
  margin: 0 auto;
  // display: block;
  float: right;
  padding: 2rem;
  margin: 0 0 2rem 2rem;
  background-color: var(--background-accent);

  @include break(md) {
    padding: 2rem;
  }

  @include break(sm) {
    padding: 1rem;
    max-width: 100%;
    float: none;
    margin: 1rem 0;
  }
}
</style>