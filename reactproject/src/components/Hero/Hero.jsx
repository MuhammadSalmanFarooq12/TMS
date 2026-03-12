import { useNavigate } from "react-router-dom";
import "./Hero.css";
import heroVideo from "../../assets/videos/hero.mp4";
import SearchBox from "../SearchBox/SearchBox";

const Hero = () => {
  const navigate = useNavigate();

  const handleSearch = ({ from, to, date }) => {
    const params = new URLSearchParams();
    if (from) params.set("from", from);
    if (to) params.set("to", to);
    if (date) params.set("date", date);
    navigate(`/routes?${params.toString()}`);
  };

  return (
    <section className="hero">

      {/* Background Video */}
      <video
        className="bg-video"
        src={heroVideo}
        autoPlay
        muted
        loop
        playsInline
      />

      {/* Dark overlay for better text visibility */}
      <div className="overlay"></div>

      {/* Hero Content */}
      <div className="hero-content">
        <h1>Luxury Intercity Travel</h1>
        <p>Comfort • Safety • Reliability</p>

        {/* Booking Search Box */}
        <SearchBox onSearch={handleSearch} />
      </div>
    </section>
  );
};

export default Hero;
