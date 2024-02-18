export interface IRequestLogin {
  email: string,
  password: string
}

export interface IRequestNewTopic {
  name: string;
  type: string;
}

export type UnionRequest = IRequestLogin | IRequestNewTopic