import type {IUser, IUserCreateBody} from "~/types/user";
import type {IAuthSessionLoginBody} from "~/types/session";
import {useState, navigateTo} from "#imports";
import {useToast} from "~/components/ui/toast";
import {FetchError} from "ofetch";

export async function registerUser (values: IUserCreateBody): Promise<void> {
  const { toast } = useToast();

  try {
    useState<IUser>("user").value = await $fetch<IUser>("/api/auth/register", {
      method: "POST",
      body: values
    });
    toast({
      title: "Congratulations 🎉",
      description: "Your account has been created! Welcome in your interface.",
    });
    navigateTo("/");
  } catch (e) {
    toast({
      title: "Oops... 💢",
      description: (e as FetchError).statusMessage,
      variant: "destructive",
    });
  }
}
export async function loginUser (values: IAuthSessionLoginBody): Promise<void> {
  const { toast } = useToast();

  try {
    useState<IUser>("user").value = await $fetch<IUser>("/api/auth/login", {
      method: "POST",
      body: {
        ...values,
      }
    });
    toast({
      title: "Welcome back 👋",
      description: "Keep tracking your time to be more productive!"
    });
    navigateTo("/");
  } catch (e) {
    toast({
      title: "Oops... 💢",
      description: (e as FetchError).statusMessage,
      variant: "destructive",
    });
  }
}
