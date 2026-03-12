import "./Reviews.css";

const reviews = [
  {
    name: "Ali Khan",
    comment: "Amazing experience! Booking was super easy and smooth.",
  },
  {
    name: "Sara Ahmed",
    comment: "Loved the service. Highly recommended!",
  },
  {
    name: "Usman Tariq",
    comment: "Very affordable packages and great support team.",
  },
  {
    name: "Hina Malik",
    comment: "Best travel platform I have used so far!",
  },
];

const Reviews = () => {
  return (
    <section className="reviews-section">
      <h2>What Our Customers Say</h2>

      <div className="reviews-wrapper">
        <div className="reviews-track">
          {[...reviews, ...reviews].map((review, index) => (
            <div className="review-card" key={index}>
              <p className="comment">"{review.comment}"</p>
              <h4>- {review.name}</h4>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Reviews;
