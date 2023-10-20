<template>
  <nuxt-picture
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
  max-width: 100%;
  max-height: 500px;
  margin: 0 auto;
  display: block;
  // background-color: var(--background-accent);
}
</style>