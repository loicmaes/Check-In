import {IProject, IProjectCreateBody, ProjectConflictingName, ProjectNotFound} from "~/types/project";
import prisma from "~/server/database/client";
import {PrismaClientKnownRequestError} from "@prisma/client/runtime/binary";

export async function createProject (userUid: string, body: IProjectCreateBody): Promise<IProject> {
  try {
    return await prisma.project.create({
      data: {
        name: body.name,
        description: body.description,
        user: {
          connect: {
            uid: userUid
          }
        }
      },
      omit: {
        userUid: true,
      }
    });
  } catch (e) {
    switch ((e as PrismaClientKnownRequestError).code) {
      case "P2002":
        throw new ProjectConflictingName(body.name);
      default:
        throw e;
    }
  }
}
export async function recoverProject (userUid: string, projectUid: string): Promise<IProject> {
  const project = await prisma.project.findUnique({
    where: {
      uid: projectUid,
      userUid,
    },
    include: {
      sessions: {
        omit: {
          userUid: true,
          projectUid: true,
        }
      }
    },
    omit: {
      userUid: true,
    }
  });
  if (!project) throw new ProjectNotFound(projectUid);
  return project;
}
export async function recoverProjectsList (userUid: string): Promise<IProject[]> {
  return prisma.project.findMany({
    where: {
      userUid
    },
    omit: {
      userUid: true,
    }
  });
}
export async function deleteProject (userUid: string, projectUid: string) {
  await prisma.project.delete({
    where: {
      userUid,
      uid: projectUid,
    }
  });
}
