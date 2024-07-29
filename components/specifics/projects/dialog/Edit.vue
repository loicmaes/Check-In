<script setup lang="ts">
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "~/components/ui/dialog";
import {FormControl, FormField, FormItem, FormLabel} from "~/components/ui/form";
import {Input} from "~/components/ui/input";
import {Button} from "~/components/ui/button";
import {toTypedSchema} from "@vee-validate/zod";
import * as z from "zod";
import {useForm} from "vee-validate";
import type {IRichProject} from "~/types/project";
import {defineProps, defineEmits} from "vue";
import type {EditDialogEmitOptions} from "~/components/specifics/projects";

const props = defineProps<{
  opened: boolean;
  project?: IRichProject;
}>();
const emit = defineEmits<{
  "update:opened": [value: boolean];
  "request:edit": [value: EditDialogEmitOptions];
}>();

const editSchema = toTypedSchema(z.object({
  name: z.string().min(1).default(props.project?.name as string),
  description: z.string().optional().default(props.project?.description as string).optional(),
}));
const editForm = useForm({
  validationSchema: editSchema,
});
const handleEdit = editForm.handleSubmit(async ({ name, description }) => emit("request:edit", {
  name,
  description
}));
</script>

<template>
  <Dialog :open="opened" @update:open="$emit('update:opened', $event)">
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
              <Input v-bind="componentField" placeholder="My awesome project" />
            </FormControl>
          </FormItem>
        </FormField>
        <FormField name="description" v-slot="{ componentField }">
          <FormItem>
            <FormLabel>Description</FormLabel>
            <FormControl>
              <Input v-bind="componentField" placeholder="Describe me the best you can! (optional)" />
            </FormControl>
          </FormItem>
        </FormField>

        <DialogFooter class="self-end">
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </form>
    </DialogContent>
  </Dialog>
</template>
