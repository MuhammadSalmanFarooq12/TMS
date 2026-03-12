import "./Privacy.css";

const Privacy = () => {
  return (
    <section className="privacy-page">
      <div className="privacy-container">
        <h1>Privacy Policy</h1>

        <p className="updated">
          Last updated: {new Date().getFullYear()}
        </p>

        <h2>1. Introduction</h2>
        <p>
          At FASTINTERCITY, we respect your privacy and are committed to
          protecting your personal information. This Privacy Policy explains
          how we collect, use and protect your data when you use our website and
          booking services.
        </p>

        <h2>2. Information We Collect</h2>
        <p>
          When you make a booking or use our services, we may collect personal
          information such as your name, email address, phone number, travel
          details and booking information.
        </p>

        <h2>3. How We Use Your Information</h2>
        <p>
          We use your information to process bookings, communicate with you,
          provide customer support and improve our services.
        </p>

        <h2>4. Data Sharing</h2>
        <p>
          We do not sell your personal information. Your data may only be shared
          with trusted service providers or partners where necessary to deliver
          our services or when required by law.
        </p>

        <h2>5. Data Security</h2>
        <p>
          We take reasonable technical and organizational measures to protect
          your personal data against unauthorized access, loss or misuse.
        </p>

        <h2>6. Cookies</h2>
        <p>
          Our website may use cookies and similar technologies to enhance user
          experience and analyze website usage. You may control cookies through
          your browser settings.
        </p>

        <h2>7. Your Rights</h2>
        <p>
          You have the right to request access, correction or deletion of your
          personal information. You may contact us for any privacy related
          requests.
        </p>

        <h2>8. Third-Party Links</h2>
        <p>
          Our website may contain links to third-party websites. We are not
          responsible for the privacy practices or content of those websites.
        </p>

        <h2>9. Changes to This Policy</h2>
        <p>
          We may update this Privacy Policy from time to time. Any changes will
          be posted on this page and will take effect immediately.
        </p>

        <h2>10. Contact Us</h2>
        <p>
          If you have any questions about this Privacy Policy or how we handle
          your data, please contact our support team at FASTINTERCITY.
        </p>
      </div>
    </section>
  );
};

export default Privacy;