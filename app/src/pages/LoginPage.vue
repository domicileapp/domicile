<template>
  <q-page class="home-page window-height row items-center justify-evenly">
    <div class="col-4">
      <q-card>
        <q-card-section class="text-center">
          <q-icon
            name="cottage"
            class="text-center"
            color="indigo-3"
            size="8em"
          />
        </q-card-section>
        <q-card-section>
          <q-input
            class="q-mb-sm"
            filled
            v-model="username"
            autofocus
            type="text"
            label="Username"
          />
          <q-input filled v-model="password" type="password" label="Password" />
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
import { ref } from 'vue'
import { useAuthStore } from 'src/stores/auth.store'

const username = ref('')
const password = ref('')
const login = async () => {
  try {
    const authStore = useAuthStore()
    return authStore.login(username.value, password.value)
  } catch (error) {
    console.error(`Error logging in: ${error}`)
  }
}
</script>
