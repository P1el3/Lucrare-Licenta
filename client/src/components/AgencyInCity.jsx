import React, {useEffect} from 'react';
import {NavLink, useParams, useNavigate} from "react-router-dom";
import backgroundIMG from "../img/background.jpg";
import thumbnail from "../img/thumbnail.png";
import noImg from "../img/noimg.png";

const AgencyInCity = () => {
    const navigate = useNavigate();
    const {city} = useParams();
    const [agencies, setAgencies] = React.useState([]);

    useEffect(() => {
        const url = `http://localhost:8080/api/agency/in-city/${city}`;
        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw Error("An error occurred");
                }
                return response.json();
            })
            .then(data => {
                setAgencies(data);
            })
            .catch(error => {
                console.error('Error fetching agency details', error);
            })
    }, [city]);

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
                <img
                    src={thumbnail}
                    alt="Thumbnail"
                    style={{maxWidth: "200px", height: "auto"}}
                />
            </NavLink>
            <div style={{display: "flex", flexDirection: "column", alignItems: "center", gap: "20px"}}>
                {agencies.map(agency => (
                    <div key={agency.agentieid} style={{
                        maxWidth: "600px",
                        width: "100%",
                        display: "flex",
                        backgroundColor: "rgba(0, 0, 0, 0.75)",
                        padding: "20px",
                        borderRadius: "8px",
                        boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                        color: "white",
                        fontWeight: "bold",
                        marginBottom: "20px",
                        position: "relative"
                    }}>
                        <div style={{
                            position: "absolute",
                            top: "-20px",
                            left: 0,
                            right: 0,
                            margin: "0 20px",
                            backgroundColor: "green",
                            padding: "10px",
                            borderRadius: "8px",
                            boxShadow: "0 2px 4px rgba(0,0,0,0.5)",
                            zIndex: 2
                        }}>
                            <h2 style={{margin: "0", color: "white"}}>{agency.numeagentie}</h2>
                            <h2 style={{margin: "0", color: "white"}}>Contact: {agency.nrtelagentie}</h2>
                        </div>
                        <div style={{flex: 3, marginRight: "10px", zIndex: 1}}>
                            <p style={{marginTop: "60px"}}>Masini de teren: {agency.nrmasini}</p>
                            <p>ATV-uri: {agency.nratv}</p>
                            <p>Motociclete: {agency.nrmotociclete}</p>
                            <p>Judet: {agency.localitate}</p>
                            <div style={{display: 'flex', justifyContent: 'left', margin: "20px 0"}}>
                                <button
                                    className="group relative flex justify-center py-2 px-8 border border-transparent text-sm font-medium rounded-md text-white bg-green-700 hover:bg-green-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                                    onClick={() => navigate(`/agency-details-page/${agency.agentieid}`)}>
                                    Detalii
                                </button>
                            </div>
                        </div>
                        <div style={{flex: 2, zIndex: 1, marginTop: "50px", display: 'flex', justifyContent: 'center'}}>
                            <img src={noImg} alt="Agency" style={{
                                width: "auto",
                                height: "80%",
                                objectFit: "cover",
                                borderRadius: "5px"
                            }}/>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
export default AgencyInCity;