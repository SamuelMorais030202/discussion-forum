import SequelizeMessage from "../database/models/SequelizeMessage";
import IMessage from "../interfaces/message/message";
import IMessageModel from "../interfaces/message/message.model";
import { NewEntity } from "../interfaces/user/user.model";

export default class MessageModel implements IMessageModel {
  private model = SequelizeMessage;

  async create({ message, topicId, userId }: NewEntity<IMessage>): Promise<IMessage> {
    const newMessage = await this.model.create({ message, topicId, userId });
    return newMessage;
  }

  async getAll(): Promise<IMessage[]> {
    const messages = await this.model.findAll();
    return messages;
  }

  async getById(id: IMessage['id']): Promise<IMessage | null> {
    const message = await this.model.findByPk(id);
    return message || null;
  }

  async getMessageByUserId(userId: IMessage['userId']): Promise<IMessage[]> {
    const messageByUserId = await this.model.findAll({ where: { userId } });
    return messageByUserId;
  };

  async getMessageByTopicId(topicId: IMessage['topicId']): Promise<IMessage[]> {
    const messageByUserId = await this.model.findAll({ where: { topicId } });
    return messageByUserId;
  }

  async deleteMessage(id: IMessage['id']): Promise<number> {
    return this.model.destroy({ where: { id } });
  }
}