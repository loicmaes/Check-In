export interface IAuthSession {
  userUid: string;
  token: string;
  agent: string;
  startedAt: Date;
  expiresAt: Date;
}
export interface IAuthSessionCreateBody {
  userUid: string;
  agent: string;
  options?: IAuthSessionOptions;
}
export interface IAuthSessionOptions {
  keep?: boolean;
}
