<script setup lang="ts">
import {definePageMeta, useRoute} from "#imports";
import {computed} from "vue";
import {deleteProject, useRichProject} from "~/composables/project";
import {TableBody, TableCell, TableHead, TableHeader, TableRow} from "~/components/ui/table";
import type {ISession} from "~/types/session";
import {Button} from "~/components/ui/button";
import {Trash} from "@iconoir/vue";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel,
  AlertDialogContent, AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader, AlertDialogTitle,
  AlertDialogTrigger
} from "~/components/ui/alert-dialog";

definePageMeta({
  layout: "app",
});

const { params } = useRoute();
const { projectUid } = params;

const project = await useRichProject(projectUid as string);
const sessions = computed(() => project?.sessions.map((session: ISession) => ({
  ...session,
  elapsed: session.endedAt ?
      Math.round(((new Date(session.endedAt).getTime() - new Date(session.startedAt).getTime()) / (1000 * 60 * 60)) * 10) / 10
      : null,
})) || []);

const handleDelete = async () => {
  if (!project) return;
  await deleteProject(project.uid);
}
</script>

<template>
  <main class="app-page">
    <header class="flex gap-2 items-start">
      <div class="flex flex-1 flex-col">
        <h1 class="text-2xl font-extrabold">{{ project?.name }}</h1>
        <p v-if="project?.description">{{ project?.description }}</p>
      </div>
      <AlertDialog>
        <AlertDialogTrigger>
          <Button variant="ghost" size="icon"><Trash /></Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>This action is definitive! All the data related to this project will be lost.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction @click="handleDelete">Yes, continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </header>

    <template v-if="sessions.length">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Elapsed</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow v-for="session in sessions" :key="session.uid">
            <TableCell>{{ session.name }}</TableCell>
            <TableCell class="capitalize">{{ session.type }}</TableCell>
            <TableCell class="text-center">{{ session.elapsed ? `${session.elapsed}h` : "-" }}</TableCell>
            <TableCell class="text-right">&times;</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </template>
  </main>
</template>
