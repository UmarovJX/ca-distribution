<script setup>
import AuthHeader from '../components/AuthHeader.vue'
import BaseInput from '../components/BaseInput.vue'
import { useRouter } from 'vue-router'
import { ref } from 'vue'
import authService from '../services/authService'
const router = useRouter()
function goToRegister() {
  router.push({ name: 'register' })
}

function handleForm() {
  authService.signIn(username.value, password.value).then(() => router.push({ name: 'home' }))
}
const username = ref('')
const password = ref('')
const inputType = ref('password')
function toggleType() {
  inputType.value = inputType.value === 'text' ? 'password' : 'text'
}
</script>

<template>
  <div class="full-height">
    <div>
      <auth-header :title="$t('hiAgain')" :hint="$t('enterData')" />
      <form @submit.prevent="handleForm" class="auth">
        <BaseInput
          id="name"
          v-model="username"
          :type="'text'"
          :placeholder="$t('placeholders.username')"
        ></BaseInput>
        <BaseInput
          id="password"
          v-model="password"
          :type="inputType"
          :placeholder="$t('placeholders.password')"
          @iconClicked="toggleType"
          ><svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M3.27489 15.2957C2.42496 14.1915 2 13.6394 2 12C2 10.3606 2.42496 9.80853 3.27489 8.70433C4.97196 6.49956 7.81811 4 12 4C16.1819 4 19.028 6.49956 20.7251 8.70433C21.575 9.80853 22 10.3606 22 12C22 13.6394 21.575 14.1915 20.7251 15.2957C19.028 17.5004 16.1819 20 12 20C7.81811 20 4.97196 17.5004 3.27489 15.2957Z"
              stroke-width="1.5"
            />
            <path
              d="M15 12C15 13.6569 13.6569 15 12 15C10.3431 15 9 13.6569 9 12C9 10.3431 10.3431 9 12 9C13.6569 9 15 10.3431 15 12Z"
              stroke-width="1.5"
            />
          </svg>
        </BaseInput>
        <button>{{ $t('signIn') }}</button>
      </form>
    </div>

    <footer>
      <p class="prompt">{{ $t('noAccount') }}</p>
      <button @click="goToRegister">{{ $t('register') }}</button>
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
  border-radius: 20px;
}

footer {
  margin-bottom: 25px;
  margin-top: 40px;
}
.prompt {
  margin-bottom: 20px;
  margin-top: 40px;
  text-align: center;
  color: var(--text-color-main);
}
</style>
