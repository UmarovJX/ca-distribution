<script setup>
import { RouterView, useRoute, useRouter } from 'vue-router'
import { tg } from './main'
import { onMounted, watch } from 'vue'
const route = useRoute()
const router = useRouter()
function setBgColor() {
  if (tg.colorScheme === 'dark') {
    document.body.classList.add('dark')

    tg.headerColor = 'var(--tg-theme-bg-color)'
  } else {
    //document.getElementById('app').style.backgroundColor = 'var(--tg-theme-bg-color)'
    tg.headerColor = 'var(--tg-theme-bg-color)'
  }
}

function setBackBtn() {
  if (route.name === 'home') {
    tg.BackButton.isVisible = false
  } else {
    tg.BackButton.isVisible = true
    tg.BackButton.onClick(() => {
      router.go(-1)
    })
  }
}
onMounted(() => setBgColor())
watch(
  () => route.fullPath,
  () => setBackBtn()
)
</script>

<template>
  <router-view v-slot="{ Component }">
    <transition name="fade" mode="out-in">
      <component :is="Component" />
    </transition>
  </router-view>
</template>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.1s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
