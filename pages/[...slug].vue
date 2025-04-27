<template>
  <main class="my-container">
    <Head>
      <Title v-if="data">{{
        data.head && data.head.title ? data.head.title : data.title
      }}</Title>
      <Meta
        v-if="data"
        name="description"
        :content="
          data.head && data.head.description
            ? data.head.description
            : data.description
        "
      />
      <Link
        rel="canonical"
        :href="`https://brettanda.ca${
          route.path.slice(-1, route.path.length) === '/' ? route.path.slice(0, -1) : route.path
        }`"
      />
      <Meta
        name="twitter:image"
        v-if="data.image !== undefined"
        :content="`${appConfig.domain}${data.image}`"
      />
      <Meta
        property="og:image"
        v-if="data.image !== undefined"
        :content="`${appConfig.domain}${data.image}`"
      />
    </Head>
    <NuxtLayout name="default">
      <template #header v-if="data">
        {{ data.title }}
      </template>
      <template #header v-else> Content failed to load </template>
      <!-- <template #year v-if="data">{{ data.year }}</template>
      <template #tech_stack v-if="data">{{ data.tech_stack.join(", ") }}</template> -->
      <ContentRenderer v-if="data" :value="data">
        <template #empty>No content found</template>
        <template #not-found>Document not found</template>
      </ContentRenderer>
    </NuxtLayout>
  </main>
</template>

<script setup>
import { createError } from "h3";
const appConfig = useAppConfig();

const route = useRoute()
// const newPath = path.slice(-1, path.length) === "/" ? path.slice(0, -1) : path;
const { data } = await useAsyncData(`page-${route.path}`, () => {
  return queryCollection('content').path(route.path).first()
});
if (!process.dev && (!data.value || data.value.draft === true)) {
  throw createError({ statusCode: 404, statusMessage: "Page Not Found" });
}
useHead({
  script: [
    {
      type: "application/ld+json",
      children: `{ "@context": "https://schema.org/", "@type": "BreadcrumbList",
      "itemListElement": [{ "@type": "ListItem", "position": 1, "name": "Home",
      "item": "https://brettanda.ca" },{ "@type": "ListItem", "position": 2,
      "name": "${
        data.value.head?.title || data.value.title
      }", "item": "https://brettanda.ca${route.path}"
      }] }`,
    },
  ],
});
definePageMeta({
  layout: false,
});
</script>

<style lang="scss" scoped>
img {
  max-width: 100%;
}
pre {
  max-width: 100%;
  overflow-x: hidden;
}
</style>