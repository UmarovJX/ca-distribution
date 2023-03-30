<script setup>
import AuthHeader from '../components/AuthHeader.vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
const { t } = useI18n({
  inheritLocale: true,
  useScope: 'local'
})

const router = useRouter()
function goToSignIn() {
  router.push({ name: 'signin' })
}
</script>

<template>
  <div class="full-height">
    <div>
      <auth-header :title="t('register')" :hint="t('create_new_account')" />
      <form action="">
        <input class="base-input" type="text" :placeholder="t('placeholders.username')" />
        <input class="base-input" type="email" :placeholder="t('placeholders.email')" />
        <input class="base-input" type="password" :placeholder="t('placeholders.password')" />
        <button class="typo600_16 text_white">{{ t('register') }}</button>
      </form>
    </div>

    <footer>
      <p class="prompt typo500_16">{{ t('haveAccount') }}</p>
      <button @click="goToSignIn" class="typo600_16 text_primary">{{ t('signIn') }}</button>
    </footer>
  </div>
</template>

<style scoped>
.text_primary {
  color: var(--primary-color);
}
.text_white {
  color: white;
}
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
