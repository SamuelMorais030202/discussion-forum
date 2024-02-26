import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import { requestData, setToken, postRequest } from "../../services/request";
import { ITopic } from '../../interfaces/topicResponse';
import Message from "../../components/Message";
import './Topic.css';
import { TextField, Button, Alert } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SendIcon from '@mui/icons-material/Send';

export default function Topic() {
  const [topic, setTopic] = useState<ITopic>();
  const [messageRequest, setMessageRequest] = useState<string>('');
  const [message, setMessage] = useState<string>('');

  const params = useParams();
  const navigate = useNavigate();

  const getTopic = async () => {
    const getTopic = await requestData(`/topic/${params?.id}`);
    setTopic(getTopic);
  }

  useEffect(() => {
    (async () => {
      const token = localStorage.getItem('token') || '';
      if (!token) return navigate('/login');

      setToken(token);

      try {
        await requestData('/login/authenticated');
        getTopic();
      } catch (error: any) {
        setMessageRequest(error.response?.data?.message);
      }
    })()
  }, []);

  const createMessage = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    try {
      const createMessage = await postRequest('/message', {
        message,
        topicId: Number(params?.id)
      });

      console.log(createMessage);

      setMessage('');
      getTopic();
    } catch (error: any) {
      console.log(`Erro ao criar menssage: ${error}`)
    }
  }

  return (
    <section className="topic-page">
      <header className="title-topic">
        <Button
          variant="outlined"
          sx={{ color: 'white' }}
          onClick={() => navigate(-1)}
        >
          <ArrowBackIcon />
        </Button>

        <h1>{topic?.name || ''}</h1>

        <div>
          Criado por:
          {' '}
          <span>
            {topic?.user?.name}
          </span>
          {' '}
          <span>
            {topic?.user.lastName}
          </span>
        </div>
      </header>

      <div className="forms-message">
        <TextField
          label="Digite..."
          variant="outlined"
          value={message}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            setMessage(event.target.value)}
          sx={{ width: 300, background: 'white' }}
        />
        <Button
          variant="contained"
          endIcon={<SendIcon />}
          onClick={createMessage}
        >
          Send
        </Button>
      </div>

      <div className="messages">
        {
          topic?.messages && topic?.messages.map((item) => (
            <Message { ...item } key={item.id} />
          ))
        }
      </div>

      { messageRequest && <Alert severity='error'>{ messageRequest }</Alert> }
    </section>
  )
}