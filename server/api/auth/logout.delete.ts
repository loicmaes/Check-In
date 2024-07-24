import {defineEventHandler, readBody, sendError, createError} from "#imports";
import {logout} from "~/server/services/auth";
import {MissingRequiredFields} from "~/types/request";
import {INTERNAL_SERVER_ERROR} from "~/utils/messages";

export default defineEventHandler(async (event) => {
  const { all } = await readBody<{ all?: boolean }>(event);
  try {
    await logout(event, all);
  } catch (e) {
    if (e instanceof MissingRequiredFields) return sendError(event, createError({
      statusCode: 400,
      statusMessage: e.message
    }));
    return sendError(event, createError({
      statusCode: 500,
      statusMessage: INTERNAL_SERVER_ERROR,
    }));
  }
});
