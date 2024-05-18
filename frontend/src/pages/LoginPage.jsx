import { useContext } from "react";
import AuthContext from "../context/AuthContext";

const LoginPage = () => {
  let { loginUser } = useContext(AuthContext);

  return (
    <div className="h-[calc(100vh-5rem)] w-screen flex justify-center items-center">
      <form
        action="#"
        className="flex flex-col w-80 min-h-48 p-5 rounded-xl bg-slate-200 gap-4 items-center justify-center"
        onSubmit={loginUser}
      >
        <h1 className="text-5xl self-start mb-4 text-slate-700">Login</h1>
        <input
          type="text"
          name="username"
          id="username"
          placeholder="Enter Username"
          className="w-full p-2 rounded-lg"
        />
        <input
          type="password"
          name="password"
          id="password"
          placeholder="Enter Password"
          className=" w-full p-2 rounded-lg"
        />
        <input
          type="submit"
          value="Login"
          className="w-full bg-green-500 rounded-2xl text-white h-10 hover:bg-green-700"
        />
      </form>
    </div>
  );
};
export default LoginPage;
