<script setup>
const props = defineProps(['title', 'hint'])
</script>

<template>
  <div>
    <h1 class="typo700_24 auth_title">
      {{ props.title }}
    </h1>
    <p class="auth_header_hint typo400_14">{{ props.hint }}</p>
  </div>
</template>

<style scoped>
.auth_title {
  text-align: center;
  margin-bottom: 10px;
  color: var(--text-color-main);
}

.auth_header_hint {
  margin-bottom: 40px;
  text-align: center;
  color: var(--placeholder-color);
}
</style>
