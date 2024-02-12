import { NextFunction, Request, Response } from "express";
import { ILogin } from "../interfaces/user/user.model";

export default class LoginValidation {
  private static emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  private static passwordMinLength = 4;

  static validateBodyRequest(req: Request, res: Response, next: NextFunction) {
    const { email, password } = req.body as ILogin;
    if (!email || !password) {
      return res.status(400).json({ message: 'All fields must be filled' });
    }

    if (!LoginValidation.emailRegex.test(email) || password.length < LoginValidation.passwordMinLength) {
      return res.status(401).json({
        message: 'Invalid email or password',
      });
    }

    next();
  }
}