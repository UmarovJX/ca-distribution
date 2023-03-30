<script setup></script>

<template>
  <div class="scroll-container">
    <slot></slot>
  </div>
</template>

<style>
.scroll-container{
    overflow-x: scroll;
    width: 100%;
    padding-left: 20px;
    display: flex;
    
}
</style>
