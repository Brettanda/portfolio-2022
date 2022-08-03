<template>
  <ClientOnly>
    <template v-if="item.$dirty">
      <div
        class="error"
        v-for="error of item.$errors"
        :key="error.$message"
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
    },
    name: {
      type: String,
      default: "Value"
    }
  },
}
</script>