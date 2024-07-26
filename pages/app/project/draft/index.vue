<script setup lang="ts">
import {definePageMeta} from "#imports";
import {TableBody, TableCell, TableHead, TableHeader, TableRow} from "~/components/ui/table";
import {useDraftSessions} from "~/composables/project";
import type {ISession} from "~/types/session";
import {ref} from "vue";

definePageMeta({
  layout: "app",
});

const sessions = ref<(ISession & { elapsed: number | null })[]>((await useDraftSessions()).map((session: ISession): (ISession & { elapsed: number | null }) => ({
  ...session,
  elapsed: session.endedAt ?
      Math.round(((new Date(session.endedAt).getTime() - new Date(session.startedAt).getTime()) / (1000 * 60 * 60)) * 10) / 10
      : null,
})) || []);
</script>

<template>
  <main class="app-page">
    <header>
      <h1 class="text-2xl font-extrabold">Drafts</h1>
      <p class="text-muted-foreground">Drafts are the place where you could find every uncategorized sessions.</p>
    </header>

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
        <template v-if="sessions.length">
          <TableRow v-for="session in sessions" :key="session.uid">
            <TableCell>{{ session.name }}</TableCell>
            <TableCell class="capitalize">{{ session.type }}</TableCell>
            <TableCell class="text-center">{{ session.elapsed ? `${session.elapsed}h` : "-" }}</TableCell>
            <TableCell class="text-right">&times;</TableCell>
          </TableRow>
        </template>
        <TableRow v-else class="inline-flex items-center justify-center h-10 text-muted-foreground">No content...</TableRow>
      </TableBody>
    </Table>
  </main>
</template>
