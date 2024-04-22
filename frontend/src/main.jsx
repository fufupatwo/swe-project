import React from "react";
import ReactDOM from "react-dom";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import LoginPage from "./pages/LoginPage";
import CreateAccount from "./pages/CreateAccount";
import HomePage from "./pages/HomePage";
import axios from "axios";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginPage />,
  },
  {
    path: "/CreateAccount",
    element: <CreateAccount />,
  },
  {
    path: "/Home",
    element: <HomePage />,
    loader: () => {
      return axios.get("http://localhost:4000/home");
    },
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
