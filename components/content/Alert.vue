<script setup>
defineProps(['type'])
</script>

<template>
  <div :class="`my-alert ` + [type]">
    <font-awesome-icon v-if="type == 'info' || !type" class="my-icon" height="30" width="30" :icon="['fas', 'circle-info']" />
    <slot mdc-unwrap="p" />
  </div>
</template>

<style lang="scss">
.my-icon {
  opacity: 0.5;
}

.my-alert {
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  gap: 10px;
  padding: 20px;
  border-radius: 10px;
  background-color: var(--background-accent);
}

.my-alert > p {
  margin: 0;
}
</style>