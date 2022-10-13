<template>
  <NuxtLink :to="link(href)" target="_blank">
    <slot />
  </NuxtLink>
</template>
<script lang="ts">
export default {
  props: {
    href: {
      type: String,
      default: "",
    },
    blank: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    link(l: String) {
      // if (!l.startsWith("/")) return l + "?utm_source=brettanda.ca";
      return l;
    },
  },
};
</script>

<style lang="scss" scoped>
a {
  --link-colour: var(--colour-3);
  display: inline-block;

  &::after {
    width: 100%;
    color: inherit;
    left: unset;
    right: 0;
  }

  &:hover,
  &:focus {
    &::after {
      width: 0%;
    }
  }
}
</style>
