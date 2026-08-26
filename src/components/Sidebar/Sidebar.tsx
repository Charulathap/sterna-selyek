import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  MapPin, 
  Lock, 
  Truck, 
  Wifi, 
  Car, 
  Users, 
  Key, 
  Layers, 
  FileText, 
  Settings,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import './Sidebar.css';

interface SidebarProps {
  isCollapsed?: boolean;
  toggleSidebar?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isCollapsed = false, toggleSidebar }) => {
  return (
    <aside className={`sidebar ${isCollapsed ? 'collapsed' : ''}`}>
      <button className="sidebar-edge-toggle" onClick={toggleSidebar}>
        {isCollapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
      </button>

      <div className="sidebar-logo">
        {!isCollapsed ? (
          <div className="logo-icon-text sidebar-logo-inner">
            <span className="logo-sterna">STERNA</span> <span className="logo-selyek">SELYEK</span>
          </div>
        ) : (
          <div className="logo-icon-text sidebar-logo-inner collapsed-logo">
            <span className="logo-sterna">S</span><span className="logo-selyek">S</span>
          </div>
        )}
      </div>

      <nav className="sidebar-nav">
        <ul>
          <li>
            <NavLink to="/dashboard" className={({isActive}) => isActive ? "nav-link active" : "nav-link"}>
              <LayoutDashboard size={18} />
              {!isCollapsed && <span>Dashboard</span>}
            </NavLink>
          </li>
          <li>
            <NavLink to="/locations" id="tour-locations" className={({isActive}) => isActive ? "nav-link active" : "nav-link"}>
              <MapPin size={18} />
              {!isCollapsed && <span>Locations</span>}
            </NavLink>
          </li>
        </ul>
      </nav>

      <div className="sidebar-footer">
        {!isCollapsed && (
          <div className="network-status">
            <div className="network-indicator"></div>
            <div>
              <div className="network-label">Network Status</div>
              <div className="network-value">Online</div>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
