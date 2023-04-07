<script setup>
import { RouterView, useRoute, useRouter } from 'vue-router'
import { tg } from './main'
import { onMounted, watch } from 'vue'
const route = useRoute()
const router = useRouter()
function setBgColor() {
  if (tg.colorScheme === 'dark') {
    //document.getElementById('app').style.backgroundColor = 'var(--tg-theme-bg-color)'
    tg.headerColor = 'red'
  } else {
    //document.getElementById('app').style.backgroundColor = 'var(--tg-theme-bg-color)'
    tg.headerColor = 'blue'
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
alert(tg.themeParams.bgColor)
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
