export interface IRequestLogin {
  email: string,
  password: string
}

export interface IRequestNewTopic {
  name: string;
  type: string;
}

export interface IRequestNewMessage {
  message: string;
  topicId: number;
}

export type UnionRequest = IRequestLogin | IRequestNewTopic | IRequestNewMessage