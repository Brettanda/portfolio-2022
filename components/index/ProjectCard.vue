<template>
  <!--  v-inview -->
  <component v-bind:is="tag" class="card">
    <div class="content">
      <h3 class="title">
        <NuxtLink v-bind:to="item._path" v-text="item.title" />
      </h3>
      <p v-text="item.description"></p>
    </div>
    <NuxtPicture
      v-if="item.image != null"
      class="image loaded"
      :imgAttrs="{
        class: 'image loaded',
        style: 'height: 100%;object-fit: contain;',
      }"
      v-bind:src="item.image"
      v-bind:alt="item.title"
      format="webp,png,jpeg"
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
      default: "article",
    },
    item: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
@supports ((animation-timeline: scroll()) and (animation-range: 0% 100%)) {
  /* Scroll-Driven Animations related styles go here */
  /* This check excludes Firefox Nightly which only has a partial implementation at the moment of posting (mid-September 2024). */
  @keyframes slide-up {
    from {
      opacity: 0;
      transition: 0.4s;
      transition-delay: 0.1s;
      translate: 0 5rem;
    }
    to {
      opacity: 1;
      // filter: blur(0);
      translate: 0;
    }
  }

  .card {
    animation: slide-up 2s linear forwards;
    animation-timeline: scroll();
  }
}
.card {
  max-width: 700px;
  min-width: 250px;
  width: 100%;
  margin: 0 auto;
  border-radius: 5px;
  position: relative;
  display: flex;
  min-height: 200px;
  flex-direction: column;
  justify-content: flex-end;
}
.image {
  width: 200px;
  position: absolute;
  right: 0;
  top: 0;
  z-index: 1;
  height: 90%;
  max-height: 200px;
  object-fit: contain;
  border-radius: $border-radius;

  &:not(.loaded) {
    background: var(--background-accent);
  }

  &.loaded {
    // opacity: 0.6;
    filter: brightness(60%);
    // background: var(--background-colour);
  }
}
.content {
  z-index: 2;
  position: relative;
  margin: auto;
  width: 100%;
}

h3 {
  font-size: x-large;
}

a {
  color: inherit;
}
</style>