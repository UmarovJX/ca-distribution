<script setup>
import { useRouter, useRoute } from 'vue-router'
import { useScanner } from '../composables/qRCodeScanner'
import { computed } from 'vue'
import { tg } from '../main'
const router = useRouter()
const route = useRoute()
function goTo(name) {
  router.push({ name })
}

const { isProcessingCode, processCode, codeResult } = useScanner()

const isCoursePath = computed(() => {
  if (route.path === '/') return true
  if (route.path.split('/')[1] === 'course') return true
  return false
})

const isRatingPath = computed(() => {
  if (route.path.split('/')[1] === 'wallet') return true
  return false
})

const qrCodehandler = (data) => {
  if (!isProcessingCode.value) {
    isProcessingCode.value = true
    processCode(data)
      .then((data) => {
        codeResult.value = { myRes: 'success', ...data }
      })
      .catch((data) => {
        codeResult.value = { myRes: 'error', ...data }
      })
      .finally(() => {
        isProcessingCode.value = false
        tg.closeScanQrPopup()
        tg.showAlert(JSON.stringify(codeResult.value.myRes))
      })
  }
}
const openScanner = () => {
  tg.showScanQrPopup({}, qrCodehandler)
}
</script>

<template>
  <div class="footer-placeholder"></div>
  <footer class="footer">
    <div @click="goTo('home')">
      <svg
        :class="isCoursePath ? 'active' : ''"
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
      >
        <path
          d="M2 16.1436V4.9978C2 3.89963 2.8863 3.00752 3.9824 3.07489C4.95877 3.1349 6.11349 3.25351 7 3.48744C8.04921 3.76431 9.29611 4.35401 10.2823 4.87546C10.5893 5.03782 10.9158 5.15044 11.25 5.21394L11.25 20.3926C10.9471 20.3258 10.6515 20.218 10.3724 20.0692C9.37293 19.5365 8.08145 18.9187 7 18.6334C6.12329 18.402 4.98428 18.2835 4.01486 18.2228C2.90605 18.1535 2 17.2546 2 16.1436Z"
          fill=""
        />
        <path
          d="M12.75 20.3926C13.0529 20.3258 13.3485 20.218 13.6276 20.0692C14.6271 19.5365 15.9185 18.9187 17 18.6334C17.8767 18.402 19.0157 18.2835 19.9851 18.2228C21.094 18.1535 22 17.2546 22 16.1436V4.93319C22 3.86075 21.1538 2.98041 20.082 3.01775C18.9534 3.05706 17.5469 3.17403 16.5 3.48744C15.5924 3.75916 14.5353 4.30418 13.6738 4.80275C13.3824 4.97145 13.0708 5.09535 12.75 5.17391L12.75 20.3926Z"
          fill=""
        />
      </svg>
      <p>{{ $t('study') }}</p>
    </div>

    <div @click="openScanner">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
      >
        <path
          d="M10 22C6.22876 22 4.34315 22 3.17157 20.8284C2 19.6569 2 18.7712 2 15"
          stroke="#7061E1"
          stroke-width="1.5"
          stroke-linecap="round"
        />
        <path
          d="M22 15C22 18.7712 22 19.6569 20.8284 20.8284C19.6569 22 17.7712 22 14 22"
          stroke="#7061E1"
          stroke-width="1.5"
          stroke-linecap="round"
        />
        <path
          d="M14 2C17.7712 2 19.6569 2 20.8284 3.17157C22 4.34315 22 5.22876 22 9"
          stroke="#7061E1"
          stroke-width="1.5"
          stroke-linecap="round"
        />
        <path
          d="M10 2C6.22876 2 4.34315 2 3.17157 3.17157C2 4.34315 2 5.22876 2 9"
          stroke="#7061E1"
          stroke-width="1.5"
          stroke-linecap="round"
        />
        <path d="M2 12H22" stroke="#7061E1" stroke-width="1.5" stroke-linecap="round" />
      </svg>
      <p>{{ $t('scanner') }}</p>
    </div>
    <div @click="goTo('wallethome')">
      <svg
        :class="isRatingPath ? 'active' : ''"
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
      >
        <path
          d="M2 12C2 7.28595 2 4.92893 3.46447 3.46447C4.92893 2 7.28595 2 12 2C16.714 2 19.0711 2 20.5355 3.46447C22 4.92893 22 7.28595 22 12C22 16.714 22 19.0711 20.5355 20.5355C19.0711 22 16.714 22 12 22C7.28595 22 4.92893 22 3.46447 20.5355C2 19.0711 2 16.714 2 12Z"
          stroke="#7061E1"
          stroke-width="1.5"
        />
        <path
          d="M7 14L8.79689 11.8437C9.50894 10.9893 9.86496 10.562 10.3333 10.562C10.8017 10.562 11.1577 10.9893 11.8698 11.8437L12.1302 12.1563C12.8423 13.0107 13.1983 13.438 13.6667 13.438C14.135 13.438 14.4911 13.0107 15.2031 12.1563L17 10"
          stroke="#7061E1"
          stroke-width="1.5"
          stroke-linecap="round"
        />
      </svg>
      <p>{{ $t('rating') }}</p>
    </div>
  </footer>
</template>

<style scoped>
.footer-placeholder {
  height: 90px;
}
.footer {
  display: flex;
  justify-content: center;
  align-items: center;

  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 80px;
  /* background-color: var(--secondary-bg-color); */
  background-color: var(--footer-bg-color);
  color: white;
  text-align: center;
  -webkit-border-top-left-radius: 20px;
  -webkit-border-top-right-radius: 20px;
  -moz-border-radius-topleft: 20px;
  -moz-border-radius-topright: 20px;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
}
.footer p {
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 15px;
  /* identical to box height */

  text-align: center;
  color: var(--primary-color);
}
.footer div:not(:last-child) {
  margin-right: 60px;
}
footer path {
  stroke: var(--violet);
}
footer .active path {
  fill: #7061e1;
  stroke: white;
}

.dark footer path {
  stroke: var(--no-active-white);
}
.dark footer .active path {
  fill: #7061e1;
  stroke: var(--dark-element);
}
</style>
