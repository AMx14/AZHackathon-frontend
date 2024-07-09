import { Grid, Paper, TextField, Button } from '@mui/material';
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

function SignUp() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleSignUp = async (event) => {
        event.preventDefault();

        if (!username || !email || !password) {
            alert('All fields are mandatory!');
            return;
        }

        try {
            const response = await fetch('http://localhost:8082/users/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: username,
                    email: email,
                    password: password,
                }),
            });

            const json = await response.json();

            if (response.ok) {
                alert('Sign Up successful!');
                navigate('/login');
            } else {
                throw new Error(json.message || 'Sign Up failed!');
            }
        } catch (error) {
            alert(`Sign Up error: ${error.message}`);
        }
    };

    const paperStyle = { padding: 20, height: '40vh', width: 500, margin: '50px auto' };
    const btnstyle = { margin: '8px 0' };

    return (
        <Grid>
            <Paper elevation={10} style={paperStyle}>
                <Grid align="center">
                    <h2>Sign Up</h2>
                </Grid>
                <TextField
                    label="Username"
                    placeholder="Enter username"
                    fullWidth
                    required
                    value={username}
                    onChange={handleUsernameChange}
                />
                <TextField
                    label="Email id"
                    placeholder="Enter email id"
                    fullWidth
                    required
                    value={email}
                    onChange={handleEmailChange}
                />
                <TextField
                    label="Password"
                    placeholder="Enter password"
                    type="password"
                    fullWidth
                    required
                    value={password}
                    onChange={handlePasswordChange}
                />
                <Button
                    type="submit"
                    color="primary"
                    variant="contained"
                    style={btnstyle}
                    fullWidth
                    onClick={handleSignUp}
                >
                    Sign Up
                </Button>
                <Grid align="center" style={{ marginTop: '20px' }}>
                    <Link to="/login" color="inherit">
                        Already have an account? Log In
                    </Link>
                </Grid>
            </Paper>
        </Grid>
    );
}

export default SignUp;