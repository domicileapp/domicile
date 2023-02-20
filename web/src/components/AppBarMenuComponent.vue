<script setup lang="ts">
import { useConfig } from '@/store'
const configStore = useConfig()
</script>

<template>
  <v-btn icon="mdi-theme-light-dark" @click="configStore.toggleTheme" />
</template>
