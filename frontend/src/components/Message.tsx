import { Avatar, Card } from "@mui/material";
import { IMessage } from "../interfaces/topicResponse";

export default function Message({ id, message, user, userId }: IMessage) {
  return (
    <Card id={`message-user-${id}`} variant="outlined" className="card-message">
      <div id={`user-${userId}`}>
        <Avatar sx={{ width: 18, height: 18, mr: 1 }} />
        <span>{user.name}</span>
        {' '}
        <span>{user.lastName}</span>
      </div>

      <p>{message}</p>
    </Card>
  )
}