import {Grid, Paper, TextField, Button, Typography} from '@mui/material';
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

function LogIn() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
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
            const response = await fetch('http://localhost:8082/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: email,
                    password: password
                })
            });
            const json = await response.json();
            if (response.ok) {
                const accessToken = json.accessToken;
                localStorage.setItem(email, accessToken); // Store token with email as the key
                navigate('/main');
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
                    <Typography variant="h3" sx={{ fontFamily: 'Arial, sans-serif', fontWeight: 'bold' }}>
                        Log In
                    </Typography>
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