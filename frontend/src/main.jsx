import React from 'react';
import ReactDOM from 'react-dom';
import { createBrowserRouter, RouterProvider } from 'react-router-dom'; 
import './index.css';
import LoginPage from './pages/LoginPage';
import CreateAccount from './pages/CreateAccount';

const router = createBrowserRouter([

  {
    path: '/',
    element: <LoginPage />
  },
  {
    path:'CreateAccount',
    element: <CreateAccount />
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
