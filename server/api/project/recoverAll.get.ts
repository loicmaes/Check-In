import {defineEventHandler, sendError} from "#imports";
import {recoverProjectsList} from "~/server/database/repositories/project";
import {isAuthenticated} from "~/server/services/auth";
import {H3Error} from "h3";

export default defineEventHandler (async (event) => {
  const authenticated = await isAuthenticated(event);
  if (authenticated instanceof H3Error) return sendError(event, authenticated);

  const projects = await recoverProjectsList(authenticated);
  if (!projects.length) return;
  return projects;
});
