import React, { useContext } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import AuthContext from '../context/AuthContext'

const PrivateRoute = ({ children, ...rest }) => {
  let { user } = useContext(AuthContext)

  return user ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;
