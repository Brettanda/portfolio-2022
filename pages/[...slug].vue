<template>
  <main class="container">
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
    </Head>
    <NuxtLayout name="default">
      <template #header v-if="data">
        {{ data.title }}
      </template>
      <template #header v-else> Content failed to load </template>
      <ContentRenderer v-if="data" :value="data">
        <template #empty>No content found</template>
        <template #not-found>Document not found</template>
      </ContentRenderer>
    </NuxtLayout>
  </main>
</template>

<script setup>
import { createError } from "h3";

const { path } = useRoute();
const { data } = await useAsyncData(`page-${path}`, () =>
  queryContent().where({ _path: path }).findOne()
);
if (!data.value) {
  throw createError({ statusCode: 404, statusMessage: "Page Not Found" });
}
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