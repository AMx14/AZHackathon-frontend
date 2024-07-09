import { Grid, Paper, TextField, Button } from '@mui/material';
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
                //const user_id = json.user_id;
                const accessToken = json.accessToken;
                localStorage.setItem('accessToken', accessToken);
                navigate(`/formMCQ`);
            } else {
                throw new Error(json.message || 'Log In failed!');
            }
        } catch (error) {
            console.error('Log In error:', error.message);
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
