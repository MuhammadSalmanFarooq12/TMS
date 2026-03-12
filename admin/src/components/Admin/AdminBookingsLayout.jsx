import { NavLink, Outlet } from "react-router-dom";
import "./Admin.css";

const AdminBookingsLayout = () => {
  return (
    <div>
      {/* small navbar */}
      <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
        <NavLink
          to=""
          end
          className="nav-link"
        >
          Route Bookings
        </NavLink>

        <NavLink
          to="packages"
          className="nav-link"
        >
          Package Bookings
        </NavLink>
      </div>

      <Outlet />
    </div>
  );
};

export default AdminBookingsLayout;