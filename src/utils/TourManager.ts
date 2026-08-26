import Shepherd from 'shepherd.js';
import 'shepherd.js/dist/css/shepherd.css';
import './TourManager.css';

class TourManager {
  private tour: any = null;
  private navigate: (path: string) => void = () => {};

  public init(navigateFn: (path: string) => void) {
    this.navigate = navigateFn;
    
    if (this.tour) {
      this.tour.complete(); // Cleanup previous if exists
    }
    
    this.tour = new Shepherd.Tour({
      useModalOverlay: true,
      defaultStepOptions: {
        cancelIcon: {
          enabled: true
        },
        classes: 'shepherd-theme-custom',
        scrollTo: { behavior: 'smooth', block: 'center' },
      }
    });

    this.setupSteps();

    // Event listeners for cleanup
    this.tour.on('cancel', this.cleanup);
    this.tour.on('complete', this.cleanup);
  }

  private cleanup = () => {
    // Save completion state
    localStorage.setItem('sterna_user_guide_completed', 'true');
    
    // Close any potential orphaned UI elements created by the tour
    // E.g., if we opened the Add Location modal specifically for the tour, we could leave it open or close it.
    // The requirement says: "Keep the Add Location modal open. Return control completely to the application."
  };

  private waitForElement = (selector: string, timeout = 5000): Promise<HTMLElement> => {
    return new Promise((resolve, reject) => {
      const el = document.querySelector(selector) as HTMLElement;
      if (el) return resolve(el);

      const observer = new MutationObserver(() => {
        const el = document.querySelector(selector) as HTMLElement;
        if (el) {
          observer.disconnect();
          resolve(el);
        }
      });

      observer.observe(document.body, {
        childList: true,
        subtree: true,
        attributes: true
      });

      setTimeout(() => {
        observer.disconnect();
        reject(new Error(`Element ${selector} not found within ${timeout}ms`));
      }, timeout);
    });
  };

  private setupSteps() {
    if (!this.tour) return;

    // Step 1: Sidebar Toggle
    this.tour.addStep({
      id: 'step-sidebar-toggle',
      title: 'Navigation Menu',
      text: 'Use this button to collapse or expand the navigation menu.',
      attachTo: { element: '[data-tour="sidebar-toggle"]', on: 'right' },
      beforeShowPromise: () => this.waitForElement('[data-tour="sidebar-toggle"]'),
      buttons: [
        {
          text: 'Cancel',
          classes: 'shepherd-button-secondary',
          action: () => this.tour?.cancel()
        },
        {
          text: 'Next &rarr;',
          classes: 'shepherd-button-primary',
          action: () => this.tour?.next()
        }
      ]
    });

    // Step 2: Global Search
    this.tour.addStep({
      id: 'step-global-search',
      title: 'Global Search',
      text: 'Use the global search to quickly find locations, users, locks, and other available information.',
      attachTo: { element: '[data-tour="global-search"]', on: 'bottom' },
      beforeShowPromise: () => {
        // Ensure we are on dashboard or locations where search exists
        return this.waitForElement('[data-tour="global-search"]');
      },
      buttons: [
        {
          text: '&larr; Back',
          classes: 'shepherd-button-secondary',
          action: () => this.tour?.back()
        },
        {
          text: 'Cancel',
          classes: 'shepherd-button-secondary',
          action: () => this.tour?.cancel()
        },
        {
          text: 'Next &rarr;',
          classes: 'shepherd-button-primary',
          action: () => {
            // If the search dropdown is open, close it (handled by blur usually, but we can forcefully unfocus)
            (document.querySelector('[data-tour="global-search"]') as HTMLElement)?.blur();
            this.tour?.next();
          }
        }
      ]
    });

    // Step 3: Sidebar Navigation
    this.tour.addStep({
      id: 'step-sidebar-navigation',
      title: 'Navigation Menu',
      text: 'Use the navigation menu to move between Dashboard, Locations, Access, Trips, Gateways, Vehicles, Users, Keys, Levels, Reports, and Settings.',
      attachTo: { element: '[data-tour="sidebar-navigation"]', on: 'right' },
      beforeShowPromise: () => this.waitForElement('[data-tour="sidebar-navigation"]'),
      buttons: [
        {
          text: '&larr; Back',
          classes: 'shepherd-button-secondary',
          action: () => this.tour?.back()
        },
        {
          text: 'Cancel',
          classes: 'shepherd-button-secondary',
          action: () => this.tour?.cancel()
        },
        {
          text: 'Next &rarr;',
          classes: 'shepherd-button-primary',
          action: () => this.tour?.next()
        }
      ]
    });

    // Step 4: Locations
    this.tour.addStep({
      id: 'step-locations',
      title: 'Locations',
      text: 'Here you can manage and monitor all locations, locks, and gateway mappings.',
      attachTo: { element: '[data-tour="locations-list"]', on: 'right' },
      beforeShowPromise: () => {
        this.navigate('/locations');
        return new Promise(resolve => setTimeout(() => resolve(this.waitForElement('[data-tour="locations-list"]')), 100));
      },
      buttons: [
        {
          text: '&larr; Back',
          classes: 'shepherd-button-secondary',
          action: () => {
            // Need to navigate back to dashboard
            this.navigate('/dashboard');
            this.tour?.back();
          }
        },
        {
          text: 'Cancel',
          classes: 'shepherd-button-secondary',
          action: () => this.tour?.cancel()
        },
        {
          text: 'Next &rarr;',
          classes: 'shepherd-button-primary',
          action: () => this.tour?.next()
        }
      ]
    });

    // Step 5: Dashboard Quick Action
    this.tour.addStep({
      id: 'step-quick-actions',
      title: 'Quick Actions',
      text: 'Use Quick Actions to quickly perform common operations. Click Add Location to create a new location.',
      attachTo: { element: '[data-tour="quick-add-location"]', on: 'top' },
      beforeShowPromise: () => {
        this.navigate('/dashboard');
        return new Promise(resolve => setTimeout(() => resolve(this.waitForElement('[data-tour="quick-add-location"]')), 100));
      },
      buttons: [
        {
          text: '&larr; Back',
          classes: 'shepherd-button-secondary',
          action: () => {
            this.navigate('/locations');
            this.tour?.back();
          }
        },
        {
          text: 'Cancel',
          classes: 'shepherd-button-secondary',
          action: () => this.tour?.cancel()
        },
        {
          text: 'Next &rarr;',
          classes: 'shepherd-button-primary',
          action: () => {
            // Programmatically click the "Add Location" button
            const addBtn = document.querySelector('[data-tour="quick-add-location"]') as HTMLElement;
            if (addBtn) addBtn.click();
            this.tour?.next();
          }
        }
      ]
    });

    // Step 6: Add Location Modal
    this.tour.addStep({
      id: 'step-add-location-modal',
      title: 'Add New Location',
      text: 'Create a new location by entering the required details (Name, City, Country) and saving the location.',
      attachTo: { element: '[data-tour="add-location-modal"]', on: 'right' },
      beforeShowPromise: () => {
        // Quick action button click triggers navigation and event dispatch in Dashboard.tsx
        return this.waitForElement('[data-tour="add-location-modal"]');
      },
      buttons: [
        {
          text: '&larr; Back',
          classes: 'shepherd-button-secondary',
          action: () => {
            // Close modal
            const closeBtn = document.querySelector('.modal-close-icon') as HTMLElement;
            if (closeBtn) closeBtn.click();
            
            this.navigate('/dashboard');
            this.tour?.back();
          }
        },
        {
          text: 'Finish',
          classes: 'shepherd-button-primary',
          action: () => this.tour?.complete()
        }
      ]
    });
  }

  public start() {
    if (this.tour) {
      this.tour.start();
    }
  }
}

export const tourManager = new TourManager();
