import MessageModel from "../models/message.model";
import IMessage from "../interfaces/message/message";
import { NewEntity } from "../interfaces/user/user.model";
import { ServiceResponse, ServiceMessage } from "../interfaces/service.response";

export default class MessageService {
  constructor(
    private messageModel = new MessageModel(),
  ) { };

  public async create({ message, topicId, userId }: NewEntity<IMessage>)
  : Promise<ServiceResponse<IMessage>> {
    const create = await this.messageModel.create({ message, topicId, userId });
    return { status: 'SUCCESSFUL', data: create };
  };

  public async getAll(): Promise<ServiceResponse<IMessage[]>> {
    const message = await this.messageModel.getAll();
    return { status: 'SUCCESSFUL', data: message };
  };

  public async getById(id: IMessage['id']): Promise<ServiceResponse<IMessage>> {
    const messageById = await this.messageModel.getById(id);
    if (messageById === null) {
      return { status: 'NOT_FOUND', data: { message: 'Message not found' } };
    }
    return { status: 'SUCCESSFUL', data: messageById };
  }

  public async getMessageByUserId(userId: IMessage['userId'])
  : Promise<ServiceResponse<IMessage[]>> {
    const messageByUserId = await this.messageModel.getMessageByUserId(userId);
    if (messageByUserId === null) {
      return { status: 'NOT_FOUND', data: { message: 'Messages not found' } };
    };

    return { status: 'SUCCESSFUL', data: messageByUserId };
  };

  public async getMessageByTopicId(topicId: IMessage['topicId'])
  : Promise<ServiceResponse<IMessage[]>> {
    const messagesByTopic = await this.messageModel.getMessageByTopicId(topicId);
    if (messagesByTopic === null) {
      return { status: 'NOT_FOUND', data: {  message : 'Topic not found'} };
    };

    return { status: 'SUCCESSFUL', data: messagesByTopic };
  };

  public async destroyMessage(id: IMessage['id'])
  : Promise<ServiceResponse<ServiceMessage>> {
    const message = await this.messageModel.getById(id);

    if (message === null) {
      return { status: 'NOT_FOUND', data: { message: `${id} not founfd` } };
    };

    await this.messageModel.deleteMessage(id);
    return { status: 'SUCCESSFUL', data: { message: 'Message deleted' } };
  };
}