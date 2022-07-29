<template>
  <component v-bind:is="tag" class="card" v-inview>
    <div class="content">
      <h3><NuxtLink v-bind:to="item._path" v-text="item.title" /></h3>
      <p v-text="item.description"></p>
      <NuxtLink v-bind:to="item._path" class="read-more"> Read more </NuxtLink>
    </div>
    <nuxt-picture
      v-if="item.image != null"
      class="image loaded"
      :imgAttrs="{
        class: 'image loaded',
        style: 'height: 100%;object-fit: contain;',
      }"
      v-bind:src="item.image"
      v-bind:alt="item.description"
      loading="lazy"
      width="200px"
      fit="inside"
    />
    <div v-else class="image"></div>
  </component>
</template>

<script lang="ts">
export default {
  props: {
    tag: {
      type: String,
      required: false,
      default: "div",
    },
    item: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.card {
  max-width: 700px;
  min-width: 400px;
  width: 100%;
  margin: 0 auto;
  // padding: var(--padding-half);
  // margin: var(--padding-full);
  border-radius: 5px;
  position: relative;
  display: flex;
  min-height: 250px;
  flex-direction: column;
  // display: inline-flex;
  // flex-direction: column;
  justify-content: flex-end;
}
.image {
  // width: calc(100% + var(--padding-full) * 2);
  width: 200px;
  position: absolute;
  right: 0;
  top: 0;
  z-index: 1;
  // margin: calc(var(--padding-full) * -1);
  height: 100%;
  max-height: 300px;
  object-fit: contain;

  &:not(.loaded) {
    background: var(--background-accent);
  }

  &.loaded {
    opacity: 0.6;
  }
}
.content {
  z-index: 2;
  position: relative;
}

h3 {
  font-size: x-large;
}

a {
  color: inherit;
}

.read-more {
  color: var(--link-colour);
  border: 1px solid var(--link-colour);
  padding: 0.5rem;
  margin: 0.5rem 0;
  display: inline-block;

  &:hover,
  &:focus {
    text-decoration: underline;
  }
}
</style>