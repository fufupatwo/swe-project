import React from 'react';
import ReactDOM from 'react-dom';
import { createBrowserRouter, RouterProvider } from 'react-router-dom'; 
import './index.css';
import LoginPage from './pages/LoginPage';
import CreateAccount from './pages/CreateAccount';
import HomePage from './pages/HomePage';
import Paypage from './pages/Paypage'
import LandingPage from './pages/LandingPage';

const router = createBrowserRouter([

  {
    path: '/',
    element: <LoginPage />
  },
  {
    path:'/CreateAccount',
    element: <CreateAccount />
  },
  {
    path: '/Home',
    element: <HomePage/>
  },
  {
    path: '/Pay',
    element: <Paypage/>
  },
  {
    path: '/LandingPage',
    element: <LandingPage/>
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
export default Modal;
