<template>
  <nav>
    <NuxtLink to="/">Logo</NuxtLink>
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
  </nav>
</template>

<script lang="ts" setup>
const colorMode = useColorMode();

const click = () => {
  if (colorMode.preference == "dark") {
    colorMode.preference = "light";
  } else colorMode.preference = "dark";

  const colourChange = new CustomEvent("colourChange", {detail: colorMode.preference});
  window.dispatchEvent(colourChange);
};
</script>

<style lang="scss" scoped>
nav {
  display: grid;
  grid-template-columns: repeat(12, minmax(0, 1fr));
  gap: 2rem;
  align-items: center;
  padding: var(--padding-full);
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100000000;
}

div {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 30%;
}

a {
  text-transform: uppercase;
  // font-weight: bold;
  color: var(--text-colour);

  &:nth-of-type(1) {
    grid-column: span 4;
  }
  &:nth-of-type(2) {
    grid-column: span 2;
  }
  &:nth-of-type(3) {
    grid-column: span 2;
  }
  &:nth-of-type(4) {
    grid-column: span 3;
  }
}

.colour-mode {
  height: 20px;
  width: 20px;

  &,
  & > svg {
    padding: 0;
    border: none;
    background: none;
    cursor: pointer;
    color: var(--text-colour);
  }
}
</style>