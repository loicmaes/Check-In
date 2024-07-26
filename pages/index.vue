<script setup lang="ts">
import {Button} from "~/components/ui/button";
import {type IUser} from "~/types/user";
import {useState} from "#imports";
import {UserProvider} from "~/components/shared/user";

const user = useState<IUser>("user");
</script>

<template>
  <div class="flex flex-col items-start">
    <h1>{{ user ? `Welcome ${user.username}` : "Home" }}</h1>
    <UserProvider>
      <template #fallback>
        <div class="flex gap-2" v-if="!user">
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
      </template>
    </UserProvider>
  </div>
</template>
