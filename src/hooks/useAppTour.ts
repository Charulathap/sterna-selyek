import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import Shepherd from 'shepherd.js';
import 'shepherd.js/dist/css/shepherd.css';

export const useAppTour = () => {
  const navigate = useNavigate();

  const startTour = useCallback(() => {
    const tour = new Shepherd.Tour({
      useModalOverlay: true,
      defaultStepOptions: {
        classes: 'shepherd-theme-custom',
        cancelIcon: {
          enabled: true
        },
        scrollTo: { behavior: 'smooth', block: 'center' }
      }
    });

    tour.addStep({
      id: 'sidebar-toggle',
      title: 'Navigation Menu',
      text: 'Use this button to collapse or expand the sidebar for more screen space.',
      attachTo: {
        element: '.sidebar-edge-toggle',
        on: 'right'
      },
      buttons: [
        { text: 'Cancel', action: tour.cancel, classes: 'shepherd-button-secondary' },
        { text: 'Next →', action: tour.next }
      ]
    });

    tour.addStep({
      id: 'search-bar',
      title: 'Global Search',
      text: 'Quickly find locations, locks, or pages using the global search.',
      attachTo: {
        element: '.search-container',
        on: 'bottom'
      },
      buttons: [
        { text: 'Back', action: tour.back, classes: 'shepherd-button-secondary' },
        { text: 'Next →', action: tour.next }
      ]
    });

    tour.addStep({
      id: 'notification-bell',
      title: 'Notifications',
      text: 'Stay updated with real-time alerts and notifications here.',
      attachTo: {
        element: '.notification-btn',
        on: 'bottom'
      },
      buttons: [
        { text: 'Back', action: tour.back, classes: 'shepherd-button-secondary' },
        { text: 'Next →', action: tour.next }
      ]
    });

    tour.addStep({
      id: 'profile-settings',
      title: 'User Profile & Settings',
      text: 'Access your profile, user settings, or log out from this menu.',
      attachTo: {
        element: '.user-dropdown-container',
        on: 'bottom'
      },
      buttons: [
        { text: 'Back', action: tour.back, classes: 'shepherd-button-secondary' },
        { text: 'Next →', action: tour.next }
      ]
    });

    tour.addStep({
      id: 'sidebar-nav',
      title: 'Sidebar Navigation',
      text: 'Navigate through different sections of the portal using this sidebar.',
      attachTo: {
        element: '.sidebar-nav',
        on: 'right'
      },
      buttons: [
        { text: 'Back', action: tour.back, classes: 'shepherd-button-secondary' },
        { text: 'Next →', action: tour.next }
      ]
    });

    tour.addStep({
      id: 'locations-nav',
      title: 'Manage Locations',
      text: 'Manage all your physical locations and map locks here.',
      attachTo: {
        element: '.sidebar-nav a[href="/locations"]',
        on: 'right'
      },
      beforeShowPromise: () => {
        return new Promise((resolve) => {
          if (window.location.pathname !== '/dashboard') {
            navigate('/dashboard');
            setTimeout(resolve, 300);
          } else {
            resolve(true);
          }
        });
      },
      buttons: [
        { text: 'Back', action: tour.back, classes: 'shepherd-button-secondary' },
        { text: 'Next →', action: tour.next }
      ]
    });

    tour.addStep({
      id: 'dashboard-add-location',
      title: 'Quick Actions',
      text: 'You can also quickly add a new location right from the dashboard.',
      attachTo: {
        element: '.quick-actions-grid .quick-action-btn:first-child',
        on: 'bottom'
      },
      beforeShowPromise: () => {
        return new Promise((resolve) => {
          if (window.location.pathname !== '/dashboard') {
            navigate('/dashboard');
            setTimeout(resolve, 500);
          } else {
            resolve(true);
          }
        });
      },
      buttons: [
        { text: 'Back', action: tour.back, classes: 'shepherd-button-secondary' },
        { text: 'Next →', action: tour.next }
      ]
    });

    tour.addStep({
      id: 'add-location-modal',
      title: 'Add New Location',
      text: 'Fill in the details here to add a new location to your system.',
      attachTo: {
        element: '.modal-content',
        on: 'left'
      },
      beforeShowPromise: () => {
        return new Promise((resolve) => {
          navigate('/locations');
          setTimeout(() => {
            window.dispatchEvent(new CustomEvent('tour-event', { detail: 'open-add-location-modal' }));
            setTimeout(resolve, 500);
          }, 500);
        });
      },
      buttons: [
        { text: 'Back', action: tour.back, classes: 'shepherd-button-secondary' },
        { text: 'Finish →', action: tour.complete }
      ]
    });

    tour.on('complete', () => {
      const overlay = document.createElement('div');
      overlay.className = 'tour-transition-overlay';
      document.body.appendChild(overlay);
      
      setTimeout(() => {
        overlay.classList.add('active');
        
        setTimeout(() => {
          window.dispatchEvent(new CustomEvent('tour-event', { detail: 'close-add-location-modal' }));
          navigate('/dashboard');
          
          setTimeout(() => {
            overlay.classList.remove('active');
            setTimeout(() => {
              overlay.remove();
            }, 400);
          }, 100);
        }, 400);
      }, 10);
    });

    tour.on('cancel', () => {
      window.dispatchEvent(new CustomEvent('tour-event', { detail: 'close-add-location-modal' }));
    });

    tour.on('show', (e: any) => {
      setTimeout(() => {
        const step = e.step;
        if (!step) return;
        const el = step.el || (typeof step.getEl === 'function' ? step.getEl() : null);
        if (!el) return;
        const footer = el.querySelector('.shepherd-footer');
        if (footer && !footer.querySelector('.shepherd-progress')) {
          const progress = document.createElement('div');
          progress.className = 'shepherd-progress';
          
          const currentStepIndex = tour.steps.indexOf(step);
          const totalSteps = tour.steps.length;
          
          let dots = '';
          for (let i = 0; i < totalSteps; i++) {
            dots += `<span class="shepherd-dot ${i === currentStepIndex ? 'active' : ''}"></span>`;
          }
          
          progress.innerHTML = dots;
          footer.insertBefore(progress, footer.firstChild);
        }
      }, 10);
    });

    // Start tour safely
    setTimeout(() => {
      tour.start();
    }, 100);
  }, [navigate]);

  return { startTour };
};
