import {IUser, IUserCreateBody} from "~/types/user";
import {IAuthSession, IAuthSessionCreateBody, IAuthSessionOptions} from "~/types/session";
import {setCookie} from "#imports";
import {EventHandlerRequest, H3Event} from "h3";
import {createUser} from "~/server/database/repositories/user";
import {createSession} from "~/server/database/repositories/session";

export async function register (event: H3Event<EventHandlerRequest>, body: IUserCreateBody, sessionOptions?: IAuthSessionOptions): Promise<IUser> {
  const user = await createUser(body);
  await makeSession(event, {
    userUid: user.uid,
    agent: "user-agent",
    options: sessionOptions
  });

  return user;
}
export async function makeSession (event: H3Event<EventHandlerRequest>, body: IAuthSessionCreateBody): Promise<IAuthSession> {
  const session = await createSession(body, (body.options?.keep ? 24 * 7 : 1) * 3600 * 1000);

  setCookie(event, "user-uid", session.userUid, {
    path: "/",
    secure: true,
    httpOnly: true,
  });
  setCookie(event, "auth-token", session.token, {
    path: "/",
    secure: true,
    httpOnly: true,
  });

  return session;
}
