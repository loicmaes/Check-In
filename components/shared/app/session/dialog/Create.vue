<script setup lang="ts">
import {defineProps, defineEmits, ref} from "vue";
import {useForm} from "vee-validate";
import * as z from "zod";
import {toTypedSchema} from "@vee-validate/zod";
import {FloppyDisk, ArrowRight} from "@iconoir/vue";
import {
  Dialog, DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle, DialogTrigger
} from "~/components/ui/dialog";
import type {SessionType} from "~/types/session";
import {Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue} from "~/components/ui/select";
import {FormControl, FormField, FormItem, FormLabel} from "~/components/ui/form";
import {Input} from "~/components/ui/input";
import {Button} from "~/components/ui/button";
import {Label} from "~/components/ui/label";
import {Separator} from "~/components/ui/separator";
import type {CreateDialogEmitEndedOptions, CreateDialogEmitOptions} from "~/components/shared/app/session";
import LiveForm from "~/components/shared/app/session/dialog/LiveForm.vue";
import EndedForm from "~/components/shared/app/session/dialog/EndedForm.vue";

defineProps<{
  opened: boolean;
}>();
const emit = defineEmits<{
  "update:opened": [value: boolean];
  "request:create:live": [value: CreateDialogEmitOptions];
  "request:create:ended": [value: CreateDialogEmitEndedOptions];
}>();

const type = ref<SessionType>("live");

const handleLive = ({ name }: Partial<CreateDialogEmitOptions>) => emit("request:create:live", {
  type: "live",
  name,
});
const handleEndedSession = ({ name, startDate, endDate }: Partial<CreateDialogEmitEndedOptions>) => emit("request:create:ended", {
  type: "ended",
  name,
  startDate,
  endDate,
});
</script>

<template>
  <Dialog :open="opened" @update:open="$emit('update:opened', $event)">
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Create a session</DialogTitle>
        <DialogDescription></DialogDescription>
      </DialogHeader>

      <div class="space-y-2">
        <Label for="type">Session Type</Label>
        <Select id="type" v-model="type">
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="live">Live</SelectItem>
            <SelectItem value="default">Ended</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Separator />

      <LiveForm
          @submitted="handleLive"
          v-if="type =='live'"
      />
      <EndedForm
          @submitted="handleEndedSession"
          v-else
      />
    </DialogContent>
  </Dialog>
</template>
