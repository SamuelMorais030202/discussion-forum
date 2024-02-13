import { Request, Response } from "express";
import mapStatusHTTP from "../utils/status.HTTP";
import TopicService from "../services/topic.service";

export default class TopicController {
  constructor (
    private topicService = new TopicService(),
  ) { }

  public async create(req: Request, res: Response) {
    const userId = Number(res.locals.userId);
    const { name, type } = req.body;
    const response = await this.topicService
      .createTopic({ userId, name, type });
    return res.status(201).json(response.data);
  };

  public async getAllTopics(_req: Request, res: Response) {
    const topics = await this.topicService.getAllTopic();
    return res.status(200).json(topics.data);
  }

  public async getTopicById(req: Request, res: Response) {
    const id = Number(req.params.id);
    const topic = await this.topicService.getTopicById(Number(id));
    return res.status(mapStatusHTTP(topic.status)).json(topic.data);
  };

  public async getTopicByUser(req: Request, res: Response) {
    const userId = Number(req.params.userId);
    const topics = await this.topicService.getTopicByUser(userId);
    return res.status(mapStatusHTTP(topics.status)).json(topics.data);
  }

  public async getTopicByType(req: Request, res: Response) {
    const { type } = req.body;
    const { data, status } = await this.topicService.getTopicByType(type);
    return res.status(mapStatusHTTP(status)).json(data);
  };

  public async updateTopic(req: Request, res: Response) {
    const userId = Number(res.locals.userId);
    const id = Number(req.params.id);
    const { name, type, createdAt } = req.body;

    const update = await this.topicService.updateTopic({ id, userId, name, type });
    return res.status(mapStatusHTTP(update.status)).json(update.data);
  };

  public async deleteTopic(req: Request, res: Response) {
    const id = Number(req.params.id);
    const destroy = await this.topicService.deleteTopic(id);
    return res.status(mapStatusHTTP(destroy.status)).json(destroy.data);
  }
}