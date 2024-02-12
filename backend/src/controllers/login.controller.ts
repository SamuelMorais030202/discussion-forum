import { Request, Response } from "express";
import { ILogin } from "../interfaces/user/user.model";
import UserModel from "../models/user.model";
import JwtUtils from "../utils/jwt";

export default class LoginController {
  private jwtUtils = new JwtUtils();
  private model = new UserModel();

  async login(req: Request, res: Response) {
    const { email, password } = req.body as ILogin;
    const user = await this.model.findByEmail(email);

    if (!user) return res.status(401).json({ message: 'User not found' });

    if (password !== user.password) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const token = this.jwtUtils.sign({ id: user.id });
    return res.status(200).json({ token });
  }

  async loginRole(_req: Request, res: Response) {
    const id = res.locals.userId;
    const user = await this.model.findById(id);

    if (!user) return res.status(401).json({ message: 'User not found' });

    return res.status(200).json({ message: 'Authenticated user' });
  }
}