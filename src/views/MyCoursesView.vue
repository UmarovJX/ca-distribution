<script setup>
import AppHeader from '../components/AppHeader.vue'
import AppFooter from '../components/AppFooter.vue'
import CourseList from '../components/CourseList.vue'
import FinishedCoursesList from '../components/FinishedCoursesList.vue'
import { useI18n } from 'vue-i18n'
const { t } = useI18n({
  inheritLocale: true,
  useScope: 'local'
})
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

      <CourseList :status-list="['active']" vertical :title="$t('activeCourses')"></CourseList>
      <FinishedCoursesList></FinishedCoursesList>
    </main>
    <AppFooter></AppFooter>
  </div>
</template>

<style>
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
