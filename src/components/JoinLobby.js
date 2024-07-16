// import React, { useState, useEffect, useRef } from 'react';
// import { Grid, Paper, TextField, Button, Typography } from '@mui/material';
// import axios from 'axios';
// import { io } from 'socket.io-client';
// const socket = io('http://localhost:8085');
//
// const JoinLobby = () => {
//   const [lid, setLid] = useState('');
//   const [participant, setParticipant] = useState('');
//   const [error, setError] = useState('');
//
//   const handleLidChange = (event) => setLid(event.target.value);
//   const handleParticipantChange = (event) => setParticipant(event.target.value);
//
//   useEffect(() => {
//     socket.on("joinRequest-not", (data) => {
//       alert(`New participant ${data.participant} joined lobby ${data.lobbyId}`);
//     })
//   }, [socket]);
//
//   const handleJoinLobby = async (event) => {
//     event.preventDefault();
//     if (!lid || !participant) {
//       setError('Please provide all required fields.');
//       return;
//     }
//     try {
//       const response = await axios.post('http://localhost:8085/lobbies/requestJoinLobby', {
//         lid,
//         participant,
//       }, {
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       });
//       if (response.status === 200) {
//         alert(`You have joined lobby ${lid}`);
//         socket.emit('joinRequest', { lobbyId: lid, participant });
//       } else {
//         setError(response.data.message || 'Failed to send join request');
//       }
//     } catch (error) {
//       setError(error.response?.data?.message || 'Failed to send join request');
//     }
//   };
//
//   const paperStyle = { padding: 20, height: '40vh', width: 400, margin: '50px auto' };
//   const btnStyle = { margin: '8px 0' };
//
//   return (
//       <Grid container justifyContent="center" alignItems="center" style={{ minHeight: '100vh' }}>
//         <Paper elevation={10} style={paperStyle}>
//           <Typography variant="h5" align="center" gutterBottom>
//             Join Lobby
//           </Typography>
//           {error && <Typography color="error" align="center">{error}</Typography>}
//           <form onSubmit={handleJoinLobby}>
//             <TextField
//                 label="Lobby ID"
//                 placeholder="Enter lobby ID"
//                 fullWidth
//                 required
//                 value={lid}
//                 onChange={handleLidChange}
//                 style={{ marginBottom: 16 }}
//             />
//             <TextField
//                 label="Participant Email"
//                 placeholder="Enter participant email"
//                 fullWidth
//                 required
//                 value={participant}
//                 onChange={handleParticipantChange}
//                 style={{ marginBottom: 16 }}
//             />
//             <Button
//                 type="submit"
//                 color="primary"
//                 variant="contained"
//                 fullWidth
//                 style={btnStyle}
//             >
//               Join Lobby
//             </Button>
//           </form>
//         </Paper>
//       </Grid>
//   );
// };
//
// export default JoinLobby;


import React, {useState, useEffect, useContext} from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { UserContext } from './UserContext';
import { io } from 'socket.io-client';
const socket = io('http://localhost:8085');


const JoinLobby = () => {
  const { lobbyId } = useParams();
  const [lobbyCode, setLobbyCode] = useState(lobbyId || '');
  const { email } = useContext(UserContext); // Access email from UserContext// This should be dynamically set based on the logged-in user
  const navigate = useNavigate();

  useEffect(() => {
    socket.on("joinRequest-not", (data) => {
      alert(`New participant ${data.participant} joined lobby ${data.lobbyId}`);
    })
  }, [socket]);


  const handleJoinLobby = async () => {
    const response = await fetch('http://localhost:8085/requestJoinLobby', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ lid: lobbyCode, participant:email })
    });
    const data = await response.json();

    if (response.status === 200) {
        alert(`You have joined lobby ${lobbyId}`);
        socket.emit('joinRequest', { lobbyId: lobbyId, participant:email });
      }
    }
  return (
      <div className="join-lobby">
        <h1>Join Lobby</h1>
        <input
            type="text"
            placeholder="Enter Lobby Code"
            value={lobbyCode}
            onChange={(e) => setLobbyCode(e.target.value)}
        />
        <button onClick={handleJoinLobby}>Join</button>
      </div>
  );
};

export default JoinLobby;