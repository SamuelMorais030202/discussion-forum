import { Router, Request, Response } from "express";
import LoginController from "../controllers/login.controller";
import Authorized from "../middlewares/authorized";
import LoginValidation from "../middlewares/login.validations";

const loginRouter = Router();
const login = new LoginController();

loginRouter.get(
  '/authenticated',
  Authorized,
  (req: Request, res: Response) => login.loginRole(req, res),
);

loginRouter.post(
  '/',
  LoginValidation.validateBodyRequest,
  (req: Request, res: Response) => login.login(req, res),
);

export default loginRouter;