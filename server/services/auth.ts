import {IUser, IUserCreateBody} from "~/types/user";
import {
  AuthSessionNotFound,
  IAuthSession,
  IAuthSessionCreateBody,
  IAuthSessionLoginBody,
  IAuthSessionOptions,
  IAuthSessionRecoverBody, NotGenuineAuthSession
} from "~/types/session";
import {createError, getCookie, sendError, setCookie} from "#imports";
import {EventHandlerRequest, H3Event} from "h3";
import {createUser, recoverUserByUid, recoverUserByUsername} from "~/server/database/repositories/user";
import {createSession, isGenuine, recoverAuthSession} from "~/server/database/repositories/session";
import argon2 from "argon2";
import {INTERNAL_SERVER_ERROR} from "~/utils/messages";
import {MissingRequiredFields} from "~/types/request";

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
export async function authenticate (event: H3Event<EventHandlerRequest>, body: IAuthSessionRecoverBody): Promise<IUser> {
  const userUid = getCookie(event, "user-uid");
  const token = getCookie(event, "auth-token");

  if (!userUid || !token) throw new MissingRequiredFields();
  if (!await isGenuine({
    userUid: body.userUid,
    token: body.token,
  })) throw new NotGenuineAuthSession();

  return await recoverUserByUid(body.userUid);
}
