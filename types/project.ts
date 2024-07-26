import type {ISession} from "~/types/session";

export interface IProject {
  uid: string;
  name: string;
  description: string | null;
  createdAt: Date;
  updatedAt: Date;
}
export interface IRichProject extends IProject {
  sessions: ISession[];
}
export interface IProjectCreateBody {
  name: string;
  description?: string;
  projectUid?: string;
}

export class ProjectNotFound extends Error {
  constructor (uid: string) {
    super(`Project "${uid}" was not found!`);
  }
}
export class ProjectConflictingName extends Error {
  constructor (name: string) {
    super(`Project "${name}" already exists!`);
  }
}
