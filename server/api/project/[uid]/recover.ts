import {defineEventHandler, sendError, createError} from "#imports";
import {isAuthenticated} from "~/server/services/auth";
import {H3Error} from "h3";
import {recoverProject} from "~/server/database/repositories/project";
import {ProjectNotFound} from "~/types/project";
import {INTERNAL_SERVER_ERROR} from "~/utils/messages";

export default defineEventHandler (async (event) => {
  const authenticated = await isAuthenticated(event);
  if (authenticated instanceof H3Error) return sendError(event, authenticated);

  const projectUid = getRouterParam(event, "uid");
  if (!projectUid) return sendError(event, createError({
    statusCode: 400,
    statusMessage: "Project uid is missing!",
  }));

  try {
    return await recoverProject(authenticated, projectUid);
  } catch (e) {
    if (e instanceof ProjectNotFound) return sendError(event, createError({
      statusCode: 404,
      statusMessage: "Project couldn't be found!",
    }));
    return sendError(event, createError({
      statusCode: 500,
      statusMessage: INTERNAL_SERVER_ERROR,
    }));
  }
});
