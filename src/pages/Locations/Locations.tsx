import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { 
  Search, Plus, ChevronRight, ChevronLeft, Info, 
  Upload, RefreshCw, Edit2, Trash2, Lock, Battery,
  MapPin, Building,
  Map, Globe, ChevronDown, AlignLeft, Save, X
} from 'lucide-react';
import './Locations.css';

const locationsList = [
  { id: 'RP', name: 'R S Puram', city: 'Coimbatore, Tamil Nadu', locks: 12, active: true },
  { id: 'GN', name: 'Gandhipuram', city: 'Coimbatore, Tamil Nadu', locks: 8, active: false },
  { id: 'SA', name: 'Saidapet', city: 'Chennai, Tamil Nadu', locks: 6, active: false },
  { id: 'AM', name: 'Anna Nagar', city: 'Chennai, Tamil Nadu', locks: 10, active: false },
  { id: 'BT', name: 'BTM Layout', city: 'Bengaluru, Karnataka', locks: 7, active: false },
  { id: 'HSR', name: 'HSR Layout', city: 'Bengaluru, Karnataka', locks: 9, active: false },
  { id: 'MP', name: 'Malleswaram', city: 'Bengaluru, Karnataka', locks: 5, active: false },
  { id: 'TVM', name: 'Trivandrum Central', city: 'Thiruvananthapuram, Kerala', locks: 6, active: false },
];

const locksData = [
  { id: 1, name: 'Main Entrance Lock', marking: 'RSP-AME-001', type: 'Electronic', battery: 87, time: '11 Sep 2025, 10:30 AM', status: 'Online', author: 'Leo' },
  { id: 2, name: 'Store Room Lock', marking: 'RSP-STR-002', type: 'Smart', battery: 62, time: '11 Sep 2025, 09:15 AM', status: 'Online', author: 'Leo' },
  { id: 3, name: 'Server Room Lock', marking: 'RSP-SRV-003', type: 'Electronic', battery: 91, time: '11 Sep 2025, 11:20 AM', status: 'Online', author: 'Leo' },
  { id: 4, name: 'Warehouse Lock', marking: 'RSP-WRH-004', type: 'Smart', battery: 35, time: '11 Sep 2025, 08:45 AM', status: 'Online', author: 'Leo' },
  { id: 5, name: 'Back Door Lock', marking: 'RSP-BCK-005', type: 'Electronic', battery: 78, time: '11 Sep 2025, 10:05 AM', status: 'Online', author: 'Leo' },
  { id: 6, name: 'Parking Gate Lock', marking: 'RSP-PKG-006', type: 'Smart', battery: 49, time: '11 Sep 2025, 09:50 AM', status: 'Online', author: 'Leo' },
  { id: 7, name: 'Office Cabin Lock', marking: 'RSP-OFC-007', type: 'Electronic', battery: 90, time: '11 Sep 2025, 11:10 AM', status: 'Online', author: 'Leo' },
];

const Locations: React.FC = () => {
  const { isLoading } = useOutletContext<{ isLoading: boolean }>();
  const [activeTab, setActiveTab] = useState('Lock Mapping');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Check if tour requested modal open
  React.useEffect(() => {
    const handleTourEvent = (e: any) => {
      if (e.detail === 'open-add-location-modal') {
        setIsModalOpen(true);
      }
    };
    window.addEventListener('tour-event', handleTourEvent);
    return () => window.removeEventListener('tour-event', handleTourEvent);
  }, []);

  return (
    <div className="locations-container">
      {/* Sidebar List */}
      <div className="locations-sidebar card">
        <div className="locations-sidebar-header">
          <h2 className="locations-title">All Locations</h2>
          <button 
            className="btn-primary btn-sm" 
            id="tour-locations-add-btn"
            onClick={() => setIsModalOpen(true)}
          >
            <Plus size={14} /> Add Location
          </button>
        </div>
        
        <div className="locations-search">
          <Search size={16} color="var(--text-muted)" />
          <input type="text" placeholder="Search location..." />
          <div className="filter-icon">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1 2.5H13M3.5 7H10.5M6 11.5H8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>

        <div className="locations-list" data-tour="locations-list">
          {isLoading ? (
            Array(8).fill(0).map((_, i) => (
              <div key={i} className="location-item" style={{display: 'flex', gap: '12px', padding: '16px 20px'}}>
                <div className="skeleton" style={{width: '32px', height: '32px', borderRadius: '50%'}}></div>
                <div style={{flex: 1}}>
                  <div className="skeleton skeleton-text" style={{width: '100px', marginBottom: '8px'}}></div>
                  <div className="skeleton skeleton-text" style={{width: '140px'}}></div>
                </div>
                <div className="skeleton skeleton-text" style={{width: '40px', height: '16px'}}></div>
              </div>
            ))
          ) : (
            locationsList.map((loc) => (
              <div key={loc.id} className={`location-item ${loc.active ? 'active' : ''}`}>
                <div className={`location-avatar ${loc.active ? 'color-blue-bg' : ''}`}>{loc.id}</div>
                <div className="location-info">
                  <div className="location-name">{loc.name}</div>
                  <div className="location-city">{loc.city}</div>
                </div>
                <div className="location-locks">
                  <span>{loc.locks} Locks</span>
                  {loc.active && <ChevronRight size={16} className="color-blue" />}
                </div>
              </div>
            ))
          )}
        </div>

        <div className="locations-pagination">
          <span className="pagination-text">1-8 of 18 locations</span>
          <div className="pagination-controls">
            <button className="page-btn"><ChevronLeft size={14} /></button>
            <button className="page-btn active">1</button>
            <button className="page-btn">2</button>
            <button className="page-btn">3</button>
            <button className="page-btn"><ChevronRight size={14} /></button>
          </div>
        </div>
      </div>

      {/* Main Details Panel */}
      <div className="location-details card">
        <div className="location-details-header">
          <div className="details-header-left">
            {isLoading ? (
              <>
                <div className="skeleton skeleton-text" style={{width: '150px', height: '24px', marginBottom: '8px'}}></div>
                <div className="skeleton skeleton-text" style={{width: '180px'}}></div>
              </>
            ) : (
              <>
                <div className="details-title-row">
                  <h2 className="details-title">R S Puram</h2>
                  <span className="badge badge-success">Active</span>
                </div>
                <div className="details-subtitle">Coimbatore, Tamil Nadu</div>
              </>
            )}
          </div>
          {!isLoading && (
            <button className="btn-outline btn-sm">
              <Info size={14} /> Location Details
            </button>
          )}
        </div>

        <div className="details-tabs">
          {['Lock Mapping', 'Lock Groups', 'Geofence', 'Gateway Mapping'].map(tab => (
            <div 
              key={tab} 
              className={`tab-item ${activeTab === tab ? 'active' : ''}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </div>
          ))}
        </div>

        <div className="details-content">
          {activeTab === 'Lock Mapping' ? (
            <>
              <div className="content-header">
                <div>
                  <h3 className="content-title">Lock Mapping</h3>
                  <p className="content-subtitle">View and manage locks mapped to this location.</p>
                </div>
                <div className="content-actions">
                  <button className="btn-primary btn-sm">
                    <Plus size={14} /> Add Lock Mapping
                  </button>
                  <button className="btn-icon"><Upload size={16} /></button>
                  <button className="btn-icon"><RefreshCw size={16} /></button>
                </div>
              </div>

              <div className="table-responsive">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>S.NO</th>
                      <th>LOCK NAME</th>
                      <th>ASSET MARKING</th>
                      <th>LOCK TYPE</th>
                      <th>BATTERY %</th>
                      <th>LAST COMMUNICATED</th>
                      <th>CREATED BY</th>
                      <th>ACTIONS</th>
                    </tr>
                  </thead>
                  <tbody>
                    {isLoading ? (
                      Array(7).fill(0).map((_, i) => (
                        <tr key={i}>
                          <td><div className="skeleton skeleton-text" style={{width: '20px'}}></div></td>
                          <td>
                            <div className="td-flex">
                              <div className="skeleton" style={{width: '24px', height: '24px', borderRadius: '50%'}}></div>
                              <div className="skeleton skeleton-text" style={{width: '120px'}}></div>
                            </div>
                          </td>
                          <td><div className="skeleton skeleton-text" style={{width: '100px'}}></div></td>
                          <td><div className="skeleton" style={{width: '60px', height: '24px', borderRadius: '12px'}}></div></td>
                          <td><div className="skeleton skeleton-text" style={{width: '40px'}}></div></td>
                          <td>
                            <div className="skeleton skeleton-text" style={{width: '140px', marginBottom: '4px'}}></div>
                            <div className="skeleton skeleton-text" style={{width: '60px'}}></div>
                          </td>
                          <td><div className="skeleton skeleton-text" style={{width: '60px'}}></div></td>
                          <td>
                            <div className="action-buttons">
                              <div className="skeleton" style={{width: '28px', height: '28px', borderRadius: '4px'}}></div>
                              <div className="skeleton" style={{width: '28px', height: '28px', borderRadius: '4px'}}></div>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      locksData.map((lock) => (
                        <tr key={lock.id}>
                          <td>{lock.id}</td>
                          <td>
                            <div className="td-flex">
                              <div className="td-icon color-blue-bg"><Lock size={12} /></div>
                              {lock.name}
                            </div>
                          </td>
                          <td className="font-medium">{lock.marking}</td>
                          <td>
                            <span className={`badge-pill ${lock.type === 'Electronic' ? 'badge-blue' : 'badge-orange'}`}>
                              {lock.type}
                            </span>
                          </td>
                          <td>
                            <div className="td-flex color-green">
                              <Battery size={16} /> {lock.battery}%
                            </div>
                          </td>
                          <td>
                            <div className="td-time">{lock.time}</div>
                            <div className="td-status color-green">{lock.status}</div>
                          </td>
                          <td>{lock.author}</td>
                          <td>
                            <div className="action-buttons">
                              <button className="action-btn color-blue"><Edit2 size={14} /></button>
                              <button className="action-btn color-red"><Trash2 size={14} /></button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>

              <div className="table-footer">
                <span className="pagination-text">Showing 1 to 7 of 12 locks</span>
                <div className="table-pagination">
                  <select className="page-select">
                    <option>10 per page</option>
                  </select>
                  <div className="pagination-controls">
                    <button className="page-btn"><ChevronLeft size={14} /></button>
                    <button className="page-btn active">1</button>
                    <button className="page-btn">2</button>
                    <button className="page-btn"><ChevronRight size={14} /></button>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div style={{ padding: '60px 20px', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
              <div className="empty-icon-wrapper color-gray" style={{ width: '64px', height: '64px', backgroundColor: '#F8FAFC', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="color-gray">
                  <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                  <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
                  <line x1="12" y1="22.08" x2="12" y2="12"></line>
                </svg>
              </div>
              <div>
                <h3 style={{ fontSize: '18px', color: 'var(--text-dark)', marginBottom: '8px' }}>No {activeTab} Data</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>There is currently no data available for this section.</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Add Location Modal */}
      {isModalOpen && (
        <div className="modal-overlay" id="tour-modal" data-tour="add-location-modal">
          <div className="modal-content card" style={{ maxWidth: '650px' }}>
            <button className="modal-close-icon" onClick={() => setIsModalOpen(false)}>
              <X size={20} />
            </button>
            
            <div className="modal-header-new">
              <div className="modal-icon-wrapper">
                <MapPin size={24} className="color-blue" />
              </div>
              <div>
                <h3 className="modal-title-new">Add New Location</h3>
                <p className="modal-subtitle-new">Create a new location to organize your locks and devices.</p>
              </div>
            </div>

            <div className="modal-body-new">
              <h4 className="section-title">Location Information</h4>
              
              <div className="form-grid-2">
                <div className="form-group">
                  <label>Location Name <span className="color-red">*</span></label>
                  <div className="input-with-icon">
                    <Building size={16} className="input-icon" />
                    <input type="text" className="form-control pl-8" placeholder="e.g. Headquarters" />
                  </div>
                </div>
                
                <div className="form-group">
                  <label>City <span className="color-red">*</span></label>
                  <div className="input-with-icon">
                    <Building size={16} className="input-icon" />
                    <input type="text" className="form-control pl-8" placeholder="e.g. New York" />
                  </div>
                </div>

                <div className="form-group">
                  <label>State / Province</label>
                  <div className="input-with-icon">
                    <Map size={16} className="input-icon" />
                    <input type="text" className="form-control pl-8" placeholder="e.g. New York" />
                  </div>
                </div>

                <div className="form-group">
                  <label>Country <span className="color-red">*</span></label>
                  <div className="input-with-icon">
                    <Globe size={16} className="input-icon" />
                    <select className="form-control pl-8 pr-8 appearance-none">
                      <option>Select country</option>
                      <option>United States</option>
                      <option>India</option>
                    </select>
                    <ChevronDown size={16} className="select-icon" />
                  </div>
                </div>
              </div>

              <div className="form-group mt-16">
                <label>Address</label>
                <div className="input-with-icon textarea-icon-wrapper">
                  <MapPin size={16} className="input-icon" />
                  <textarea className="form-control pl-8" rows={2} placeholder="e.g. 123 Main Street, Manhattan, New York, NY 10001"></textarea>
                </div>
              </div>

              <div className="form-group mt-16">
                <label>Description (Optional)</label>
                <div className="input-with-icon textarea-icon-wrapper">
                  <AlignLeft size={16} className="input-icon" />
                  <textarea className="form-control pl-8" rows={3} placeholder="Add any additional details about this location..."></textarea>
                </div>
                <div className="char-count">0 / 300 characters</div>
              </div>
            </div>

            <div className="modal-footer-new">
              <button className="btn-outline" onClick={() => setIsModalOpen(false)}>Cancel</button>
              <button className="btn-primary" onClick={() => setIsModalOpen(false)}>
                <Save size={16} /> Save Location
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Locations;
