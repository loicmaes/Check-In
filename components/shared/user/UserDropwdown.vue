<script setup lang="ts">
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "~/components/ui/dropdown-menu";
import {Button} from "~/components/ui/button";
import {Avatar, AvatarFallback} from "~/components/ui/avatar";
import {defineProps} from "vue";
import {LogOut, Dashboard} from "@iconoir/vue";
import type {UserDropdownProps} from "./";
import {Separator} from "~/components/ui/separator";
import {logoutUser} from "~/composables/auth";

defineProps<UserDropdownProps>();
const handleLogout = async () => await logoutUser();
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger>
      <Button variant="ghost" class="rounded-full" size="icon">
        <Avatar>
          <AvatarFallback>{{ user.username.substring(0, 2) }}</AvatarFallback>
        </Avatar>
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end">
      <template v-if="!disablePanel">
        <DropdownMenuItem asChild>
          <NuxtLink to="/app" class="space-x-2">
            <Dashboard />
            <span>Dashboard</span>
          </NuxtLink>
        </DropdownMenuItem>
        <Separator />
      </template>
      <DropdownMenuItem class="space-x-2" @click="handleLogout">
        <LogOut />
        <span>Logout</span>
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>

<style scoped>

</style>
