<script setup>
import AppHeader from '../components/AppHeader.vue'
import AppFooter from '../components/AppFooter.vue'
import CourseCard from '../components/CourseCard.vue'
import CoursePanel from '../components/CoursePanel.vue'

import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useCourses } from '../composables/courses'
const { t } = useI18n({
  inheritLocale: true,
  useScope: 'local'
})

const { myCourses, getMyCourses } = useCourses()
getMyCourses()

const activeCourses = computed(() => {
  console.log(activeCourses.value)
  return myCourses.value.filter((course) => course.education_course.status === 'active')
})
const finishedCourses = computed(() =>
  myCourses.value.filter((course) => course.education_course.status === 'completed')
)
finishedCourses
//---TO DO ---> edit finished Courses section
</script>

<template>
  <div>
    <main>
      <app-header>
        <div class="header-title">
          <div>
            <h1 class="title">{{ t('myCourses') }}</h1>
            <p class="secondary typo400_14">{{ t('letsStart') }}</p>
          </div>
        </div>
      </app-header>

      <div class="part">
        <h2 class="section-header">{{ t('activeCourses') }}</h2>
      </div>
      <div class="scroll-horizontal">
        <course-card
          v-for="course in activeCourses"
          :course="course"
          :key="course.id"
          :description="'progress'"
          vertical
        ></course-card>
      </div>
      <div class="part">
        <h2 class="section-header">{{ t('finishedCourses') }}</h2>
      </div>
      <div class="container">
        <CoursePanel
          v-for="course in activeCourses"
          :course="course"
          :key="course.id"
        ></CoursePanel>
      </div>
    </main>
    <AppFooter></AppFooter>
  </div>
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
