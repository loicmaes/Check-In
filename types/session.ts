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
