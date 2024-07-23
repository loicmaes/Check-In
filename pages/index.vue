<script setup lang="ts">
import {Button} from "~/components/ui/button";
</script>

<template>
  <div class="flex flex-col">
    <h1>Home</h1>
    <Button as-child>
      <NuxtLink to="/auth/login">
        Login
      </NuxtLink>
    </Button>
  </div>
</template>
