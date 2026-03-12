const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const cors = require("cors")
const path = require("path");
dotenv.config();
const app = express();
app.use(express.json());
app.use(cors())
// Connect to MongoDB
connectDB();
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Import routes
const busRoutes = require('./routes/busRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const routeRoutes = require("./routes/routeRoutes");
const scheduleRoutes = require("./routes/scheduleRoutes");
const cityRoutes = require("./routes/cityRoutes");
const seatRoutes = require("./routes/seatRoutes");
const staffRoutes = require("./routes/staffRoutes");
const reviewRoutes = require("./routes/reviewRoutes");
const userRoutes = require("./routes/userRoutes");
const tourPackageRoutes = require("./routes/tourPackageRoutes");
const attractionRoutes = require("./routes/attractionRoutes");
const hotelRoutes = require("./routes/hotelRoutes");
const itineraryRoutes = require("./routes/itineraryRoutes");
const invoiceRoutes = require("./routes/invoiceRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
const notificationRoutes = require("./routes/notificationRoutes");
const dynamicPricingRoutes = require("./routes/dynamicPricingRoutes");
const packageBookingRoutes = require("./routes/packageBookingRoutes");
const busBookingRoutes = require("./routes/busBookingRoutes");
const contactRoutes = require("./routes/contactRoutes");



// Routes
app.use('/api/buses', busRoutes);
app.use('/api/bookings', bookingRoutes);
app.use("/api/routes", routeRoutes);
app.use("/api/schedules", scheduleRoutes);
app.use("/api/cities", cityRoutes);
app.use("/api/seats", seatRoutes);
app.use("/api/staff", staffRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/users", userRoutes);
app.use("/api/packages", tourPackageRoutes);
app.use("/api/attractions", attractionRoutes);
app.use("/api/hotels", hotelRoutes);
app.use("/api/itineraries", itineraryRoutes);
app.use("/api/invoices", invoiceRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/dynamic-pricing", dynamicPricingRoutes);
app.use("/api/package-bookings", packageBookingRoutes);
app.use("/api/bus-bookings", busBookingRoutes);
app.use("/api/contact", contactRoutes);





// Default route
app.get('/', (req, res) => {
  res.send('Bus Management API is running');
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
