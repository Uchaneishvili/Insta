export enum IType {
  USER = 0,
  TAG = 1,
}

export interface IUser {
  _id: string;
  image: string;
  type: IType;
  userName: string;
  password: string;
  name?: string;
  mediaCount: number;
}
export interface IUserQuery {
  userName?: string;
  name?: string;
}
