<template>
  <footer
    class="footer container"
    itemscope
    itemtype="https://schema.org/Person"
  >
    <div class="subfooter subcontainer">
      <div class="top">
        <div class="top-left">
          <p>
            Thank you for visiting my website.<br />Stay a while and look
            around.
          </p>
          <NuxtLink
            href="https://www.buymeacoffee.com/brettanda"
            target="_blank"
            aria-label="Brett Anda's Buy Me A Coffee profile"
            ><img
              src="https://img.buymeacoffee.com/button-api/?text=Buy me a pizza&emoji=🍕&slug=brettanda&button_colour=FFDD00&font_colour=000000&font_family=Poppins&outline_colour=000000&coffee_colour=ffffff"
              loading="lazy"
              alt="Buy Me A Coffee Call To Action"
          /></NuxtLink>
        </div>
        <ul class="top-right">
          <li>
            <NuxtLink
              class="fab"
              target="_blank"
              to="https://github.com/Brettanda?utm_source=brettanda.ca"
              aria-label="Brett Anda's Github profile"
              itemprop="sameAs"
              ><font-awesome-icon
                height="30"
                width="30"
                :icon="['fab', 'github']"
            /></NuxtLink>
          </li>
          <li>
            <NuxtLink
              class="fab"
              target="_blank"
              to="https://facebook.com/brett.anda?utm_source=brettanda.ca"
              aria-label="Brett Anda's Facebook profile"
              itemprop="sameAs"
              ><font-awesome-icon
                height="30"
                width="30"
                :icon="['fab', 'facebook']"
            /></NuxtLink>
          </li>
          <li>
            <NuxtLink
              class="fab"
              target="_blank"
              to="https://www.linkedin.com/in/brett-anda?utm_source=brettanda.ca"
              aria-label="Brett Anda's LinkedIn profile"
              itemprop="sameAs"
              ><font-awesome-icon
                height="30"
                width="30"
                :icon="['fab', 'linkedin']"
            /></NuxtLink>
          </li>
          <li>
            <NuxtLink
              class="fab"
              target="_blank"
              to="https://codepen.io/brettanda?utm_source=brettanda.ca"
              aria-label="Brett Anda's CodePen profile"
              itemprop="sameAs"
              ><font-awesome-icon
                height="30"
                width="30"
                :icon="['fab', 'codepen']"
            /></NuxtLink>
          </li>
          <li>
            <NuxtLink
              class="fab"
              target="_blank"
              to="https://dev.to/brettanda?utm_source=brettanda.ca"
              aria-label="Brett Anda's Dev.to profile"
              itemprop="sameAs"
              ><font-awesome-icon height="30" width="30" :icon="['fab', 'dev']"
            /></NuxtLink>
          </li>
        </ul>
      </div>
      <div class="bottom">
        <p>
          2022 &copy;
          <span itemprop="name" itemid="#brettanda">Brett Anda</span>. All
          Rights Reserved.
        </p>
      </div>
    </div>
  </footer>
</template>

<script lang="ts" setup>
useHead({
  script: [
    {
      type: "application/ld+json",
      children: `{ "@context": "https://schema.org", "@type": "WebSite", "name": "Brett
      Anda's Portfolio", "image": "https://brettanda.ca/logo_full.png",
      "author": { "@type": "Person", "@id": "#brettanda" }, "url":
      "https://brettanda.ca" }`,
    },
    {
      type: "application/ld+json",
      children: `{ "@context": "https://schema.org", "@type": "Person", "@id":
      "#brettanda", "name": "Brett Anda", "url": "https://brettanda.ca",
      "image": "https://brettanda.ca/portrait.jpg","jobTitle": "Full Stack Web
      Developer", "owns": [ "Developer Bacon", "Friday Bot" ], "alumniOf": {
      "@type": "CollegeOrUniversity", "name": "Southern Alberta Institute of
      Technology", "url": "https://www.sait.ca", "sameAs":
      "https://en.wikipedia.org/wiki/Southern_Alberta_Institute_of_Technology"
      }, "sameAs": [ "https://twitter.com/brettanda",
      "https://linkedin.com/in/brett-anda", "https://medium.com/@brettanda",
      "https://keybase.io/brett_anda" ] }`,
    },
  ],
});
</script>

<style lang="scss" scoped>
.footer {
  background-color: var(--background-secondary);
  color: var(--text-colour);
  padding: var(--padding-full);
  margin-top: auto;
  margin-bottom: 0;
  overflow-x: hidden;
}

.fab {
  height: 30px;
  width: 30px;
  display: inline-block;
  color: var(--text-colour);
  transition: color 0.2s ease-in-out;

  &:hover,
  &:focus {
    color: var(--colour-3);
  }
}
.subfooter {
  display: flex;
  flex-direction: column;
}
.top {
  display: flex;
  justify-content: space-between;
  vertical-align: bottom;
  flex-flow: row wrap;
}
.bottom {
  border-top: 1px solid var(--text-colour);
  padding-top: var(--padding-full);
  margin-top: var(--padding-full);
}
.top-left {
  & > * {
    padding: 1rem 0;
  }
}
.top-right {
  margin-bottom: 0;
  padding-left: 0;
  display: flex;
  list-style: none;
  align-items: flex-end;
  justify-content: space-between;
  margin: 2rem 0 0 0;

  & > * {
    padding: 0 var(--padding-half);
  }
}
</style>