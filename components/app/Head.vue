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
      v-if="$colorMode.value == 'dark' && !$colorMode.unknown"
      type="image/svg+xml"
      media="(prefers-color-scheme: dark)"
      href="/logo-light.svg"
    />
    <Link
      rel="icon"
      v-else
      type="image/svg+xml"
      media="(prefers-color-scheme: light),(prefers-color-scheme: no-prefrence)"
      href="/logo-dark.svg"
    />
  </Head>
</template>