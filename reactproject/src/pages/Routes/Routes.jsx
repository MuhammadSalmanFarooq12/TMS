import Navbar from "../../components/Navbar/Navbar";
import RouteHero from "../../components/routePage/RouteHero";
import RouteSection from "../../components/routePage/RouteSection";
import Footer from "../../components/Footer/Footer";
import Cursor from "../../components/Cursor/Cursor";

const RoutesPage = () => {
  return (
    <>
      <Navbar/>
      <div style={{ padding: "20px" }}>
        <RouteHero/>
        {/* Only RouteSection is needed here as it contains the SearchBar and Grid */}
        <RouteSection/>
        <Footer/>
        <Cursor/>
        
      </div>
    </>
  );
};
export default RoutesPage;