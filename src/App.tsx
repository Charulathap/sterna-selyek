import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login/Login';
import DashboardLayout from './components/DashboardLayout/DashboardLayout';
import Dashboard from './pages/Dashboard/Dashboard';
import Locations from './pages/Locations/Locations';
import GenericPage from './pages/GenericPage/GenericPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        
        <Route path="/" element={<Navigate to="/login" replace />} />
        
        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/locations" element={<Locations />} />
          <Route path="/access" element={<GenericPage />} />
          <Route path="/trips" element={<GenericPage />} />
          <Route path="/gateways" element={<GenericPage />} />
          <Route path="/vehicles" element={<GenericPage />} />
          <Route path="/users" element={<GenericPage />} />
          <Route path="/keys" element={<GenericPage />} />
          <Route path="/levels" element={<GenericPage />} />
          <Route path="/reports" element={<GenericPage />} />
          <Route path="/settings" element={<GenericPage />} />
        </Route>
        
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
