import { NavLink } from "react-router-dom";
import Button from "@mui/material/Button";
import shadows from "@mui/material/styles/shadows";
import thumbnail from "../img/thumbnail.png";


export default function Navbar() {
  return (
    <nav style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        padding: '1rem', 
        backgroundColor: '#00CED1'
    }}>
      <NavLink to="/">
        <img src={thumbnail} alt="Thumbnail" style={{ width: '200px', height: 'auto' }} sx={{boxShadow: 5}} />
      </NavLink>
      <div>
        <Button
          sx={{boxShadow: 5}}
          style={{
            marginRight: '10px',
            padding: '0.7em 1.2em',
            fontSize: '0.9em',
            color: '#000',
            backgroundColor: '#FFA500',
            border: 'none',
            borderRadius: '0.3em',
            cursor: 'pointer',
          }}
          
          onClick={() => alert('Inregistreaza-te!')}>
          Register
        </Button>
        <Button
          sx={{boxShadow: 5}}
          style={{
            padding: '0.7em 1.2em',
            fontSize: '0.9em',
            color: '#000',
            backgroundColor: '#FFA500',
            border: 'none',
            borderRadius: '0.3em',
            cursor: 'pointer',
          }}
          onClick={() => alert('Logheaza-te!')}>
          LogIn
        </Button>
      </div>
    </nav>
  );
}
