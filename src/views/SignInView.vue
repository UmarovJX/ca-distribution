<script setup>
import { useI18n } from 'vue-i18n'
import AuthHeader from '../components/AuthHeader.vue'
import BaseInput from '../components/BaseInput.vue'
import { useRouter } from 'vue-router'
import { ref } from 'vue'
import authService from '../services/authService'
const { t } = useI18n({
  inheritLocale: true,
  useScope: 'local'
})

const router = useRouter()
function goToRegister() {
  router.push({ name: 'register' })
}

function handleForm() {
  authService.signIn(username.value, password.value)
}
const username = ref('')
const password = ref('')
</script>

<template>
  <div class="full-height">
    <div>
      <auth-header :title="t('hiAgain')" :hint="t('enterData')" />
      <form @submit.prevent="handleForm">
        <BaseInput
          v-model="username"
          :type="'text'"
          :placeholder="t('placeholders.username')"
        ></BaseInput>
        <BaseInput
          v-model="password"
          :type="'password'"
          :placeholder="t('placeholders.password')"
        ></BaseInput>
        <button>{{ t('signIn') }}</button>
      </form>
    </div>

    <footer>
      <p class="prompt">{{ t('noAccount') }}</p>
      <button @click="goToRegister">{{ t('register') }}</button>
    </footer>
  </div>
</template>

<style scoped>
.full-height {
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
}
.full-height footer {
  margin-top: auto;
}
form {
  text-align: center;
  display: flex;
  flex-direction: column;
}
form *:not(:first-child) {
  margin-top: 20px;
}

button {
  width: 350px;
  font-size: 16px;
  padding: 20px;
  background-color: var(--primary-color);
  border-radius: 20px;
  border: none;
}

footer {
  margin-bottom: 25px;
  margin-top: 40px;
}
.prompt {
  margin-bottom: 20px;
  margin-top: 40px;
  text-align: center;
}
footer button {
  background-color: var(--secondary-color);
  border: 1px solid var(--primary-color);
}
</style>
