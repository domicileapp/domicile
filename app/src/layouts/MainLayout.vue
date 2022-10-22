<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar class="bg-primary">
        <q-toolbar-title>
          <q-btn round flat ripple="false" icon="cottage" no-caps />
        </q-toolbar-title>

        <q-btn to="/" flat no-caps class="text-weight-bold text-subtitle1"
          >Dashboard</q-btn
        >
        <q-btn to="/tasks" flat no-caps class="text-weight-bold text-subtitle1"
          >Tasks</q-btn
        >
        <q-btn flat no-caps class="text-weight-bold text-subtitle1"
          >Inventories</q-btn
        >
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts"></script>
