<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import HelloWorld from '@/components/HelloWorld.vue'
</script>

<template>
  <v-container fluid>
    <hello-world msg="⚡Hello Vue 3 + Vuetify 3 + TypeScript + Vite⚡" />
  </v-container>
  <teleport to="head">
    <meta
      name="keyword"
      content="template,typescript,vue3,vue-property-decorator,vue-class-component,vuetify,vite,vite-template,volar"
    />
    <meta name="description" content="Vite Vue3 Vuetify TypeScript Demo" />
  </teleport>
</template>
