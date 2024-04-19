import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider} from 'react-router-dom' 
import './index.css'
import LandingPage from './pages/LandingPage'
import LoginPage from './pages/LoginPage'
import CreateAccount from './pages/CreateAccount'

const router = createBrowserRouter([
  {
  path: '/',
  element: <LandingPage />
  },
  {
    path: '/Login',
    element: <LoginPage />
  },
  {
  path:'CreateAccount',
  element: <CreateAccount />
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
