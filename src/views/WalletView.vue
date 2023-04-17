<script setup>
import WalletHeader from '../components/WalletHeader.vue'
import WAlletStats from '../components/WAlletStats.vue'

import AppFooter from '../components/AppFooter.vue'
import { useI18n } from 'vue-i18n'
import { useSettingsStore } from '../stores/settings'
import { useRouter } from 'vue-router'
import authService from '../services/authService'
import { ref } from 'vue'
import WalletPanel from '../components/WalletPanel.vue'
const data = ref([
  {
    date: '01.02.2023',
    name: 'HP Envy x360',
    status: 'Оплачено',
    amount: 10
  },
  {
    date: '01.02.2023',
    name: 'HP Envy x360',
    status: 'Оплачено',
    amount: 10
  },
  {
    date: '01.02.2023',
    name: 'HP Envy x360',
    status: 'Оплачено',
    amount: 10
  },
  {
    date: '01.02.2023',
    name: 'HP Envy x360',
    status: 'Не оплачено',
    amount: 10
  },
  {
    date: '01.02.2023',
    name: 'HP Envy x360',
    status: 'Не оплачено',
    amount: 10
  }
])

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
</script>

<template>
  <div>
    <wallet-header>
      <div class="header-title">
        <div>
          <h1 class="title">{{ $t('wallet.wallet') }}</h1>
          <p class="secondary typo400_14">{{ $t('wallet.activity') }}</p>
        </div>
        <div>
          <div class="secondary typo400_14">{{ t('balls') }}</div>

          <div class="balls" @click="clearSystem">{{ settings.user.balance }}</div>
        </div>
      </div>
    </wallet-header>
    <main>
      <div class="container mt-40">
        <h2 class="section-header">{{ t('wallet.settlement') }}</h2>
        <div class="wallet_list mt-20">
          <WalletPanel v-for="(entry, i) in data" :entry="entry" :key="i"></WalletPanel>
        </div>
        <WAlletStats></WAlletStats>
      </div>
    </main>
    <AppFooter></AppFooter>
  </div>
</template>

<style>
.wallet_list .wallet_panel:not(:first-child) {
  margin-top: 20px;
}
.wallet_img {
  width: 100%;
  aspect-ratio: 70 / 51;
  background-size: cover;
  background-position: center;
  border-radius: 30px;
}
.scroll-horizontal {
  overflow-x: scroll;
  width: 100%;
  padding-left: 20px;
  display: flex;
}
.scroll-horizontal::-webkit-scrollbar {
  display: none;
}
.scroll-horizontal .course-card {
  margin-right: 20px;
}
.part {
  display: flex;
  justify-content: space-between;
  padding: 40px 20px 20px 20px;
  align-items: center;
}

.inputdiv {
  margin-bottom: 20px;
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
.header-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.header-title h1 {
  color: white;
}

.header-title p {
  margin-top: 10px;
}
</style>
