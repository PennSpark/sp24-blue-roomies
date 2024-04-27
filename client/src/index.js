import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './pages/Leaderboard/style.css';

import MainApp from './pages/MainApp';

import {
  createBrowserRouter, 
  RouterProvider, 
  Route
} from "react-router-dom";
import Login from './pages/LoginForm/LoginForm';
import Signup from './pages/SignupForm/Signup';
import Todo from './pages/Tasks/ToDo';
import Board from './pages/Leaderboard/board';
import Profile from './pages/Profile/profile';
import ProfileGroup from './pages/Profile/profileGroup';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>
  },

  {
    path: "login",
    element: <Login/>
  },
  {
    path: "signup",
    element: <Signup/>
  },
  {
    path: "todo",
    element: <Todo/>
  },
  {
    path: "main",
    element: <MainApp/>
  },
  {
    path:"/leaderboard",
    element: <Board />
  },
  {
    path:"/profile",
    element: <Profile />
  },
  {
    path:"/profileGroup",
    element: <ProfileGroup />
  }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();