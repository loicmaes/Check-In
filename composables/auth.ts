import type {IUser, IUserCreateBody} from "~/types/user";
import type {IAuthSessionLoginBody} from "~/types/session";
import {useState, navigateTo, useCookie} from "#imports";
import {useToast} from "~/components/ui/toast";
import {FetchError} from "ofetch";

export const useAuthCookie = () => useCookie("auth-token");

export async function useUser (): Promise<IUser | undefined> {
  if (!useAuthCookie()) return undefined;
  const user = useState<IUser>("user");

  if (!user.value) {
    const { data } = await useFetch("/api/auth/me", {
      headers: useRequestHeaders(["cookie"])
    });
    if (!data.value) return undefined;
    user.value = data.value;
  }

  return user.value;
}

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
export async function logoutUser (all: boolean = false) {
  try {
    await $fetch("/api/auth/logout", {
      headers: useRequestHeaders(["cookie"]),
      method: "DELETE",
      body: {
        all
      }
    });
    useState("user").value = null;
  } catch (e) {
    useToast().toast({
      title: "Oops... 💢",
      description: (e as FetchError).statusMessage,
      variant: "destructive",
    });
  }
}
