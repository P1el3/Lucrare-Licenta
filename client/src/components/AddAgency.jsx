import React, {useState} from 'react';
import backgroundIMG from "../img/background.jpg";
import {NavLink} from "react-router-dom";
import thumbnail from "../img/thumbnail.png";
import {useEffect} from "react";
import {useNavigate} from "react-router-dom";

const AddAgency = () => {
    const navigate = useNavigate();
    const [agencyName, setAgencyName] = useState('');
    const [agencyPhone, setAgencyPhone] = useState('');

    useEffect(() => {
        const token = localStorage.getItem("token")
        const userId = localStorage.getItem("userId");

        if (token && userId) {
            getData(userId, token);
        }
    }, []);

    const getData = async (userId, token) => {
        const url = `http://localhost:8080/api/users/is-agency/${userId}`;
        try {
            const response = await fetch(url, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            console.log(data);
            if (data['message'] === 'No agency found.') {
                console.log('No agency found.')
            } else if (data['message'] === 'Agency exists.') {
                console.log('Agency exists.');
                setAgencyPhone(data.agencyphone);
                setAgencyName(data.agencyname);
            }
        } catch (error) {
            console.error("Failed to fetch agency details:", error);
            console.log('No agency found.')
        }
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.target);
        const userId = localStorage.getItem("userId");
        const url = `http://localhost:8080/api/agency/addAgency`
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers:{
                    'content-type': 'application/json'
                },
                body: JSON.stringify({
                    userid: userId,
                    numeagentie: agencyName,
                    nrtelagentie: agencyPhone,
                    nrmasini: data.get('carnumber'),
                    nratv: data.get('atvnumber'),
                    nrmotociclete: data.get('motorcyclenumber'),
                    localitate: data.get('city')

                })
            });
            const result = await response.json();
            console.log(result);
            if( parseInt(result) === 401 ) {
                console.log('testare if-uri');
            } else {
                console.log('Agency added successfully.');
                navigate('/');
            }
        } catch (error) {
            console.error('Failed to add adgency', error);
        }
    }

    return (
        <div
            style={{
                backgroundImage: `url(${backgroundIMG})`,
                backgroundPosition: "center",
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                minHeight: "100vh",
                width: "100%",
            }}
        >
            <NavLink to="/" style={{display: "inline-block"}}>
                <img
                    src={thumbnail}
                    alt="Thumbnail"
                    style={{maxWidth: "200px", height: "auto"}}
                />
            </NavLink>
            <div className="min-h-screen flex items-center justify-center">
                <div className="max-w-md w-full space-y-8 bg-black py-10 px-8 rounded-lg shadow-md">
                    <div className="bg-green-700 p-5 rounded-lg mb-6 -mt-20">
                        <h2 className="text-center text-2xl font-bold text-white">
                            Adauga-ti agentia
                        </h2>
                    </div>

                    <form className="mt-10 space-y-6" onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="agencyname" className="sr-only">
                                Nume Agenție
                            </label>
                            <input
                                id="agencyname"
                                name="agencyname"
                                type="text"
                                autoComplete="nume-agentie"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-white bg-gray-800 rounded-t-md focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
                                placeholder="Nume Agenție"
                                value={agencyName}
                                readOnly
                                disabled={true}
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
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-white bg-gray-800 focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
                                placeholder="Numar Telefon Agenție"
                                value={agencyPhone}
                                readOnly
                                disabled={true}
                            />
                        </div>
                        <div>
                            <label htmlFor="carnumber" className="sr-only">
                                Numar masini de teren
                            </label>
                            <input
                                id="carnumber"
                                name="carnumber"
                                type="text"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-white bg-gray-800 focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
                                placeholder="Numar Masini de teren"
                            />
                        </div>
                        <div>
                            <label htmlFor="atvnumber" className="sr-only">
                                Numar ATV-uri
                            </label>
                            <input
                                id="atvnumber"
                                name="atvnumber"
                                type="text"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-white bg-gray-800 focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
                                placeholder="Numar ATV-uri"
                            />
                        </div>
                        <div>
                            <label htmlFor="motorcyclenumber" className="sr-only">
                                Numar motociclete
                            </label>
                            <input
                                id="motorcyclenumber"
                                name="motorcyclenumber"
                                type="text"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-white bg-gray-800 focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
                                placeholder="Numar Motociclete"/>
                        </div>
                        <div>
                            <label htmlFor="city" className="sr-only">
                                Localitate
                            </label>
                            <input
                                id="city"
                                name="city"
                                type="text"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-white bg-gray-800 focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
                                placeholder="Localitate"
                            />
                        </div>
                        <div>
                            <button
                                type="submit"
                                className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-700 hover:bg-green-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                            >
                                Salveaza
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default AddAgency;