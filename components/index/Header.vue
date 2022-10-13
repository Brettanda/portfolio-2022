<template>
  <header class="header canvas-home">
    <ClientOnly>
      <IndexHeaderCanvas />
    </ClientOnly>
    <div class="text">
      <div>
        <h1 class="slide-left">
          Hi, I'm Brett <br />A Full Stack<br />(Web) Developer
        </h1>
      </div>

      <nav class="anchors slide-right">
        <a href="#industry-projects">Industry Projects</a>
        <a href="#personal-projects">Personal Projects</a>
        <a href="#academic-projects">Academic Projects</a>
      </nav>
    </div>
  </header>
  <div class="knowledge-slider">
    <ul class="knowledge-track">
      <template v-for="i in 4" :key="i">
        <li>HTML</li>
        <li>CSS</li>
        <li>Python</li>
        <li>SCSS</li>
        <li>JavaScript</li>
        <li>VueJS</li>
        <li>NodeJS</li>
        <li>SEO</li>
        <li>jQuery</li>
        <li>Twig</li>
        <li>Laravel Mix</li>
        <li>PHP</li>
        <li>MySQL</li>
        <li>PostgreSQL</li>
      </template>
    </ul>
  </div>
</template>  
  
<style lang="scss" scoped>
.header {
  height: 90vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  max-width: 100%;
  min-width: var(--min-width);
  min-height: 700px;
  max-height: 180vw;
  position: relative;
  // background: var(--background-accent);

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 90vh;
    min-height: 700px;
    max-height: 180vw;
    min-width: var(--min-width);
    background: var(--background-accent);
    transform-origin: top left;
    transform: skewY(-3deg);
    min-width: var(--min-width);
  }

  &::after {
    height: 50%;
  }
}

.text {
  color: var(--text-colour);
  position: relative;
  margin: 0 auto;
  vertical-align: middle;
  max-width: 100%;
  height: max-content;
  display: flex;
  align-items: flex-end;
  z-index: 1;
  min-width: var(--min-width);

  @include break(md) {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  &::before {
    content: "";
    display: block;
    height: 100%;
    width: 100%;
    max-width: 100%;
    position: absolute;
    z-index: -1;
    opacity: 0.7;
    min-width: var(--min-width);
  }

  h1 {
    font-size: 5rem;
    font-weight: bold;
    margin: 0;
    text-transform: uppercase;

    @include break(md) {
      font-size: 4rem;
    }

    @include break(sm) {
      font-size: 3rem;
    }

    @include break(xs) {
      font-size: 2.5rem;
    }
  }

  & > * {
    padding: var(--padding-full);
  }
}
.anchors {
  display: flex;
  flex-direction: column;
  font-size: 1.25rem;
  height: 100%;
  line-height: 2;
  text-align: left;
  justify-content: center;

  @include break(md) {
    text-align: center;
  }
}

a {
  color: inherit;
  font-size: 1.75rem;
}

$item-width: 200px;
$item-count: 14 * 4;

@keyframes scroll {
  0% {
    translate: 0;
  }
  100% {
    translate: calc(-#{$item-width} * (#{$item-count} / 2));
  }
}

.knowledge-slider {
  background: var(--text-colour);
  color: var(--background-colour);
  padding: $padding-full;
  transform: skewY(-3deg) translateY(-100%);
  text-transform: uppercase;
  overflow: hidden;
  position: relative;
  transform-origin: top left;

  ul {
    list-style: none;
    padding-left: 0;
  }

  & > * {
    margin: 0 0.5rem;
  }
}

.knowledge-track {
  animation: scroll #{calc($item-count/1.1)}s linear infinite;
  width: calc($item-width * $item-count);
  display: flex;
  // justify-content: space-around;

  & > * {
    width: $item-width;
    text-align: center;
  }
}

@keyframes slideleft {
  0% {
    transform: translateX(-3rem);
  }
  100% {
    transform: translateX(0);
  }
}
@keyframes slideright {
  0% {
    transform: translateX(3rem);
  }
  100% {
    transform: translateX(0);
  }
}
.slide-left {
  animation: slideleft 1.5s cubic-bezier(0.19, 1, 0.22, 1);
}
.slide-right {
  animation: slideright 1.5s cubic-bezier(0.19, 1, 0.22, 1);
}
</style>