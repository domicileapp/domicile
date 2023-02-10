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

    <q-drawer v-model="drawer" show-if-above :width="300" :breakpoint="500" class="bg-grey-3">
      <q-scroll-area style="max-width: 350px; height: 100%">
        <q-list padding>
          <q-item to="/" v-ripple clickable>
            <q-item-section avatar>
              <q-icon name="dashboard" />
            </q-item-section>
            <q-item-section> Dashboard </q-item-section>
          </q-item>
          <q-expansion-item expand-separator icon="inventory" label="Cook">
            <q-item to="/" v-ripple clickable :header-inset-level="1">
              <q-item-section avatar>
                <q-icon name="inventory" />
              </q-item-section>
              <q-item-section> Recipes </q-item-section>
            </q-item>
          </q-expansion-item>
          <!-- <q-item clickable :to="menuItem.link" v-ripple>
              <q-item-section avatar>
                <q-icon :name="menuItem.icon" />
              </q-item-section>
              <q-item-section>
                {{ menuItem.label }}
              </q-item-section>
            </q-item>
            <q-separator :key="'sep' + index" v-if="menuItem.separator" /> -->
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
import { useAuthStore } from 'src/stores/auth.store'
import { ref } from 'vue'

const authStore = useAuthStore()

const menuList = [
  {
    icon: 'dashboard',
    label: 'Dashboard',
    link: '/',
    separator: true,
  },
  {
    icon: 'countertops',
    label: 'Chores',
    link: '/chores',
    separator: false,
  },
  {
    icon: 'task',
    label: 'Tasks',
    link: '/tasks',
    separator: true,
  },
  {
    icon: 'inventory',
    label: 'Inventory',
    link: '/inventory',
    separator: true,
  },
  {
    icon: 'inventory',
    label: 'Recipes',
    link: '/recipes',
    separator: false,
  },
  {
    icon: 'inventory',
    label: 'Cookbooks',
    link: '/cookbooks',
    separator: true,
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
