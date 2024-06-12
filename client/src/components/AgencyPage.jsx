import React, {useEffect} from "react";
import backgroundIMG from "../img/background.jpg";
import {NavLink, useParams} from "react-router-dom";
import thumbnail from "../img/thumbnail.png";
import noImg from "../img/noimg.png";
import Map from "./Map.jsx";

const AgencyPage = () => {
    const [agencyDetails, setAgencyDetails] = React.useState();


    const {agencyid} = useParams();
    useEffect(() => {
        const url = `http://localhost:8080/api/agency/agency-details-page/${agencyid}`;
        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw Error("An error occurred");
                }
                return response.json();
            })
            .then(data => {
                setAgencyDetails(data);
            })
            .catch(error => {
                console.error('Error fetching agency details', error)
            });
    }, [agencyid]);

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
            <div>
                {agencyDetails ? (
                    <div style={{display: "flex", flexDirection: "column", alignItems: "center", gap: "20px"}}>
                        <div key={agencyDetails.agentieid} style={{
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
                                <h2 style={{margin: "0", color: "white"}}>{agencyDetails.numeagentie}</h2>
                                <h2 style={{margin: "0", color: "white"}}>Contact: {agencyDetails.nrtelagentie}</h2>
                            </div>
                            <div style={{flex: 3, marginRight: "10px", zIndex: 1}}>
                                <p style={{marginTop: "60px"}}>Masini de teren: {agencyDetails.nrmasini}</p>
                                <p>ATV-uri: {agencyDetails.nratv}</p>
                                <p>Motociclete: {agencyDetails.nrmotociclete}</p>
                                <p>Judet: {agencyDetails.localitate}</p>
                            </div>
                            <div style={{
                                flex: 2,
                                zIndex: 1,
                                marginTop: "50px",
                                display: 'flex',
                                justifyContent: 'center'
                            }}>
                                <img src={noImg} alt="Agency" style={{
                                    width: "auto",
                                    height: "80%",
                                    objectFit: "cover",
                                    borderRadius: "5px"
                                }}/>
                            </div>
                        </div>
                    </div>
                ) : (
                    <p>Loading agency details...</p>
                )}
            </div>
            <div className="flex flex-col items-center justify-center h-screen">
                <Map/>
            </div>
        </div>
    )
}
export default AgencyPage;