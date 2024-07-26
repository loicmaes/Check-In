export type SessionType = "default" | "live";

export interface ISession {
  uid: string;
  name: string;
  type: SessionType;
  startedAt: Date;
  endedAt?: Date;
}
