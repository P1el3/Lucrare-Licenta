import React from 'react';
import Button from "@mui/material/Button";
import backgroundIMG from "../img/background.jpg"

const LandingPage = () => {
  return (
    <div style={{
      padding: '20px',
      textAlign: 'center',
      backgroundImage: `url(${backgroundIMG})`,
      backgroundSize: 'cover',
      height: "100vh",
      width: "100%"
      }}>
      <header style={{ marginBottom: '40px' }}>
        <h1>Test 1?!</h1>
        <p>Maca Maca</p>
      </header>

      <section>
        <p>Uite ba merge!</p>
      </section>

      <Button
        style={{
          marginTop: '20px',
          padding: '10px 20px',
          fontSize: '16px',
          color: '#fff',
          backgroundColor: '#7ED679',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
        }}
        onClick={() => alert('Get Started!')}
      >
        Get Started
      </Button>
    </div>
  );
};

export default LandingPage;