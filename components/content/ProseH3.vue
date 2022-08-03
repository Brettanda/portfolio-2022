<template>
  <h3 :id="id">
    <a :href="`#${id}`">
      <font-awesome-icon class="header-link" :icon="['fa', 'link']" />
    </a>
    <slot />
  </h3>
</template>

<script setup lang="ts">
defineProps<{ id: string }>();
</script>

<style lang="scss" scoped>
.header-link {
  height: 1rem;
  opacity: 0;
  width: 0;
  transition: all 0.2s ease-in-out;
}

h3 {
  position: relative;

  &:hover,
  &:focus {
    .header-link {
      display: inline-block;
      opacity: 1;
      padding-right: 1rem;
      width: auto;
    }
  }
}
</style>