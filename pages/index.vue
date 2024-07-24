<script setup lang="ts">
import {Button} from "~/components/ui/button";
import {type IUser} from "~/types/user";
import {useState} from "#imports";
import {logoutUser} from "~/composables/auth";

const user = useState<IUser>("user");
</script>

<template>
  <div class="flex flex-col items-start">
    <h1>{{ user ? `Welcome ${user.username}` : "Home" }}</h1>
    <Button variant="destructive" @click="logoutUser" v-if="user">Logout</Button>
    <div class="flex gap-2" v-else>
      <Button variant="secondary" as-child>
        <NuxtLink to="/portal/auth/login">
          Login
        </NuxtLink>
      </Button>
      <Button as-child>
        <NuxtLink to="/portal/auth/register">
          Register
        </NuxtLink>
      </Button>
    </div>
  </div>
</template>
