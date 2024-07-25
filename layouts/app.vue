<script setup lang="ts">
import {UserProvider} from "~/components/shared/user";
import type {IUser} from "~/types/user";

const user = useState<IUser>("user");
</script>

<template>
  <div>
    <header class="flex justify-between items-center px-6 py-3">
      <NuxtLink to="/app" class="font-bold text-lg">check-in</NuxtLink>
      <UserProvider disablePanel />
    </header>

    <main class="w-wrapper mx-auto">
      <slot />
    </main>
  </div>
</template>

<style scoped>

</style>
