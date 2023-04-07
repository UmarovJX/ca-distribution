<script setup>
import { RouterView, useRoute, useRouter } from 'vue-router'
import { tg } from './main'
import { onMounted, watch } from 'vue'
const route = useRoute()
const router = useRouter()
function setBgColor() {
  if (tg.colorScheme === 'dark') {
    alert('dark')
    alert(tg.headerColor)
    tg.headerColor = 'var(--primary-color)'
  } else {
    alert('light')
    alert(tg.headerColor)

    //document.getElementById('app').style.backgroundColor = 'var(--tg-theme-bg-color)'
    tg.headerColor = 'var(--primary-color)'
  }
}

function setBackBtn() {
  if (route.name === 'home') {
    tg.BackButton.isVisible = false
  } else {
    tg.BackButton.isVisible = true
    tg.BackButton.onClick(() => {
      alert()
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
