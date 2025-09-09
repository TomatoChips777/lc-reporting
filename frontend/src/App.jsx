// App.jsx
import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import LoginScreen from './LoginScreen';
import { useAuth } from '../AuthContext';
import LandingPage from './LandingPage';
import UserDashboard from './Users/UserDashboard';
import MaintenanceApp from './Maintenance/MaintenanceApp';
import ReportManagerApp from './Report Manager/ReportManager';
function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeLink, setActiveLink] = useState(() => {
    return localStorage.getItem("activeLink") || "Dashboard";
  });

  const location = useLocation();

  useEffect(() => {
    const path = location.pathname;

    const routeMap = {
      '/': 'Dashboard',
      '/inventory': 'Inventory',
      '/users': 'Users',
      '/borrowing': 'Borrowing',
      '/events': 'Calendar',
      '/notifications': 'Notifications',
      '/reports': 'Reports',

    };
    setActiveLink(routeMap[path] || 'Dashboard');

    localStorage.setItem("activeLink", activeLink);
  }, [location]);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);


  const handleLinkClick = (link) => {
    setActiveLink(link);
    localStorage.setItem("activeLink", link);
  };
  const { isAuthenticated, isLoading, role } = useAuth();
  if (isLoading) return <div>Loading...</div>;

  return (
    <>
      {isAuthenticated && role === 'Admin' ? (
        <MaintenanceApp />
      ) : isAuthenticated && role == 'Staff' ? (
        <ReportManagerApp />
      ) :
        isAuthenticated && role == 'User' ?
          (
            <UserDashboard />
          ) : (
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<LoginScreen />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          )}
    </>
  );
}
export default App;
