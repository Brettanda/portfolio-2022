<template>
  <Head>
    <Html lang="en" />
    <Link rel="preconnect" href="https://fonts.googleapis.com" />
    <Link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="" />
    <Link
      href="https://fonts.googleapis.com/css2?family=Bai+Jamjuree:wght@500;700&display=swap"
      rel="stylesheet"
    />
    <Link rel="home" title="Home" href="/" />
    <Link rel="help" title="About" href="/about-me" />
    <Meta http-equiv="x-ua-compatible" content="ie=edge,chrome=1" />
    <Meta name="viewport" content="width=device-width, initial-scale=1" />
    <Meta name="theme-color" content="#ff381e" />
    <Meta name="msapplication-TileColor" content="#ff381e" />
    <Meta property="og:locale" content="en_US" />
    <Meta name="format-detection" content="telephone=no" />
    <Meta name="author" content="Brett Anda" />
    <Meta name="twitter:site" content="@brettanda" />
    <Meta property="og:type" content="website" />
    <Meta property="og:site_name" content="Brett Anda's Portfolio" />
    <Meta name="robots" content="max-image-preview:large"/>
    <Meta
      property="og:keywords"
      content="Brett, Anda, Web, Website, Developer, Calgary, Alberta, Canada, Portfolio, Grav"
    />
    <Link
      rel="shortcut icon"
      type="image/x-icon"
      sizes="48x48"
      href="/logo.ico"
    />
    <Link rel="shortlink" href="https://brettanda.ca/" />
    <Link
      rel="apple-touch-icon"
      type="image/png"
      sizes="120x120"
      href="https://brettanda.ca/apple_touch.png"
    />
    <Meta
      name="msapplication-TileImage"
      content="https://brettanda.ca/apple_touch.png"
    />
    <Meta name="twitter:image" content="https://brettanda.ca/og_image.jpg" />
    <Meta property="og:image" content="https://brettanda.ca/og_image.jpg" />
    <template v-if="$colorMode.preference == 'dark'">
      <Link
        v-for="x in sizes"
        :key="x"
        rel="icon"
        type="image/png"
        :sizes="x + 'x' + x"
        :href="$img(`/logo-light.png`, { height: x, width: x })"
      />
    </template>
    <template v-else>
      <Link
        v-for="x in sizes"
        :key="x"
        rel="icon"
        type="image/png"
        :sizes="x + 'x' + x"
        :href="$img(`/logo.png`, { height: x, width: x })"
      />
    </template>
  </Head>
</template>

<script lang="ts">
export default {
  data() {
    return {
      sizes: [16, 32, 64, 192],
    };
  },
};
</script>