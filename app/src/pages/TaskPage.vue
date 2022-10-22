<template>
  <!-- <q-page class="row items-center justify-evenly"> Tasks </q-page> -->
  <q-page padding>
    <div class="full-width row justify-center q-mb-md">
      <div class="text-h3">Tasks</div>
    </div>
    <div class="row justify-center">
      <div class="col-4">
        <q-card>
          <q-card-section>
            <q-input filled autofocus v-model="newTask" label="Create new task">
              <template v-slot:append>
                <q-btn square flat icon="add" />
              </template>
            </q-input>
          </q-card-section>
          <q-card-section>
            <q-list bordered>
              <div v-for="task in tasks" :key="task.id">
                <q-item clickable v-ripple>
                  <q-item-section>{{ task.title }}{{ task.id }}</q-item-section>
                </q-item>
              </div>
            </q-list>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const newTask = ref('')

const tasks = ref([
  {
    id: 1,
    title: 'test',
  },
  {
    id: 2,
    title: 'test',
  },
  {
    id: 3,
    title: 'test',
  },
])
</script>
