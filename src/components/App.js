import '../styles/App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

/** import components */
import Main from './Main';
import Quiz from './Quiz';
import Result from './Result';
import Login from './Login';
import Signup from './Signup';
import { CheckUserExist } from '../helper/helper';
import Logout from './Logout';
import Lobby from "./FormMCQ";
import FormMCQ from "./FormMCQ"; // Import Logout

/** react routes */
const router = createBrowserRouter([
  {
    path: '/',
    element: <CheckUserExist><Main /></CheckUserExist> // Protect the main page
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/signup',
    element: <Signup />
  },
  {
    path: '/formMCQ',
    element:<FormMCQ />
  },
  {
    path: '/quiz',
    element:<CheckUserExist><Quiz /></CheckUserExist>
  },
  {
    path: '/result',
    element: <CheckUserExist><Result /></CheckUserExist>
  },
  {
    path: '/logout', // Add logout route
    element: <Logout />
  }
]);

function App() {
  return (
      <>
        <RouterProvider router={router} />
      </>
  );
}

export default App;
