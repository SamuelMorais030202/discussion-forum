import ITopicModel from "../interfaces/topics/topic.model";
import SequelizeTopics from "../database/models/SequelizeTopics";
import ITopics from "../interfaces/topics/topics";
import { NewEntity } from "../interfaces/user/user.model";
import SequelizeMessage from "../database/models/SequelizeMessage";

export default class TopicModel implements ITopicModel {
  private model = SequelizeTopics;

  async create({ name, type, userId }: NewEntity<ITopics>)
  : Promise<ITopics> {
    const newTopic = await this.model.create({ name, type, userId });
    return newTopic;
  }

  async getAll(): Promise<ITopics[]> {
    const topics = await this.model.findAll({
      include: [{
        model: SequelizeMessage,
        as: 'messages'
      }]
    });
    return topics;
  }

  async getById(id: ITopics['id']): Promise<ITopics | null> {
    const topic = await this.model.findByPk(id, {
      include: [{
        model: SequelizeMessage,
        as: 'messages'
      }]
    });

    if (topic === null) return null

    return topic;
  }

  async getByType(type: string): Promise<ITopics[] | null> {
    const topicByType = await this.model.findAll({
      where: { type },
      include:  [{
        model: SequelizeMessage,
        as: 'messages'
      }]
    });

    if (topicByType === null) return null;

    return topicByType;
  }

  async getByUser(userId: number): Promise<ITopics[]> {
    const userTopics = await this.model.findAll({
      where: { userId },
      include: [{
        model: SequelizeMessage,
        as: 'messages',
      }],
    });

    return userTopics;
  }

  async updated({ id, name, type, userId }: ITopics)
  : Promise<ITopics | null> {
    const [affectedRows] = await this.model
    .update({ name, type, userId }, { where: { id } });

    return affectedRows === 0 ? null : this.getById(id);
  }

  async delete(id: number): Promise<number> {
    return this.model.destroy({ where: { id } });
  }
}