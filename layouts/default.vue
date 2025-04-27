<template>
  <div class="subcontainer">
    <header class="page_header">
      <div class="subcontainer content-width-container">
        <h1><slot name="header"> Content failed to load </slot></h1>
        <!-- <div>
          <slot tag="time" name="year" :datetime={year} /> 
          <slot name="tech_stack" />
        </div> -->
      </div>
    </header>
    <div class="prose content-width-container">
      <slot name="default">
        <p>Content failed to load</p>
      </slot>
    </div>
  </div>
</template>
