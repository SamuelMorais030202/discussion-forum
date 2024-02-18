import { Alert, Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { AddCircleOutline as AddCircleOutlineIcon } from '@mui/icons-material';
import { ITopic } from "../interfaces/topicResponse";
import { postRequest, requestData } from "../services/request";
import TopicCard from "./Topic";
import './style/Topics.css';

export default function Topics() {
  const [topics, setTopics] = useState<ITopic[]>([]);
  const [messageError, setMessageError] = useState<string>('');
  const [failedRequest, setFailedRequest] = useState<boolean>(false);
  const [openForm, setOpenForm] = useState<boolean>(false);
  const [newTopic, setNewTopic] = useState({ name: '', type: '' });
  const [createError, setCreateError] = useState('');

  useEffect(() => {
    (async () => {
      try {
        const fetchTopics = await requestData('/topic');
        setTopics(fetchTopics);
      } catch (error: any) {
        setMessageError(error.response?.data?.message);
        setFailedRequest(true);
      }
    })();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewTopic((prevTopic) => ({
      ...prevTopic,
      [name]: value,
    }));
  };

  const handleCreateTopic = async  () => {
    try {
      const response = await postRequest('/topic', newTopic);
      console.log(response);
      setTopics((prevState) => ([
        ...prevState,
        response,
      ]))
      setNewTopic({
        name: '',
        type: '',
      });
      setOpenForm(false);
    } catch (error: any) {
      setCreateError(error.response?.data?.message);
    }
  };

  
  return (
    <section className="home-page">
      <header className="title">
        <h1>Tópicos</h1>
        <IconButton
          onClick={() => {
            setOpenForm(true);
            setCreateError('');
          }}
          color="primary">
          <AddCircleOutlineIcon />
        </IconButton>
      </header>

      <div className="topics">
        {
          topics?.map((topic) => (
            <TopicCard
              key={topic.id}
              name={topic?.name || ''}
              type={topic?.type || ''}
              user={topic?.user || null}
              id={topic?.id}
          />
          ))
        }
      </div>

      {
        failedRequest
        ? <Alert severity='error'>{ messageError }</Alert>
        : null
      }

      <Dialog open={openForm} onClose={() => setOpenForm(false)}>
        <DialogTitle>Criar Tópico</DialogTitle>
        <DialogContent>
          {createError && <Alert severity="error">{createError}</Alert>}
          <TextField
            fullWidth
            label="Nome"
            name="name"
            value={newTopic.name}
            onChange={handleInputChange}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Type"
            name="type"
            value={newTopic.type}
            onChange={handleInputChange}
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenForm(false)}>Cancelar</Button>
          <Button onClick={handleCreateTopic}>Criar</Button>
        </DialogActions>
      </Dialog>

    </section>
  )
}