<script setup>
import AppHeader from '../components/AppHeader.vue'
import AppFooter from '../components/AppFooter.vue'
import BaseInput from '../components/BaseInput.vue'
import SearchResults from '../components/SearchResults.vue'
import CourseList from '../components/CourseList.vue'
import { ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import authService from '../services/authService'
import debounce from '../utils/debounce'
import { useSettingsStore } from '../stores/settings'
const settings = useSettingsStore()

// import { tg } from '../main'
const router = useRouter()
const { t } = useI18n({
  inheritLocale: true,
  useScope: 'local'
})
authService.getUser()
const inp = ref('')
const goWallet = () => {
  router.push({ name: 'wallet' })
}
const searchString = ref('')
watch(
  inp,
  debounce((val) => {
    searchString.value = val
  }, 400)
)
</script>

<template>
  <div>
    <app-header>
      <div class="header-title">
        <div>
          <h1 class="title">{{ settings.user.full_name }}</h1>
          <p class="secondary typo400_14">{{ t('letsStart') }}</p>
        </div>
        <div>
          <div class="secondary typo400_14">{{ t('balls') }}</div>

          <div class="balls" @click="goWallet">{{ settings.user.balance }}</div>
        </div>
      </div>
      <div class="inputdiv">
        <base-input left v-model="inp" type="text" :placeholder="t('searchCourse')"
          ><svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="11.5" cy="11.5" r="9.5" stroke="#7061E1" stroke-width="1.5" />
            <path d="M18.5 18.5L22 22" stroke="#7061E1" stroke-width="1.5" stroke-linecap="round" />
          </svg>
        </base-input>
      </div>
    </app-header>
    <div class="searchResultContainer">
      <transition name="fade2" mode="out-in">
        <SearchResults
          :search-string="searchString"
          v-if="searchString.length > 2"
          :key="searchString"
        ></SearchResults>
      </transition>
    </div>

    <CourseList :status-list="[]" :title="$t('allCourses')"></CourseList>
    <CourseList
      :status-list="['active']"
      :title="$t('myCourses')"
      :link="{ name: 'mycourses' }"
    ></CourseList>
    <AppFooter></AppFooter>
  </div>
</template>

<style>
.searchResultContainer {
  transition: max-height 1s linear;
}
.inputdiv {
  margin-bottom: 20px;
}
.balls {
  cursor: pointer;
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
