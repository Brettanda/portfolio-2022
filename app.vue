<template>
  <Head>
    <Html lang="en" />
    <Link rel="preconnect" href="https://fonts.googleapis.com" />
    <Link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="" />
    <Link
      href="https://fonts.googleapis.com/css2?family=Bai+Jamjuree:wght@500;700&family=Fira+Code&display=swap"
      rel="stylesheet"
    />
    <Meta charset="utf-8" />
    <Meta name="viewport" content="width=device-width, initial-scale=1" />
    <Meta name="theme-color" content="#fff" />
    <Meta name="format-detection" content="telephone=no" />
    <Meta hid="og:type" property="og:type" content="website" />
    <Meta name="author" content="Brett Anda" />
    <template v-for="t in types" :key="t">
      <Link
        v-for="x in sizes"
        :key="x"
        rel="icon"
        :type="'image/' + t[0]"
        :sizes="x + 'x' + x"
        :href="'/logo_' + x + '.' + t[1]"
      />
    </template>
  </Head>
  <Navigation />
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
  <Footer />
</template>

<script lang="ts">
export default {
  data() {
    return {
      sizes: [16, 32, 64, 192],
      types: [
        ["png", "png"],
        ["x-icon", "ico"],
      ],
    };
  },
};
</script>