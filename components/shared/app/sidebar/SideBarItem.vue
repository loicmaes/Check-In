<script setup lang="ts">
import {Button} from "~/components/ui/button";
import {defineProps} from "vue";
import type {ItemProps} from "./";
import {Folder} from "@iconoir/vue";
import {SheetClose} from "~/components/ui/sheet";

defineProps<ItemProps>();
</script>

<template>
  <SheetClose asChild>
    <Button variant="ghost" class="justify-start gap-2 -ml-2" asChild>
      <NuxtLink :to="`/app/project/${projectUid}`" active-class="text-primary">
        <Folder />
        <span><slot /></span>
      </NuxtLink>
    </Button>
  </SheetClose>
</template>

<style scoped>

</style>
