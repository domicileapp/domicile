<template>
  <q-page class="row">
    <div v-if="!loading">
      <q-list bordered separator>
        <q-item v-for="recipe in recipes" :key="recipe.id" clickable v-ripple>
          <q-item-section>
            <q-item-label overline>Prep: {{ recipe.prepTime }}</q-item-label>
            <q-item-label>{{ recipe.title }}</q-item-label>
            <q-item-label caption>Caption</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
      {{ recipes }}
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { useRecipesStore } from 'src/stores/recipes.store'
import { storeToRefs } from 'pinia'

const recipesStore = useRecipesStore()
const { recipes, loading } = storeToRefs(recipesStore)

recipesStore.getAllRecipes()
</script>
