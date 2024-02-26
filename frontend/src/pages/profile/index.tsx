import { Box, Typography, IconButton, Button, TextField } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import IUser from "../../interfaces/user";
import api, { setToken } from "../../services/request";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Profile() {
  const [user, setUser] = useState<IUser | null>();
  const [editing, setEditing] = useState(false);
  const [editedUser, setEditedUser] = useState<IUser | null>();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('token') || '';

      token ? setToken(token) : navigate('/login');

      try {
        const { data } = await api.get('/user');
        setUser(data);
        setEditedUser(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchUser();
  }, []);

  const goBack = () => {
    navigate(-1);
  };

  const handleEdit = () => {
    setEditing(true);
  };

  const handleSave = async () => {
    const data = {
      id: editedUser?.id,
      name: editedUser?.name,
      lastName: editedUser?.lastName,
      phone: editedUser?.phone,
      email: editedUser?.email,
      password: user?.password,
    } as IUser;

    try {
      if (editedUser) {
        await api.put('/user', data );
        setEditing(false);
        setUser(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleCancel = () => {
    setEditing(false);
    setEditedUser(user);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }) as IUser | null | undefined);
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100vh"
      textAlign="center"
    >
      <IconButton onClick={goBack} style={{ position: "absolute", left: 20, top: 20 }}>
        <ArrowBackIcon />
      </IconButton>

      <section>
        <AccountCircleIcon style={{ fontSize: 60, color: "#1976d2" }} />
        <Typography variant="h4" gutterBottom>
          Profile page
        </Typography>

        {editing ? (
          <>
            <TextField
              fullWidth
              label="Nome"
              name="name"
              value={editedUser?.name || ''}
              onChange={handleInputChange}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Sobrenome"
              name="lastName"
              value={editedUser?.lastName || ''}
              onChange={handleInputChange}
              margin="normal"
            />
            <TextField
              fullWidth
              label="E-mail"
              name="email"
              value={editedUser?.email || ''}
              onChange={handleInputChange}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Celular"
              name="phone"
              value={editedUser?.phone || ''}
              onChange={handleInputChange}
              margin="normal"
            />

            <Button onClick={handleSave} variant="contained" color="primary">
              Salvar
            </Button>
            <Button onClick={handleCancel} variant="outlined" color="secondary">
              Cancelar
            </Button>
          </>
        ) : (
          <>
            <Typography>
              <strong>Nome:</strong> {user?.name}
            </Typography>
            <Typography>
              <strong>Sobrenome:</strong> {user?.lastName}
            </Typography>
            <Typography>
              <strong>E-mail:</strong> {user?.email}
            </Typography>
            <Typography>
              <strong>Celular:</strong> {user?.phone}
            </Typography>

            <Button onClick={handleEdit} variant="outlined" color="primary">
              Editar
            </Button>
          </>
        )}
      </section>
    </Box>
  );
}
