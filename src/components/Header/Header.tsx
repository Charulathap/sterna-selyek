import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Search, Bell, LogOut, ChevronDown, ChevronUp, Map, X, CheckCircle, Trash2 } from 'lucide-react';
import './Header.css';

const mockSearchData = [
  { id: 1, text: 'Main Entrance Lock', tag: 'Lock', link: '/locations' },
  { id: 2, text: 'Store Room Lock', tag: 'Lock', link: '/locations' },
  { id: 3, text: 'Server Room Lock', tag: 'Lock', link: '/locations' },
  { id: 4, text: 'Warehouse Lock', tag: 'Lock', link: '/locations' },
  { id: 5, text: 'R S Puram', tag: 'Location', link: '/locations' },
  { id: 6, text: 'Gandhipuram', tag: 'Location', link: '/locations' },
  { id: 7, text: 'Saidapet', tag: 'Location', link: '/locations' },
  { id: 8, text: 'Dashboard', tag: 'Page', link: '/dashboard' },
  { id: 9, text: 'Users', tag: 'Page', link: '/users' },
  { id: 10, text: 'Gateways', tag: 'Page', link: '/gateways' }
];

const Header: React.FC = () => {
  const location = useLocation();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [notifications, setNotifications] = useState([
    { id: 1, title: 'New Location Added', desc: 'R S Puram has been successfully created.', time: '2m ago', isRead: false },
    { id: 2, title: 'Lock Mapped', desc: 'Main Entrance Lock mapped to R S Puram.', time: '1h ago', isRead: false },
  ]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [userEmail, setUserEmail] = useState('leo@sternasecurity.com');
  const [userName, setUserName] = useState('Leo');
  
  useEffect(() => {
    const savedEmail = localStorage.getItem('userEmail');
    if (savedEmail) {
      setUserEmail(savedEmail);
      // Capitalize first part of email for name if not Leo
      const namePart = savedEmail.split('@')[0];
      setUserName(namePart.charAt(0).toUpperCase() + namePart.slice(1));
    }
  }, []);

  // Derive title and subtitle from route
  const getHeaderInfo = () => {
    switch(location.pathname) {
      case '/dashboard':
        return {
          title: 'Dashboard',
          subtitle: `Welcome back, ${userName}! Here's what's happening today.`
        };
      case '/locations':
        return {
          title: 'Locations',
          subtitle: 'Manage and monitor all locations, locks and gateway mappings'
        };
      default:
        return {
          title: 'Overview',
          subtitle: 'Welcome to Sterna Selyek Portal'
        };
    }
  };

  const { title, subtitle } = getHeaderInfo();
  const avatarLetter = userName.charAt(0).toUpperCase();

  const handleLogout = () => {
    localStorage.removeItem('userEmail');
    window.location.href = '/login';
  };

  // Filter search results
  const searchResults = mockSearchData.filter(item => 
    item.text.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderHighlightedText = (text: string, highlight: string) => {
    if (!highlight.trim()) {
      return <span>{text}</span>;
    }
    const regex = new RegExp(`(${highlight})`, 'gi');
    const parts = text.split(regex);
    return (
      <span>
        {parts.map((part, i) => 
          regex.test(part) ? <span key={i} className="search-highlight">{part}</span> : <span key={i}>{part}</span>
        )}
      </span>
    );
  };

  return (
    <header className="header">
      <div className="header-left">
        <div className="header-title-container">
          <h1 className="header-title">{title}</h1>
          <p className="header-subtitle">{subtitle}</p>
        </div>
      </div>

      <div className="header-right">
        <div className="search-container" id="tour-search">
          <Search size={16} className="search-icon" />
          <input 
            type="text" 
            placeholder="Search anything..." 
            className="search-input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setIsSearchFocused(true)}
            onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
          />
          {searchQuery.length > 0 ? (
            <button className="search-clear" onClick={() => setSearchQuery('')}>
              <X size={14} />
            </button>
          ) : (
            <span className="search-shortcut">Ctrl + K</span>
          )}
          
          {isSearchFocused && searchQuery.length > 0 && (
            <div className="search-dropdown">
              {searchResults.length > 0 ? (
                searchResults.map(result => (
                  <div key={result.id} className="search-result-item" onClick={() => window.location.href = result.link}>
                    <div className="search-result-text">
                      {renderHighlightedText(result.text, searchQuery)}
                    </div>
                    <div className="search-result-tag">{result.tag}</div>
                  </div>
                ))
              ) : (
                <div style={{ padding: '16px', textAlign: 'center', color: 'var(--text-muted)', fontSize: '13px' }}>
                  No data found for this query.
                </div>
              )}
            </div>
          )}
        </div>

        <div className="notification-container" style={{ position: 'relative' }}>
          <button 
            className="notification-btn" 
            id="tour-notifications"
            onClick={() => setIsNotifOpen(!isNotifOpen)}
          >
            <Bell size={20} color="var(--text-dark)" />
            {notifications.some(n => !n.isRead) && <span className="notification-badge">{notifications.filter(n => !n.isRead).length}</span>}
          </button>

          {isNotifOpen && (
            <div className="search-dropdown notification-dropdown" style={{ right: '-50px', left: 'auto', width: '320px', padding: 0 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 16px', borderBottom: '1px solid var(--border-color)' }}>
                <h4 style={{ margin: 0, fontSize: '14px', fontWeight: 600 }}>Notifications</h4>
                <div style={{ display: 'flex', gap: '12px' }}>
                  <button onClick={() => setNotifications(notifications.map(n => ({...n, isRead: true})))} style={{ fontSize: '11px', color: 'var(--primary-blue)', fontWeight: 500 }}>Mark all read</button>
                  <button onClick={() => setNotifications([])} style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: 500 }}>Clear all</button>
                </div>
              </div>
              <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
                {notifications.length > 0 ? notifications.map(notif => (
                  <div key={notif.id} className="notification-item" style={{ padding: '12px 16px', borderBottom: '1px solid var(--border-color)', display: 'flex', gap: '12px', alignItems: 'flex-start', background: notif.isRead ? 'white' : '#F4F9FF', position: 'relative' }}>
                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: notif.isRead ? 'transparent' : 'var(--primary-blue)', marginTop: '6px', flexShrink: 0 }}></div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-dark)', marginBottom: '4px' }}>{notif.title}</div>
                      <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '4px' }}>{notif.desc}</div>
                      <div style={{ fontSize: '11px', color: 'var(--text-light)' }}>{notif.time}</div>
                    </div>
                    <div className="notification-actions">
                      <button onClick={() => setNotifications(notifications.map(n => n.id === notif.id ? {...n, isRead: true} : n))} title="Mark as read"><CheckCircle size={14} /></button>
                      <button onClick={() => setNotifications(notifications.filter(n => n.id !== notif.id))} title="Remove"><Trash2 size={14} /></button>
                    </div>
                  </div>
                )) : (
                  <div style={{ padding: '24px 16px', textAlign: 'center', color: 'var(--text-muted)', fontSize: '13px' }}>
                    No new notifications.
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        <div className="user-dropdown-container">
          <div 
            className="user-profile-btn" 
            id="tour-profile" 
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            <div className="user-avatar">{avatarLetter}</div>
            <div className="user-info">
              <div className="user-name">{userName}</div>
              <div className="user-role">Administrator</div>
            </div>
            {isDropdownOpen ? <ChevronUp size={16} className="user-chevron" /> : <ChevronDown size={16} className="user-chevron" />}
          </div>

          {isDropdownOpen && (
            <div className="user-dropdown-menu">
              <div className="dropdown-user-details">
                <div className="user-avatar dropdown-avatar-lg">{avatarLetter}</div>
                <div>
                  <div className="dropdown-name">{userName}</div>
                  <div className="dropdown-email">{userEmail}</div>
                </div>
              </div>
              <button 
                className="dropdown-logout-btn" 
                onClick={handleLogout}
              >
                <LogOut size={16} /> Sign Out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
