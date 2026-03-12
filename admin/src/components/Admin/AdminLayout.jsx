import { NavLink, Outlet} from "react-router-dom";
import "./Admin.css";
import pic from "../../assets/images/pic.jpeg";

const AdminLayout = () => {
  return (
    <div className="admin-container">
      
      {/* ===== Sidebar ===== */}
      <aside className="admin-sidebar">
        <h2 className="admin-logo">FASTINTERCITY</h2>

        <nav>
          <NavLink to="" end className="nav-link">
            Dashboard
          </NavLink>

          <NavLink to="buses" className="nav-link">
            Manage Buses
          </NavLink>

          <NavLink to="add-bus" className="nav-link">
            Add Bus
          </NavLink>

          <NavLink to="routes" className="nav-link">
            Manage Routes
          </NavLink>

          <NavLink to="add-route" className="nav-link">
            Add Route
          </NavLink>

          <NavLink to="cities" className="nav-link">
            Manage Cities
          </NavLink>

          <NavLink to="cities/add" className="nav-link">
            Add City
          </NavLink>

          <NavLink to="packages" className="nav-link">
            Manage Packages
          </NavLink>

          <NavLink to="/admin/packages/add" className="nav-link">
            Add Packages
          </NavLink>

          <NavLink to="bookings" className="nav-link">  
            Manage Bookings
          </NavLink>

          <NavLink to="packagebookings" className="nav-link">
            Manage Package Bookings
          </NavLink>

          <NavLink to="/admin/bus-bookings" className="nav-link">
            Bus Bookings
          </NavLink>

          <NavLink to="contacts" className="nav-link">
            Contact Messages
          </NavLink>

          <NavLink to="web-queries" className="nav-link">
            Web Queries
          </NavLink>
        </nav>
      </aside>

      {/* ===== Main Section ===== */}
      <div className="admin-main">

        {/* Top Navbar */}
        <header className="admin-topbar">
          <input
            type="text"
            placeholder="Search Dashboard..."
            className="search-input"
          />

          <div className="admin-profile">

            <img
              src={pic}
              alt="admin"
              className="profile-img"
            />
            <span>Admin</span>
          </div>
        </header>

        {/* Page Content */}
        <main className="admin-content">
          <Outlet />
        </main>

      </div>
    </div>
  );
};

export default AdminLayout;