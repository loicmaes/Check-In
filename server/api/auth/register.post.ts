import { defineEventHandler, readBody, sendError, createError } from "#imports";
import {register} from "~/server/services/auth";
import {IUserCreateBody, UserConflictingCredentials} from "~/types/user";
import {INTERNAL_SERVER_ERROR} from "~/utils/messages";

export default defineEventHandler(async (event) => {
  try {
    return await register(event, await readBody<IUserCreateBody>(event));
  } catch (e) {
    if (e instanceof UserConflictingCredentials) sendError(event, createError({
      statusCode: 409,
      statusMessage: e.message,
    }));
    else sendError(event, createError({
      statusCode: 500,
      statusMessage: INTERNAL_SERVER_ERROR,
    }));
  }
});
