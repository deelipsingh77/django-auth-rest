import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import { AuthProvider } from "../context/AuthContext";

function Layout() {
  return (
    <div>
      <AuthProvider>
        <Navbar />
        <main>
          <Outlet /> {/* Nested routes will render here */}
        </main>
      </AuthProvider>
    </div>
  );
}

export default Layout;
