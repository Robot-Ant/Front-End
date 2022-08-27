import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useEffect } from "react";
import { message } from 'antd';

/*
const runVoal = () => {
    axios.get('http://3.36.119.221:5000/strat/vola')
      .then(res => setIsRun(res.data))
      .then(getRunning)
      .catch(function (error) {
        console.log(error);
      })
  };
*/

const theme = createTheme();

export default function LoginPage() {
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    const inputdata = new FormData(event.currentTarget);
    
    axios.post('http://127.0.0.1:5000/login', null, {
      params: {
        id: inputdata.get('id'),
        pw: inputdata.get('pw')
      }
    })
      .then((res) => {
        console.log(res.data.access_token)
        localStorage.setItem("token",res.data.access_token)
        window.location.href = '/';
      })
      .catch(function (error) {
        message.error('아이디 및 비밀번호를 확인해주세요.');
        console.log(error);
      }) 
  };

  useEffect(() => {
    if(localStorage.getItem("token")){
      navigate('/')
    }
  },[])

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="id"
              label="ID"
              name="id"
              autoComplete="id"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              label="Password"
              name="pw"
              type="password"
              id="pw"
              autoComplete="current-password"
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}