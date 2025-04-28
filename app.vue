<template>
  <AppHead/>
  <Navigation />
  <SpeedInsights/>
  <NuxtLayout>
    <NuxtLoadingIndicator />
    <NuxtPage />
  </NuxtLayout>
  <Footer />
</template>

<script lang="ts" setup>
import { SpeedInsights } from "@vercel/speed-insights/nuxt";
useHead({
  titleTemplate: (titleChunk) => {
    return titleChunk
      ? titleChunk + " | Brett Anda's Portfolio"
      : "Brett Anda's Portfolio";
  },
});
</script>