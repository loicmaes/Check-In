<script setup lang="ts">
import {defineProps} from "vue";
import {Card, CardContent, CardHeader, CardTitle} from "~/components/ui/card";

defineProps<{
  title?: string;
  data: {
    name: string;
    color: string;
    value: any
  }[];
}>();
</script>

<template>
  <Card>
    <CardHeader v-if="title" class="p-3 border-b">
      <CardTitle>{{ title }}</CardTitle>
    </CardHeader>
    <CardContent class="p-3">
      <div v-for="(item, key) in data" :key="key" class="flex items-center justify-between gap-4">
        <div class="flex items-center gap-2">
          <span class="w-2.5 h-2.5">
            <svg width="100%" height="100%" viewBox="0 0 30 30">
              <path
                  d=" M 15 15 m -14, 0 a 14,14 0 1,1 28,0 a 14,14 0 1,1 -28,0"
                  :stroke="item.color"
                  :fill="item.color"
                  stroke-width="1"
              />
            </svg>
          </span>
          <p>{{ item.name }}</p>
        </div>
        <span class="font-semibold">{{ item.value }}h</span>
      </div>
    </CardContent>
  </Card>
</template>

<style scoped>

</style>
