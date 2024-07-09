import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Main from './Main'; // Import your Main component
import Login from './Login'; // Import your Login component
import Signup from './Signup'; // Import your Signup component
import FormMCQ from './FormMCQ'; // Import your FormMCQ component
import Quiz from './Quiz'; // Import your Quiz component
import Result from './Result'; // Import your Result component
import Logout from './Logout'; // Import your Logout component
import CreateLobby from './CreateLobby';
import JoinLobby from './JoinLobby';
import GlobalList from './GlobalList';
import Lobby from './Lobby';
import CreateMCQ from "./CreateMCQ";
function App() {
  return (
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/main" element={<Main />} />

          <Route path="/signup" element={<Signup />} />
          <Route path="/formMCQ" element={<FormMCQ />} />
          <Route path="/main/quiz" element={<Quiz />} />
          <Route path="/result" element={<Result />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/" element={<Main />} />
        <Route path="/create-lobby" element={<CreateLobby />} />
            <Route path="/create-mcq" element={<CreateMCQ />} />
      <Route path="/join-lobby" element={<JoinLobby />} />
      <Route path="/join-lobby/:lobbyId" element={<JoinLobby />} />{/* Add more routes as needed */}
        </Routes>
      </Router>
  );
}

export default App;