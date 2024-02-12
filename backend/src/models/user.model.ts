import IUser from '../interfaces/user/user';
import SequelizeUser from '../database/models/SequelizeUser';
import { IUserModel, NewEntity } from '../interfaces/user/user.model';

export default class UserModel implements IUserModel {
  private model = SequelizeUser;

  async findByEmail(email: string): Promise<IUser | null> {
    const user = this.model.findOne({ where: { email } });

    if (user ==  null) return null;

    return user;
  }
 
  async findById(id: number): Promise<IUser | null> {
    const user = await this.model.findByPk(id);
    if (user == null) return null;

    return user;
  }

  async createUser(user: NewEntity<IUser>) : Promise<IUser> {
    const newUser = await this.model.create(user);
    return newUser;
  }

  async update(id: number, data: Partial<NewEntity<IUser>>): Promise<IUser | null> {
    const [affectedRows] = await this.model.update(data, { where: { id } })
    if(affectedRows === 0) return null;

    return this.findById(id);
  }

  async delete(id: number): Promise<number> {
    return this.model.destroy({ where: { id } });
  }
}