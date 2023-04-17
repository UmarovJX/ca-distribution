<script setup></script>

<template>
  <header>
    <slot></slot>
  </header>
</template>

<style scoped>
header {
  width: 100%;
  background: linear-gradient(180deg, #00D1D1 0%, #0181FA 100%);
  -webkit-border-bottom-right-radius: 20px;
  -webkit-border-bottom-left-radius: 20px;
  -moz-border-radius-bottomright: 20px;
  -moz-border-radius-bottomleft: 20px;
  border-bottom-right-radius: 20px;
  border-bottom-left-radius: 20px;
  padding: 20px;
}
</style>
