<template>
  <main class="container">
    <Head>
      <Title>Contact Me</Title>
      <Meta hid="og:type" property="og:type" content="website" />
      <Meta
        property="og:description"
        content="Contact me here for anything that I could help you with or if you just want to expand your social network."
      />
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
        <p v-if="formResponseMessage" v-text="formResponseMessage"></p>
        <div v-else>
          <p>
            Have anything that you would like to talk about? This is the best
            place to do it!
          </p>
          <noscript class="error">
            Please enable JavaScript to use this form.
          </noscript>
          <form v-bind:class="'form'" v-on:submit.prevent="sendMessage">
            <div class="form__section">
              <label for="first" class="sr-only">First name</label>
              <input
                v-model="first"
                type="text"
                id="first"
                name="first"
                @blur="v$.first.$touch"
                maxlength="50"
                placeholder="First name"
                required
              />
              <ContactValidation :item="v$.first" />
            </div>
            <div class="form__section">
              <label for="last" class="sr-only">Last name</label>
              <input
                v-model="last"
                type="text"
                id="last"
                maxlength="50"
                name="last"
                @blur="v$.last.$touch"
                placeholder="Last name"
                required
              />
              <ContactValidation :item="v$.last" />
            </div>
            <div class="form__section">
              <label for="email" class="sr-only">Email</label>
              <input
                v-model="email"
                name="email"
                id="email"
                type="email"
                @blur="v$.email.$touch"
                placeholder="Email"
                required
              />
              <ContactValidation :item="v$.email" />
            </div>
            <div class="form__section">
              <label for="website" class="sr-only">Website</label>
              <input
                v-model="website"
                id="website"
                name="website"
                type="url"
                @blur="v$.website.$touch"
                placeholder="Website"
              />
              <ContactValidation :item="v$.website" />
            </div>
            <div class="form__section form__section--full">
              <label for="message" class="sr-only">Message</label>
              <textarea
                v-model="message"
                placeholder="Your message here"
                id="message"
                @blur="v$.message.$touch"
                name="message"
              ></textarea>
              <ContactValidation :item="v$.message" />
            </div>
            <div class="form__section form__section--full">
              <vue-recaptcha
                :sitekey="config.public.captchaSiteKey"
                @verify="verified"
                @expired="expired"
                @error="error"
                @render="loaded"
                ref="captcha"
              />
            </div>
            <div
              v-if="formError"
              class="form__section form__section--full error"
            >
              {{ formError }}
            </div>
            <div class="form__section form__section--submit">
              <button
                :disabled="formPosting || token == '' || !captchaLoaded"
                class="submit"
              >
                Send Message
              </button>
            </div>
          </form>
        </div>
      </template>
    </NuxtLayout>
  </main>
</template>

<script lang="ts">
import useVuelidate from "@vuelidate/core";
import { required, email, url, maxLength } from "@vuelidate/validators";

export default {
  setup() {
    const config = useRuntimeConfig();
    definePageMeta({
      layout: false,
    });
    return { v$: useVuelidate(), config };
  },
  data() {
    return {
      success: false,
      token: "",
      captchaLoaded: false,
      formResponseMessage: "",
      formError: "",
      formPosting: false,
      first: "",
      last: "",
      email: "",
      website: "",
      message: "",
    };
  },
  validations() {
    return {
      first: { required, maxLength: maxLength(50) },
      last: { required, maxLength: maxLength(50) },
      email: { required, email },
      website: { url },
      message: { required, maxLength: maxLength(2000) },
    };
  },
  methods: {
    loaded() {
      this.captchaLoaded = true;
    },
    verified(token: string) {
      this.token = token;
    },
    expired() {
      this.token = "";
    },
    error() {
      this.token = "";
    },
    async sendMessage() {
      const isFormCorrect = await this.v$.$validate();
      if (!isFormCorrect) return;

      console.log("Sending message...");
      this.formPosting = true;
      const { statusCode, statusMessage } = await $fetch("/api/contact", {
        method: "POST",
        body: JSON.stringify({
          token: this.token,
          first: this.first,
          last: this.last,
          email: this.email,
          website: this.website,
          message: this.message,
        }),
      });
      this.formPosting = false;
      if (statusCode !== 200) {
        console.error(`${statusCode} ${statusMessage}`);
        this.formError = statusMessage;
      } else {
        console.log(statusCode, statusMessage);
        this.formResponseMessage = statusMessage;
        this.$refs.captcha.reset();
        this.token = "";
      }
    },
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

  &:disabled {
    cursor: not-allowed;
  }
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