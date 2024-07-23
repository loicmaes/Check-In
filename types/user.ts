export interface IUser {
  uid: string;
  username: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}
export interface IUserCreateBody {
  username: string;
  email: string;
  password: string;
}
