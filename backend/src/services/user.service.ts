import UserModel from '../models/user.model';
import IUser from '../interfaces/user/user';
import { IUserModel, NewEntity } from '../interfaces/user/user.model';
import { ServiceMessage, ServiceResponse } from '../interfaces/service.response';

export default class UserService {
  constructor(
    private userModel = new UserModel(),
  ) { }

  public async createUser(user : NewEntity<IUser>) : Promise<ServiceResponse<IUser>> {
    const validatingIfTheUserExists = await this.userModel.findByEmail(user.email);

    if (validatingIfTheUserExists !== null) {
      return { status: 'CONFLICT', data: { message: 'user already registered' } }
    }

    const newUser = await this.userModel.createUser(user);
    return { status: 'SUCCESSFUL', data: newUser };
  }

  public async updateUser(id : number, user: IUser): Promise<ServiceResponse<ServiceMessage>> {
    const userFound = await this.userModel.findById(id);
    if (!userFound) return { status: 'CONFLICT', data: { message: `User ${id} not found` } };

    const update = await this.userModel.update(id, user);
    if (!update) {
      return {
        status: 'CONFLICT',
        data: {
          message: `There are no update to perform in User ${id}`
        }
      }
    }

    return { status: 'SUCCESSFUL', data: { message: 'User update' } };
  }
 
  public async deleteUser(id : number) : Promise<ServiceResponse<ServiceMessage>> {
    const userFound = await this.userModel.findById(id);
    if (!userFound) return { status: 'NOT_FOUND', data: { message: `User ${id} not found` } };

    await this.userModel.delete(id);
    return { status: 'SUCCESSFUL', data: { message: 'User deleted' } };
  }

  public async getByUserId(id: number) : Promise<ServiceResponse<IUser>> {
    const user = await this.userModel.findById(id);

    if (!user) return { status: 'NOT_FOUND', data: { message: `User ${id} not found` } };

    return { status: 'SUCCESSFUL', data: user };
  }
}