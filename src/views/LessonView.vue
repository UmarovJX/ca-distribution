<script setup>
import AppFooter from '../components/AppFooter.vue'
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import { usePlayer } from '@vue-youtube/core'

import LessonList from '../components/LessonList.vue'
import { useSettingsStore } from '../stores/settings'
import { useProgressStore } from '../stores/progress'
import { useCourses } from '../composables/courses'
const settings = useSettingsStore()
const { setProgress, progress } = useProgressStore()
const route = useRoute()

const { course, getCourse, lessons, getCourseLessons, lesson, getLesson } = useCourses()
getCourse(route.params.id)
getCourseLessons(route.params.id)
getLesson(route.params.lessonid)

const lessonDuration = computed(() => {
  const hours = Math.floor(lesson.value.duration_in_minutes / 60)
  const minutes = lesson.value.duration_in_minutes % 60
  return `${hours > 0 ? hours + ' ' + 'h. ' : ''}${minutes} ` + 'min'
})
const videoId = ref('')
const i = route.params.video.indexOf('?v=')
if (~i) videoId.value = route.params.video.substring(i + 3, i + 14)
console.log(videoId.value)
const player = ref(null)
const { instance, onStateChange } = usePlayer(route.params.video, player)
onStateChange((event) => {
  if (event.data === 1 || event.data === 2) {
    const key = lesson.value.id
    const val = (instance.value.getCurrentTime() / instance.value.getDuration()) * 100

    console.log(progress[key])
    console.log(val)

    if (!progress[key] || val > progress[key]) {
      setProgress(key, val)
    }
  }
})
</script>
<template>
  <div class="mh-100">
    <div>
      <div ref="player" class="youtube_iframe"></div>
      <div class="ttt"></div>
    </div>
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
      <LessonList :lessons="lessons"></LessonList>
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
.ttt {
  border-radius: 10px 10px 0 0;
  margin-top: -15px;
  height: 10px;
  background-color: var(--background-color);
}
</style>
