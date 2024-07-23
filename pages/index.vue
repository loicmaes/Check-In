<script setup lang="ts">
import {Button} from "~/components/ui/button";
</script>

<template>
  <div class="flex flex-col items-start">
    <h1>Home</h1>
    <div class="flex gap-2">
      <Button variant="secondary" as-child>
        <NuxtLink to="/auth/login">
          Login
        </NuxtLink>
      </Button>
      <Button as-child>
        <NuxtLink to="/auth/login">
          Register
        </NuxtLink>
      </Button>
    </div>
  </div>
</template>
