<script lang="ts">
import { defineComponent } from '#imports'

export default defineComponent({
  props: {
    code: {
      type: String,
      default: ''
    },
    language: {
      type: String,
      default: null
    },
    filename: {
      type: String,
      default: null
    },
    highlights: {
      type: Array as () => number[],
      default: () => []
    }
  }
})
</script>

<template>
  <slot />
</template>

<style lang="scss">
pre {
  background: var(--background-secondary);
  padding: var(--padding-half);
  border-radius: $border-radius;
}
pre code .line {
  display: block;
  min-height: 1rem;
}
</style>
