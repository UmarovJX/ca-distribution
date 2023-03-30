<script setup>
import AppHeader from '../components/AppHeader.vue'
import AppFooter from '../components/AppFooter.vue'
import BaseInput from '../components/BaseInput.vue'
import CourseCard from '../components/CourseCard.vue'
import img1 from '../assets/images/1.jpeg'
import img2 from '../assets/images/2.jpeg'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
const { t } = useI18n({
  inheritLocale: true,
  useScope: 'local'
})
const search = ref('')
const courses = ref([
  { img: img1, title: 'Продажи', description: 'Основы продаж в B2B сегменте' },
  { img: img2, title: 'Управление', description: 'Основы контроля...' }
])
</script>

<template>
  <main>
    <app-header>
      <div class="header-title">
        <div>
          <h1 class="title">Anton_manager</h1>
          <p class="secondary typo400_14">{{ t('letsStart') }}</p>
        </div>
        <div>
          <div class="secondary typo400_14 right">{{ t('balls') }}</div>

          <div class="balls">4</div>
        </div>
      </div>
      <div class="inputdiv">
        <base-input left v-model="search" type="text" :placeholder="t('searchCourse')"
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

    <div class="part">
      <h2 class="section-header">{{ t('allCourses') }}</h2>
      <span class="section-secondary">{{ t('viewAll') }}</span>
    </div>
    <div class="scroll-horizontal">
      <course-card
        v-for="course in courses"
        :key="course.title"
        :img="course.img"
        :title="course.title"
        :description="course.description"
      ></course-card>
    </div>

    <div class="part">
      <h2 class="section-header">{{ t('myCourses') }}</h2>
      <span class="section-secondary">{{ t('viewAll') }}</span>
    </div>
    <div class="scroll-horizontal">
      <course-card
        v-for="course in courses"
        :key="course.title"
        :img="course.img"
        :title="course.title"
        :description="course.description"
        :progress="25"
      ></course-card>
    </div>
  </main>
  <AppFooter></AppFooter>
</template>

<style>
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
.part .right {
  text-align: right;
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
.secondary {
  font-style: normal;

  color: white;
}

.header-title h1 {
  color: white;
}

.header-title p {
  margin-top: 10px;
}
</style>
