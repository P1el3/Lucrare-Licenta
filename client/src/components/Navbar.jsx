import {NavLink, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import thumbnail from "../img/thumbnail.png";

export default function Navbar() {
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [hasAgencyDetails, setHasAgencyDetails] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("token");
        const userId = localStorage.getItem("userId");
        setIsLoggedIn(!!token);  // Setează starea de logare pe baza existenței tokenului

        if (token && userId) {
            fetchAgencyDetails(userId, token);
        }
    }, []);

    // Functia fetchAgencyDetails se ocupă de verificarea detaliilor agenției
    const fetchAgencyDetails = async (userId, token) => {
        try {
            const response = await fetch(`http://localhost:8080/api/users/is-agency/${userId}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,  // Adaugă token-ul de autentificare
                    'Content-Type': 'application/json'
                }
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`); // Gestionează răspunsurile non-ok
            }
            const data = await response.json();
            console.log(data);
            if (data['message'] === 'No agency found.') {
                setHasAgencyDetails(false);
            } else if (data['message'] === 'Agency exists.') {
                setHasAgencyDetails(true);
            }
        } catch (error) {
            console.error("Failed to fetch agency details:", error);
            setHasAgencyDetails(false);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
        setIsLoggedIn(false);
        setHasAgencyDetails(false); // Resetează detalii agenției la logout
    };

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
                    <img src={thumbnail} alt="Thumbnail" className="w-[150px] h-auto"/>
                </NavLink>
            </div>
            <div className="flex justify-center space-x-4">
                {!isLoggedIn ? (
                    <>
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
                            Log In
                        </button>
                    </>
                ) : (
                    <>
                        {hasAgencyDetails && (
                            <button
                                className="px-6 py-3 bg-green-700 text-black font-bold text-xs uppercase rounded shadow hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-green-800 focus:ring-opacity-50"
                                onClick={() => navigate("/edit-agency")}
                            >
                                Editeaza Agentie
                            </button>
                        )}
                        {hasAgencyDetails && (

                            <button
                                className="px-6 py-3 bg-green-700 text-black font-bold text-xs uppercase rounded shadow hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-green-800 focus:ring-opacity-50"
                                onClick={() => navigate("/add-agency")}
                            >
                                Adauga Agenție
                            </button>
                        )}
                        <button
                            className="px-6 py-3 bg-green-700 text-black font-bold text-xs uppercase rounded shadow hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-green-800 focus:ring-opacity-50"
                            onClick={handleLogout}
                        >
                            Log Out
                        </button>


                    </>
                )}
            </div>
        </nav>
    );
}