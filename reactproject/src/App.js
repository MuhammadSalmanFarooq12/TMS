import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from './context/AuthContext';
import Home from './pages/Home';
import RoutesPage from "./pages/Routes/Routes";
import CitiesPage from "./pages/Cities/Cities";
import RouteDetail from './components/RouteCard/RouteDetail';
import FleetsNewPage from './pages/FleetsNewPage/FleetsNewPage';
import PackagesPage from './pages/Packages/PackagesPage';
import About from './pages/About';
import Booking from './pages/Booking/Booking';
import PackageDetail from "./components/Packages/PackageDetail";
import FleetDetail from "./components/Fleet/FleetDetail";
import CityDetail from './components/CitiesPage/CityDetail';
import FAQs from './pages/Faqs/FAQs';
import ContactUs from './pages/ContactUs/ContactUs';
import TermCondition from './pages/TermsConditions/TermCondition';
import PrivacyPolicy from './pages/TermsConditions/PrivacyPolicy';
import BookingTermsPolicy from './pages/TermsConditions/BookingTermsPolicy';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Dashboard from './pages/Dashboard/Dashboard';
import ScrollToTop from "./ScrollToTop";
import Chatbot from "./components/Chatbot/Chatbot";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ScrollToTop />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/routes' element={<RoutesPage />} />
          <Route path='/cities' element={<CitiesPage />} />
          <Route path="/cities/:id" element={<CityDetail />} />
          <Route path='/fleet' element={<FleetsNewPage />} />
          <Route path='packages' element={<PackagesPage />} />
          <Route path='/about' element={<About />} />
          <Route path='/booking' element={<Booking />} />
          <Route path='/bus/:id' element={<RouteDetail />} />
          <Route path="/packages/:id" element={<PackageDetail />} />
          <Route path="/fleet/:id" element={<FleetDetail />} />
          <Route path="/faqs" element={<FAQs />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/terms" element={<TermCondition />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/booking-terms" element={<BookingTermsPolicy />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
        <Chatbot />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
