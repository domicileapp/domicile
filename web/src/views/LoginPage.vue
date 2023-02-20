<script lang="ts" setup>
import { ref } from 'vue'

const username = ref('')
const password = ref('')
</script>

<template>
  <v-container>
    <v-row>
      <v-col />
    </v-row>
    <v-row class="d-flex justify-center">
      <v-col cols="4" align-self="center">
        <v-card>
          <v-card-item class="pt-4">
            <h1 class="text-h4 text-center">Login</h1>
          </v-card-item>
          <v-card-item>
            <v-text-field v-model="username" focused label="Username" />
            <v-text-field v-model="password" type="password" label="Password" />
          </v-card-item>
          <v-card-actions>
            <v-spacer />
            <v-btn color="primary">Login</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
