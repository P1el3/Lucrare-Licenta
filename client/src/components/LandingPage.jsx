import React from "react";
import Map from "./Map";
import ImageCarousel from "./ImageCarousell";

const LandingPage = () => {
  return (
    <div className="min-h-screen w-full relative bg-[#181a1b]">
      <ImageCarousel />
      <div className="max-w-4xl mx-auto p-8">
        <h2 className="text-4xl font-bold mb-6 text-green-400">Cine suntem</h2>
        <p className="text-2xl mb-4 text-white font-bold">
          Booksport s-a născut din dorința de a facilita iubitorilor de sport
          accesul în bazele sportive din toată țara.
        </p>
        <p className="text-lg mb-4 text-white font-bold">
          În prezent, Booksport este prima și cea mai mare platformă din România
          axată exclusiv pe rezervări online de terenuri sportive și activități
          conexe. Am reușit să aducem sportul mai aproape de oameni printr-un
          sistem inteligent de rezervări cu plată online, eficientizând întregul
          proces.
        </p>
        <p className="text-lg text-white font-bold">
          Sistemul nostru digitalizat ajută utilizatorul să rezerve o ședință în
          mai puțin de 5 minute și totodată, oferă siguranța disponibilității
          cluburilor pentru rezervările efectuate.
        </p>
      </div>

      <div className="flex justify-center items-center h-screen">
        <Map />
      </div>
    </div>
  );
};

export default LandingPage;
