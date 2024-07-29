import {IUser, IUserCreateBody} from "~/types/user";
import {
  IAuthSession,
  IAuthSessionCreateBody,
  IAuthSessionLoginBody,
  IAuthSessionOptions,
  IAuthSessionRecoverBody, NotGenuineAuthSession
} from "~/types/authSession";
import {getCookie, setCookie, deleteCookie, useRuntimeConfig, createError} from "#imports";
import {EventHandlerRequest, H3Error, H3Event} from "h3";
import {createUser, recoverUserByUid, recoverUserByUsername} from "~/server/database/repositories/user";
import {
  createSession,
  deleteAllAuthSessions, deleteAuthSession,
  isGenuine,
} from "~/server/database/repositories/session";
import argon2 from "argon2";
import {MissingRequiredFields} from "~/types/request";
import {SESSION_EXPIRED} from "~/utils/messages";

export async function isAuthenticated (event: H3Event<EventHandlerRequest>): Promise<H3Error | string> {
  const authToken = getCookie(event, "auth-token");
  const userUid = getCookie(event, "user-uid");

  if (!authToken || !userUid) return createError({
    statusCode: 401,
    statusMessage: "You need to be authenticated!",
  });
  if (!await isGenuine({
    userUid,
    token: authToken,
  })) return createError({
    statusCode: 401,
    statusMessage: SESSION_EXPIRED,
  });

  return userUid;
}
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
  const config = useRuntimeConfig();
  const session = await createSession(body, (body.options?.keep ? 24 * 7 : 1) * 3600 * 1000);

  setCookie(event, "user-uid", session.userUid, {
    path: "/",
    secure: config.env !== "development",
    httpOnly: true,
  });
  setCookie(event, "auth-token", session.token, {
    path: "/",
    secure: config.env !== "development",
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
export async function logout (event: H3Event<EventHandlerRequest>, large: boolean = false) {
  const userUid = getCookie(event, "user-uid");
  const token = getCookie(event, "auth-token");

  if (!userUid) throw new MissingRequiredFields("COOKIE: user-uid");
  if (large) await deleteAllAuthSessions(userUid);
  else {
    if (!token) throw new MissingRequiredFields("COOKIE: auth-token");
    await deleteAuthSession({
      userUid,
      token,
    });
  }

  deleteCookie(event, "user-uid");
  deleteCookie(event, "auth-token");
}
