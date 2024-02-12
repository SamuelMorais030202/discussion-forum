export default interface IMessage {
  id: number;
  message: string;
  userId: number;
  topicId: number;
  createdAt?: string;
}