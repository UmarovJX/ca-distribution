<script setup>
import AppFooter from '../components/AppFooter.vue'
import YoutubePlayer from '../components/YoutubePlayer.vue'
import LessonList from '../components/LessonList.vue'

import { computed, ref, watch } from 'vue'
import { useRoute } from 'vue-router'

import { useSettingsStore } from '../stores/settings'
import { useCourses } from '../composables/courses'

import courseService from '../services/courseService'
import { tg } from '../main'
import { useI18n } from 'vue-i18n'
import router from '../router'
const { t } = useI18n({
  inheritLocale: true,
  useScope: 'local'
})
const settings = useSettingsStore()
const route = useRoute()

const { course, getCourse, lesson, getLesson } = useCourses()
getCourse(route.params.id)
getLesson(route.params.lessonid)

const duration = ref(0)
const lessonDuration = computed(() => {
  if (!duration.value) return ''
  const hours = Math.floor(duration.value / 3600)
  const minutes = Math.floor(duration.value / 60) - hours * 60
  return `${hours > 0 ? hours + ' ' + 'h. ' : ''}${minutes} ` + 'min'
})
const videoId = ref('')
function setVideoId() {
  const i = lesson.value.video.indexOf('?v=')
  let val
  if (~i) val = lesson.value.video.substring(i + 3, i + 14)
  else val = lesson.value.video.substring(17)
  videoId.value = ''
  setTimeout(() => (videoId.value = val), 0)
}
watch(lesson, setVideoId)
watch(
  () => route.params.lessonid,
  (val) => {
    if (val) getLesson(route.params.lessonid)
  }
)
watch(course, () => {
  if (!course.value.education_course) {
    courseService.startCourse(route.params.id).catch((error) => {
      tg.showAlert(error.status)
      tg.showAlert(t('courseStartFail'), () => router.go(-1))
    })
  }
})

const leftAttempts = computed(() => {
  if (!course.value || !course.value.education_course) return 0
  return course.value.education_course.testing_attempts_left
})

const lessonId = computed(() => route.params.lessonid)

const finishedLesson = ref(0)
function handleLessonFinish() {
  finishedLesson.value = route.params.lessonid
}
</script>
<template>
  <div class="mh-100">
    <YoutubePlayer
      :key="route.path"
      :video-id="videoId"
      :lesson-id="lessonId"
      v-if="videoId"
      @duration="duration = $event"
      @finish="handleLessonFinish"
    ></YoutubePlayer>
    <div class="container child_mt_20 flex-column mh-list" v-if="course && lesson">
      <h2 class="typo700_14 course-title-small">{{ course.name[settings.lang] }}</h2>
      <h1 class="typo700_24">{{ lesson.name[settings.lang] }}</h1>
      <div class="hint_text">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z"
            fill="#FC8D2D"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M12 7.25C12.4142 7.25 12.75 7.58579 12.75 8V11.6893L15.0303 13.9697C15.3232 14.2626 15.3232 14.7374 15.0303 15.0303C14.7374 15.3232 14.2626 15.3232 13.9697 15.0303L11.4697 12.5303C11.329 12.3897 11.25 12.1989 11.25 12V8C11.25 7.58579 11.5858 7.25 12 7.25Z"
            fill="white"
          />
        </svg>
        <span class="typo600_12">{{ lessonDuration }}</span>
      </div>
      <div class="typo400_14 secondary">{{ course.description[settings.lang] }}</div>
      <LessonList
        :course-id="route.params.id"
        :attempts="leftAttempts"
        :finished-lesson="finishedLesson"
        :is-completed="course.education_course && course.education_course.status==='completed'"
      ></LessonList>
    </div>
    <AppFooter></AppFooter>
  </div>
</template>

<style>
.child_mt_20 > *:not(:first-child) {
  margin-top: 20px;
}

.course_description {
  color: #666666;
}
.course_banner {
  width: 100%;
  margin: 0 auto;
  aspect-ratio: auto;
  margin: 20px 0;
  border-radius: 30px;
}

.hint_text {
  color: #fc8d2d;
  display: flex;
  align-items: center;
}

.hint_text svg {
  margin-right: 5px;
}

.video-div {
  aspect-ratio: 16/9;
}

.mh-list {
  height: calc(100vh - 320px);
  overflow-y: scroll;
}
</style>
