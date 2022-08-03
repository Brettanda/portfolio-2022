<template>
  <div class="subcontainer">
    <header class="page_header container">
      <div class="subcontainer">
        <h1><slot name="header"> Content failed to load </slot></h1>
      </div>
    </header>
    <div class="prose">
      <slot name="default">
        <p>Content failed to load</p>
      </slot>
    </div>
  </div>
</template>
