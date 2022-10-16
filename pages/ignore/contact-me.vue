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
    <NuxtLayout name="default">
      <template #header>Contact Me</template>
      <template #default>
        <!-- <p v-if="formResponseMessage" v-text="formResponseMessage"></p> -->
        <!-- v-else -->
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
          <!-- <form v-bind:class="'form'" @submit.prevent="sendMessage">
            <div class="form__section">
              <label for="firstname" class="sr-only">First name</label>
              <input
                v-model="firstname"
                aria-label="First name"
                autocomplete="given-name"
                autocapitalize="sentences"
                type="text"
                id="firstname"
                name="firstname"
                @blur="v$.firstname.$touch"
                maxlength="50"
                placeholder="First name"
                required
                autofocus
              />
              <ContactValidation :item="v$.firstname" />
            </div>
            <div class="form__section">
              <label for="lastname" class="sr-only">Last name</label>
              <input
                v-model="lastname"
                aria-label="Last name"
                autocomplete="family-name"
                autocapitalize="sentences"
                type="text"
                id="lastname"
                maxlength="50"
                name="lastname"
                @blur="v$.lastname.$touch"
                placeholder="Last name"
                required
              />
              <ContactValidation :item="v$.lastname" />
            </div>
            <div class="form__section">
              <label for="email" class="sr-only">Email</label>
              <input
                v-model="email"
                aria-label="Email"
                autocomplete="email"
                autocapitalize="sentences"
                name="email"
                id="email"
                type="email"
                v-bind:pattern="'^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$'"
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
                aria-label="Website"
                autocomplete="url"
                autocapitalize="off"
                id="website"
                name="website"
                type="url"
                v-bind:pattern="'[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)'"
                @blur="v$.website.$touch"
                placeholder="Website"
              />
              <ContactValidation :item="v$.website" />
            </div>
            <div class="form__section form__section--full">
              <label for="message" class="sr-only">Message</label>
              <textarea
                v-model="message"
                aria-label="Your message"
                autocomplete="off"
                autocapitalize="sentences"
                placeholder="Your message here"
                id="message"
                @blur="v$.message.$touch"
                columns="10"
                name="message"
              ></textarea>
              <ContactValidation :item="v$.message" />
            </div>
            <div class="form__section form__section--full">
              <Turnstile
                v-model="token"
                v-bind:options="{ theme: $colorMode.value }"
              />
            </div>
            <div
              v-if="formError"
              class="form__section form__section--full error"
            >
              {{ formError }}
            </div>
            <div class="form__section form__section--submit">
              :disabled="formPosting || token == '' || !captchaLoaded"
              <button :disabled="v$.$invalid" type="submit" class="submit">
                Send Message
              </button>
            </div>
          </form> -->
        </div>
      </template>
    </NuxtLayout>
  </main>
</template>

<script lang="ts">
// import useVuelidate from "@vuelidate/core";
// import { required, email, url, maxLength } from "@vuelidate/validators";

export default {
  setup() {
    const config = useRuntimeConfig();
    definePageMeta({
      layout: false,
    });
    useHead({
      script: [
        {
          type: "application/ld+json",
          children: `{ "@context": "https://schema.org/", "@type": "BreadcrumbList",
      "itemListElement": [{ "@type": "ListItem", "position": 1, "name": "Home",
      "item": "https://brettanda.ca" },{ "@type": "ListItem", "position": 2,
      "name": "Contact me", "item": "https://brettanda.ca/contact-me" }] }`,
        },
      ],
    });
    return {
      // v$: useVuelidate(),
      config,
    };
  },
  data: () => ({
    // success: false,
    // token: "",
    // captchaLoaded: false,
    // formResponseMessage: "",
    // formError: "",
    // formPosting: false,
    // firstname: "",
    // lastname: "",
    // email: "",
    // website: "",
    // message: "",
  }),
  // validations() {
  //   return {
  //     firstname: { required, maxLength: maxLength(50) },
  //     lastname: { required, maxLength: maxLength(50) },
  //     email: { required, email },
  //     website: { url },
  //     message: { required, maxLength: maxLength(2000) },
  //   };
  // },
  // methods: {
  //   // loaded() {
  //   //   this.captchaLoaded = true;
  //   // },
  //   // verified(token: string) {
  //   //   this.token = token;
  //   // },
  //   // expired() {
  //   //   this.token = "";
  //   // },
  //   // error() {
  //   //   this.token = "";
  //   // },
  //   async sendMessage() {
  //     const isFormCorrect = await this.v$.$validate();
  //     if (!isFormCorrect) return;
  //     if (this.token == "") return;

  //     console.log("Sending message...");
  //     this.formPosting = true;
  //     const { statusCode, statusMessage } = await $fetch("/api/contact", {
  //       method: "POST",
  //       body: JSON.stringify({
  //         token: this.token,
  //         firstname: this.firstname,
  //         lastname: this.lastname,
  //         email: this.email,
  //         website: this.website,
  //         message: this.message,
  //       }),
  //     });
  //     this.formPosting = false;
  //     if (statusCode !== 200) {
  //       console.error(`${statusCode} ${statusMessage}`);
  //       this.formError = statusMessage;
  //     } else {
  //       console.log(statusCode, statusMessage);
  //       this.formResponseMessage = statusMessage;
  //       // this.$refs.captcha.reset();
  //       // this.token = "";
  //     }
  //   },
  // },
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