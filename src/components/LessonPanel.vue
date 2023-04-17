<script setup>
import ProgressBar from '../components/ProgressBar.vue'
import { useRouter } from 'vue-router'
import { useSettingsStore } from '../stores/settings'
import { useProgressStore } from '../stores/progress'
import { computed } from 'vue'

const settings = useSettingsStore()
const { progress } = useProgressStore()
const router = useRouter()
const props = defineProps({
  isAvailable: {
    type: Boolean
  },
  index: {
    type: Number,
    required: true
  },
  lesson: { type: Object }
})
const indexString = computed(() => (props.index < 10 ? '0' : '') + props.index)
const progressValue = computed(() => {
  const key = props.lesson.id
  if (props.lesson.is_completed) return 100
  if (progress[key]) return progress[key]
  return 0
})

function handleClick() {
  if (props.isAvailable)
    router.push({
      name: 'lesson',
      params: {
        id: props.lesson.course_id,
        lessonid: props.lesson.id,
        video: props.lesson.video.slice(17)
      }
    })
}
</script>

<template>
  <div class="panel" @click="handleClick">
    <div class="typo400_24 mr-20 opacity3">{{ indexString }}</div>
    <div class="lesson_details">
      <div class="typo700_14 mb-7" :class="{ opacity3: !isAvailable }">
        {{ lesson.name[settings.lang] }}
      </div>
      <div class="flex" v-if="isAvailable">
        <!-- duration icon -->
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
        <span class="typo600_12 mr-12 hint_text"> {{ $t('duration', { duration: 20 }) }}</span>
        <!-- is completed icon -->
        <svg
          v-if="lesson.is_completed === true"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12ZM16.0303 8.96967C16.3232 9.26256 16.3232 9.73744 16.0303 10.0303L11.0303 15.0303C10.7374 15.3232 10.2626 15.3232 9.96967 15.0303L7.96967 13.0303C7.67678 12.7374 7.67678 12.2626 7.96967 11.9697C8.26256 11.6768 8.73744 11.6768 9.03033 11.9697L10.5 13.4393L12.7348 11.2045L14.9697 8.96967C15.2626 8.67678 15.7374 8.67678 16.0303 8.96967Z"
            fill="#42C6A5"
          />
        </svg>
        <span v-if="progressValue === 100" class="typo600_12"> {{ progressValue + '%' }}</span>
      </div>
      <div v-else class="typo400_10 mw_170 color_disabled">{{ $t('lessonNoAccess') }}</div>
    </div>
    <ProgressBar :progress="progressValue" v-if="isAvailable"></ProgressBar>
    <div v-else class="flex lock_container">
      <div style="width: 10px"></div>
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M5.25 9.30277V8C5.25 4.27208 8.27208 1.25 12 1.25C15.7279 1.25 18.75 4.27208 18.75 8V9.30277C18.9768 9.31872 19.1906 9.33948 19.3918 9.36652C20.2919 9.48754 21.0497 9.74643 21.6517 10.3483C22.2536 10.9503 22.5125 11.7081 22.6335 12.6082C22.75 13.4752 22.75 14.5775 22.75 15.9451V16.0549C22.75 17.4225 22.75 18.5248 22.6335 19.3918C22.5125 20.2919 22.2536 21.0497 21.6517 21.6516C21.0497 22.2536 20.2919 22.5125 19.3918 22.6335C18.5248 22.75 17.4225 22.75 16.0549 22.75H7.94513C6.57754 22.75 5.47522 22.75 4.60825 22.6335C3.70814 22.5125 2.95027 22.2536 2.34835 21.6516C1.74643 21.0497 1.48754 20.2919 1.36652 19.3918C1.24996 18.5248 1.24998 17.4225 1.25 16.0549V15.9451C1.24998 14.5775 1.24996 13.4752 1.36652 12.6082C1.48754 11.7081 1.74643 10.9503 2.34835 10.3483C2.95027 9.74643 3.70814 9.48754 4.60825 9.36652C4.80938 9.33948 5.02317 9.31872 5.25 9.30277ZM6.75 8C6.75 5.10051 9.10051 2.75 12 2.75C14.8995 2.75 17.25 5.10051 17.25 8V9.25344C16.8765 9.24999 16.4784 9.24999 16.0549 9.25H7.94513C7.52161 9.24999 7.12353 9.24999 6.75 9.25344V8ZM3.40901 11.409C3.68577 11.1322 4.07435 10.9518 4.80812 10.8531C5.56347 10.7516 6.56459 10.75 8 10.75H16C17.4354 10.75 18.4365 10.7516 19.1919 10.8531C19.9257 10.9518 20.3142 11.1322 20.591 11.409C20.8678 11.6858 21.0482 12.0743 21.1469 12.8081C21.2484 13.5635 21.25 14.5646 21.25 16C21.25 17.4354 21.2484 18.4365 21.1469 19.1919C21.0482 19.9257 20.8678 20.3142 20.591 20.591C20.3142 20.8678 19.9257 21.0482 19.1919 21.1469C18.4365 21.2484 17.4354 21.25 16 21.25H8C6.56459 21.25 5.56347 21.2484 4.80812 21.1469C4.07435 21.0482 3.68577 20.8678 3.40901 20.591C3.13225 20.3142 2.9518 19.9257 2.85315 19.1919C2.75159 18.4365 2.75 17.4354 2.75 16C2.75 14.5646 2.75159 13.5635 2.85315 12.8081C2.9518 12.0743 3.13225 11.6858 3.40901 11.409Z"
          fill="#7061E1"
        />
      </svg>
    </div>
  </div>
</template>

<style>
.opacity3 {
  opacity: 0.3;
}
.lock_container {
  width: 52px;
  height: 52px;
  align-items: center;
  justify-content: center;
}
.lesson_details {
  align-items: center;
  flex-grow: 1;
}
.hint_text {
  color: #fc8d2d;
  display: flex;
  align-items: center;
}

.hint_text svg {
  margin-right: 5px;
}

.black {
  color: #1a1a1a;
}
.mw_170 {
  width: 170px;
}
.color_disabled {
  color: var(--placeholder-color);
}
</style>
