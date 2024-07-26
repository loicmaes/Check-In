import {defineEventHandler, sendError, createError} from "#imports";
import {isAuthenticated} from "~/server/services/auth";
import {H3Error} from "h3";
import {recoverUnCategorizedSessions} from "~/server/database/repositories/project";
import {INTERNAL_SERVER_ERROR} from "~/utils/messages";

export default defineEventHandler (async (event) => {
  const authenticated = await isAuthenticated(event);
  if (authenticated instanceof H3Error) return sendError(event, authenticated);

  try {
    const drafts = await recoverUnCategorizedSessions(authenticated);
    if (!drafts.length) return;
    return drafts
  } catch (e) {
    return sendError(event, createError({
      statusCode: 500,
      statusMessage: INTERNAL_SERVER_ERROR,
    }))
  }
});
