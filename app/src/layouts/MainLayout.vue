<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar class="bg-primary">
        <q-toolbar-title>
          <q-btn flat @click="drawer = !drawer" dense size="lg" icon="menu" />
        </q-toolbar-title>

        <q-icon name="cottage" size="lg" />
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="drawer"
      show-if-above
      :width="300"
      :breakpoint="500"
      class="bg-grey-3"
    >
      <q-scroll-area style="max-width: 350px; height: 100%">
        <q-list padding>
          <template v-for="(menuItem, index) in menuList" :key="index">
            <q-item clickable :to="menuItem.link" v-ripple>
              <q-item-section avatar>
                <q-icon :name="menuItem.icon" />
              </q-item-section>
              <q-item-section>
                {{ menuItem.label }}
              </q-item-section>
            </q-item>
            <q-separator :key="'sep' + index" v-if="menuItem.separator" />
          </template>
        </q-list>
        <div class="absolute-bottom q-pa-md">
          <div class="text-subtitle1">
            {{ authStore.user.user.firstName }}
            {{ authStore.user.user.lastName }}
          </div>
          <div class="text-caption">@{{ authStore.user.user.username }}</div>
        </div>
      </q-scroll-area>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from 'src/stores/auth.store'

const authStore = useAuthStore()

const menuList = [
  {
    icon: 'dashboard',
    label: 'Dashboard',
    link: '/',
    separator: true,
  },
  {
    icon: 'task',
    label: 'Tasks',
    link: '/tasks',
    separator: false,
  },
  {
    icon: 'inventory',
    label: 'Inventory',
    link: '/inventory',
    separator: false,
  },
  {
    icon: 'monitor_heart',
    label: 'Health',
    link: '/health',
    separator: true,
  },
  {
    icon: 'settings',
    label: 'Settings',
    link: '/settings',
    seperator: false,
  },
]

const drawer = ref(false)
</script>
