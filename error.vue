<template>
  <AppHead />
  <Navigation />
  <main class="main container">
    <Head>
      <Title>{{ error.statusCode }} - {{ error.message }}</Title>
      <Meta name="robots" content="noindex" />
    </Head>
    <div class="subcontainer">
      <header class="page_header container">
        <div class="subcontainer">
          <h1>{{ error.statusCode }} - {{ error.message }}</h1>
        </div>
      </header>
      <div class="prose">
        <p>{{ error.message }}</p>
      </div>
    </div>
    <button @click="handleError">Go home</button>
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
