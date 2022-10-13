<template>
  <main class="main">
    <Head>
      <Title>Brett Anda's Portfolio</Title>
      <Meta property="description" content="Welcome to the web developer portfolio of Brett Anda, feel free to click around. The theme of this website was created by me while proudly using VueJS and NuxtJS."/>
    </Head>
    <Script type="application/ld+json">
      { "@context": "https://schema.org/", "@type": "BreadcrumbList",
      "itemListElement": [{ "@type": "ListItem", "position": 1, "name": "Home",
      "item": "https://brettanda.ca" }] }
    </Script>
    <IndexHeader />
    <div class="container">
      <div class="subcontainer">
        <section class="section">
          <h2 id="projects" v-inview>Projects</h2>
          <ul>
            <ContentList path="/projects/">
              <template v-slot="{ list }">
                <IndexProjectCard
                  v-for="p in list"
                  :key="p._path"
                  tag="li"
                  v-bind:item="p"
                />
              </template>
              <template #not-found> <p>No projects found.</p> </template>
            </ContentList>
          </ul>
        </section>
        <section class="container section">
          <h2 id="portfolio-evolution" v-inview>Portfolio Evolution</h2>
          <ul></ul>
        </section>
      </div>
    </div>
  </main>
</template>

<script>
definePageMeta({
  layout: false,
});
</script>

<style lang="scss" scoped>
.section {
  & > ul {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
    width: 100%;
    list-style: none;
    margin: 0;
    padding: 0;

    @include break(md) {
      grid-template-columns: 1fr;
    }
  }
}

h2 {
  text-transform: uppercase;
  text-align: center;
  font-size: 2.5rem;
}
</style>