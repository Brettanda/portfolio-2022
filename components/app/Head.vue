<template>
  <Head>
    <Html lang="en-CA" />
    <Link rel="home" title="Home" href="/" />
    <Link rel="help" title="About" href="/about-me" />
    <Meta http-equiv="x-ua-compatible" content="ie=edge,chrome=1" />
    <Meta name="viewport" content="width=device-width, initial-scale=1" />
    <Meta name="theme-color" content="#ff381e" />
    <Meta name="msapplication-TileColor" content="#ff381e" />
    <Meta property="og:locale" content="en_CA" />
    <Meta name="format-detection" content="telephone=no" />
    <Meta name="author" content="Brett Anda" />
    <Meta name="twitter:site" content="@brettanda" />
    <Meta property="og:type" content="website" />
    <Meta property="og:site_name" content="Brett Anda's Portfolio" />
    <Meta name="robots" content="max-image-preview:large" />
    <Link
      rel="shortcut icon"
      type="image/x-icon"
      sizes="48x48"
      href="/logo.ico"
    />
    <Link
      rel="icon"
      type="image/png"
      :sizes="x + 'x' + x"
      media="(prefers-color-scheme: light)"
      :href="$img(`/logo-light.png`, { height: x, width: x })"
    />
    <Link
      rel="icon"
      type="image/png"
      :sizes="x + 'x' + x"
      media="(prefers-color-scheme: dark)"
      :href="$img(`/logo.png`, { height: x, width: x })"
    />
  </Head>
</template>

<script setup lang="ts">
const sizes: number[] = [16, 32, 64, 192];
</script>
