export interface IAuthSession {
  userUid: string;
  token: string;
  agent: string;
  startedAt: Date;
  expiresAt: Date;
}
export interface IAuthSessionLoginBody {
  username: string;
  password: string;
}
export interface IAuthSessionCreateBody {
  userUid: string;
  agent: string;
  options?: IAuthSessionOptions;
}
export interface IAuthSessionOptions {
  keep?: boolean;
}
export interface IAuthSessionRecoverBody {
  userUid: string;
  token: string;
}
export class AuthSessionNotFound extends Error {
  constructor () {
    super("Your session couldn't be found!");
  }
}
export class NotGenuineAuthSession extends Error {
  constructor () {
    super("Your session is not genuine!");
  }
}
