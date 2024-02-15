import { AppBar, Toolbar, Typography, IconButton } from '@mui/material';
import { AccountCircle, ExitToApp } from '@mui/icons-material';
import IHeader from '../interfaces/header';
import { useNavigate } from 'react-router-dom';

export default function Header ({ title } : IHeader) {
  const navigate = useNavigate();

  return (
    <AppBar position="static" sx={{ width: '100%' }}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          {title}
        </Typography>

        <IconButton
          color="inherit"
          sx={{ fontSize: 28, marginRight: 5 }}
          onClick={ () => navigate('/profile') }
        >
          <AccountCircle />
        </IconButton>

        <IconButton
          color="inherit"
          sx={{ fontSize: 28, marginRight: 5 }}
          onClick={ () => {
            localStorage.removeItem('token');
            navigate('/login');
          }}
        >
          <ExitToApp />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};
