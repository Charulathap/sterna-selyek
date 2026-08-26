import React from 'react';
import { useOutletContext, useNavigate } from 'react-router-dom';
import { 
  Briefcase, MapPin, Lock, Users, Shield, UsersRound,
  ArrowUpRight, ArrowDownRight, PackageOpen, BarChart3,
  Unlock, Car, Server, Database, Cloud, HardDrive, ShieldCheck
} from 'lucide-react';
import './Dashboard.css';

const StatCard = ({ title, value, change, isPositive, icon: Icon, colorClass, sparklinePath, isLoading }: any) => {
  if (isLoading) {
    return (
      <div className={`stat-card ${colorClass}`}>
        <div className="stat-card-header skeleton-header">
          <div className="skeleton skeleton-icon"></div>
          <div className="skeleton skeleton-text skeleton-title"></div>
        </div>
        <div className="stat-content">
          <div className="skeleton skeleton-text skeleton-value"></div>
          <div className="skeleton skeleton-text skeleton-change"></div>
        </div>
      </div>
    );
  }

  return (
    <div className={`stat-card ${colorClass}`}>
      <div className="stat-card-header">
        <div className="stat-icon-wrapper">
          <Icon size={20} />
        </div>
        <h3 className="stat-title">{title}</h3>
      </div>
      <div className="stat-content">
        <div className="stat-value">{value}</div>
        <div className={`stat-change ${isPositive ? 'positive' : 'neutral'}`}>
          {isPositive ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
          <span>{change} from last 7 days</span>
        </div>
      </div>
      <div className="stat-sparkline">
        <svg width="100%" height="40" preserveAspectRatio="none">
          <path d={sparklinePath} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </div>
  );
};

const Dashboard: React.FC = () => {
  const { isLoading } = useOutletContext<{ isLoading: boolean }>();
  const navigate = useNavigate();

  const handleAddLocationClick = () => {
    navigate('/locations');
  };

  return (
    <div className="dashboard-container">
      {/* Top Stats Grid */}
      <div className="stats-grid">
        <StatCard 
          title="TOTAL ASSETS" value="0" change="0%" isPositive={false} 
          icon={Briefcase} colorClass="color-blue"
          sparklinePath="M0,30 Q25,20 50,30 T100,10"
          isLoading={isLoading}
        />
        <StatCard 
          title="TOTAL LOCATIONS" value="1" change="100%" isPositive={true} 
          icon={MapPin} colorClass="color-green"
          sparklinePath="M0,35 Q30,10 60,25 T100,5"
          isLoading={isLoading}
        />
        <StatCard 
          title="TOTAL ACCESS" value="0" change="0%" isPositive={false} 
          icon={Lock} colorClass="color-orange"
          sparklinePath="M0,30 Q25,35 50,25 T100,20"
          isLoading={isLoading}
        />
        <StatCard 
          title="TOTAL USERS" value="7" change="16.7%" isPositive={true} 
          icon={Users} colorClass="color-pink"
          sparklinePath="M0,25 Q30,5 60,15 T100,0"
          isLoading={isLoading}
        />
        <StatCard 
          title="TOTAL LOCK GROUPS" value="0" change="0%" isPositive={false} 
          icon={Shield} colorClass="color-purple"
          sparklinePath="M0,20 Q20,25 40,15 T100,20"
          isLoading={isLoading}
        />
        <StatCard 
          title="TOTAL USER GROUPS" value="0" change="0%" isPositive={false} 
          icon={UsersRound} colorClass="color-indigo"
          sparklinePath="M0,25 Q25,20 50,25 T100,20"
          isLoading={isLoading}
        />
      </div>

      {/* Main Panels Grid */}
      <div className="panels-grid">
        {/* Assets in Stock */}
        <div className="panel card">
          <div className="panel-header">
            <h3 className="panel-title">ASSETS IN STOCK <span>ⓘ</span></h3>
            <a href="#" className="panel-link">View all →</a>
          </div>
          <div className="panel-body empty-state">
            {isLoading ? (
               <div className="skeleton skeleton-circle"></div>
            ) : (
              <div className="empty-icon-wrapper color-blue">
                <PackageOpen size={32} />
              </div>
            )}
            {isLoading ? <div className="skeleton skeleton-text" style={{width: '100px', marginTop: '10px'}}></div> : <h4>No Assets</h4>}
            {isLoading ? <div className="skeleton skeleton-text" style={{width: '160px'}}></div> : <p>There are no assets in stock.</p>}
          </div>
        </div>

        {/* Highest Lock Openings */}
        <div className="panel card">
          <div className="panel-header">
            <h3 className="panel-title">HIGHEST LOCK OPENINGS (LAST 7 DAYS) <span>ⓘ</span></h3>
            <a href="#" className="panel-link">View all →</a>
          </div>
          <div className="panel-body empty-state">
            {isLoading ? (
               <div className="skeleton skeleton-circle"></div>
            ) : (
              <div className="empty-icon-wrapper color-gray">
                <BarChart3 size={32} />
              </div>
            )}
            {isLoading ? <div className="skeleton skeleton-text" style={{width: '100px', marginTop: '10px'}}></div> : <h4>No data</h4>}
            {isLoading ? <div className="skeleton skeleton-text" style={{width: '180px'}}></div> : <p>No lock opening data available.</p>}
          </div>
        </div>

        {/* Lock Status Count */}
        <div className="panel card">
          <div className="panel-header">
            <h3 className="panel-title">LOCK STATUS COUNT <span>ⓘ</span></h3>
            <a href="#" className="panel-link">View all →</a>
          </div>
          <div className="panel-body empty-state">
            {isLoading ? (
               <div className="skeleton skeleton-circle"></div>
            ) : (
              <div className="empty-icon-wrapper color-green">
                <Unlock size={32} />
              </div>
            )}
            {isLoading ? <div className="skeleton skeleton-text" style={{width: '100px', marginTop: '10px'}}></div> : <h4>No data</h4>}
            {isLoading ? <div className="skeleton skeleton-text" style={{width: '180px'}}></div> : <p>No lock status data available.</p>}
          </div>
        </div>

        {/* Recent Activities */}
        <div className="panel card">
          <div className="panel-header">
            <h3 className="panel-title">RECENT ACTIVITIES</h3>
            <a href="#" className="panel-link">View all →</a>
          </div>
          <div className="panel-body no-padding">
            <div className="activity-list">
              {isLoading ? (
                Array(4).fill(0).map((_, i) => (
                  <div key={i} className="activity-item" style={{display: 'flex', gap: '12px', padding: '16px 20px'}}>
                    <div className="skeleton" style={{width: '32px', height: '32px', borderRadius: '50%'}}></div>
                    <div style={{flex: 1}}>
                      <div className="skeleton skeleton-text" style={{width: '100px', marginBottom: '8px'}}></div>
                      <div className="skeleton skeleton-text" style={{width: '160px'}}></div>
                    </div>
                  </div>
                ))
              ) : (
                <>
                  <div className="activity-item">
                    <div className="activity-icon color-blue"><Users size={16} /></div>
                    <div className="activity-details">
                      <div className="activity-title">User login</div>
                      <div className="activity-desc">Leo logged in</div>
                    </div>
                    <div className="activity-meta">
                      <div className="activity-time">11:49 AM</div>
                      <div className="badge badge-success">Success</div>
                    </div>
                  </div>
                  <div className="activity-item">
                    <div className="activity-icon color-green"><MapPin size={16} /></div>
                    <div className="activity-details">
                      <div className="activity-title">Location added</div>
                      <div className="activity-desc">New location "R S Puram" added</div>
                    </div>
                    <div className="activity-meta">
                      <div className="activity-time">11:20 AM</div>
                      <div className="badge badge-success">Success</div>
                    </div>
                  </div>
                  <div className="activity-item">
                    <div className="activity-icon color-orange"><Lock size={16} /></div>
                    <div className="activity-details">
                      <div className="activity-title">Lock mapped</div>
                      <div className="activity-desc">Lock "LCK-1001" mapped to asset</div>
                    </div>
                    <div className="activity-meta">
                      <div className="activity-time">10:45 AM</div>
                      <div className="badge badge-success">Success</div>
                    </div>
                  </div>
                  <div className="activity-item">
                    <div className="activity-icon color-pink"><Users size={16} /></div>
                    <div className="activity-details">
                      <div className="activity-title">User created</div>
                      <div className="activity-desc">New user "John Doe" created</div>
                    </div>
                    <div className="activity-meta">
                      <div className="activity-time">09:30 AM</div>
                      <div className="badge badge-success">Success</div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="panel card">
          <div className="panel-header">
            <h3 className="panel-title">QUICK ACTIONS</h3>
          </div>
          <div className="panel-body">
            <div className="quick-actions-grid">
              {isLoading ? (
                Array(6).fill(0).map((_, i) => (
                  <div key={i} className="quick-action-btn">
                     <div className="skeleton" style={{width: '48px', height: '48px', borderRadius: '50%'}}></div>
                     <div className="skeleton skeleton-text" style={{width: '60px', marginTop: '10px'}}></div>
                  </div>
                ))
              ) : (
                <>
                  <button className="quick-action-btn" onClick={handleAddLocationClick}>
                    <div className="quick-action-icon color-blue"><MapPin size={24} /></div>
                    <span>Add Location</span>
                  </button>
                  <button className="quick-action-btn">
                    <div className="quick-action-icon color-green"><Lock size={24} /></div>
                    <span>Add Lock</span>
                  </button>
                  <button className="quick-action-btn">
                    <div className="quick-action-icon color-pink"><Users size={24} /></div>
                    <span>Add User</span>
                  </button>
                  <button className="quick-action-btn">
                    <div className="quick-action-icon color-orange"><PackageOpen size={24} /></div>
                    <span>Add Asset</span>
                  </button>
                  <button className="quick-action-btn">
                    <div className="quick-action-icon color-purple"><Car size={24} /></div>
                    <span>Create Trip</span>
                  </button>
                  <button className="quick-action-btn">
                    <div className="quick-action-icon color-indigo"><BarChart3 size={24} /></div>
                    <span>View Reports</span>
                  </button>
                </>
              )}
            </div>
          </div>
        </div>

        {/* System Overview */}
        <div className="panel card">
          <div className="panel-header">
            <h3 className="panel-title">SYSTEM OVERVIEW</h3>
          </div>
          <div className="panel-body no-padding">
            <div className="system-list">
              {isLoading ? (
                Array(5).fill(0).map((_, i) => (
                  <div key={i} className="system-item" style={{display: 'flex', justifyContent: 'space-between', padding: '16px 20px'}}>
                    <div className="skeleton skeleton-text" style={{width: '120px'}}></div>
                    <div className="skeleton skeleton-text" style={{width: '60px'}}></div>
                  </div>
                ))
              ) : (
                <>
                  <div className="system-item">
                    <div className="system-name"><Server size={16} className="color-gray" /> Server Status</div>
                    <div className="system-status status-healthy"><span className="dot"></span> Healthy</div>
                  </div>
                  <div className="system-item">
                    <div className="system-name"><Database size={16} className="color-gray" /> Database</div>
                    <div className="system-status status-connected"><span className="dot"></span> Connected</div>
                  </div>
                  <div className="system-item">
                    <div className="system-name"><Cloud size={16} className="color-gray" /> API Services</div>
                    <div className="system-status status-active"><span className="dot"></span> Active</div>
                  </div>
                  <div className="system-item">
                    <div className="system-name"><HardDrive size={16} className="color-gray" /> Storage</div>
                    <div className="system-status status-normal"><span className="dot"></span> Normal</div>
                  </div>
                  <div className="system-item">
                    <div className="system-name"><ShieldCheck size={16} className="color-gray" /> Backup Status</div>
                    <div className="system-status status-uptodate"><span className="dot"></span> Up to date</div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;
