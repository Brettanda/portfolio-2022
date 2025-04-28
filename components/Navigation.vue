<template>
  <nav
    class="nav my-container"
    aria-label="Main"
    itemscope
    itemtype="https://schema.org/SiteNavigationElement"
  >
    <div class="nav_sub subcontainer">
      <NuxtLink to="/" title="Home" class="logo">
        <NuxtPicture
          v-if="colorMode.value == 'dark' && !colorMode.unknown"
          height="80"
          width="80"
          src="/logo-light.svg"
          alt="Brett Anda's logo"
        />
        <NuxtPicture
          v-else
          height="80"
          width="80"
          src="/logo-dark.svg"
          alt="Brett Anda's logo"
        />
      </NuxtLink>
      <nav>
        <NuxtLink itemprop="url" to="/"><span itemprop="name">Home</span></NuxtLink>
        <NuxtLink itemprop="url" to="/about-me"><span itemprop="name">About</span></NuxtLink>
        <a href="mailto:brett@brettanda.ca?subject=I'd like to hire you immediately&body=Hey Brett, when can you start?" target="_blank"><span class="full-email">brett@brettanda.ca</span><span class="short-email">Email</span></a>
        <!-- <NuxtLink itemprop="url" to="/contact-me"><span itemprop="name">Contact</span></NuxtLink> -->
      </nav>
    </div>
  </nav>
</template>

<script lang="ts" setup>
const colorMode = useColorMode();
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
  display: flex;
  justify-content: space-between;
  // grid-template-columns: repeat(8, minmax(0, 1fr)) 0.5fr;
  gap: 2rem;
  align-items: center;
  width: 100%;
  max-width: var(--max-width);

  nav {
    display: flex;
    flex-flow: row nowrap;
    gap: 2rem;
    justify-content: flex-end;
  }

  // & > * {
  //   margin: 0 auto;

  //   &:nth-child(1) {
  //     margin-left: 0;
  //   }

  //   &:nth-last-child(1),
  //   &:nth-last-child(2),
  //   &:nth-last-child(3),
  //   &:nth-last-child(4) {
  //     margin-right: 0;
  //   }
  // }

  @include break(sm) {
    gap: 1rem;
    // grid-template-columns: repeat(5, minmax(0, 1fr));
  }
}

.short-email {
  display:none;

  @include break(sm) {
    display: unset;
  }
}

.full-email {
  @include break(sm) {
    display: none;
  }
}

nav > a {
  text-transform: uppercase;
  // font-weight: bold;
  color: var(--text-colour);
  transition: opacity 0.2s ease-in-out;

  &:nth-of-type(1) {
  //   grid-column: 1;
    @include break(sm) {
      display: none;
    }
  }

  //&:nth-of-type(2) {
    // grid-column: 6;

    //@include break(sm) {
      //display: none;
    //}
  //}

  // &:nth-of-type(3) {
  //   grid-column: 7;

  //   @include break(sm) {
  //     grid-column: 7;
  //   }
  // }

  // &:nth-of-type(4) {
  //   grid-column: 8;

  //   @include break(sm) {
  //     grid-column: 8;
  //   }
  // }

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