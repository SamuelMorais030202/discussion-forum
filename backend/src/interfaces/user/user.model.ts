import IUser from "./user";

export interface IUserModel {
  findByEmail(email: IUser['email']) : Promise<IUser | null>;
  findById(id: number): Promise<IUser | null>;
  createUser(user: Partial<IUser>) : Promise<IUser>;
  update(id : IUser['id'], data: Partial<NewEntity<IUser>>) : Promise<IUser | null>;
  delete(id : IUser['id']): Promise<number>;
}

export type NewEntity<T> = Omit<T, 'id'>;

export interface ILogin {
  email: string;
  password: string;
}