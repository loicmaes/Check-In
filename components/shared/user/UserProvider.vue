<script setup lang="ts">
import type {IUser} from "~/types/user";
import UserDropwdown from "~/components/shared/user/UserDropwdown.vue";
import type {UserProviderProps} from "~/components/shared/user/index";
import {defineProps} from "vue";
import {useState} from "#imports";

defineProps<UserProviderProps>();
const user = useState<IUser>("user");
</script>

<template>
  <UserDropwdown :user="user" :disablePanel="disablePanel" v-if="user" />
  <slot name="fallback" v-else />
</template>
