<template>
  <main class="main">
    <Head>
      <Meta
        name="description"
        content="Welcome to the web developer portfolio of Brett Anda, feel free to click around. The theme of this website was created by me while proudly using VueJS and NuxtJS."
      />
      <Link rel="canonical" href="https://brettanda.ca" />
      <Link
        rel="apple-touch-icon"
        type="image/png"
        sizes="120x120"
        :href="`${appConfig.domain}/apple_touch.png`"
      />
      <Meta
        name="msapplication-TileImage"
        :content="`${appConfig.domain}/apple_touch.png`"
      />
      <Meta
        name="twitter:image"
        :content="`${appConfig.domain}/og_image.jpg`"
      />
      <Meta property="og:image" :content="`${appConfig.domain}/og_image.jpg`" />
      <Meta
        property="og:keywords"
        content="Brett, Anda, Web, Website, Developer, Calgary, Alberta, Canada, Portfolio, NuxtJS"
      />
    </Head>
    <!-- <Teleport to="body"> -->
      <ClientOnly>
        <!-- <IndexHeaderCanvasThree /> -->
        <IndexHeaderCanvas />
      </ClientOnly>
    <!-- </Teleport> -->
    <IndexHeader />
    <div class="my-container">
      <div class="subcontainer">
        <section class="section spacer">
          <div class="section">
            <h2 id="industry-projects" v-inview>Industry Projects</h2>
            <p class="content" v-inview>
              The projects that I worked on, or created in the web development
              industry.
            </p>
          </div>
          <ul class="my-container">
            <ContentNavigation v-slot="{ navigation }" :query="industry">
              <template v-for="p of navigation[0].children.reverse()" :key="p._path">
                <IndexProjectCard tag="li" v-bind:item="p" v-inview/>
              </template>
            </ContentNavigation>
          </ul>
        </section>
        <section class="section spacer">
          <div class="section">
            <h2 id="personal-projects" v-inview>Personal Projects</h2>
            <p class="content" v-inview>
              All of these projects i created on my own time for myself to learn
              more about what is possible with web development or coding in
              general
            </p>
          </div>
          <ul>
            <ContentNavigation v-slot="{ navigation }" :query="personal">
              <template v-for="p of navigation[0].children" :key="p._path">
                <IndexProjectCard tag="li" v-bind:item="p" v-inview/>
              </template>
            </ContentNavigation>
          </ul>
        </section>
        <section class="section spacer">
          <div class="section">
            <h2 id="academic-projects" v-inview>Academic Projects</h2>
            <p class="content" v-inview>
              Projects that were created for assignments for my post-secondary
              schooling.
            </p>
          </div>
          <ul>
            <ContentNavigation v-slot="{ navigation }" :query="educational">
              <template v-for="p of navigation[0].children" :key="p._path">
                <IndexProjectCard tag="li" v-bind:item="p" v-inview/>
              </template>
            </ContentNavigation>
          </ul>
        </section>
        <!-- <section class="container section"> -->
        <!-- <h2 id="portfolio-evolution" v-inview>Portfolio Evolution</h2>
          <ul></ul> -->
        <!-- </section> -->
      </div>
    </div>
  </main>
</template>

<script setup>
const appConfig = useAppConfig();
const industry = {
  where: [{ _path: /^\/projects/ }, { category: "Work" }],
};
const personal = {
  where: [
    { _path: { $contains: "/projects" } },
  {category: "Personal"}
  ]
};
const educational = {
  where: [
    {_path: { $contains: "/projects" }},
    {category: "School"},
  ]
};
definePageMeta({
  layout: false,
});
useHead({
  script: [
    {
      type: "application/ld+json",
      children: `{ "@context": "https://schema.org/", "@type": "BreadcrumbList",
      "itemListElement": [{ "@type": "ListItem", "position": 1, "name": "Home",
      "item": "https://brettanda.ca" }] }`,
    },
  ],
});
</script>

<style lang="scss" scoped>
.section {
  margin-bottom: 6rem;

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
  // font-size: 2.5rem;
  margin-right: auto;
  margin-left: auto;
}

.content {
  text-align: center;
}
</style>