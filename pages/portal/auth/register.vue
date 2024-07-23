<script setup lang="ts">
import {NavArrowLeft} from "@iconoir/vue";
import {Card, CardContent, CardFooter, CardHeader, CardTitle} from "~/components/ui/card";
import {Button} from "~/components/ui/button";
import {FormControl, FormField, FormItem, FormLabel} from "~/components/ui/form";
import {toTypedSchema} from "@vee-validate/zod";
import * as z from "zod";
import {useForm} from "vee-validate";
import {Input} from "~/components/ui/input";
import {USERNAME_REGEX, PASSWORD_REGEX} from "~/utils/regex";
import {Separator} from "~/components/ui/separator";
import { registerUser } from "#imports";

const schema = toTypedSchema(z.object({
  username: z.string().min(1).regex(USERNAME_REGEX),
  email: z.string().min(1).email(),
  password: z.string().min(1).regex(PASSWORD_REGEX)
}));
const { handleSubmit } = useForm({
  validationSchema: schema,
});
const register = handleSubmit(async (values) => {
  await registerUser(values);
});
</script>

<template>
  <Card class="w-card mx-auto my-6">
    <CardHeader class="pt-4 gap-4">
      <Button variant="ghost" size="xs" as-child>
        <NuxtLink to="/" class="self-start gap-2 -ml-3">
          <NavArrowLeft />
          <span>Back</span>
        </NuxtLink>
      </Button>
      <CardTitle>Register</CardTitle>
    </CardHeader>
    <Separator />
    <CardContent class="p-6">
      <form class="flex flex-col gap-3" @submit="register">
        <FormField name="username" v-slot="{ componentField }">
          <FormItem>
            <FormLabel>Username</FormLabel>
            <FormControl>
              <Input v-bind="componentField" placeholder="john.doe@example.xyz" />
            </FormControl>
          </FormItem>
        </FormField>
        <FormField name="email" v-slot="{ componentField }">
          <FormItem>
            <FormLabel>Email address</FormLabel>
            <FormControl>
              <Input type="email" v-bind="componentField" placeholder="john.doe@example.xyz" />
            </FormControl>
          </FormItem>
        </FormField>
        <FormField name="password" v-slot="{ componentField }">
          <FormItem>
            <FormLabel>Password</FormLabel>
            <FormControl>
              <Input type="password" v-bind="componentField" placeholder="john.doe@example.xyz" />
            </FormControl>
          </FormItem>
        </FormField>

        <Button class="mt-6">Start the adventure</Button>
      </form>
    </CardContent>
    <CardFooter class="justify-center">
      <Button variant="link" as-child>
        <NuxtLink to="/portal/auth/login">
          I already have an account!
        </NuxtLink>
      </Button>
    </CardFooter>
  </Card>
</template>
