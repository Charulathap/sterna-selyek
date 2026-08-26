import React, { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from '../Sidebar/Sidebar';
import Header from '../Header/Header';

const DashboardLayout: React.FC = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isInitialLoading, setIsInitialLoading] = useState(!sessionStorage.getItem('appLoaded'));
  const location = useLocation();

  useEffect(() => {
    // Skeleton loading logic
    if (isInitialLoading) {
      const timer = setTimeout(() => {
        setIsInitialLoading(false);
        sessionStorage.setItem('appLoaded', 'true');
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [isInitialLoading]);

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  return (
    <div className="app-container">
      <Sidebar isCollapsed={isSidebarCollapsed} toggleSidebar={toggleSidebar} />
      
      <div className={`main-content ${isSidebarCollapsed ? 'sidebar-collapsed' : ''}`}>
        <Header />
        <main className="page-wrapper">
          <Outlet context={{ isLoading: isInitialLoading }} />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
