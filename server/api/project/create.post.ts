import {defineEventHandler, readBody, sendError, createError} from "#imports";
import {IProjectCreateBody, ProjectConflictingName} from "~/types/project";
import {createProject} from "~/server/database/repositories/project";
import {isGenuine} from "~/server/database/repositories/session";
import {INTERNAL_SERVER_ERROR, SESSION_EXPIRED} from "~/utils/messages";
import {isAuthenticated} from "~/server/services/auth";
import {H3Error} from "h3";

export default defineEventHandler(async (event) => {
  const authenticated = await isAuthenticated(event);
  if (authenticated instanceof H3Error) return sendError(event, authenticated);

  const body = await readBody<IProjectCreateBody>(event);

  try {
    return await createProject(authenticated, body);
  } catch (e) {
    if (e instanceof ProjectConflictingName) return sendError(event, createError({
      statusCode: 409,
      statusMessage: e.message,
    }));
    return sendError(event, createError({
      statusCode: 500,
      statusMessage: INTERNAL_SERVER_ERROR,
    }))
  }
});
