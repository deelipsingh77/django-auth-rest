import React, { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";

function Navbar() {
  let { user, logoutUser } = useContext(AuthContext);
  return (
    <nav className="h-20 bg-slate-200 flex justify-between items-center p-10">
      <ul className="list-none flex flex-row justify-center items-center gap-4 text-2xl ">
        <li className="hover:text-red-500 font-semibold">
          <Link to="/">Home</Link>
        </li>
        {user ? (
          <li className="hover:text-red-500 font-semibold">
            <button
              className="bg-red-500 p-2 text-white rounded-2xl"
              onClick={logoutUser}
            >
              Logout
            </button>
          </li>
        ) : (
          <li className="hover:text-red-500 font-semibold">
            <Link to="/login">Login</Link>
          </li>
        )}
      </ul>
      {user && <h1>@{user.username}</h1>}
    </nav>
  );
}

export default Navbar;
