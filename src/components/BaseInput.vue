<template>
  <div>
    <input
      ref="inputRef"
      class="input"
      :style="{ paddingLeft: left ? '57px' : '20px' }"
      v-bind="$attrs"
      :type="type"
      :value="modelValue"
      :placeholder="placeholder"
      @input="$emit('update:modelValue', $event.target.value)"
    />
    <i :class="left ? 'left' : 'right'" class="input_icon" @click="handleIcon">
      <slot></slot>
    </i>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const emit = defineEmits(['iconClicked', 'update:modelValue'])
const inputRef = ref(null)
function handleIcon() {
  inputRef.value.focus()
  setTimeout(() => {
    const val = inputRef.value.value
    inputRef.value.value = ''
    inputRef.value.value = val
  }, 0)
  emit('iconClicked')
}
defineProps({
  placeholder: {
    type: String,
    default: ''
  },
  type: {
    type: String,
    default: ''
  },
  modelValue: {
    type: String,
    default: ''
  },
  left: {
    type: Boolean
  }
})
</script>

<style scoped>
i {
  height: 24px;
}
div {
  display: flex;
  align-items: center;
}
i {
  position: absolute;
}
.right {
  right: 27px;
}

.left {
  left: 15px;
}

.input:active,
.input:hover,
.input:focus {
  outline: none;
  border: 1px solid var(--primary-color);
}
.input {
  color: var(--text-color-main);
  width: 100%;
  font-size: 16px;
  padding: 20px;
  border: 1px solid var(--color-outline);
  border-radius: 20px;
}

.input::placeholder {
  font-size: 16px;
  color: var(--placeholder-color);
}
</style>
