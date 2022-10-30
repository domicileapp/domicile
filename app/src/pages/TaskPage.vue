<template>
  <q-page class="column">
    <div v-if="!loading">
      <div v-for="task in tasksStore.tasks" :key="task.id">
        {{ task.title }}
      </div>
    </div>
    <!-- <div class="row q-pa-sm bg-primary">
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
    <q-list class="bg-white" separator bordered v-if="tasks">
      <q-item
        v-for="(task, index) in tasks"
        :key="task.title"
        @click="task.done = !task.done"
        :class="{ 'done bg-blue-1': task.done }"
        clickable
        v-ripple
      >
        <q-item-section avatar>
          <q-checkbox v-model="task.done" color="primary" />
        </q-item-section>
        <q-item-section>
          <q-item-label>{{ task.title }}</q-item-label>
        </q-item-section>
        <q-item-section v-if="task.done" side>
          <q-btn
            flat
            round
            color="primary"
            @click.stop="deleteTask(index)"
            dense
            icon="delete"
          />
        </q-item-section>
      </q-item>
    </q-list> -->
    <!-- <div
      v-if="!tasks.length"
      class="noTasks absolute-center"
      style="opacity: 0.5"
    >
      <q-icon name="check" size="6em" color="primary" />

      <div class="text-primary text-h6 text-center">No tasks</div>
    </div> -->
  </q-page>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useQuasar } from 'quasar'
import { useTasksStore } from 'src/stores/tasks.store'
import { ref } from 'vue'
const newTask = ref('')
const tasksStore = useTasksStore()
const { tasks, loading } = storeToRefs(tasksStore.$state.tasks)

// console.log(tasks.value)

tasksStore.getAllTasks()
</script>

<style lang="scss">
.done {
  .q-item__label {
    text-decoration: line-through;
    color: #bbbbbb;
  }
}
</style>
