import { Request, Response } from "express";
import mapStatusHTTP from "../utils/status.HTTP";
import MessageService from "../services/message.service";

export default class MessageController {
  constructor(
    private messageService = new MessageService(),
  ) { };

  public async create(req: Request, res: Response) {
    const userId = Number(res.locals.userId);
    const { message, topicId } = req.body;
    const newMessage = await this.messageService.create({ userId, message, topicId });
    return res.status(201).json(newMessage.data);
  };

  public async getAll(_req: Request, res: Response) {
    const message = await this.messageService.getAll();
    return res.status(200).json(message.data);
  };

  public async getMessageById(req: Request, res: Response) {
    const id = Number(req.params.id);
    const messageById = await this.messageService.getById(id);
    return res.status(mapStatusHTTP(messageById.status)).json(messageById.data);
  };

  public async getMessageByUserId(req: Request, res: Response) {
    const userId = Number(req.params.userId);
    const { data, status } = await this.messageService.getMessageByUserId(userId);
    return res.status(mapStatusHTTP(status)).json(data);
  };

  public async getMessageByTopicId(req: Request, res: Response) {
    const topicId = Number(req.params.topicId);
    const { data, status } = await this.messageService.getMessageByTopicId(topicId);
    return res.status(mapStatusHTTP(status)).json(data);
  };

  public async deleteMessage(req: Request, res: Response) {
    const id = Number(req.params.id);
    const { data, status } = await this.messageService.destroyMessage(id);
    return res.status(mapStatusHTTP(status)).json(data);
  }

}