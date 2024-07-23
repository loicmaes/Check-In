import { defineEventHandler, readBody } from "#imports";
import {register} from "~/server/services/auth";
import {IUser, IUserCreateBody} from "~/types/user";

export default defineEventHandler(async (event): Promise<IUser> => {
  return await register(event, await readBody<IUserCreateBody>(event));
});
