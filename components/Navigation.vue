<template>
  <nav class="nav container" role="navigation" aria-label="Main">
    <div class="nav_sub subcontainer">
      <NuxtLink to="/" title="Home">
        <NuxtImg
          v-if="$colorMode.preference == 'dark'"
          height="50"
          src="/logo-light.png"
        />
        <NuxtImg v-else height="50" src="/logo.png" />
      </NuxtLink>
      <NuxtLink to="/">Home</NuxtLink>
      <NuxtLink to="/about-me">About</NuxtLink>
      <NuxtLink to="/contact-me">Contact</NuxtLink>
      <button
        class="colour-mode"
        :title="`Color mode: ${$colorMode.preference}`"
        @click="click()"
      >
        <font-awesome-icon
          :icon="['fa', $colorMode.preference == 'light' ? 'sun' : 'moon']"
        />
      </button>
    </div>
  </nav>
</template>

<script lang="ts" setup>
const colorMode = useColorMode();

const click = () => {
  if (colorMode.preference == "dark") {
    colorMode.preference = "light";
  } else colorMode.preference = "dark";

  const colourChange = new CustomEvent("colourChange", {
    detail: colorMode.preference,
  });
  window.dispatchEvent(colourChange);
};
</script>

<style lang="scss" scoped>
.nav {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 100000000;
}
.nav_sub {
  display: grid;
  grid-template-columns: repeat(9, minmax(0, 1fr));
  gap: 2rem;
  align-items: center;
  width: 100%;
  max-width: var(--max-width);

  & > * {
    margin: 0 auto;

    &:nth-child(1) {
      margin-left: 0;
    }

    &:nth-last-child(1) {
      margin-right: 0;
    }
  }

  @include break(sm) {
    grid-template-columns: repeat(5, minmax(0, 1fr));
  }
}

a {
  text-transform: uppercase;
  // font-weight: bold;
  color: var(--text-colour);

  &:nth-of-type(1) {
    grid-column: 1;
  }
  &:nth-of-type(2) {
    grid-column: 3;

    @include break(sm) {
      display: none;
    }
  }
  &:nth-of-type(3) {
    grid-column: 5;

    @include break(sm) {
      grid-column: 3;
    }
  }
  &:nth-of-type(4) {
    grid-column: 7;

    @include break(sm) {
      grid-column: 5;
    }
  }
}

.colour-mode {
  height: 20px;
  width: 20px;

  &,
  & > svg {
    grid-column: 9;
    padding: 0;
    border: none;
    background: none;
    cursor: pointer;
    color: var(--text-colour);
  }
}
</style>