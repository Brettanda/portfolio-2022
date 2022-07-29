<template>
  <footer class="footer container" role="contentinfo">
    <div class="subfooter subcontainer">
      <div class="top">
        <div class="top-left">
          <p>
            Thank you for visiting my website.<br />Stay a while and look
            around.
          </p>
          <a href="https://www.buymeacoffee.com/brettanda"
            ><img
              src="https://img.buymeacoffee.com/button-api/?text=Buy me a pizza&emoji=🍕&slug=brettanda&button_colour=FFDD00&font_colour=000000&font_family=Poppins&outline_colour=000000&coffee_colour=ffffff"
              loading="lazy"
          /></a>
        </div>
        <ul class="top-right">
          <li>
            <NuxtLink
              class="fab"
              target="_blank"
              to="https://github.com/Brettanda?utm_source=brettanda.ca"
              ><font-awesome-icon :icon="['fab', 'github']"
            /></NuxtLink>
          </li>
          <li>
            <NuxtLink
              class="fab"
              target="_blank"
              to="https://www.linkedin.com/in/brett-anda?utm_source=brettanda.ca"
              ><font-awesome-icon :icon="['fab', 'linkedin']"
            /></NuxtLink>
          </li>
          <li>
            <NuxtLink
              class="fab"
              target="_blank"
              to="https://codepen.io/brettanda?utm_source=brettanda.ca"
              ><font-awesome-icon :icon="['fab', 'codepen']"
            /></NuxtLink>
          </li>
        </ul>
      </div>
      <div class="bottom">
        <p>2022 &copy; Brett Anda. All Rights Reserved.</p>
      </div>
    </div>
  </footer>
</template>

<style lang="scss" scoped>
.footer {
  background-color: var(--background-accent-two);
  color: var(--colour-light);
  padding: var(--padding-full);
  margin-top: 4rem;
  overflow-x: hidden;
}

.fab {
  height: 30px;
  width: 30px;
  display: inline-block;
  color: var(--colour-light);
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
  border-top: 1px solid var(--colour-light);
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
  margin: 2rem -1rem 0 -1rem;

  & > * {
    padding: 0 var(--padding-half);
  }
}
</style>