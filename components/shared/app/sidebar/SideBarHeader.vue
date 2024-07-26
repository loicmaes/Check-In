<script setup lang="ts">
import {Plus} from "@iconoir/vue";
import {defineEmits} from "vue";

defineEmits<{
  addProject: []
}>();
</script>

<template>
  <header class="flex justify-between items-center pl-2 mb-2">
    <slot />
    <button @click="$emit('addProject')"><Plus /></button>
  </header>
</template>

<style scoped>

</style>
