export interface IMessage {
  id: number;
  message: string;
  userId: number;
  topicId: number;
  user: IUserTopic
}

export interface IUserTopic {
  name: string;
  id: number;
  lastName: string;
}

export default interface ITopicResponse {
  id: number;
  name: string;
  type: string;
  user: IUserTopic | null;
}

export interface ITopic {
  id: number;
  messages: IMessage[];
  name: string;
  type: string;
  userId: number;
  user: IUserTopic;
}