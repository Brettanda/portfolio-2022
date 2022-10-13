<template>
  <code><slot /></code>
</template>

<style lang="scss" scoped>
code {
  background: var(--text-colour);
  color: var(--background-secondary);
  padding: 1px 2px;
  border-radius: calc($border-radius / 2);
}
</style>