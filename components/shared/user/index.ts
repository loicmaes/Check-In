import type {IUser} from "~/types/user";

export {default as UserDropdown} from "./UserDropwdown.vue";
export {default as UserProvider} from "./UserProvider.vue";

export interface UserDropdownProps extends UserProviderProps {
  user: IUser;
}
export interface UserProviderProps {
  disablePanel?: boolean;
}
