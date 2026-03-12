import "./About.css";
import aboutImage from "../../assets/images/about.jpg";

const About = () => {
  return (
    <section className="about-section">
      <div className="about-container">
        <div className="about-text">
          <h2>About FastInterCity</h2>
          <p>
            FastInterCity is Pakistan’s premium intercity bus travel brand, providing comfort,
            safety, and luxury on every journey. Our modern fleet and expert staff ensure
            a memorable travel experience for every passenger.
          </p>
          <p>
            From bustling cities to serene landscapes, we cover the routes you love,
            making your journey as enjoyable as the destination.
          </p>
        </div>
        <div className="about-image">
          <img src={aboutImage} alt="About FastInterCity" />
        </div>
      </div>
    </section>
  );
};

export default About;
