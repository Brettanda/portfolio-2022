<template>
  <ClientOnly>
    <template v-if="item.$dirty">
      <div
        class="error"
        v-for="error of item.$errors"
        :key="error.$uid"
      >
        <div>{{ error.$message }}</div>
      </div>
    </template>
  </ClientOnly>
</template>

<script lang="ts">
export default {
  props: {
    item: {
      required: true,
      type: Object
    }
  },
}
</script>

<style lang="scss" scoped>
.error {
  padding: 10px 10px 0 10px;
}
</style>