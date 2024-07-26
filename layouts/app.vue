<script setup lang="ts">
import {UserProvider} from "~/components/shared/user";
import {useStrictProtectedAccess} from "~/composables/auth";
import {MobileSideBar} from "~/components/shared/app/sidebar";
import {useProjects} from "~/composables/project";

await useStrictProtectedAccess(true);
await useProjects();
</script>

<template>
  <div>
    <header class="flex justify-between items-center px-6 py-3">
      <div class="flex items-center gap-3">
        <MobileSideBar />
        <NuxtLink to="/app" class="font-bold text-lg">check-in</NuxtLink>
      </div>
      <UserProvider disablePanel />
    </header>

    <slot />
  </div>
</template>

<style scoped>

</style>
