import "./Info.css";
import aboutImg from "../../assets/images/about.jpg";
import directImg from "../../assets/images/director.jpg";
import chairImg from "../../assets/images/chairman.jpg";

const Info = () => {
  return (
    <div className="info-wrapper">

      <section className="info-section">
        <div className="about-image">
          <img src={aboutImg} alt="Our Journey" />
        </div>

        <div className="about-text">
          <h2>Our Journey</h2>
          <p>
            We started with a vision to transform intercity travel and provide
            passengers with safe, comfortable, and modern transportation solutions.
            Over the years, we have grown into a trusted travel partner.
          </p>
        </div>
      </section>

      <section className="info-section reverse">
        <div className="about-image">
          <img src={chairImg} alt="Message from Chairman" />
        </div>

        <div className="about-text">
          <h2>Message from Chairman</h2>
          <p>
            Our mission is to deliver quality service and customer satisfaction.
            We believe in continuous improvement and innovation to make travel easier.
          </p>
        </div>
      </section>

      <section className="info-section">
        <div className="about-image">
          <img src={directImg} alt="Message from Director" />
        </div>

        <div className="about-text">
          <h2>Message from Director</h2>
          <p>
            Our team works tirelessly to ensure passengers have the best travel
            experience. Safety and comfort remain our top priorities.
          </p>
        </div>
      </section>

    </div>
  );
};

export default Info;