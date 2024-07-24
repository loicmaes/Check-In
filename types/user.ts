export interface IUser {
  uid: string;
  username: string;
  email: string;
  password?: string;
  createdAt: Date;
  updatedAt: Date;
}
export interface IUserCreateBody {
  username: string;
  email: string;
  password: string;
}
export class UserNotFound extends Error {
  constructor (username: string) {
    super(`"${username}" does not belongs to any user!`);
  }
}
export class UserConflictingCredentials extends Error {
  constructor () {
    super("Some credentials are conflicting!");
  }
}
