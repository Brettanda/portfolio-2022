<template>
  <main class="container">
    <Head>
      <Title>Contact Me</Title>
      <Meta hid="og:type" property="og:type" content="website" />
      <Meta
        name="description"
        content="Contact me here for anything that I could help you with or if you just want to expand your social network."
      />
      <Link rel="canonical" href="https://brettanda.ca/contact-me" />
    </Head>
    <Script type="application/ld+json">
      { "@context": "https://schema.org/", "@type": "BreadcrumbList",
      "itemListElement": [{ "@type": "ListItem", "position": 1, "name": "Home",
      "item": "https://brettanda.ca" },{ "@type": "ListItem", "position": 2,
      "name": "Contact me", "item": "https://brettanda.ca/contact-me" }] }
    </Script>
    <NuxtLayout name="default">
      <template #header>Contact Me</template>
      <template #default>
        <div>
          <p>
            Have anything that you would like to talk about? This is the best
            place to do it!
          </p>
          <noscript class="error">
            Please enable JavaScript to use this form.
          </noscript>
          <h2>Contact Form Coming Soon</h2>
          <p>For now, please contact me on another platform :)</p>
        </div>
      </template>
    </NuxtLayout>
  </main>
</template>

<script lang="ts">
export default {
  setup() {
    const config = useRuntimeConfig();
    definePageMeta({
      layout: false,
    });
    return {
      config,
    };
  },
};
</script>

<style lang="scss" scoped>
main {
  width: 100%;
  margin-bottom: auto;
}
header {
  background-color: var(--background-accent);
  height: 20rem;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;

  & > div {
    max-width: var(--max-width);
    width: 100%;
  }

  h1 {
    text-transform: uppercase;
  }

  & + * {
    margin-top: 20rem;
  }
}
.form {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;

  &:invalid .submit {
    cursor: not-allowed;
    opacity: 0.5;
  }

  @include break(sm) {
    grid-template-columns: 1fr;
  }
}

.form__section {
  width: 100%;

  & > input,
  & > textarea {
    width: 100%;
  }
}

.form__section--full {
  grid-column: 1 / -1;
}

.form__section--submit {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

input,
textarea,
button {
  padding: 0.5rem;
  color: var(--text-colour);
  background: var(--background-colour);
  border-radius: $border-radius;

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }

  // &:invalid:not(:placeholder-shown) {
  //   border-color: red;
  // }

  // &:placeholder-shown {
  //   border-color: inherit;
  // }
}

input,
textarea,
button {
  border: 1px solid var(--text-colour);
}

button {
  cursor: pointer;

  &:active {
    background: var(--background-accent);
  }
}

// .submit {}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}
</style>