// src/Login.js
import React, { useContext, useState } from 'react';
import { Grid, Paper, TextField, Button } from '@mui/material';
import { useNavigate, Link } from 'react-router-dom';
import { UserContext } from './UserContext';

function LogIn() {
  const { setEmail } = useContext(UserContext);
  const [email, setEmailState] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleEmailChange = (event) => {
    setEmailState(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleLogIn = async (event) => {
    event.preventDefault();
    if (!email || !password) {
      alert('All fields are mandatory!');
      return;
    }
    try {
      const response = await fetch('http://localhost:8080/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });
      const json = await response.json();
      if (response.ok) {
        const accessToken = json.accessToken;
        localStorage.setItem(email, accessToken); // Store token with email as the key
        setEmail(email); // Set the email in the context
        navigate('/main'); // Navigate to Main
      } else {
        throw new Error(json.message || 'Log In failed!');
      }
    } catch (error) {
      console.error('Log In error:', error.message);
      alert(error.message); // Display error message as alert
    }
  };

  const paperStyle = { padding: 20, height: '40vh', width: 500, margin: '50px auto' };
  const btnStyle = { margin: '8px 0' };

  return (
    <Grid>
      <Paper elevation={10} style={paperStyle}>
        <Grid align='center'>
          <h2>Log In</h2>
        </Grid>
        <TextField
          label='Email id'
          placeholder='Enter email id'
          fullWidth
          required
          value={email}
          onChange={handleEmailChange}
        />
        <TextField
          label='Password'
          placeholder='Enter password'
          type='password'
          fullWidth
          required
          value={password}
          onChange={handlePasswordChange}
        />
        <Button
          type='submit'
          color='primary'
          variant='contained'
          style={btnStyle}
          fullWidth
          onClick={handleLogIn}
        >
          Log In
        </Button>
        <Grid align='center' style={{ marginTop: '20px' }}>
          <Link to='/signup' color='inherit'>
            Sign Up
          </Link>
        </Grid>
      </Paper>
    </Grid>
  );
}

export default LogIn;
