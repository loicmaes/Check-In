<script setup lang="ts">
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "~/components/ui/dropdown-menu";
import {CompactDisc, Calendar} from "@iconoir/vue";

const emit = defineEmits<{}>();
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger></DropdownMenuTrigger>
    <DropdownMenuContent side="top" align="end">
      <DropdownMenuItem class="gap-2">
        <CompactDisc />
        <span>Live</span>
      </DropdownMenuItem>
      <DropdownMenuItem class="gap-2">
        <Calendar />
        <span>Ended</span>
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
