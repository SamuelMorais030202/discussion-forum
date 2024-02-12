import { Request, Response, Router } from 'express';
import Authorized from '../middlewares/authorized';
import UserController from '../controllers/user.controller';
import Validations from '../middlewares/user.validations';

const userRouter = Router();
const userController = new UserController();

userRouter.get(
  '/',
  Authorized,
  (req : Request, res : Response) => userController.getByUserId(req, res),
);

userRouter.post(
  '/',
  Validations.validateCreateUser,
  (req : Request, res : Response) => userController.createUser(req, res),
);

userRouter.put(
  '/',
  Authorized,
  Validations.validateCreateUser,
  (req: Request, res : Response) => userController.updateUser(req, res),
);

userRouter.delete(
  '/',
  Authorized,
  (req : Request, res : Response) => userController.deleteUser(req, res),
);

export default userRouter;