<script setup lang="ts">
import {toTypedSchema} from "@vee-validate/zod";
import * as z from "zod";
import {defineEmits} from "vue";
import {useForm} from "vee-validate";
import type {CreateDialogEmitEndedOptions} from "~/components/shared/app/session";
import {FormControl, FormField, FormItem, FormLabel} from "~/components/ui/form";
import {DialogClose, DialogFooter} from "~/components/ui/dialog";
import {Input} from "~/components/ui/input";
import {Button} from "~/components/ui/button";
import {FloppyDisk} from "@iconoir/vue";

const emit = defineEmits<{
  submitted: [value: CreateDialogEmitEndedOptions];
}>();

const schema = toTypedSchema(z.object({
  name: z.string().min(1).optional(),
  startDate: z.string({ required_error: "Please pick a start date." }).min(1),
  endDate: z.string({ required_error: "Please pick an end date." }).min(1)
}));
const { handleSubmit } = useForm({
  validationSchema: schema,
});
const handle = handleSubmit(({ name, startDate, endDate }) => emit("submitted", {
  type: "default",
  name,
  startDate,
  endDate
}));
</script>

<template>
  <form class="space-y-4" @submit="handle">
    <FormField name="name" v-slot="{ componentField }">
      <FormItem>
        <FormLabel>Name</FormLabel>
        <FormControl>
          <Input v-bind="componentField" />
        </FormControl>
      </FormItem>
    </FormField>
    <FormField name="startDate" v-slot="{ componentField }">
      <FormItem>
        <FormLabel>Start Date <span class="text-primary">*</span></FormLabel>
        <FormControl>
          <Input v-bind="componentField" />
        </FormControl>
      </FormItem>
    </FormField>
    <FormField name="endDate" v-slot="{ componentField }">
      <FormItem>
        <FormLabel>End Date <span class="text-primary">*</span></FormLabel>
        <FormControl>
          <Input v-bind="componentField" />
        </FormControl>
      </FormItem>
    </FormField>

    <DialogFooter class="mt-8 gap-2">
      <DialogClose asChild>
        <Button variant="secondary">
          Cancel
        </Button>
      </DialogClose>
      <Button class="gap-2">
        <FloppyDisk />
        <span>Save it!</span>
      </Button>
    </DialogFooter>
  </form>
</template>
