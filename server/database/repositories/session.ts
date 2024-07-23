import {IAuthSession, IAuthSessionCreateBody} from "~/types/session";
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
