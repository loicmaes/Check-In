<script setup lang="ts">
import {Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger} from "~/components/ui/sheet";
import {Menu} from "@iconoir/vue";
import {Button} from "~/components/ui/button";
import {SideBarContent} from "~/components/shared/app/sidebar";
</script>

<template>
  <Sheet>
    <SheetTrigger>
      <Button variant="ghost" size="icon" class="-ml-3"><Menu /></Button>
    </SheetTrigger>
    <SheetContent side="left" class="flex flex-col gap-12">
      <SheetHeader>
        <SheetTitle>check-in</SheetTitle>
      </SheetHeader>

      <SideBarContent />
    </SheetContent>
  </Sheet>
</template>
