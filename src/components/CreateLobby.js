import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Grid, Paper, TextField, Button, List, ListItem, ListItemText, Typography, Select, MenuItem } from '@mui/material';
import io from 'socket.io-client';

const socket = io('http://localhost:8082'); // Adjust the URL as needed

function Lobby() {
    const [lobbies, setLobbies] = useState([]);
    const [lid, setLid] = useState('');
    const [lname, setLname] = useState('');
    const [lowneremail, setLowneremail] = useState(localStorage.getItem('userEmail') || '');
    const [participant, setParticipant] = useState('');
    const [joinRequests, setJoinRequests] = useState([]);
    const token = localStorage.getItem(lowneremail);

    useEffect(() => {
        fetchLobbies();

        // Listening for join requests
        socket.on('joinRequest', ({ lobbyId, participant }) => {
            setJoinRequests(prevRequests => [...prevRequests, { lid: lobbyId, participant }]);
        });

        // Cleanup on component unmount
        return () => {
            socket.off('joinRequest');
        };
    }, []);

    const fetchLobbies = async () => {
        try {
            const response = await axios.get('http://localhost:8082/lobbies/listLobby', {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            setLobbies(response.data);
        } catch (error) {
            console.error('Error fetching lobbies:', error);
        }
    };

    const handleCreateLobby = async (event) => {
        event.preventDefault();
        if (!lid || !lname || !lowneremail) {
            alert('All fields are mandatory!');
            return;
        }
        try {
            const response = await axios.post('http://localhost:8082/lobbies/createLobby', {
                lid,
                lname,
                lowneremail
            }, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            setLobbies([...lobbies, response.data]);
            setLid('');
            setLname('');
            alert('Lobby created successfully!');
        } catch (error) {
            console.error('Error creating lobby:', error.message);
            alert(error.message);
        }
    };

    const handleRequestJoinLobby = async (event) => {
        event.preventDefault();
        if (!lid || !participant) {
            alert('All fields are mandatory!');
            return;
        }
        try {
            await axios.post('http://localhost:8082/lobbies/requestJoinLobby', {
                lid,
                participant
            }, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            alert('Join request sent successfully!');
        } catch (error) {
            console.error('Error requesting to join lobby:', error.message);
            alert(error.message);
        }
    };

    const handleAddParticipant = async (lid, participant, accept) => {
        try {
            const response = await axios.post('http://localhost:8082/lobbies/addParticipant', {
                lid,
                participant,
                accept
            }, {
                headers: { 'Authorization': `Bearer ${token}` }
            });

            if (accept) {
                setLobbies(lobbies.map(lobby => lobby.lid === lid ? response.data.updatedLobby : lobby));
                alert('Participant added successfully!');
            } else {
                alert('Join request declined!');
            }
        } catch (error) {
            console.error('Error adding participant:', error.message);
            alert(error.message);
        }
    };

    const paperStyle = { padding: 20, margin: '20px auto', width: 500 };
    const btnStyle = { margin: '8px 0' };

    return (
        <Grid>
            <Paper elevation={10} style={paperStyle}>
                <Grid align='center'>
                    <Typography variant='h4'>Create a Lobby</Typography>
                </Grid>
                <form onSubmit={handleCreateLobby}>
                    <TextField
                        label='Lobby ID'
                        placeholder='Enter Lobby ID'
                        fullWidth
                        required
                        value={lid}
                        onChange={(e) => setLid(e.target.value)}
                    />
                    <TextField
                        label='Lobby Name'
                        placeholder='Enter Lobby Name'
                        fullWidth
                        required
                        value={lname}
                        onChange={(e) => setLname(e.target.value)}
                    />
                    <TextField
                        label='Owner Email'
                        placeholder='Enter Owner Email'
                        fullWidth
                        required
                        value={lowneremail}
                        onChange={(e) => setLowneremail(e.target.value)}
                    />
                    <Button
                        type='submit'
                        color='primary'
                        variant='contained'
                        style={btnStyle}
                        fullWidth
                    >
                        Create Lobby
                    </Button>
                </form>
            </Paper>
            <Paper elevation={10} style={paperStyle}>
                <Grid align='center'>
                    <Typography variant='h4'>Request to Join Lobby</Typography>
                </Grid>
                <form onSubmit={handleRequestJoinLobby}>
                    <TextField
                        label='Lobby ID'
                        placeholder='Enter Lobby ID'
                        fullWidth
                        required
                        value={lid}
                        onChange={(e) => setLid(e.target.value)}
                    />
                    <TextField
                        label='Participant Email'
                        placeholder='Enter Your Email'
                        fullWidth
                        required
                        value={participant}
                        onChange={(e) => setParticipant(e.target.value)}
                    />
                    <Button
                        type='submit'
                        color='primary'
                        variant='contained'
                        style={btnStyle}
                        fullWidth
                    >
                        Request to Join
                    </Button>
                </form>
            </Paper>
            <Paper elevation={10} style={paperStyle}>
                <Grid align='center'>
                    <Typography variant='h4'>Lobbies</Typography>
                </Grid>
                <List>
                    {lobbies.map((lobby) => (
                        <ListItem key={lobby._id}>
                            <ListItemText
                                primary={lobby.lname}
                                secondary={`ID: ${lobby.lid} | Owner: ${lobby.lowneremail}`}
                            />
                            <Select
                                value={''}
                                onChange={(e) => handleAddParticipant(lobby.lid, e.target.value, true)}
                            >
                                <MenuItem value="" disabled>Accept Join Request</MenuItem>
                                {joinRequests.filter(req => req.lid === lobby.lid).map((req, idx) => (
                                    <MenuItem key={idx} value={req.participant}>{req.participant}</MenuItem>
                                ))}
                            </Select>
                            <Button
                                color='secondary'
                                onClick={() => handleAddParticipant(lobby.lid, joinRequests.find(req => req.lid === lobby.lid)?.participant, false)}
                            >
                                Decline Join Request
                            </Button>
                        </ListItem>
                    ))}
                </List>
            </Paper>
        </Grid>
    );
}

export default Lobby;
