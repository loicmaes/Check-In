<script setup lang="ts">
import {UserProvider} from "~/components/shared/user";
import {useStrictProtectedAccess} from "~/composables/auth";

await useStrictProtectedAccess(true);
</script>

<template>
  <div>
    <header class="flex justify-between items-center px-6 py-3">
      <NuxtLink to="/app" class="font-bold text-lg">check-in</NuxtLink>
      <UserProvider disablePanel />
    </header>

    <slot />
  </div>
</template>

<style scoped>

</style>
