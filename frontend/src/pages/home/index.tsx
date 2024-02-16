import { Box, CircularProgress } from "@mui/material";
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import Topics from "../../components/Topics";
import { requestData, setToken } from "../../services/request";

export default function Home() {
  const [authenticated, setAuthenticated] = useState(false)
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const token = localStorage.getItem('token') || '';
      if (!token) return navigate('/login');

      setToken(token);

      try {
        await requestData('/login/authenticated');
        setTimeout(() => {
          setAuthenticated(true);
        }, 1000);
      } catch (error) {
        navigate('/login');
        return;
      }
    })()
  }, []);

  if (!authenticated) return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      height="100vh"
    >
      <CircularProgress />
    </Box>
  )

  return (
    <section>
      <Header title="Discussion Forum" />
      <Topics />
    </section>
  )
}