<template>
  <!--  v-inview -->
  <component v-bind:is="tag" class="card">
    <div class="content">
      <h3 class="title">
        <NuxtLink v-bind:to="item.path" v-text="item.title" />
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

@keyframes underline-left-to-right {
  0% {
    width: 0;
    left: 0;
  }
  40% {
    width: 100%;
    left: 0;
    right: 0;
  }
  60% {
    width: 100%;
  }
  100% {
    width: 0;
    right: 0;
  }
}

.card {
  width: 450px;
  min-width: 100px;
  display: flex;
  min-height: 200px;
  flex-grow: 1;
  padding: 1rem;

  &:hover {
    background-color: var(--background-accent);

    & a::after {
      animation: underline-left-to-right 0.8s normal forwards;
    }
  }

  @include break(sm) {
    min-height: 180px;
  }
}
.image {
  width: 200px;
  position: absolute;
  right: 20px;
  top: 20px;
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
    filter: opacity(0.5) brightness(60%);
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