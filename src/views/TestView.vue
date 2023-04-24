<template>
  <div>
    <app-header>
      <div class="header-title">
        <div>
          <h1 class="title">{{ $t('finalTest') }}</h1>
          <p class="secondary typo400_14">{{ $t('letsTest') }}</p>
        </div>
      </div>
    </app-header>
    <main class="container mt-40" v-if="course && tests.length > 0">
      <div v-if="testState === 'view'">
        <h1 class="typo700_16 bb">{{ $t('testHeader', { name: course.name[settings.lang] }) }}</h1>
        <test-card
          class="bb mt-40"
          v-for="(test, i) in tests"
          :key="test.id"
          :question="test.question"
          :index="i"
          :options="test.options"
          @change="handle"
        ></test-card>
      </div>

      <div v-if="testState === 'result'">
        <TestResult :result="testResult" v-if="testResult"></TestResult>
      </div>
      <div class="flex mt-70">
        <button
          v-if="testState == 'view'"
          @click="submitTest"
          class="typo600_16 mt-40"
          :disabled="!(answers.length == tests.length) && !loading"
        >
          {{ $t('submitTest') }}
        </button>
        <button
          :class="testResult.is_passed ? '' : 'mr-20'"
          v-if="testState == 'result' && testResult"
          @click="goMyCourses"
          class="typo600_16 mt-40"
        >
          {{ $t('myCourses') }}
        </button>
        <button
          v-if="testResult && testState == 'result' && !testResult.is_passed && course.education_course.testing_attempts_left>1"
          @click="initPage"
          class="typo600_16 mt-40"
        >
          {{ $t('restart') }}
        </button>
      </div>
    </main>
    <AppFooter></AppFooter>
  </div>
</template>

<script setup>
import AppHeader from '../components/AppHeader.vue'
import AppFooter from '../components/AppFooter.vue'
import TestCard from '../components/TestCard.vue'
import TestResult from '../components/TestResult.vue'

import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useSettingsStore } from '../stores/settings'
import { useCourses } from '../composables/courses'
import courseService from '../services/courseService'
import { tg } from '../main'

const { course, getCourse, tests, getTests } = useCourses()
const settings = useSettingsStore()
const route = useRoute()
const router = useRouter()
const testState = ref('view')
const loading = ref(false)
const answers = ref([])
const testResult = ref(null)

function initPage() {
  testState.value = 'view'
  loading.value = false
  answers.value = []
  testResult.value = null
  course.value = null
  tests.value = []
  getCourse(route.params.id)
  getTests(route.params.id).catch((e) => {
    tg.showAlert(e.msg)
    router.push({ name: 'course', params: { id: route.params.id } })
  })
}

initPage()

function handle(newId, oldId) {
  const newArr = answers.value.filter((el) => el !== oldId)
  newArr.push(newId)
  answers.value = newArr
}

function submitTest() {
  courseService
    .submitTest(answers.value, route.params.id)
    .then((data) => {
      console.log(data)
      testResult.value = data.meta
      setTimeout(() => (testState.value = 'result'))
    })
    .catch(({ data }) => {
      alert(JSON.stringify(data))
      router.push({ name: 'course', params: { id: route.params.id } })
    })
}

function goMyCourses() {
  router.push({ name: 'mycourses' })
}
</script>

<style scoped>
.bb {
  border-bottom: 1px solid var(--primary-color);
  padding-bottom: 10px;
}
</style>
