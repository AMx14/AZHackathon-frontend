import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import '../styles/JoinLobby.css'; // Ensure to include the CSS if any additional styles are required.

const JoinLobby = () => {
    const { lobbyId } = useParams();
    const [lobbyCode, setLobbyCode] = useState(lobbyId || '');

    const handleJoin = () => {
        // Handle joining the lobby with lobbyCode
        console.log(`Joining lobby with code: ${lobbyCode}`);
        // Reset form after joining (optional)
        setLobbyCode('');
    };

    return (
        <div className="join-lobby-container">
            <h1>Join a Lobby</h1>
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    handleJoin();
                }}
            >
                <input
                    type="text"
                    placeholder="Enter Lobby Code"
                    value={lobbyCode}
                    onChange={(e) => setLobbyCode(e.target.value)}
                />
                <button type="submit" className="join-button">Join</button>
            </form>
        </div>
    );
};

export default JoinLobby;
