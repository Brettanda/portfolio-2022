<template>
  <Head>
    <Title>Contact Me</Title>
  </Head>
  <main>
    <header class="container">
      <div class="subcontainer">
        <h1>Contact Me</h1>
      </div>
    </header>
    <div>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis
        voluptas esse quasi nulla praesentium minima eligendi tempora fugiat vel
        velit, animi harum vitae. Porro sed numquam necessitatibus. Odit, ipsa
        soluta.
      </p>
    </div>
  </main>
</template>

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
</style>