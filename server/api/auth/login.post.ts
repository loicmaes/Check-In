import { defineEventHandler, readBody } from "#imports";
import {login} from "~/server/services/auth";
import {IAuthSessionLoginBody} from "~/types/authSession";
import {UserNotFound} from "~/types/user";
import {INTERNAL_SERVER_ERROR} from "~/utils/messages";

export default defineEventHandler(async (event) => {
  try {
    return await login(event, await readBody<IAuthSessionLoginBody>(event));
  } catch (e) {
    if (e instanceof UserNotFound) sendError(event, createError({
      statusCode: 404,
      statusMessage: e.message,
    }));
    else sendError(event, createError({
      statusCode: 500,
      statusMessage: INTERNAL_SERVER_ERROR,
    }));
  }
});
