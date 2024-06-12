import React, {useState} from "react";
import backgroundIMG from "../img/background.jpg";
import {useNavigate} from "react-router-dom";
import {NavLink} from "react-router-dom";
import thumbnail from "../img/thumbnail.png";

const Register = () => {
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const [isAgency, setIsAgency] = useState(false); // State to track if the user is an agency

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.target);

        const password = data.get('password');
        const confirmPassword = data.get('confirm-password');

        // Verifică dacă parolele se potrivesca
        if (password !== confirmPassword) {
            setError('Parolele nu se potrivesc. Vă rugăm să le verificați.');
            return; // Oprire execuție dacă parolele nu se potrivesc
        }

        try {
            const response = await fetch('http://localhost:8080/api/users/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: data.get('email'),
                    password: password,
                    agencyname: isAgency ? data.get('agencyname') : null,
                    agencyphone: isAgency ? data.get('agencyphone') : null,
                }),
            });

            const result = await response.json();
            console.log(result);

            if (parseInt(result) === 409) {
                setError('E-mailul este deja înregistrat. Vă rugăm să utilizați un alt e-mail.');
            } else if (parseInt(result) === 500) {
                setError(result.message || 'Registration failed. Please try again.');
            } else {
                console.log('User registered', result);
                navigate('/login'); // Redirect only on successful registration
            }
        } catch (error) {
            console.error('Failed to register', error);
            setError('Failed to register. Please try again.');
        }
    };


    return (
        <div
            style={{
                backgroundImage: `url(${backgroundIMG})`,
                backgroundPosition: "center",
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                backgroundAttachment: "fixed",
                minHeight: "100vh",
                width: "100%",
            }}
        >
            <NavLink to="/" style={{display: "inline-block"}}>
                <img src={thumbnail} alt="Thumbnail" style={{maxWidth: "200px", height: "auto"}}/>
            </NavLink>

            <div className="min-h-screen flex items-center justify-center">
                <div className="max-w-md w-full space-y-8 bg-black py-10 px-8 rounded-lg shadow-md">
                    <div className="bg-green-700 p-5 rounded-lg mb-6 -mt-20">
                        <h2 className="text-center text-2xl font-bold text-white">
                            Înregistrare
                        </h2>
                        <p className="text-center text-sm font-medium text-white">
                            Creează un cont nou
                        </p>
                    </div>

                    <form className="mt-10 space-y-6" onSubmit={handleSubmit}>
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
                                autoComplete="new-password"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-white bg-gray-800 focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
                                placeholder="Parolă"
                            />
                        </div>
                        <div>
                            <label htmlFor="confirm-password" className="sr-only">
                                Confirmă Parola
                            </label>
                            <input
                                id="confirm-password"
                                name="confirm-password"
                                type="password"
                                autoComplete="new-password"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-white bg-gray-800 rounded-b-md focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
                                placeholder="Confirmă Parola"
                            />
                        </div>

                        {/* Checkbox to indicate if the user is an agency */}
                        <div>
                            <label className="inline-flex items-center">
                                <input
                                    type="checkbox"
                                    className="form-checkbox text-green-500"
                                    onChange={(e) => setIsAgency(e.target.checked)}
                                />
                                <span className="ml-2 text-white">Sunteți agenție?</span>
                            </label>
                        </div>

                        {/* Conditionally rendered Agency Name and Phone Number fields */}
                        {isAgency && (
                            <>
                                <div>
                                    <label htmlFor="agencyname" className="sr-only">
                                        Nume Agenție
                                    </label>
                                    <input
                                        id="agencyname"
                                        name="agencyname"
                                        type="text"
                                        required={isAgency}
                                        className="appearance-none rounded-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-white bg-gray-800 focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
                                        placeholder="Nume Agenție"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="agencyphone" className="sr-only">
                                        Număr de Telefon
                                    </label>
                                    <input
                                        id="agencyphone"
                                        name="agencyphone"
                                        type="text"
                                        required={isAgency}
                                        className="appearance-none rounded-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-white bg-gray-800 focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
                                        placeholder="Numar Telefon Agenție"
                                    />
                                </div>
                            </>
                        )}

                        <div>
                            <button
                                type="submit"
                                className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-700 hover:bg-green-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                            >
                                Înregistrare
                            </button>
                        </div>
                    </form>
                    {error && <p className="text-red-500 text-center mt-2">{error}</p>}
                    <div className="text-sm mt-6">
                        <a
                            href="/login"
                            onClick={(e) => {
                                e.preventDefault();
                                navigate("/login");
                            }}
                            className="font-medium text-green-400 hover:text-green-300"
                        >
                            Ai deja un cont? Autentifica-te!
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;