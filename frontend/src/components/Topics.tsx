import { Alert } from "@mui/material";
import { useEffect, useState } from "react";
import { ITopic } from "../interfaces/topicResponse";
import { requestData } from "../services/request";
import TopicCard from "./Topic";

export default interface ITopics {
  id: number;
  name: string;
  userId: number;
  type: string;
}

export default function Topics() {
  const [topics, setTopics] = useState<ITopic[]>();
  const [messageError, setMessageError] = useState('');
  const [failedRequest, setFailedRequest] = useState(false);

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
  
  return (
    <section>
      <h1>Tópicos</h1>

      <div>
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
    </section>
  )
}