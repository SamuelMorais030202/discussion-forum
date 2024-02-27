import { Avatar, Card } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ITopicResponse from "../interfaces/topicResponse";

export default function TopicCard({
  name,
  type,
  user,
  id,
}: ITopicResponse) {
  const navigate = useNavigate();

  return (
    <Card
      variant="outlined"
      sx={{
        maxWidth: 420,
        display: 'flex',
        flexDirection: 'column',
        gap: 1,
        margin: 'auto',
        cursor: 'pointer'
      }}
      onClick={() => navigate(`/topic/${id}`)}
    >
      <h3>{name}</h3>
      <p>Tema: {type}</p>
      <div>
        Criado por:
        {' '}
        {user?.name}
        {' '}
        <span>
         <Avatar sx={{ width: 18, height: 18, mr: 1 }} />
        </span>
      </div>
    </Card>
  )
}