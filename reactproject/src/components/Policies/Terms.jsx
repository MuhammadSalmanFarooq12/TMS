import "./Terms.css";



const Terms = () => {
  return (
    <section className="terms-page">
      <div className="terms-container">
        <h1>Terms & Conditions</h1>

        <p className="updated">
          Last updated: {new Date().getFullYear()}
        </p>

        <h2>1. Introduction</h2>
        <p>
          Welcome to FASTINTERCITY. By accessing or using our website and
          services, you agree to be bound by these Terms and Conditions. If you
          do not agree, please do not use our platform.
        </p>

        <h2>2. Services</h2>
        <p>
          FASTINTERCITY provides online travel and tour package booking
          services. All bookings are subject to availability and confirmation.
        </p>

        <h2>3. User Responsibilities</h2>
        <p>
          You agree to provide accurate and complete information while making a
          booking, including your name, email and required details. You are
          responsible for maintaining the confidentiality of your information.
        </p>

        <h2>4. Bookings & Payments</h2>
        <p>
          All prices displayed on the website are subject to change without
          notice. A booking is considered confirmed only after successful
          submission and confirmation by our system or staff.
        </p>

        <h2>5. Cancellations & Refunds</h2>
        <p>
          Cancellation and refund policies may vary depending on the package or
          service. Please contact our support team for cancellation and refund
          requests.
        </p>

        <h2>6. Changes to Packages</h2>
        <p>
          FASTINTERCITY reserves the right to modify, reschedule or cancel any
          package due to operational reasons, safety concerns or unforeseen
          circumstances.
        </p>

        <h2>7. Limitation of Liability</h2>
        <p>
          FASTINTERCITY shall not be held responsible for any indirect,
          incidental or consequential damages arising from the use of our
          services or website.
        </p>

        <h2>8. Intellectual Property</h2>
        <p>
          All content, logos, images and designs on this website are the
          property of FASTINTERCITY and may not be used without prior written
          permission.
        </p>

        <h2>9. Privacy</h2>
        <p>
          Your personal information is handled according to our Privacy Policy.
          We do not sell or share your personal data except where required to
          provide our services.
        </p>

        <h2>10. Changes to Terms</h2>
        <p>
          We may update these Terms & Conditions at any time. Continued use of
          the website after changes means you accept the updated terms.
        </p>

        <h2>11. Contact</h2>
        <p>
          If you have any questions about these Terms & Conditions, please
          contact our support team.
        </p>
      </div>
    </section>
  );
};



export default Terms;