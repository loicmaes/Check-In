<script setup lang="ts">
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter,
  AlertDialogHeader, AlertDialogTitle
} from "~/components/ui/alert-dialog";
import {defineProps, defineEmits} from "vue";

defineProps<{
  opened: boolean;
}>();
defineEmits<{
  "update:opened": [value: boolean];
  "request:delete": [];
}>();
</script>

<template>
  <AlertDialog :open="opened" @update:open="$emit('update:opened', $event)">
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
        <AlertDialogDescription>This action is definitive! All the data related to this project will be lost.</AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>Cancel</AlertDialogCancel>
        <AlertDialogAction @click="$emit('request:delete')">Yes, continue</AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
</template>

<style scoped>

</style>
