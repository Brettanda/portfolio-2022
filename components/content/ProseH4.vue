<template>
  <h4 :id="id">
    <a
      :href="`#${id}`"
      class="header-link"
      v-bind:aria-label="id.replaceAll('-', ' ')"
    >
      <font-awesome-icon :icon="['fa', 'link']" />
    </a>
    <slot />
  </h4>
</template>

<script setup lang="ts">
defineProps<{ id: string }>();
</script>

<style lang="scss" scoped>
.header-link {
  --link-colour: var(--colour-3);
  opacity: 0;
  width: 0;
  display: inline-block;
  transition: all 0.2s ease-in-out;

  svg {
    height: 1rem;
  }

  &::after {
    display: none;
  }
}

h4 {
  position: relative;

  &:hover,
  &:focus {
    .header-link {
      opacity: 1;
      width: 2rem;
    }
  }
}
</style>