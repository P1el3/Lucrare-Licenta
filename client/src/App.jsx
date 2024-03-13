import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import LandingPage from "./components/LandingPage";
import Map from "./components/Map"


const App = () => {
  return (
    <>
      <Navbar />
      <Map/>

    </>
      
  );
};
export default App