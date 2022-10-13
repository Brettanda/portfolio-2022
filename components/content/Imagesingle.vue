<template>
  <span>
    <ContentSlot :use="$slots.default" unwrap="img" />
  </span>
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
span {
  position: relative;
  height: 100%;
  width: 100%;
  display: inline-block;
  text-align: center;

  &::before {
    content: "";
    z-index: -1;
    display: block;
    width: 100vw;
    height: 100%;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    background: var(--background-accent-colour);
  }
}
</style>