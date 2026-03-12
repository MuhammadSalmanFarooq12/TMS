import BusCardNew from "./BusCardNew";

const BusGridNew = ({ buses }) => {
  return (
    <div className="busgrid-new">
      {buses.map((bus) => (
        <BusCardNew key={bus._id} bus={bus} />
      ))}
    </div>
  );
};

export default BusGridNew;