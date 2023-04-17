<script setup>
import WalletHeader from '../components/WalletHeader.vue'
import AppFooter from '../components/AppFooter.vue'
import { useI18n } from 'vue-i18n'
import { useSettingsStore } from '../stores/settings'
import { useRouter } from 'vue-router'
import authService from '../services/authService'

import walletImg from '../assets/images/wallet.png'
import walletHistoryImg from '../assets/images/wallethistory.png'
const router = useRouter()
const { t } = useI18n({
  inheritLocale: true,
  useScope: 'local'
})
authService.getUser()

const settings = useSettingsStore()

function clearSystem() {
  settings.clear()
  setTimeout(() => router.push({ name: 'signin' }), 0)
}

const goToWallet = () => router.push({ name: 'wallet' })
const goToWalletHistory = () => router.push({ name: 'wallethistory' })
</script>

<template>
  <div>
    <wallet-header>
      <div class="header-title">
        <div>
          <h1 class="title">{{ settings.user.full_name }}</h1>
          <p class="secondary typo400_14">{{ $t('wallet.home_sub_header') }}</p>
        </div>
        <div>
          <div class="secondary typo400_14">{{ t('balls') }}</div>
          <div class="balls typo400_14" @click="clearSystem">{{ settings.user.balance }}</div>
        </div>
      </div>
    </wallet-header>
    <main>
      <div class="container mt-40" @click="goToWallet">
        <h2 class="section-header">{{ t('wallet.wallet') }}</h2>
        <div class="wallet_img mt-20" :style="{ backgroundImage: `url(${walletImg})` }"></div>
      </div>
      <div class="container mt-40" @click="goToWalletHistory">
        <h2 class="section-header">{{ t('wallet.history') }}</h2>
        <div
          class="wallet_img mt-20"
          :style="{ backgroundImage: `url(${walletHistoryImg})` }"
        ></div>
      </div>
    </main>
    <AppFooter></AppFooter>
  </div>
</template>

<style>
.wallet_img {
  width: 100%;
  aspect-ratio: 70 / 51;
  background-size: cover;
  background-position: center;
  border-radius: 30px;
}



.balls {
  padding: 12px 15px;
  background-color: #564bad;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 10px;
  color: white;
}
</style>
