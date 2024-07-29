<script setup lang="ts">
import {toTypedSchema} from "@vee-validate/zod";
import * as z from "zod";
import {useForm} from "vee-validate";
import {defineEmits} from "vue";
import type {CreateDialogEmitOptions} from "~/components/shared/app/session";
import {FormControl, FormField, FormItem, FormLabel} from "~/components/ui/form";
import {ArrowRight} from "@iconoir/vue";
import {DialogClose, DialogFooter} from "~/components/ui/dialog";
import {Input} from "~/components/ui/input";
import {Button} from "~/components/ui/button";

const emit = defineEmits<{
  submitted: [value: CreateDialogEmitOptions]
}>();

const schema = toTypedSchema(z.object({
  name: z.string().min(1).optional(),
}));
const { handleSubmit } = useForm({
  validationSchema: schema,
});
const handle = handleSubmit(({ name }) => emit("submitted", {
  type: "live",
  name,
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

    <DialogFooter class="mt-8 gap-2">
      <DialogClose asChild>
        <Button variant="secondary">
          Cancel
        </Button>
      </DialogClose>
      <Button class="gap-2">
        <span>Let's work!</span>
        <ArrowRight />
      </Button>
    </DialogFooter>
  </form>
</template>
