<script setup lang="ts">
import {definePageMeta, useRoute} from "#imports";
import {ref, computed} from "vue";
import {deleteProject, updateProject, useRichProject} from "~/composables/project";
import {TableBody, TableCell, TableHead, TableHeader, TableRow} from "~/components/ui/table";
import type {ISession} from "~/types/session";
import {Button} from "~/components/ui/button";
import {Trash, MoreHoriz, EditPencil, Plus} from "@iconoir/vue";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "~/components/ui/dropdown-menu";
import {EditDialog, DeleteDialog, type EditDialogEmitOptions} from "~/components/specifics/projects";
import type {IRichProject} from "~/types/project";
import {useToast} from "~/components/ui/toast";
import {FetchError} from "ofetch";
import {CreateDialog} from "~/components/shared/app/session";

definePageMeta({
  layout: "app",
});

const { params } = useRoute();
const { projectUid } = params;

const { toast } = useToast();
const deleteDialogOpen = ref<boolean>(false);
const editDialogOpen = ref<boolean>(false);
const createSessionDialogOpen = ref<boolean>(false);

const project = ref<IRichProject | null>(await useRichProject(projectUid as string));
const sessions = computed(() => project.value?.sessions.map((session: ISession) => ({
  ...session,
  elapsed: session.endedAt ?
      Math.round(((new Date(session.endedAt).getTime() - new Date(session.startedAt).getTime()) / (1000 * 60 * 60)) * 10) / 10
      : null,
})) || []);

const handleEdit = async ({ name, description }: EditDialogEmitOptions) => {
  if (!project.value) return;
  try {
    project.value = await updateProject(project.value.uid, name, description);
    toast({
      title: "Congratulations!",
      description: "Your project credentials has been updated!"
    });
    editDialogOpen.value = false;
  } catch (e) {
    return toast({
      title: "Oh no...",
      description: (e as FetchError).statusMessage,
      variant: "destructive",
    });
  }
};
const handleDelete = async () => {
  if (!project.value) return;
  await deleteProject(project.value.uid);
};
</script>

<template>
  <main class="app-page">
    <header class="flex gap-2 items-start">
      <div class="flex flex-1 flex-col">
        <h1 class="text-2xl font-extrabold">{{ project?.name }}</h1>
        <p class="text-muted-foreground" v-if="project?.description">{{ project?.description }}</p>
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger>
          <Button variant="ghost" size="icon"><MoreHoriz /></Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem @click="editDialogOpen = true">
            <EditPencil class="mr-2" />
            <span>Edit</span>
          </DropdownMenuItem>
          <DropdownMenuItem @click="deleteDialogOpen = true">
            <Trash class="mr-2" />
            <span>Delete</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Button class="fixed bottom-6 right-6" size="icon" @click="createSessionDialogOpen = true"><Plus /></Button>

      <DeleteDialog :opened="deleteDialogOpen" @update:opened="deleteDialogOpen = $event" @request:delete="handleDelete" />
      <EditDialog :project="project ?? undefined" :opened="editDialogOpen" @update:opened="editDialogOpen = $event" @request:edit="handleEdit" />
      <CreateDialog
          :opened="createSessionDialogOpen"
          @update:opened="createSessionDialogOpen = $event"
          @request:create:live="handleLiveCreation"
          @request:create:ended="handleEndedCreation"
      />
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
        <TableRow v-else class="w-full inline-flex items-center justify-center h-10 text-muted-foreground">No content...</TableRow>
      </TableBody>
    </Table>
  </main>
</template>
