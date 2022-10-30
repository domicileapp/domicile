<template>
  <q-page class="row items-center justify-evenly"> Dashboard </q-page>
</template>

<script setup lang="ts">
import { Task, Meta } from 'components/models'
import { ref } from 'vue'

const tasks = ref<Task[]>([
  {
    id: 1,
    content: 'ct1',
  },
  {
    id: 2,
    content: 'ct2',
  },
  {
    id: 3,
    content: 'ct3',
  },
  {
    id: 4,
    content: 'ct4',
  },
  {
    id: 5,
    content: 'ct5',
  },
])
const meta = ref<Meta>({
  totalCount: 1200,
})
</script>
