import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { Joyride, STATUS, EVENTS, ACTIONS } from 'react-joyride';
import Sidebar from '../Sidebar/Sidebar';
import Header from '../Header/Header';

const DashboardLayout: React.FC = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [runTour, setRunTour] = useState(false);
  const [stepIndex, setStepIndex] = useState(0);
  const [isInitialLoading, setIsInitialLoading] = useState(!sessionStorage.getItem('appLoaded'));
  const navigate = useNavigate();
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

  useEffect(() => {
    // Run tour on dashboard load ONLY if coming from login
    if (location.pathname === '/dashboard' && !localStorage.getItem('tourCompleted') && (location.state as any)?.fromLogin) {
      const timer = setTimeout(() => {
        setRunTour(true);
        setStepIndex(0);
      }, 1500); 
      return () => clearTimeout(timer);
    }
  }, [location.pathname, location.state]);

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  const steps = [
    {
      target: '#tour-profile',
      content: 'Click your profile to access your account settings and Sign Out.',
      disableBeacon: true,
      placement: 'bottom-end'
    },
    {
      target: '#tour-notifications',
      content: 'Check your latest updates, alerts, and new location approvals here.',
      placement: 'bottom'
    },
    {
      target: '#tour-search',
      content: 'Use the global search bar to quickly find assets, locations, users, and more.',
      placement: 'bottom'
    },
    {
      target: '.sidebar-edge-toggle',
      content: 'Use this button to collapse or expand the navigation menu.',
      placement: 'right'
    },
    {
      target: '#tour-add-location',
      content: 'Click this Quick Action to easily add a new location.',
      placement: 'top'
    },
    {
      target: '#tour-locations-add-btn',
      content: "Here you can also add a location. Let's open the modal!",
      placement: 'bottom'
    },
    {
      target: '#tour-modal',
      content: 'Fill in the details to create your new location in the system.',
      placement: 'right'
    }
  ];

  const handleJoyrideCallback = (data: any) => {
    const { status, action, index, type } = data;
    
    if ([STATUS.FINISHED, STATUS.SKIPPED].includes(status as any)) {
      setRunTour(false);
      setStepIndex(0);
      localStorage.setItem('tourCompleted', 'true');
      if (index >= 5 && location.pathname !== '/dashboard') {
        navigate('/dashboard');
      }
      return;
    }

    if ([EVENTS.STEP_AFTER, EVENTS.TARGET_NOT_FOUND].includes(type as any)) {
      if (action === ACTIONS.CLOSE || action === ACTIONS.SKIP) {
        setRunTour(false);
        setStepIndex(0);
        localStorage.setItem('tourCompleted', 'true');
        return;
      }

      const nextStepIndex = index + (action === ACTIONS.PREV ? -1 : 1);
      
      if (action === ACTIONS.NEXT) {
        if (index === 4) {
          navigate('/locations');
          setTimeout(() => setStepIndex(nextStepIndex), 500);
          return;
        }
        if (index === 5) {
          window.dispatchEvent(new CustomEvent('tour-event', { detail: 'open-add-location-modal' }));
          setTimeout(() => setStepIndex(nextStepIndex), 500);
          return;
        }
      }

      setStepIndex(nextStepIndex);
    }
  };

  const startTour = () => {
    if (location.pathname !== '/dashboard') {
      navigate('/dashboard');
    }
    setTimeout(() => {
      setStepIndex(0);
      setRunTour(true);
    }, 300);
  };

  return (
    <div className="app-container">
      <Joyride
        steps={steps}
        run={runTour}
        stepIndex={stepIndex}
        continuous={true}
        showProgress={true}
        showSkipButton={true}
        styles={{
          options: {
            primaryColor: '#0A66C2',
            zIndex: 10000,
          }
        }}
        callback={handleJoyrideCallback}
      />
      
      <Sidebar isCollapsed={isSidebarCollapsed} toggleSidebar={toggleSidebar} />
      
      <div className={`main-content ${isSidebarCollapsed ? 'sidebar-collapsed' : ''}`}>
        <Header startTour={startTour} />
        <main className="page-wrapper">
          <Outlet context={{ isLoading: isInitialLoading }} />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
