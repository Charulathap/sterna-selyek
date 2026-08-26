import React from 'react';
import { useLocation } from 'react-router-dom';
import { 
  PackageOpen, Lock, Truck, Wifi, Car, 
  Users, Key, Layers, FileText, Settings 
} from 'lucide-react';

const GenericPage: React.FC = () => {
  const location = useLocation();
  const pathName = location.pathname.replace('/', '');
  const title = pathName.charAt(0).toUpperCase() + pathName.slice(1);

  const getIcon = () => {
    switch(pathName) {
      case 'access': return <Lock size={40} color="var(--text-muted)" />;
      case 'trips': return <Truck size={40} color="var(--text-muted)" />;
      case 'gateways': return <Wifi size={40} color="var(--text-muted)" />;
      case 'vehicles': return <Car size={40} color="var(--text-muted)" />;
      case 'users': return <Users size={40} color="var(--text-muted)" />;
      case 'keys': return <Key size={40} color="var(--text-muted)" />;
      case 'levels': return <Layers size={40} color="var(--text-muted)" />;
      case 'reports': return <FileText size={40} color="var(--text-muted)" />;
      case 'settings': return <Settings size={40} color="var(--text-muted)" />;
      default: return <PackageOpen size={40} color="var(--text-muted)" />;
    }
  };

  return (
    <div className="dashboard-container" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <div className="card" style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '16px', backgroundColor: '#fff', border: '1px solid #E2E8F0', borderRadius: '12px' }}>
        <div className="empty-icon-wrapper color-gray" style={{ width: '80px', height: '80px', backgroundColor: '#F8FAFC', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {getIcon()}
        </div>
        <h2 style={{ fontSize: '20px', color: 'var(--text-dark)', fontWeight: 600 }}>No {title} Data</h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>There is currently no data available for this section.</p>
      </div>
    </div>
  );
};

export default GenericPage;
