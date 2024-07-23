import type {IUser, IUserCreateBody} from "~/types/user";

export async function registerUser (values: IUserCreateBody): Promise<void> {
  try {
    useState<IUser>("user").value = await $fetch<IUser>("/api/auth/register", {
      method: "POST",
      body: values
    });
    console.log("Account created!");
  } catch (e) {
    console.error("Will it toast?");
  }
}
