import type {SessionType} from "~/types/session";

export { default as CreateDialog } from "./dialog/Create.vue";
export interface CreateDialogEmitOptions {
  type: SessionType;
  name?: string;
}
export interface CreateDialogEmitEndedOptions extends CreateDialogEmitOptions {
  startDate: string;
  endDate: string;
}
