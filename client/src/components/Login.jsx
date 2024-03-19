import React from "react";
import backgroundIMG from "../img/background.jpg";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import thumbnail from "../img/thumbnail.png";

const Login = () => {
  const navigate = useNavigate();

  return (
    <div
      style={{
        backgroundImage: `url(${backgroundIMG})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        height: "100vh",
        width: "100%",
      }}
    >
      <NavLink to="/" style={{ display: "inline-block" }}>
        <img
          src={thumbnail}
          alt="Thumbnail"
          style={{ maxWidth: "200px", height: "auto" }}
        />
      </NavLink>
      <div className="min-h-screen flex items-center justify-center">
        <div className="max-w-md w-full space-y-8 bg-black py-10 px-8 rounded-lg shadow-md">
          <div className="bg-green-700 p-5 rounded-lg mb-6 -mt-20">
            <h2 className="text-center text-2xl font-bold text-white">
              Autentificare
            </h2>
            <p className="text-center text-sm font-medium text-white">
              Bine ai revenit!
            </p>
          </div>

          <form className="mt-10 space-y-6" action="#" method="POST">
            <div>
              <label htmlFor="email" className="sr-only">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-white bg-gray-800 rounded-t-md focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
                placeholder="Email"
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Parolă
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-white bg-gray-800 rounded-b-md focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
                placeholder="Parolă"
              />
            </div>
            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-700 hover:bg-green-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                Autentificare
              </button>
            </div>
          </form>
          <div className="text-sm mt-6">
            <a
              onClick={() => alert("Eh si tu acum...ghinion!")}
              className="font-medium text-green-400 hover:text-green-300"
            >
              Ai uitat parola?
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
