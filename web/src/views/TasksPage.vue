<template>
  <v-container class="tasks">
    <v-row>
      <v-col>
        <h1>Tasks</h1>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-text-field
          v-model="newTask"
          label="What are you working on?"
          variant="solo"
          focused
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const newTask = ref('')
</script>
