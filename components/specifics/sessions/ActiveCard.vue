<script setup lang="ts">
import {Card, CardContent, CardFooter, CardHeader, CardTitle} from "~/components/ui/card";
import {defineProps, defineEmits, onMounted, onBeforeUnmount, ref, computed} from "vue";
import {Plus, Square} from "@iconoir/vue";
import {Button} from "~/components/ui/button";
import type {ISession} from "~/types/session";

const props = defineProps<{
  session?: ISession;
}>();
const emit = defineEmits<{
  terminated: [],
}>();

const interval = ref();
const elapsed = ref(0);
const time = computed(() => {
  const days = Math.floor(elapsed.value / (1000 * 24 * 60 * 60));
  const hours = Math.floor((elapsed.value % (1000 * 24 * 60 * 60)) / (1000 * 24 * 60));
  const minutes = Math.floor((elapsed.value % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor(elapsed.value % (1000 * 60) / 1000);

  return [
      `${days} days`,
      `${hours < 10 ? "0" : ""}${days}:${minutes < 10 ? "0" : ""}${minutes}:${seconds < 10 ? "0" : ""}${seconds}`
  ];
});

const createLiveSession = async () => {
  alert("Create live session.");
};
const terminateSession = async (doEmit: boolean = true) => {
  clearInterval(interval.value);
  interval.value = null;
  if (doEmit) emit("terminated");
};

onMounted(() => {
  if (props.session)
    interval.value = setInterval(() => elapsed.value = Date.now() - (props.session?.startedAt.getTime() ?? 0), 500);
});
onBeforeUnmount(() => {
  terminateSession(false);
});
</script>

<template>
  <Card v-if="session">
    <CardHeader class="items-center">
      <span class="text-xs text-muted-foreground">{{ time[0] }}</span>
      <CardTitle>{{ time[1] }}</CardTitle>
    </CardHeader>
    <CardFooter class="justify-center gap-2" v-if="interval">
      <Button class="gap-2" variant="secondary" @click="terminateSession()">
        <Square />
        <span>Terminate</span>
      </Button>
      <Button class="gap-2" variant="destructive">
        <Square />
        <span>Delete session</span>
      </Button>
    </CardFooter>
  </Card>
  <Card v-else @click="createLiveSession">
    <CardContent class="pt-6 flex items-center gap-2 text-muted-foreground">
      <Plus />
      <span>Create a live session</span>
    </CardContent>
  </Card>
</template>
