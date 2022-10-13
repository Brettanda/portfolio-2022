<template>
  <nav class="nav container" aria-label="Main">
    <div class="nav_sub subcontainer">
      <NuxtLink to="/" title="Home" class="logo">
        <img
          v-if="$colorMode.value == 'dark' && !$colorMode.unknown"
          height="50"
          width="50"
          src="/logo-light.png"
          alt="Brett Anda's logo"
        />
        <img
          v-else
          height="50"
          width="50"
          src="/logo.png"
          alt="Brett Anda's logo"
        />
      </NuxtLink>
      <NuxtLink to="/">Home</NuxtLink>
      <NuxtLink to="/about-me">About</NuxtLink>
      <NuxtLink to="/contact-me">Contact</NuxtLink>
      <button
        class="colour-mode"
        type="button"
        aria-label="Change colour scheme"
        v-if="!$colorMode.forced"
        :title="`Color scheme: ${$colorMode.preference}`"
        @click="click()"
      >
        <font-awesome-icon
          height="20"
          width="20"
          :icon="[
            'fa',
            $colorMode.preference == 'light'
              ? 'sun'
              : $colorMode.preference == 'system'
              ? 'desktop'
              : 'moon',
          ]"
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
  } else if (colorMode.preference == "light") {
    colorMode.preference = "system";
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
  min-width: var(--min-width);
}
.nav_sub {
  display: grid;
  grid-template-columns: repeat(8, minmax(0, 1fr)) 0.5fr;
  gap: 2rem;
  align-items: center;
  width: 100%;
  max-width: var(--max-width);

  & > * {
    margin: 0 auto;

    &:nth-child(1) {
      margin-left: 0;
    }

    &:nth-last-child(1),
    &:nth-last-child(2),
    &:nth-last-child(3),
    &:nth-last-child(4) {
      margin-right: 0;
    }
  }

  @include break(sm) {
    gap: 1rem;
    grid-template-columns: repeat(5, minmax(0, 1fr));
  }
}

a {
  text-transform: uppercase;
  // font-weight: bold;
  color: var(--text-colour);
  transition: opacity 0.2s ease-in-out;

  &:nth-of-type(1) {
    grid-column: 1;
  }

  &:nth-of-type(2) {
    grid-column: 6;

    @include break(sm) {
      display: none;
    }
  }

  &:nth-of-type(3) {
    grid-column: 7;

    @include break(sm) {
      grid-column: 7;
    }
  }

  &:nth-of-type(4) {
    grid-column: 8;

    @include break(sm) {
      grid-column: 8;
    }
  }

  &:hover,
  &:focus {
    opacity: 0.7;
  }
}

.logo {
  &::after {
    display: none;
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