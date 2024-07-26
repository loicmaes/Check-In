import {defineEventHandler, readBody, getRouterParam, sendError, createError} from "#imports";
import {isAuthenticated} from "~/server/services/auth";
import {H3Error} from "h3";
import {IProjectUpdateBody} from "~/types/project";
import {updateProject} from "~/server/database/repositories/project";
import {INTERNAL_SERVER_ERROR} from "~/utils/messages";
import {PrismaClientKnownRequestError} from "@prisma/client/runtime/binary";

export default defineEventHandler (async (event) => {
  const authenticated = await isAuthenticated(event);
  if (authenticated instanceof H3Error) return sendError(event, authenticated);

  const projectUid = getRouterParam(event, "uid");
  if (!projectUid) return sendError(event, createError({
    statusCode: 400,
    statusMessage: "Project uid is missing!",
  }));

  const body = await readBody<IProjectUpdateBody>(event);

  try {
    return await updateProject(authenticated, projectUid, body);
  } catch (e) {
    switch ((e as PrismaClientKnownRequestError).code) {
      case "P2002":
        return sendError(event, createError({
          statusCode: 409,
          statusMessage: "The new name you're trying to set is already taken!",
        }))
      default:
        return sendError(event, createError({
          statusCode: 500,
          statusMessage: INTERNAL_SERVER_ERROR,
        }))
    }
  }
});
