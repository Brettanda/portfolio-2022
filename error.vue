<template>
  <AppHead />
  <Navigation />
  <main class="main container">
    <Head>
      <Title>Error {{ error.statusCode }} - {{ error.statusMessage }}</Title>
      <Meta name="robots" content="noindex" />
    </Head>
    <div class="subcontainer">
      <header class="page_header container">
        <div class="subcontainer content-width-container">
          <h1>Error {{ error.statusCode }} - {{ error.statusMessage }}</h1>
        </div>
      </header>
      <div class="prose content-width-container">
        <p>{{ error.message }}</p>
        <p>
          <a @click="handleError" style="--link-colour: var(--colour-3)"
            >Go home</a
          >
        </p>
      </div>
    </div>
  </main>
  <Footer />
</template>

<script setup>
definePageMeta({
  layout: "default",
});
const props = defineProps({
  error: Object,
});

const handleError = () => clearError({ redirect: "/" });
</script>
