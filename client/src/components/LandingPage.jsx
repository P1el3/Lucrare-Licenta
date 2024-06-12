import React from "react";
import Map from "./Map";
import ImageCarousel from "./ImageCarousell";
import {useNavigate} from "react-router-dom";

const LandingPage = () => {
    // Inițializarea stării pentru regiunea selectată
    const [selectedRegion, setSelectedRegion] = React.useState("");
    const navigate = useNavigate();
    // Funcție pentru gestionarea schimbării opțiunii selectate
    const handleRegionChange = (event) => {
        setSelectedRegion(event.target.value);
        navigate(`/agency-in-city/${event.target.value}`)
    }

    const cities = [
        "Alba", "Arad", "Arges", "Bacau", "Bihor", "Bistrita-Nasaud", "Botosani", "Brasov",
        "Braila", "Bucuresti", "Buzau", "Caras-Severin", "Calarasi", "Cluj", "Constanta",
        "Covasna", "Dambovita", "Dolj", "Galati", "Giurgiu", "Gorj", "Harghita", "Hunedoara",
        "Ialomita", "Iasi", "Ilfov", "Maramures", "Mehedinti", "Mures", "Neamt", "Olt",
        "Prahova", "Satu Mare", "Salaj", "Sibiu", "Suceava", "Teleorman", "Timis", "Tulcea",
        "Vaslui", "Valcea", "Vrancea"
    ];

    return (
        <div className="min-h-screen w-full relative bg-[#181a1b]">
            {/* Componenta Carousel pentru imagini */}
            <ImageCarousel/>

            {/* Secțiunea despre "Cine suntem?" */}
            <div className="max-w-4xl mx-auto p-8">
                <h2 className="text-4xl font-bold mb-6 text-green-400">Cine suntem?</h2>
                <p className="text-2xl mb-4 text-white font-bold">
                    BookAdventure s-a născut din dorința de a facilita iubitorilor de
                    călătorii off-road o experiență foarte plăcută în a-și găsi destinația
                    perfectă, care îmbină distracția cu adrenalina!
                </p>
                <p className="text-lg mb-4 text-white font-bold">
                    În prezent, BookAdventure este printre singurele aplicații care oferă
                    utilizatorilor un mediu prin care poți naviga ușor și toate comenzile
                    sunt foarte intuitive.
                </p>
                <p className="text-lg text-white font-bold">
                    Sistemul nostru digitalizat ajută utilizatorul să rezerve o ședință în
                    mai puțin de 5 minute și totodată, oferă siguranța disponibilității
                    cluburilor pentru rezervările efectuate. De asemenea, aceasta dispune
                    și de un sistem de recenzii pentru a vă putea împărtăși experiențele
                    și cu alți participanți la traseele pe care vi le doriți!
                </p>
            </div>
            <div className="max-w-4xl mx-auto p-8">
                <h2 className="text-4xl font-bold mb-6 text-green-400">Găsește-ți prima ta aventură!</h2>
            </div>
            <div className="w-full flex justify-center items-center p-4">
                <div style={{maxWidth: '875px'}} className="w-full">
                    <select
                        value={selectedRegion}
                        onChange={handleRegionChange}
                        className="mb-4 p-2 rounded bg-white text-black w-full"
                    >
                        <option value="">Selectează un județ.</option>
                        {cities.map(city => (
                            <option key={city} value={city}>{city}</option>
                        ))}
                    </select>
                </div>
            </div>
            <div className="flex flex-col items-center justify-center h-screen">
                <Map/>
            </div>
        </div>
    );
};

export default LandingPage;
