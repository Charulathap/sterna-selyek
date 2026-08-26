import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock, Shield } from 'lucide-react';
import './Login.css';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const validateEmail = (email: string) => {
    // Basic valid email and ends with correct domain (assuming sternasecurity.com based on copyright)
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email) && (email.endsWith('@sternasecurity.com') || email.endsWith('@sterna.com'));
  };

  const validatePassword = (password: string) => {
    // At least 8 characters, 1 uppercase, 1 number
    const re = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/;
    return re.test(password);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email && !password) {
      setError('Please enter the email address & password');
      return;
    }
    
    if (!email) {
      setError('Please enter the email address');
      return;
    }

    if (!password) {
      setError('Please enter the password');
      return;
    }

    if (!validateEmail(email)) {
      setError('Please enter a valid email ending with @sternasecurity.com or @sterna.com');
      return;
    }

    if (!validatePassword(password)) {
      setError('Password must be at least 8 characters long, include an uppercase letter and a number.');
      return;
    }

    // Store simple auth flag and user info
    localStorage.setItem('isAuthenticated', 'true');
    localStorage.setItem('userEmail', email);
    
    // Hard refresh app to reset states and enter safely
    navigate('/dashboard', { state: { fromLogin: true } });
  };

  return (
    <div className="login-container">
      <div className="login-hex-bg"></div>
      
      <div className="login-card">
        <div className="login-header">
          <div className="login-logo">
            <div className="logo-icon-text">
              <span className="logo-sterna">STERNA</span> <span className="logo-selyek">SELYEK</span>
            </div>
          </div>
          <h1 className="login-title">Welcome back!</h1>
          <p className="login-subtitle">Sign in to your account to continue</p>
        </div>

        <form onSubmit={handleLogin} className="login-form">
          {error && <div className="login-error">{error}</div>}
          
          <div className="form-group">
            <label htmlFor="email">Email address</label>
            <div className="input-wrapper">
              <Mail className="input-icon" size={18} />
              <input
                type="text"
                id="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <div className="input-wrapper">
              <Lock className="input-icon" size={18} />
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button 
                type="button" 
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <div className="form-options">
            <label className="remember-me">
              <input type="checkbox" />
              <span>Remember me</span>
            </label>
            <a href="#" className="forgot-password">Forgot Password?</a>
          </div>

          <button type="submit" className="btn-primary">
            Login using Password
          </button>

          <div className="divider">
            <span>OR</span>
          </div>

          <button type="button" className="btn-outline">
            <Shield size={18} />
            Login using OTP
          </button>
        </form>
      </div>

      <div className="login-footer">
        © 2025 Sterna Security Devices Private Limited.<br />
        All rights reserved.
      </div>
    </div>
  );
};

export default Login;
