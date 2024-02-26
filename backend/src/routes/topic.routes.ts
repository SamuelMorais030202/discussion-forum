import { Router, Request, Response } from "express";
import TopicController from "../controllers/topic.controller";
import Authorized from "../middlewares/authorized";
import TopicValidations from "../middlewares/topic.validations";

const topicRouter = Router();
const topicController = new TopicController();

topicRouter.post(
  '/',
  Authorized,
  TopicValidations.createTopic,
  (req: Request, res: Response) => topicController.create(req, res),
);

topicRouter.get(
  '/type',
  Authorized,
  TopicValidations.getTopicByType,
  (req: Request, res: Response) => topicController.getTopicByType(req, res),
);

topicRouter.get(
  '/',
  Authorized,
  (req: Request, res: Response) => topicController.getAllTopics(req, res),
);

topicRouter.get(
  '/:id',
  Authorized,
  (req: Request, res: Response) => topicController.getTopicById(req, res),
);

topicRouter.get(
  '/user/:userId',
  Authorized,
  (req: Request, res: Response) => topicController.getTopicByUser(req, res),
)

topicRouter.put(
  '/:id',
  Authorized,
  (req: Request, res: Response) => topicController.updateTopic(req, res),
);

topicRouter.delete(
  '/:id',
  Authorized,
  (req: Request, res: Response) => topicController.deleteTopic(req, res),
)

export default topicRouter;