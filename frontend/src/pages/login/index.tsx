import React, { useState } from 'react';
import { IRequestLogin } from '../../interfaces/request';
import { handleMouseDown } from '../../utils/handleMouseDown';
import Box from '@mui/material/Box';
import { TextField, Button, Alert } from '@mui/material';
import { postRequest, setToken } from '../../services/request';
import { useNavigate } from 'react-router-dom';
import TextFieldPassword from '../../components/TextFieldPassword';
import styled from './login.module.css';

export default function Login() {
  const [formInfo, setFormInfo] = useState<IRequestLogin>({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [failedLogin, setFaliedLogin] = useState(false);
  const [messageError, setMessageError] = useState('');
  const navigate = useNavigate();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormInfo((preventState) => ({
      ...preventState,
      [name]: value
    }));
  };

  const handleLogin = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    try {
      const { token } = await postRequest('/login', formInfo);
      setToken(token);

      localStorage.setItem('token', token);
      setFormInfo({
        email: '',
        password: '',
      });

      navigate('/');
    } catch (error: any) {
      setFaliedLogin(true);
      setMessageError(error.response.data.message);
    }
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
      <section className={styled.loginSection}>
        <TextField
          id="email"
          label="Email"
          variant="outlined"
          name="email"
          value={formInfo.email}
          onChange={handleChange}
        />

        <TextFieldPassword
          handleChange={handleChange}
          label="Password"
          name="password"
          password={formInfo.password}
          setShowPassword={setShowPassword}
          showPassword={showPassword}
          variant="outlined"
        />

        <Button
          variant="contained"
          onClick={handleLogin} 
          onMouseDown={handleMouseDown}
        >
          Entrar
        </Button>

        <Button
          variant="text"
          onClick={ () => navigate('/new-profile') }
          onMouseDown={handleMouseDown}
        >
          Criar conta
        </Button>

        {
          failedLogin
          ? <Alert severity='error'>{ messageError }</Alert>
          : null
        }

      </section>
    </Box>
  );
}
