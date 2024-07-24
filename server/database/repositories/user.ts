import {IUser, IUserCreateBody, UserConflictingCredentials, UserNotFound} from "~/types/user";
import prisma from "~/server/database/client";
import {PrismaClientKnownRequestError} from "@prisma/client/runtime/binary";

export async function createUser (body: IUserCreateBody): Promise<IUser> {
  try {
    return await prisma.user.create({
      data: {
        ...body,
      },
      select: {
        uid: true,
        username: true,
        email: true,
        createdAt: true,
        updatedAt: true,
      }
    });
  } catch (e) {
    switch ((e as PrismaClientKnownRequestError).code) {
      case "P2002":
        throw new UserConflictingCredentials();
      default:
        throw e;
    }
  }
}
export async function recoverUserByUid (uid: string, rich: boolean = false): Promise<IUser> {
  const user = await prisma.user.findUnique({
    omit: {
      password: !rich,
    },
    where: {
      uid,
    },
  });
  if (!user) throw new UserNotFound(uid);
  return user;
}
export async function recoverUserByUsername (username: string, rich: boolean = false): Promise<IUser> {
  const user = await prisma.user.findUnique({
    omit: {
      password: !rich,
    },
    where: {
      username
    }
  });
  if (!user) throw new UserNotFound(username);
  return user;
}
