import {IUser, IUserCreateBody} from "~/types/user";
import {IAuthSession, IAuthSessionCreateBody, IAuthSessionLoginBody, IAuthSessionOptions} from "~/types/session";
import {setCookie} from "#imports";
import {EventHandlerRequest, H3Event} from "h3";
import {createUser, recoverUserByUsername} from "~/server/database/repositories/user";
import {createSession} from "~/server/database/repositories/session";
import argon2 from "argon2";

export async function register (event: H3Event<EventHandlerRequest>, body: IUserCreateBody, sessionOptions?: IAuthSessionOptions): Promise<IUser> {
  body.password = await argon2.hash(body.password);
  const user = await createUser(body);
  await makeSession(event, {
    userUid: user.uid,
    agent: "user-agent",
    options: sessionOptions
  });
  return user;
}
export async function login (event: H3Event<EventHandlerRequest>, body: IAuthSessionLoginBody, sessionOptions?: IAuthSessionOptions): Promise<IUser> {
  const user = await recoverUserByUsername(body.username, true);
  if (!await argon2.verify(user.password as string, body.password)) throw new Error();
  await makeSession (event, {
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
