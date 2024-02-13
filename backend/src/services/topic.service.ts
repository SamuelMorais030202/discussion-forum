import TopicModel from "../models/topic.model";
import ITopics from "../interfaces/topics/topics";
import { NewEntity } from "../interfaces/user/user.model";
import { ServiceMessage, ServiceResponse } from "../interfaces/service.response";

export default class TopicService {
  constructor(
    private topicModel = new TopicModel(),
  ) { }

  public async createTopic(data: NewEntity<ITopics>)
  : Promise<ServiceResponse<ITopics>> {
    const newTopic = await this.topicModel.create(data);
    return { status: 'SUCCESSFUL', data: newTopic };
  };

  public async getAllTopic(): Promise<ServiceResponse<ITopics[]>> {
    const topics = await this.topicModel.getAll();
    return { status: 'SUCCESSFUL', data: topics };
  }

  public async getTopicById(id: ITopics['id'])
  : Promise<ServiceResponse<ITopics | ServiceMessage>> {
    const topicById = await this.topicModel.getById(id);
    if (topicById === null) {
      return { status: 'CONFLICT', data: { message: 'Topic not found' } };
    };

    return { status: 'SUCCESSFUL', data: topicById };
  }

  public async getTopicByUser(userId: ITopics['userId'])
  :Promise<ServiceResponse<ITopics[]>> {
    const topics = await this.topicModel.getByUser(userId);
    if (topics === null) {
      return { status: 'NOT_FOUND', data: { message: 'Topics not found' } }
    }
    return { status: 'SUCCESSFUL', data: topics };
  }

  public async getTopicByType(type: ITopics['type'])
  : Promise<ServiceResponse<ITopics[]>> {
    const topicByType = await this.topicModel.getByType(type);
    if (topicByType === null) {
      return { status: 'NOT_FOUND', data: { message: 'Topics not found' } };
    };

    return { status: 'SUCCESSFUL', data: topicByType };
  }

  public async updateTopic({ id, name, type, userId }: ITopics)
  : Promise<ServiceResponse<ITopics>> {
    const topic = await this.topicModel.getById(id);
    if (topic === null) return { status: 'NOT_FOUND', data: { message: `${id} not found` } };

    const updateTopic = await this.topicModel.updated({
      id,
      name,
      type,
      userId
    });
    if (!updateTopic) {
      return { status: 'CONFLICT', data: { message: 'There are no updates in topic' } };
    };

    return { status: 'SUCCESSFUL', data: updateTopic };
  }

  public async deleteTopic(id: ITopics['id']): Promise<ServiceResponse<ServiceMessage>> {
    const topic = await this.topicModel.getById(id);
    if (topic === null) {
      return { status: 'NOT_FOUND', data: { message: `Topic ${id} not found` } };
    };

    await this.topicModel.delete(id);
    return { status: 'SUCCESSFUL', data: { message: `Topic ${id} not found` } };
  };
}