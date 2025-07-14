import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import axios from 'axios';
// User Pages
import LandingPage from './Components/LandingPage/LandingPage';
import Services from './Components/Services/Services';
import Description from './Components/Description/Description';
import Appointment from './Components/Appointment/Appointment';
import NotFound from './Components/NotFound';
import ReviewsPage from './Components/ReviewsPage/ReviewsPage';
import ContactPage from './Components/ContactPage/ContactPage';
import './index.css'; // Ensure you have Tailwind CSS set up correctly
// Admin Pages
import AdminLogin from './Components/AdminLogin/AdminLogin';
import AdminDashboard from './Components/Admin/Adim'; // Your admin dashboard component
import AdminAppointment from './Components/AdminAppointment/AdminAppointment';
import AdminServices from './Components/Adminservice/AdminServices';
import AdminEditService from './Components/AdminEditService/AdminEditService';
import AdminStatistic from './Components/AdminStatistic/AdminStatistic';
import ProtectedAdminRoute from './Components/Admin/ProtectedAdminRoute';
import AdminSettings from './Components/Admin/AdminSettings';
import AdminReviewsPage from './Components/AdminReviewPage';
import { useEffect } from 'react';



function App() {
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await axios.get('https://sundayluxury.onrender.com/health/check');
        console.log('Health check:', res.data);
      } catch (error) {
        console.error('Error Health:', error);
      }
    };

    fetchServices(); // Initial call on load

    const intervalId = setInterval(fetchServices, 10 * 60 * 1000); // Every 10 minutes

    // Clear interval on unmount
    return () => clearInterval(intervalId);
  }, []);

  return (
    <Router>
      <Routes>
        {/* User-facing routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/appointment" element={<Appointment />} />
        <Route path="/services" element={<Services showAll={true} />} />
        <Route path="/reviews" element={<ReviewsPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/description/:id" element={<Description />} />
        <Route path="*" element={<NotFound />} />

        {/* Admin login — always open */}
        <Route path="/admin" element={<AdminLogin />} />

        {/* Admin Dashboard (protected) */}
        <Route
          path="/admin-dashboard"
          element={
            <ProtectedAdminRoute>
              <AdminDashboard />
            </ProtectedAdminRoute>
          }
        />
        <Route
          path="/admin-reviews"
          element={
            <ProtectedAdminRoute>
              <AdminReviewsPage/>
            </ProtectedAdminRoute>
          }
        />

        <Route
          path="/admin-appointment"
          element={
            <ProtectedAdminRoute>
              <AdminAppointment />
            </ProtectedAdminRoute>
          }
        />
        <Route
          path="/admin-services"
          element={
            <ProtectedAdminRoute>
              <AdminServices />
            </ProtectedAdminRoute>
          }
        />
        <Route
          path="/admin-edit"
          element={
            <ProtectedAdminRoute>
              <AdminEditService />
            </ProtectedAdminRoute>
          }
        />
        <Route
          path="/admin-stats"
          element={
            <ProtectedAdminRoute>
              <AdminStatistic />
            </ProtectedAdminRoute>
          }
        />
        <Route
          path="/admin/settings"
          element={
            <ProtectedAdminRoute>
              <AdminSettings />
            </ProtectedAdminRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
