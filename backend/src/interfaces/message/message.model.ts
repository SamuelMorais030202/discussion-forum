import IMessage from "./message";

export default interface IMessageModel {
  create(data: Partial<IMessage>): Promise<IMessage>;
  getAll(): Promise<IMessage[]>;
  getById(id: IMessage['id']): Promise<IMessage | null>;
  getMessageByUserId(userId: IMessage['userId']): Promise<IMessage[]>;
  getMessageByTopicId(topicId: IMessage['topicId']): Promise<IMessage[]>;
  deleteMessage(id: IMessage['id']): Promise<number>;
}