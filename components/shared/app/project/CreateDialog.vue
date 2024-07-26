<script setup lang="ts">
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "~/components/ui/dialog";
import {
  FormControl,
  FormField, FormItem, FormLabel,
} from "~/components/ui/form";
import {defineProps, defineEmits, toRef} from "vue";
import {useForm} from "vee-validate";
import {toTypedSchema} from "@vee-validate/zod";
import * as z from "zod";
import {Input} from "~/components/ui/input";
import {Button} from "~/components/ui/button";
import {Textarea} from "~/components/ui/textarea";
import {createProject} from "~/composables/project";

defineProps<{
  opened: boolean;
}>();
const emit = defineEmits<{
  "update:open": [value: boolean];
}>();

const loading = ref<boolean>(false);

const schema = toTypedSchema(z.object({
  name: z.string().min(1),
  description: z.string().optional(),
}));
const { handleSubmit } = useForm({
  validationSchema: schema,
});
const handleProject = handleSubmit(async ({ name, description }) => {
  loading.value = true;
  createProject({
    name,
    description,
  })
      .then(() => emit("update:open", false))
      .finally(() => loading.value = false);
});
</script>

<template>
  <Dialog :open="opened" @update:open="$emit('update:open', $event)">
    <DialogContent>
      <DialogHeader>
        <DialogTitle>New project</DialogTitle>
        <DialogDescription>Projects are made to order your work sessions and summarize time elapsed.</DialogDescription>
      </DialogHeader>

      <form @submit="handleProject" class="flex flex-col gap-3">
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
              <Textarea v-bind="componentField" class="resize-vertical" placeholder="Describe the best your project (optional)" />
            </FormControl>
          </FormItem>
        </FormField>

        <DialogFooter class="self-end">
          <Button :disabled="loading">
            {{ loading ? "Loading..." : "Process" }}
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  </Dialog>
</template>
