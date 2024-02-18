import ITopics from "./topics";

export default interface ITopicModel {
  create(data: Partial<ITopics>): Promise<ITopics | null>;
  getAll(): Promise<ITopics[]>;
  getByType(type: ITopics['type']): Promise<ITopics[] | null>;
  getByUser(userId: ITopics['userId']): Promise<ITopics[]>;
  delete(id: ITopics['id']): Promise<number>;
  getById(id: ITopics['id']): Promise<ITopics | null>;
  updated({ id, name, type, userId }: ITopics): Promise<ITopics | null>;
}