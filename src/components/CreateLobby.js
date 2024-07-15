import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/CreateLobby.css';
import { UserContext } from './UserContext'; // Import the UserContext

const CreateLobby = () => {
  const { email } = useContext(UserContext); // Access email from UserContext
  const [lobbyId, setLobbyId] = useState('');
  const [lobbyName, setLobbyName] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    if (!email) {
      alert('User email not found. Please log in.');
      navigate('/login'); // Redirect to login if email is not found
    }
  }, [email, navigate]);

  const handleCreateLobby = async () => {
    try {
      const authToken = localStorage.getItem(email); // Get the auth token using email

      if (!authToken) {
        alert('Authentication token not found. Please log in.');
        return;
      }

      const response = await axios.post('http://localhost:8080/lobbies/createLobby', {
        lid: lobbyId,
        lname: lobbyName,
        lowneremail: email
      }, {
        headers: {
          'Authorization': `Bearer ${authToken}` // Include token in headers
        }
      });

      console.log('Lobby created:', response.data);
      alert('Lobby created successfully!');
      // Navigate to CreateMCQ page with lobbyId and email
      navigate(`/create-mcq/${lobbyId}`, { state: { email } });
    } catch (error) {
      console.error('Failed to create lobby:', error);
      alert(`Failed to create lobby: ${error.response ? error.response.data.message : error.message}`);
    }
  };

  return (
    <div className="create-lobby-container">
      <h1>Create Lobby</h1>
      <div className="form-group">
        <label htmlFor="lobbyId">Lobby ID</label>
        <input
          type="text"
          id="lobbyId"
          placeholder="Enter Lobby ID"
          value={lobbyId}
          onChange={(e) => setLobbyId(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="lobbyName">Lobby Name</label>
        <input
          type="text"
          id="lobbyName"
          placeholder="Enter Lobby Name"
          value={lobbyName}
          onChange={(e) => setLobbyName(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="lobbyCreatorEmail">Lobby Creator Email</label>
        <input
          type="email"
          id="lobbyCreatorEmail"
          placeholder="Enter Your Email"
          value={email}
          readOnly
        />
      </div>
      <button className="create-lobby-button" onClick={handleCreateLobby}>Create Lobby</button>
    </div>
  );
};

export default CreateLobby;
