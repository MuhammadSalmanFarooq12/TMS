import "./BookingTerms.css";

const BookingTerms = () => {
  return (
    <section className="booking-terms-page">
      <div className="booking-terms-container">
        <h1>Booking Terms & Conditions</h1>

        <p className="updated">
          Last updated: {new Date().getFullYear()}
        </p>

        <h2>1. Booking Confirmation</h2>
        <p>
          All bookings made on FASTINTERCITY are subject to availability. A
          booking is considered confirmed only after successful submission and
          system confirmation.
        </p>

        <h2>2. Accurate Information</h2>
        <p>
          You must provide accurate and complete information during the booking
          process including passenger name, contact details and travel
          information. FASTINTERCITY is not responsible for issues caused by
          incorrect data.
        </p>

        <h2>3. Seat Availability</h2>
        <p>
          Seat availability displayed on the website is indicative only and may
          change due to concurrent bookings.
        </p>

        <h2>4. Prices and Charges</h2>
        <p>
          All prices shown are subject to change without prior notice. The final
          price applicable will be the one shown at the time of booking.
        </p>

        <h2>5. Changes to Bookings</h2>
        <p>
          Requests for changes to confirmed bookings are subject to availability
          and operational constraints. FASTINTERCITY reserves the right to
          approve or decline modification requests.
        </p>

        <h2>6. Cancellations and Refunds</h2>
        <p>
          Cancellation and refund policies may vary depending on the selected
          package or service. Please contact our support team for detailed
          cancellation and refund rules before making a booking.
        </p>

        <h2>7. Travel Delays and Schedule Changes</h2>
        <p>
          FASTINTERCITY is not responsible for delays or changes caused by
          weather conditions, traffic issues, mechanical problems or other
          circumstances beyond our control.
        </p>

        <h2>8. Passenger Responsibility</h2>
        <p>
          Passengers are responsible for arriving on time at the designated
          pickup or departure location and complying with all travel
          instructions provided by FASTINTERCITY or its partners.
        </p>

        <h2>9. Refusal of Service</h2>
        <p>
          FASTINTERCITY reserves the right to refuse service to any passenger in
          cases of inappropriate behavior, safety concerns or violation of
          these booking terms.
        </p>

        <h2>10. Limitation of Liability</h2>
        <p>
          FASTINTERCITY shall not be liable for any indirect, incidental or
          consequential damages arising from your booking or use of our
          services.
        </p>

        <h2>11. Policy Updates</h2>
        <p>
          These Booking Terms may be updated from time to time. Continued use of
          our booking services means you accept the latest version of these
          terms.
        </p>

        <h2>12. Contact</h2>
        <p>
          If you have any questions regarding these Booking Terms, please
          contact the FASTINTERCITY support team before completing your booking.
        </p>
      </div>
    </section>
  );
};

export default BookingTerms;