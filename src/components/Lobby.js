import React, { useState } from 'react';

const JoinLobby = () => {
  const [lobbyCode, setLobbyCode] = useState('');
  const [showForm, setShowForm] = useState(false);

  const handleJoinClick = () => {
    setShowForm(true);
  };

  const handleJoin = () => {
    // Handle joining the lobby with lobbyCode
    console.log(`Joining lobby with code: ${lobbyCode}`);
    // Reset form after joining (optional)
    setLobbyCode('');
    setShowForm(false);
  };

  return (
    <div className="page-content">
      <h1>Join Lobby</h1>
      {!showForm && (
        <button onClick={handleJoinClick}>Join Lobby</button>
      )}
      {showForm && (
        <form onSubmit={handleJoin}>
          <input
            type="text"
            placeholder="Enter Lobby Code"
            value={lobbyCode}
            onChange={(e) => setLobbyCode(e.target.value)}
          />
          <button type="submit">Join</button>
        </form>
      )}
    </div>
  );
};

export default JoinLobby;
