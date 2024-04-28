
import React from 'react';
import ReactDOM from 'react-dom';
import { createBrowserRouter, RouterProvider } from 'react-router-dom'; 
import './index.css';
import LoginPage from './pages/LoginPage';
import CreateAccount from './pages/CreateAccount';
import HomePage from './pages/HomePage';
import ForgotPassword from "./pages/ForgotPasswordPage.jsx";
import axios from "axios";
import Paypage from './pages/Paypage'
import LandingPage from './pages/LandingPage';
import PostDetailPage from './pages/PostDetailPage.jsx';
import AdminLogin from './pages/AdminLoginPage.jsx';
import AdminDash from './pages/AdminDashboardPage';


const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "/CreateAccount",
    element: <CreateAccount />,
  },
  {
    path: "/Home",
    element: <HomePage />,
  },
  {
    path: '/Pay',
    element: <Paypage/>,
  },
   {

    path: '/ForgotPasswordPage',
    element: <ForgotPassword />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/post/:item_id",
    element: <PostDetailPage />,
  },
  {
    path: '/AdminLoginPage',
    element: <AdminLogin/>,
  },
  {
    path: '/AdminDashboardPage',
    element: <AdminDash/>,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
