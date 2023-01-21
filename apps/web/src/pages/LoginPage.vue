<template>
  <q-page class="home-page window-height row items-center justify-evenly">
    <div class="col-4">
      <q-card>
        <q-card-section class="text-center">
          <q-icon name="cottage" class="text-center" color="indigo-3" size="8em" />
        </q-card-section>
        <q-card-section>
          <q-input
            class="q-mb-sm"
            filled
            v-model="credentials.username"
            autofocus
            type="text"
            label="Username"
            :error="!errors"
            :error-message="message"
          />
          <q-input filled v-model="credentials.password" type="password" label="Password" />
          <q-btn
            class="full-width q-mt-md"
            size="lg"
            color="primary"
            label="Login"
            @click="login"
          />
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { ref, onBeforeUnmount } from 'vue'
import { useAuthStore } from 'src/stores/auth.store'
import { useErrorStore } from 'src/stores/error.store'

const credentials = ref({
  username: '',
  password: '',
})
const { message, errors } = useErrorStore()
const login = async () => {
  try {
    const authStore = useAuthStore()
    return authStore.login(credentials.value)
  } catch (error) {
    console.error(`Error logging in: ${error}`)
  }
}
onBeforeUnmount(() => {
  useErrorStore().$reset()
})
</script>
