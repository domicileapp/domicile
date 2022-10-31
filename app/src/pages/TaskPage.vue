<template>
  <q-page class="column">
    <div class="row q-pa-sm bg-primary">
      <q-input
        v-model="newTask"
        @keyup.enter="addTask"
        class="col"
        filled
        placeholder="New task"
        bg-color="grey-2"
      >
        <template v-slot:append>
          <q-btn @click="addTask" round dense size="lg" flat icon="add_box" />
        </template>
      </q-input>
    </div>
    <q-list class="bg-white" separator bordered v-if="!loading">
      <!-- @click="task.complete = !task.complete" -->
      <q-item
        v-for="task in tasks"
        :key="task.id"
        @click="completeTask(task.id)"
        :class="{ 'done bg-blue-1': task.complete }"
        clickable
        v-ripple
      >
        <q-item-section avatar>
          <q-checkbox v-model="task.complete" color="primary" />
        </q-item-section>
        <q-item-section>
          <q-item-label>{{ task.title }}</q-item-label>
          <div class="text-caption text-grey">{{ task.description }}</div>
        </q-item-section>
        <q-item-section v-if="task.complete" side>
          <q-btn
            flat
            round
            color="primary"
            @click.stop="completeTask(task.id)"
            dense
            icon="delete"
          />
        </q-item-section>
      </q-item>
    </q-list>
    <div class="absolute-center" v-if="loading">
      <q-spinner-pie color="secondary" style="font-size: 5em" />
    </div>
    <div v-if="!tasks" class="noTasks absolute-center" style="opacity: 0.5">
      <q-icon name="check" size="6em" color="primary" />

      <div class="text-primary text-h6 text-center">No tasks</div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { api } from 'src/boot/axios'
import { useTasksStore } from 'src/stores/tasks.store'
import { ref } from 'vue'

const newTask = ref('')
const tasksStore = useTasksStore()
const { tasks, loading } = storeToRefs(tasksStore)

tasksStore.getAllTasks()

const completeTask = (taskId) => {
  api.put(`/tasks/${taskId}`, { complete: true })
}
</script>

<style lang="scss">
.done {
  .q-item__label {
    text-decoration: line-through;
    color: #bbbbbb;
  }
}
</style>
