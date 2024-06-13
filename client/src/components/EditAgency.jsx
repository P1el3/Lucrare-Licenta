import React, {useEffect, useState} from 'react';
import backgroundIMG from "../img/background.jpg";
import {NavLink, useNavigate} from "react-router-dom";
import thumbnail from "../img/thumbnail.png";

const EditAgency = () => {
    const navigate = useNavigate();
    const [agencyDetails, setAgencyDetails] = useState(null);

    // Obiectul cu județele și prescurtările lor
    const judete = {
        "AB": "Alba", "AR": "Arad", "AG": "Argeș", "BC": "Bacău",
        "BH": "Bihor", "BN": "Bistrița-Năsăud", "BT": "Botoșani",
        "BV": "Brașov", "BR": "Brăila", "BZ": "Buzău", "CS": "Caraș-Severin",
        "CL": "Călărași", "CJ": "Cluj", "CT": "Constanța", "CV": "Covasna",
        "DB": "Dâmbovița", "DJ": "Dolj", "GL": "Galați", "GR": "Giurgiu",
        "GJ": "Gorj", "HR": "Harghita", "HD": "Hunedoara", "IL": "Ialomița",
        "IS": "Iași", "IF": "Ilfov", "MM": "Maramureș", "MH": "Mehedinți",
        "MS": "Mureș", "NT": "Neamț", "OT": "Olt", "PH": "Prahova",
        "SM": "Satu Mare", "SJ": "Sălaj", "SB": "Sibiu", "SV": "Suceava",
        "TR": "Teleorman", "TM": "Timiș", "TL": "Tulcea", "VS": "Vaslui",
        "VL": "Vâlcea", "VN": "Vrancea"
    };

    useEffect(() => {
        const userId = localStorage.getItem("userId");
        const url = `http://localhost:8080/api/agency/agency-details/${userId}`;
        fetch(url)
            .then(response => response.json())
            .then(data => {
                setAgencyDetails({
                    numeagentie: data.numeagentie || '',
                    nrtelagentie: data.nrtelagentie || '',
                    nrmasini: data.nrmasini || '',
                    nratv: data.nratv || '',
                    nrmotociclete: data.nrmotociclete || '',
                    localitate: data.localitate || '',
                    adresa: data.adresa || '',
                    agentieid: data.agentieid
                });
            })
            .catch(error => {
                console.error('Error fetching agency details', error);
            });
    }, []);

    if (!agencyDetails) {
        return <div>Loading...</div>;
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.target);
        let city;
        if (data.get('city').length === 2) {
            city = data.get('city').toUpperCase();
        } else {
            city = data.get('city');
        }// Obține orașul și convertește-l în majuscule pentru a se potrivi cu lista

        // Convertim prescurtarea în numele complet dacă este cazul
        city = judete[city] || city;  // Dacă city este o cheie în obiectul judete, folosim valoarea asociată

        // Verificăm dacă city este acum un nume valid de județ
        if (Object.values(judete).includes(city) === false) {
            alert("Localitatea nu este validă!");
            return;
        }

        const agencyUpdateDetails = {
            userid: localStorage.getItem("userId"),
            agencyid: agencyDetails.agentieid,
            numeagentie: agencyDetails.numeagentie,
            nrtelagentie: agencyDetails.nrtelagentie,
            nrmasini: agencyDetails.nrmasini,
            nratv: agencyDetails.nratv,
            nrmotociclete: agencyDetails.nrmotociclete,
            localitate: city,
            adresa: agencyDetails.adresa,
        };

        const url = `http://localhost:8080/api/agency/edit-agency/${agencyDetails.agentieid}`;
        try {
            const response = await fetch(url, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(agencyUpdateDetails)
            });
            if (!response.ok) {
                throw new Error('HTTP status ' + response.status);
            }
            const result = await response.json();
            console.log(result);
            navigate('/');
        } catch (error) {
            console.error('Failed to update agency details', error);
        }
    };

    return (
        <div
            style={{
                backgroundImage: `url(${backgroundIMG})`,
                backgroundPosition: "center",
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                minHeight: "100vh",
                width: "100%",
                paddingTop: "10px"
            }}
        >
            <NavLink to="/" style={{display: "inline-block", marginBottom: "30px"}}>
                <img src={thumbnail} alt="Thumbnail" style={{maxWidth: "200px", height: "auto"}}/>
            </NavLink>
            <div className="min-h-screen flex items-center justify-center">
                <div className="max-w-md w-full space-y-8 bg-black py-10 px-8 rounded-lg shadow-md">
                    <div className="bg-green-700 p-5 rounded-lg mb-6 -mt-20">
                        <h2 className="text-center text-2xl font-bold text-white">Editeaza-ți agenția</h2>
                    </div>
                    <form className="mt-10 space-y-6" onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="agencyname" className="block text-sm font-medium text-gray-300">
                                Nume Agenție
                            </label>
                            <input
                                id="agencyname"
                                name="agencyname"
                                type="text"
                                autoComplete="nume-agentie"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-3 border border-gray-300 text-white bg-gray-800 rounded-t-md focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
                                value={agencyDetails.numeagentie}
                                readOnly
                            />
                        </div>
                        <div>
                            <label htmlFor="agencyphone" className="block text-sm font-medium text-gray-300">
                                Număr de Telefon
                            </label>
                            <input
                                id="agencyphone"
                                name="agencyphone"
                                type="text"
                                autoComplete="numar-telefon"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-3 border border-gray-300 text-white bg-gray-800 rounded-t-md focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
                                value={agencyDetails.nrtelagentie}
                                readOnly
                            />
                        </div>
                        <div>
                            <label htmlFor="carnumber" className="block text-sm font-medium text-gray-300">
                                Numar masini de teren
                            </label>
                            <input
                                id="carnumber"
                                name="carnumber"
                                type="text"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-white bg-gray-800 focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
                                value={agencyDetails.nrmasini}
                                onChange={e => setAgencyDetails({...agencyDetails, nrmasini: e.target.value})}
                            />
                        </div>
                        <div>
                            <label htmlFor="atvnumber" className="block text-sm font-medium text-gray-300">
                                Numar ATV-uri
                            </label>
                            <input
                                id="atvnumber"
                                name="atvnumber"
                                type="text"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-white bg-gray-800 focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
                                value={agencyDetails.nratv}
                                onChange={e => setAgencyDetails({...agencyDetails, nratv: e.target.value})}
                            />
                        </div>
                        <div>
                            <label htmlFor="motorcyclenumber" className="block text-sm font-medium text-gray-300">
                                Numar motociclete
                            </label>
                            <input
                                id="motorcyclenumber"
                                name="motorcyclenumber"
                                type="text"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-white bg-gray-800 focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
                                value={agencyDetails.nrmotociclete}
                                onChange={e => setAgencyDetails({...agencyDetails, nrmotociclete: e.target.value})}
                            />
                        </div>
                        <div>
                            <label htmlFor="city" className="block text-sm font-medium text-gray-300">
                                Localitate
                            </label>
                            <input
                                id="city"
                                name="city"
                                type="text"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-white bg-gray-800 focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
                                value={agencyDetails.localitate}
                                onChange={e => setAgencyDetails({...agencyDetails, localitate: e.target.value})}
                            />
                        </div>
                        <div>
                            <label htmlFor="adress" className="block text-sm font-medium text-gray-300">
                                Adresa
                            </label>
                            <input
                                id="adress"
                                name="adress"
                                type="text"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-white bg-gray-800 focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
                                placeholder="Adresa"
                                value={agencyDetails.adresa}
                                onChange={e => setAgencyDetails({...agencyDetails, adresa: e.target.value})}
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
    );
};

export default EditAgency;
