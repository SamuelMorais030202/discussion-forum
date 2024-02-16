import { Avatar, Card } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ITopicResponse from "../interfaces/topicResponse";

export default function TopicCard({
  name,
  type,
  user,
  id
}: ITopicResponse) {
  const navigate = useNavigate();

  return (
    <Card
      variant="outlined"
      sx={{ maxWidth: 360 }}
      onClick={() => navigate(`/topic/${id}`)}
    >
      <h3>{name}</h3>
      <p>{type}</p>
      <div>
        Criador por
        {' '}
        {user && (
          <>
            {user.name}
            <Avatar sx={{ width: 18, height: 18, mr: 1 }} />
          </>
        )}
      </div>
    </Card>
  )
}