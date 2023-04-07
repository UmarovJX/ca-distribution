<script setup>
import { useSettingsStore } from '../stores/settings'
import { useI18n } from 'vue-i18n'
import { computed } from 'vue'
const { t } = useI18n({
  inheritLocale: true,
  useScope: 'local'
})
const settings = useSettingsStore()
const props = defineProps({
  course: Object,
  balls: { type: Number },
  title: {
    type: String
  }
})
const progress = computed(
  () => (props.course.education_course.completed_lessons_count / props.course.lessons_count) * 100
)
</script>

<template>
  <div class="course_panel">
    <div>
      <h2 class="section-header mb-5">{{ course.name[settings.lang] }}</h2>
      <div class="flex">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="15"
          height="15"
          viewBox="0 0 15 15"
          fill="none"
        >
          <g clip-path="url(#clip0_406_849)">
            <circle cx="7.5" cy="7.5" r="6.25" stroke="#42C6A5" />
            <path
              d="M5.3125 7.8125L6.5625 9.0625L9.6875 5.9375"
              stroke="#42C6A5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </g>
          <defs>
            <clipPath id="clip0_406_849">
              <rect width="15" height="15" fill="white" />
            </clipPath>
          </defs>
        </svg>
        <div class="typo400_12">{{ progress + '%' }}</div>
      </div>
    </div>
    <div class="ball typo600_12">{{ t('ball') + ': ' + 4 }}</div>
  </div>
</template>

<style>
.ball {
  color: white;
  padding: 7px 10px;
  background: linear-gradient(180deg, #8d7cfc 0%, #7061e1 100%);
  border-radius: 10px;
}
.course_panel {
  background-color: var(--secondary-color);
  border-radius: 20px;
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.course_panel:not(:first-child) {
  margin-top: 20px;
}
.course_panel .flex {
  align-items: center;
}
.course_panel .flex svg {
  margin-right: 6px;
}

</style>
