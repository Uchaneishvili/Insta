export enum IType {
  USER = 0,
  TAG = 1,
}

export interface IUser {
  _id: string;
  image: string;
  type: IType;
  userName: string;
  mediaCount: number;
}
export interface IUserQuery {
  userName?: string;
}
