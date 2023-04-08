<script setup>
import AppFooter from '../components/AppFooter.vue'
import { computed, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { YoutubeIframe } from '@vue-youtube/component'

import LessonList from '../components/LessonList.vue'
import { useSettingsStore } from '../stores/settings'
import { useCourses } from '../composables/courses'
const settings = useSettingsStore()
const route = useRoute()
const router = useRouter()

function startTest() {
  router.push({ name: 'test', params: { id: route.params.id } })
}

const { course, getCourse, lessons, getCourseLessons, lesson, getLesson } = useCourses()
getCourse(route.params.id)
getCourseLessons(route.params.id)
getLesson(route.params.lessonid)
const { t } = useI18n({
  inheritLocale: true,
  useScope: 'local'
})
const lessonDuration = computed(() => {
  const hours = Math.floor(lesson.value.duration_in_minutes / 60)
  const minutes = lesson.value.duration_in_minutes % 60
  return `${hours > 0 ? hours + ' ' + 'h. ' : ''}${minutes} ` + 'min'
})
const width = computed(() => window.innerWidth)
const videoId = ref('')
watch(
  () => lesson.value,
  () => (videoId.value = lesson.value.video.slice(17))
)

//const { instance, onReady } =
</script>
<template>
  <div class="mh-100">
    <div v-if="videoId">
      <YoutubeIframe :id="videoId" :width="width" class="youtube_iframe"></YoutubeIframe>
    </div>

    <div class="container child_mt_20 flex-column mh-100" v-if="course && lesson">
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
      <button @click="startTest">{{ t('startTest') }}</button>
      <!-- v-if="lessons[lessons.length-1]?.is_completed" -->
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
  width: 350px;
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
</style>
