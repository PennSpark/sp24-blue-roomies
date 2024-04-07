import React from 'react';
import {createRoot} from 'react-dom/client';
import './index.css';
import App from './App';
import MyApp from '../src/pages/UserProfile/MyApp'

import reportWebVitals from './reportWebVitals';



import MainApp from './pages/MainApp';
import { QueryClient, QueryClientProvider } from 'react-query'; // Importing QueryClient and QueryClientProvider


import {
  createBrowserRouter, 
  RouterProvider, 
  Route
} from "react-router-dom";
import Login from './pages/LoginForm/LoginForm';
import Signup from './pages/SignupForm/Signup';
import Todo from './pages/Tasks/ToDo';
import { ProfileEdit, ProfileEditWrapper } from './pages/UserProfile/profile';
import MyLayout from './pages/UserProfile/MyLayout';

import registerServiceWorker from "../src/pages/UserProfile/registerServiceWorker";

const queryClient = new QueryClient();


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
]);

const root = createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
    <RouterProvider router={router}/>
    </QueryClientProvider>
  </React.StrictMode>
);
registerServiceWorker();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
