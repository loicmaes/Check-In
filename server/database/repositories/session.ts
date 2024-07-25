import {AuthSessionNotFound, IAuthSession, IAuthSessionCreateBody, IAuthSessionRecoverBody} from "~/types/session";
import prisma from "~/server/database/client";

export async function createSession (body: IAuthSessionCreateBody, duration: number = 3600000): Promise<IAuthSession> {
  return prisma.authSession.create({
    data: {
      user: {
        connect: {
          uid: body.userUid
        }
      },
      agent: body.agent,
      expiresAt: new Date(Date.now() + duration),
    }
  });
}
export async function isGenuine (body: IAuthSessionRecoverBody): Promise<boolean> {
  return !!await prisma.authSession.findUnique({
    where: {
      userUid_token: {
        userUid: body.userUid,
        token: body.token,
      },
      expiresAt: {
        gt: new Date(),
      }
    }
  });
}
export async function recoverAuthSession (body: IAuthSessionRecoverBody): Promise<IAuthSession> {
  const session = await prisma.authSession.findUnique({
    where: {
      userUid_token: {
        userUid: body.userUid,
        token: body.token,
      }
    }
  });
  if (!session) throw new AuthSessionNotFound();
  return session;
}
export async function deleteAuthSession (body: IAuthSessionRecoverBody) {
  return prisma.authSession.delete({
    where: {
      userUid_token: {
        userUid: body.userUid,
        token: body.token,
      }
    }
  });
}
export async function deleteAllAuthSessions (userUid: string) {
  return prisma.authSession.deleteMany({
    where: {
      userUid,
    }
  });
}
