import {defineEventHandler} from "#imports";
import {isAuthenticated} from "~/server/services/auth";
import {H3Error} from "h3";
import {deleteProject} from "~/server/database/repositories/project";
import {INTERNAL_SERVER_ERROR} from "~/utils/messages";

export default defineEventHandler (async (event) => {
  const authentication = await isAuthenticated(event);
  if (authentication instanceof H3Error) return sendError(event, authentication);

  const projectUid = getRouterParam(event, "uid");
  if (!projectUid) return sendError(event, createError({
    statusCode: 400,
    statusMessage: "The project uid is missing!"
  }));

  try {
    await deleteProject(authentication, projectUid);
  } catch (e) {
    return sendError(event, createError({
      statusCode: 500,
      statusMessage: INTERNAL_SERVER_ERROR,
    }));
  }
});
