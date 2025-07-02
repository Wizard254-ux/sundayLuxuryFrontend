import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// User Pages
import LandingPage from './Components/LandingPage/LandingPage';
import Services from './Components/Services/Services';
import Description from './Components/Description/Description';
import Appointment from './Components/Appointment/Appointment';
import LoginRegister from './Components/LoginRegister/LoginRegister';

// Admin Pages
import AdminLogin from './Components/AdminLogin/AdminLogin';
import AdminDashboard from './Components/Admin/Adim'; // Your admin dashboard component
import AdminAppointment from './Components/AdminAppointment/AdminAppointment';
import AdminServices from './Components/Adminservice/AdminServices';
import AdminEditService from './Components/AdminEditService/AdminEditService';
import AdminStatistic from './Components/AdminStatistic/AdminStatistic';
import ProtectedAdminRoute from './Components/Admin/ProtectedAdminRoute';
import AdminSettings from './Components/Admin/AdminSettings';

function App() {
  return (
    <Router>
      <Routes>
        {/* User-facing routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/appointment" element={<Appointment />} />
        <Route path="/services" element={<Services showAll={true} />} />
        <Route path="/description/:id" element={<Description />} />
        <Route path="/login" element={<LoginRegister />} />

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
