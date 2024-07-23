import {IUser, IUserCreateBody} from "~/types/user";
import prisma from "~/server/database/client";

export async function createUser (body: IUserCreateBody): Promise<IUser> {
  return prisma.user.create({
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
}
