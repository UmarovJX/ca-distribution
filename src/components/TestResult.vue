<template>
  <div>
    <div class="flex flex-center mt-70">
      <template v-if="result.is_passed">
        <svg
          width="206"
          height="206"
          viewBox="0 0 206 206"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="103" cy="103" r="100" stroke="#42C6A5" stroke-width="5" />
          <path
            d="M68.001 108L88.001 128L138.001 78"
            stroke="#42C6A5"
            stroke-width="5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </template>
      <template v-else>
        <svg
          width="204"
          height="204"
          viewBox="0 0 204 204"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="102" cy="102" r="100" stroke="#E22C4E" stroke-width="4" />
          <path
            d="M127 77.0002L77 127M76.9998 77L127 127"
            stroke="#E22C4E"
            stroke-width="4"
            stroke-linecap="round"
          />
        </svg>
      </template>
    </div>
    <div class="typo700_24 text-center mt-40">
      {{ $t(result.is_passed ? 'testPassed' : 'testFailed') }}
    </div>
    <div class="text-center mt-20" :class="colorClass">
      {{ t('testResultStat', res) }}
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
const { t } = useI18n({
  inheritLocale: true,
  useScope: 'local'
})

const props = defineProps({
  result: { type: Object, required: true }
})

const colorClass = computed(() => (props.result.is_passed ? 'green-text' : 'red-text'))
let res = computed(() => ({
  all: props.result.total_quantity,
  result: props.result.correct_quantity
}))
alert(JSON.stringify(props.result))
</script>

<style scoped>
.flex-center {
  justify-content: center;
}

.text-center {
  text-align: center;
}
.green-text {
  color: #42c6a5;
}
.red-text {
  color: #e22c4e;
}
</style>
