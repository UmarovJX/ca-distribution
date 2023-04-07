<template>
  <div class="test-card">
    <p class="typo400_12">{{ $t('questionN', { i }) }}</p>
    <h2 class="typo700_16 mt-5">{{ question[settings.lang] }}</h2>
    <test-checkbox
      class="list_mt-20"
      v-for="item in itemsRef"
      :id="item.id"
      :key="item.id"
      :label="item.name[settings.lang]"
      :value="item.id"
      :checked="item.checked"
      @on-change="handleOnChange"
    ></test-checkbox>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useSettingsStore } from '../stores/settings'
import TestCheckbox from './TestCheckbox.vue'
const settings = useSettingsStore()
const props = defineProps({
  index: {
    type: Number
  },
  options: {
    type: Array
  },
  question: {
    type: Object
  }
})
const emit = defineEmits(['change'])
const itemsRef = ref(
  props.options.map((item) => {
    return {
      ...item,
      checked: false
    }
  })
)
let oldId = null
const handleOnChange = (id) => {
  const temp = oldId
  oldId = id
  const newValue = itemsRef.value.map((item) => ({
    ...item,
    checked: item.id === id ? true : false
  }))
  itemsRef.value = newValue
  emit('change', id, temp)
}
const i = computed(() => (props.index < 9 ? '0' : '') + (props.index + 1))
</script>

<style scoped>
.list_mt-20:not(:first-child) {
  margin-top: 20px;
}
.test-card {
  padding-bottom: 20px;
}

</style>
