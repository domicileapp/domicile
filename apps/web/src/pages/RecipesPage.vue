<template>
  <q-page class="row">
    <div v-if="!recipesStore.loading">
      <q-list bordered separator>
        <q-item v-for="recipe in recipesStore.recipes" :key="recipe.id" clickable v-ripple>
          <q-item-section>
            <q-item-label overline>Prep: {{ recipe.prepTime }}</q-item-label>
            <q-item-label>{{ recipe.title }}</q-item-label>
            <q-item-label caption>Caption</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
      {{ recipesStore.recipes }}
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { useRecipesStore } from 'src/stores/recipes.store'

const recipesStore = useRecipesStore()
recipesStore.getAllRecipes()
</script>
