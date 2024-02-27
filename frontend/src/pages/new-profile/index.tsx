import { TextField, Button, Alert, Snackbar } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import TextFieldPassword from "../../components/TextFieldPassword";
import IErro from "../../interfaces/error";
import IUser from "../../interfaces/user";
import { postRequest } from "../../services/request";
import { handleMouseDown } from "../../utils/handleMouseDown";
import styled from './newProfile.module.css';

export default function NewProfile() {
  const [userData, setUserData] = useState<IUser>({
    name: '',
    lastName: '',
    email: '',
    password: '',
    phone: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isAccountCreated, setAccountCreated] = useState(false);
  const [erro, setErro] = useState<IErro>({
    anErrorHasOccurred: false,
    messageError: '',
  });
  const navigate = useNavigate();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUserData((preventState) => ({
      ...preventState,
      [name]: value
    }));
  };

  const changeComfirmPassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(event.target.value);
  };

  const createProfile = async () => {

    try {
      if (userData.password !== confirmPassword) {
        throw new Error('Passwords must be the same');
      }

      await postRequest('/user', userData);
      setErro({
        anErrorHasOccurred: false,
        messageError: "",
      });

      setAccountCreated(true);
      setTimeout(() => {
        setAccountCreated(false);
        navigate("/login");
      }, 3000);
    } catch (error: any) {
      setErro({
        anErrorHasOccurred: true,
        messageError: error.response?.data?.message || error.message
      });
    }
  }

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          '& > :not(style)': { m: 1 },
        }}
      >
        <h1>New Profile</h1>
        <section className={styled.sectionNewProfilePage}>
          <TextField
            id="user-name"
            label="Name"
            name="name"
            value={ userData.name }
            variant="standard"
            type="text"
            onChange={handleChange}
            data-testid="name-new-profile"
          />

          <TextField
            id="user-last-name"
            label="Last Name"
            name="lastName"
            value={ userData.lastName }
            variant="standard"
            onChange={handleChange}
            data-testid="lastName-new-profile"
          />

          <TextField
            id="user-email"
            label="Email"
            name="email"
            value={ userData.email }
            variant="standard"
            type="email"
            onChange={handleChange}
            data-testid="email-new-profile"
          />

          <TextField
            id="user-phone"
            label="Phone"
            name="phone"
            value={ userData.phone }
            variant="standard"
            onChange={handleChange}
            data-testid="phone-new-profile"
          />

          <TextFieldPassword
            label="Password"
            password={ userData.password }
            handleChange={ handleChange }
            setShowPassword={ setShowPassword }
            showPassword={ showPassword }
            dataTestid="password-new-profile"
            name="password"
            variant="standard"
          />

          <TextFieldPassword
            label="Confirm Password"
            password={ confirmPassword }
            handleChange={ changeComfirmPassword }
            setShowPassword={ setShowConfirmPassword }
            showPassword={ showConfirmPassword }
            dataTestid="confirmPassword-new-profile"
            name="confirmPassword"
            variant="standard"
          />
          
          <div className={ styled.buttonsNewProfilePage }>
            <Button
              variant="contained"
              sx={{ width: '140px', marginRight: '10px' }}
              onMouseDown={handleMouseDown}
              onClick={createProfile}
            >
              Criar conta
            </Button>
            <Button
              variant="text"
              sx={{ width: '140px' }}
              onMouseDown={handleMouseDown}
              onClick={() => navigate('/login')}
            >
              Voltar
            </Button>
          </div>

          {
            erro.anErrorHasOccurred
            ? <Alert severity='error'>{erro.messageError}</Alert>
            : null
          }
        </section>

        <Snackbar
          open={isAccountCreated}
          onClose={() => setAccountCreated(false)}
          data-testid="message"
        >
          <Alert severity="success">Account created successfully!</Alert>
        </Snackbar>
        
      </Box>
    </>
  )
}