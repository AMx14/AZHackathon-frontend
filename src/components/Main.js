// src/Main.js
import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from './UserContext';
import '../styles/Main.css';

const Main = () => {
  const { email } = useContext(UserContext);
  const [lobbies, setLobbies] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLobbies = async () => {
      try {
        const response = await fetch('/lobbies.json');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log('Fetched lobbies:', data);
        setLobbies(data);
      } catch (error) {
        console.error('Failed to fetch lobbies:', error);
      }
    };

    fetchLobbies();
  }, []);

  const handleLobbyClick = (lobbyId) => {
    navigate(`/join-lobby/${lobbyId}`);
  };

  return (
    <div className="main-container">
      <div className="header">
        <div className="game-info">
          <h1>QuizCombat</h1>
          <p>Some description about the game.</p>
        </div>
        <Link to="/logout">
          <button className="button logout-button">LogOut</button>
        </Link>
      </div>
      <div className="content">
        <div className="left-section">
          <button className="button create-lobby-button" onClick={() => navigate('/createLobby')}>Create Lobby</button>
          <button className="button join-lobby-button" onClick={() => navigate('/join-lobby')}>Join Lobby</button>
        </div>
        <div className="center-section">
          <div className="lobby-list">
            <h2>Lobby List</h2>
            <div className="scrollable-list">
              {lobbies.map(lobby => (
                <div
                  key={lobby.id}
                  className="lobby-item"
                  onClick={() => handleLobbyClick(lobby.id)}
                >
                  {lobby.name}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
