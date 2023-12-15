<template>
  <AppHead/>
  <Navigation />
  <NuxtLayout>
    <NuxtLoadingIndicator />
    <NuxtPage />
  </NuxtLayout>
  <Footer />
</template>

<script lang="ts" setup>
useHead({
  titleTemplate: (titleChunk) => {
    return titleChunk
      ? titleChunk + " | Brett Anda's Portfolio"
      : "Brett Anda's Portfolio";
  },
  meta: [{"meta":"sitename","content":"Brett Anda's Portfolio"}],
});
</script>