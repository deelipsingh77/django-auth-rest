import React from "react";
import { createBrowserRouter } from "react-router-dom";

import Layout from "../components/Layout";
import LoginPage from "../pages/LoginPage";
import HomePage from "../pages/HomePage";
import PrivateRoute from "../utils/PrivateRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: (
          <PrivateRoute>
            <HomePage />
          </PrivateRoute>
        ),
      },
      { path: "login", element: <LoginPage /> },
    ],
  },
]);

export default router;
