<script setup lang="ts">
type HelloWordProps = {
  msg: string
}

/** Props */
defineProps<HelloWordProps>()
</script>

<template>
  <v-container class="fill-height">
    <v-responsive class="d-flex align-center text-center fill-height">
      <h1 class="text-h2 font-weight-bold">Welcome to Vuetify 3</h1>
      <div class="py-14" />
      <v-row class="d-flex align-center justify-center">
        <v-col cols="auto">
          <v-btn
            href="https://next.vuetifyjs.com/components/all/"
            min-width="164"
            rel="noopener noreferrer"
            target="_blank"
            variant="text"
          >
            <v-icon icon="mdi-view-dashboard" size="large" start />

            Components
          </v-btn>
        </v-col>
      </v-row>
    </v-responsive>
  </v-container>
</template>
