import {defineEventHandler, getCookie, sendError, createError} from "#imports";
import {isGenuine} from "~/server/database/repositories/session";
import {AuthSessionNotFound, NotGenuineAuthSession} from "~/types/session";
import {INTERNAL_SERVER_ERROR} from "~/utils/messages";
import {authenticate} from "~/server/services/auth";
import {UserNotFound} from "~/types/user";
import {MissingRequiredFields} from "~/types/request";

export default defineEventHandler(async (event) => {
  const userUid = getCookie(event, "user-uid");
  const token = getCookie(event, "auth-token");

  if (!userUid || !token) return sendError(event, createError({
    statusCode: 400,
    statusMessage: "Invalid request body, some cookies are missing!"
  }));
  if (!await isGenuine({
    userUid,
    token
  })) return sendError(event, createError({
    statusCode: 401,
    statusMessage: "Your session is not found or has expired!",
  }));

  try {
    return await authenticate(event, {
      userUid,
      token
    });
  } catch (e) {
    if (e instanceof AuthSessionNotFound || e instanceof UserNotFound) return sendError(event, createError({
      statusCode: 404,
      statusMessage: e.message
    }));
    if (e instanceof MissingRequiredFields) return sendError(event, createError({
      statusCode: 400,
      statusMessage: e.message
    }));
    if (e instanceof NotGenuineAuthSession) return sendError(event, createError({
      statusCode: 401,
      statusMessage: e.message
    }));
    return sendError(event, createError({
      statusCode: 500,
      statusMessage: INTERNAL_SERVER_ERROR,
    }));
  }
});
