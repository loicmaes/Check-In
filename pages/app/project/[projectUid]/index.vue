<script setup lang="ts">
import {definePageMeta, useRoute} from "#imports";
import {computed} from "vue";
import {deleteProject, updateProject, useRichProject} from "~/composables/project";
import {TableBody, TableCell, TableHead, TableHeader, TableRow} from "~/components/ui/table";
import type {ISession} from "~/types/session";
import {Button} from "~/components/ui/button";
import {Trash, MoreHoriz, EditPencil} from "@iconoir/vue";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel,
  AlertDialogContent, AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader, AlertDialogTitle,
  AlertDialogTrigger
} from "~/components/ui/alert-dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "~/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "~/components/ui/dialog";
import type {IRichProject} from "~/types/project";
import {useForm} from "vee-validate";
import {toTypedSchema} from "@vee-validate/zod";
import * as z from "zod";
import {FormControl, FormField, FormItem, FormLabel} from "~/components/ui/form";
import {Input} from "~/components/ui/input";
import {useToast} from "~/components/ui/toast";
import {FetchError} from "ofetch";

definePageMeta({
  layout: "app",
});

const { params } = useRoute();
const { projectUid } = params;

const { toast } = useToast();
const deleteDialogOpen = ref<boolean>(false);
const editDialogOpen = ref<boolean>(false);

const project = ref<IRichProject | null>(await useRichProject(projectUid as string));
const sessions = computed(() => project.value?.sessions.map((session: ISession) => ({
  ...session,
  elapsed: session.endedAt ?
      Math.round(((new Date(session.endedAt).getTime() - new Date(session.startedAt).getTime()) / (1000 * 60 * 60)) * 10) / 10
      : null,
})) || []);

const editSchema = toTypedSchema(z.object({
  name: z.string().min(1).default(project.value?.name as string),
  description: z.string().optional(),
}));
const editForm = useForm({
  validationSchema: editSchema,
});
const handleEdit = editForm.handleSubmit(async ({ name, description }) => {
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
});

const handleDelete = async () => {
  if (!project.value) return;
  await deleteProject(project.value.uid);
}
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

      <AlertDialog :open="deleteDialogOpen" @update:open="deleteDialogOpen = $event">
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
      <Dialog :open="editDialogOpen" @update:open="editDialogOpen = $event">
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit post</DialogTitle>
            <DialogDescription>Don't forget to make it clear for your!</DialogDescription>
          </DialogHeader>

          <form @submit="handleEdit" class="flex flex-col gap-4">
            <FormField name="name" v-slot="{ componentField }">
              <FormItem>
                <FormLabel>Name <span class="text-primary">*</span></FormLabel>
                <FormControl>
                  <Input v-bind="componentField" placeholder="My awesome project" :default-value="project?.name" />
                </FormControl>
              </FormItem>
            </FormField>
            <FormField name="description" v-slot="{ componentField }">
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Input v-bind="componentField" placeholder="Describe me the best you can! (optional)" :default-value="project?.description ?? undefined" />
                </FormControl>
              </FormItem>
            </FormField>

            <DialogFooter class="self-end">
              <Button type="submit">Save changes</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
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
