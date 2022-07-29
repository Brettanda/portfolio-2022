<template>
  <NuxtLink :to="link(href)">
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
      if (!l.startsWith("/")) return l + "?utm_source=brettanda.ca";
      return l;
    },
  },
};
</script>

<style lang="scss" scoped>
a {
  text-decoration: underline;
}
</style>
