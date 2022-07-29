<template>
  <ContentDoc>
    <template v-slot:default="{ doc }">
      <header class="container">
        <div class="subcontainer">
          <h1>{{ doc.title }}</h1>
        </div>
      </header>
      <ContentRenderer :value="doc" class="prose prose-gray" />
    </template>
    <template #empty>
      <header class="container">
        <div class="subcontainer">
          <h1>No content found.</h1>
        </div>
      </header>
      <div class="prose">
        <p>No content found.</p>
      </div>
    </template>
    <template #not-found
      ><header class="container">
        <div class="subcontainer">
          <h1>Document not found</h1>
        </div>
      </header>
      <div class="prose">
        <p>Document not found</p>
      </div>
    </template>
  </ContentDoc>
</template>

<style lang="scss" scoped>
img {
  max-width: 100%;
}
pre {
  max-width: 100%;
  overflow-x: hidden;
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
    // margin: 0 auto;
    // padding: var(--padding-full);
  }

  h1 {
    text-transform: uppercase;
  }

  & + * {
    margin-top: 20rem;
  }
}
</style>