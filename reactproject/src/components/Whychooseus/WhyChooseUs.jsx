import "./WhyChooseUs.css";
import { FaShieldAlt, FaMoneyBillWave, FaHeadset, FaStar } from "react-icons/fa";

const WhyChooseUs = () => {
  return (
    <section className="why-section">
      <h2>Why Choose Us</h2>

      <div className="why-container">
        <div className="why-card">
          <FaShieldAlt className="why-icon" />
          <h3>Secure Booking</h3>
          <p>
            Your payments and personal information are fully protected with us.
          </p>
        </div>

        <div className="why-card">
          <FaMoneyBillWave className="why-icon" />
          <h3>Best Prices</h3>
          <p>
            We offer competitive prices and exclusive travel deals.
          </p>
        </div>

        <div className="why-card">
          <FaHeadset className="why-icon" />
          <h3>24/7 Support</h3>
          <p>
            Our support team is available anytime to help you.
          </p>
        </div>

        <div className="why-card">
          <FaStar className="why-icon" />
          <h3>Top Rated Service</h3>
          <p>
            Thousands of happy customers trust our platform.
          </p>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
