import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import thumbnail from "../img/thumbnail.png";

export default function Navbar() {
  const navigate = useNavigate();

  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "1rem",
        backgroundColor: "#111213",
      }}
    >
      <div className="bg-green-700 rounded-lg p-1"> 
        <NavLink to="/" className="block">
          <img
            src={thumbnail}
            alt="Thumbnail"
            className="w-[150px] h-auto" // Setează lățimea dorită aici
          />
        </NavLink>
      </div>

      <div className="flex justify-center space-x-4">
        <button
          className="px-6 py-3 bg-green-700 text-black font-bold text-xs uppercase rounded shadow hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-green-800 focus:ring-opacity-50"
          onClick={() => navigate("/register")}
        >
          Register
        </button>
        <button
          className="px-6 py-3 bg-green-700 text-black font-bold text-xs uppercase rounded shadow hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-green-800 focus:ring-opacity-50"
          onClick={() => navigate("/login")}
        >
          LogIn
        </button>
      </div>
    </nav>
  );
}
