import { Request, Response } from 'express';
import mapStatusHTTP from '../utils/status.HTTP';
import UserService from '../services/user.service';

export default class UserController {
  constructor(
    private userService = new UserService(),
  ) { }
 
  public async getByUserId(_req : Request, res : Response) {
    const id = Number(res.locals.userId);

    if (!id) return res.status(400).json({ message: 'Id is required' });

    const user = await this.userService.getByUserId(id);

    if (user.status !== 'SUCCESSFUL') {
      return res.status(mapStatusHTTP(user.status)).json(user.data);
    }

    return res.status(200).json(user.data);
  }

  public async createUser(req : Request, res : Response) {
    const user = req.body;

    const response = await this.userService.createUser(user);

    if (response.status !== 'SUCCESSFUL') {
      return res.status(mapStatusHTTP(response.status)).json(response.data);
    }

    res.status(201).json(response.data);
  }

  public async updateUser(req : Request, res : Response) : Promise<Response> {
    const user = req.body;
    const id = Number(res.locals.userId);

    const response = await this.userService.updateUser(id, user);

    if(response.status !== 'SUCCESSFUL') {
      return res.status(mapStatusHTTP(response.status)).json(response.data);
    }

    return res.status(200).json(response.data);
  }

  public async deleteUser(_req : Request, res : Response) : Promise<Response> {
    const id = Number(res.locals.userId);
    const response = await this.userService.deleteUser(id);

    if (response.status !== 'SUCCESSFUL') {
      return res.status(mapStatusHTTP(response.status)).json(response.data);
    }

    return res.status(200).json(response.data);
  }
}