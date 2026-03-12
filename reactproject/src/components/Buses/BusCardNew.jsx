import { Link } from "react-router";
import "./BusGridNew.css";

const BusCardNew = ({ bus }) => {
  return (
    <div className="buscard-new">
      <div className="buscard-image">
        <img
          src={`http://localhost:5000${bus.image}`}
          alt={bus.name}
        />
      </div>

      <div className="buscard-info">
        <h3>{bus.name}</h3>
        <p><strong>Number Plate:</strong> {bus.numberPlate}</p>
        <p><strong>Seats:</strong> {bus.seats}</p>
        <p><strong>Route:</strong> {bus.route}</p>
        <p><strong>Departure:</strong> {bus.departureTime}</p>
        <p><strong>Arrival:</strong> {bus.arrivalTime}</p>
      
        <Link to={`/fleet/${bus._id}`}>       
          <button className="buscard-btn">
            View Details
          </button>
        </Link>
      </div>
    </div>
  );
};

export default BusCardNew;