import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Admin from './pages/Admin';
import AdminDashboard from './components/Admin/AdminDashboard';
import ManageBuses from './components/Admin/ManageBuses';
import ManageRoutes from './components/Admin/ManageRoutes';
import ManagePackages from './components/Admin/ManagePackages';
import ManageBookings from './components/Admin/ManageBookings';
import EditBus from './components/Admin/EditBus';
import Home from './pages/Home';
import AddBus from './components/Admin/AddBus';
import EditRoute from './components/Admin/EditRoute';
import AddRoute from './components/Admin/AddRoute';
import EditPackage from './components/Admin/EditPackage';
import AddPackages from './components/Admin/AddPackages';
import EditBooking from './components/Admin/EditBooking';
import ManageCities from './components/Admin/ManageCities';
import AddCity from './components/Admin/AddCity';
import EditCity from './components/Admin/EditCity';
import ManagePackageBookings from './components/Admin/ManagePackageBookings';
import EditPackageBooking from './components/Admin/EditPackageBooking';
import ManageBusBookings from './components/Admin/ManageBusBookings';
import EditBusBooking from './components/Admin/EditBusBooking';
import ManageContacts from './components/Admin/ManageContacts';
import WebQueries from './components/Admin/WebQueries';

function App() {
  return (
    <BrowserRouter>

      {/* ✅ ToastContainer should be OUTSIDE Routes */}
      <ToastContainer position="top-right" autoClose={2000} />

      <Routes>
        <Route path='/' element={<Home />} />

        <Route path="/admin" element={<Admin />}>
          <Route index element={<AdminDashboard />} />
          <Route path="buses" element={<ManageBuses />} />
          <Route path="add-bus" element={<AddBus />} />
          <Route path="routes" element={<ManageRoutes />} />
          <Route path="add-route" element={<AddRoute />} />
          <Route path="packages" element={<ManagePackages />} />
          <Route path="/admin/packages/edit/:id" element={<EditPackage/>} />
          <Route path="/admin/packages/add" element={<AddPackages />} />
          <Route path="bookings" element={<ManageBookings />} />
          <Route path="packagebookings" element={<ManagePackageBookings />} />
          <Route path="bookings/edit/:id" element={<EditBooking/>} />
          <Route path="packagebookings/edit/:id" element={<EditPackageBooking />}/>
          <Route path="/admin/bus-bookings" element={<ManageBusBookings/>}></Route>
          <Route path="/admin/bus-bookings/edit/:id" element={<EditBusBooking/>}></Route>
          <Route path="buses/edit/:id" element={<EditBus />} />
          <Route path="routes/edit/:id" element={<EditRoute />} />
          <Route path="cities" element={<ManageCities />} />
          <Route path="cities/add" element={<AddCity />} />
          <Route path="cities/edit/:id" element={<EditCity />} />
          <Route path="/admin/contacts" element={<ManageContacts />} />
          <Route path="web-queries" element={<WebQueries />} />

        </Route>

      </Routes>

    </BrowserRouter>
  );
}

export default App;