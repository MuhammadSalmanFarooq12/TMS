import "./Stats.css";

const statsData = [
  { number: "100+", label: "Cities Covered" },
  { number: "50+", label: "Luxury Buses" },
  { number: "5000+", label: "Happy Customers" },
  { number: "24/7", label: "Support Available" },
];

const Stats = () => {
  return (
    <section className="stats-section">
      <div className="stats-container">
        {statsData.map((stat, idx) => (
          <div className="stat-card" key={idx}>
            <h2>{stat.number}</h2>
            <p>{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Stats;
