import { Router, Request, Response } from 'express';
import Authorized from '../middlewares/authorized';
import MessageController from '../controllers/message.controller';

const messagRouter = Router();
const messageController = new MessageController();

messagRouter.post(
  '/',
  Authorized,
  (req: Request, res: Response) => messageController.create(req, res),
);

messagRouter.get(
  '/',
  Authorized,
  (req: Request, res: Response) => messageController.getAll(req, res),
);

messagRouter.get(
  '/:id',
  Authorized,
  (req: Request, res: Response) => messageController.getMessageById(req, res),
);

messagRouter.get(
  '/user/:userId',
  Authorized,
  (req: Request, res: Response) => messageController.getMessageByUserId(req, res),
);

messagRouter.get(
  '/topic/:topicId',
  Authorized,
  (req: Request, res: Response) => messageController.getMessageByTopicId(req, res),
);

messagRouter.delete(
  '/:id',
  Authorized,
  (req: Request, res: Response) => messageController.deleteMessage(req, res),
);

export default messagRouter;