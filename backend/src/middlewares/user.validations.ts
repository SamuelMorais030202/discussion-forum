import { NextFunction, Request, Response } from "express";
import IUser from "../interfaces/user/user";
import { ILogin, NewEntity } from "../interfaces/user/user.model";

export default class UserValidations {
  private static emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  private static passwordMinLength = 4;

  static validateLogin(req : Request, res : Response, next : NextFunction) : Response | void {
    const { email, password } = req.body as ILogin;

    if (!email || !password) return res.status(400).json({ message: 'All fields must be filled' });

    if (!UserValidations.emailRegex.test(email) || password.length < UserValidations.passwordMinLength) {
      return res.status(401).json({
        message: 'Invalid email or password',
      });
    }

    next();
  }

  static validateCreateUser(req : Request, res : Response, next : NextFunction) : Response | void {
    const { email, name, lastName, password, phone } = req.body as NewEntity<IUser>

    if (!email || !name || !lastName || !password || !phone) {
      return res.status(400).json({ message: 'All fields must be filled' });
    }

    if (!UserValidations.emailRegex.test(email) || password.length < UserValidations.passwordMinLength) {
      return res.status(401).json({
        message: 'Invalid email or password',
      });
    }

    if (phone.length < 11) {
      return res.status(401).json({ message: 'Invalid phone' });
    }

    next();
  }
}