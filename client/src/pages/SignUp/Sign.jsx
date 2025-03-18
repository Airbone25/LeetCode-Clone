import React, { useState } from 'react';
import { Code2, Eye, EyeOff, Github } from 'lucide-react';
import './Sign.css';

const Sign = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false); // Toggle between Sign In & Sign Up
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(isSignUp ? 'Sign Up Data:' : 'Sign In Data:', formData);
  };

  return (
    <div className="page-container">
      {/* Main Content */}
      <div className="main-content">
        <div className="login-container">
          {/* Logo */}
          <div className="logo">
            <Code2 size={32} className="logo-icon" />
            <span className="logo-text">LeetCode</span>
          </div>

          {/* Form */}
          <form className="login-form" onSubmit={handleSubmit}>
            <h2 className="form-title">{isSignUp ? 'Sign Up' : 'Sign In'}</h2>

            <div className="form-fields">
              {isSignUp && (
                <div className="input-group">
                  <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    className="input-field"
                    value={formData.username}
                    onChange={handleChange}
                  />
                </div>
              )}
              <div className="input-group">
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  className="input-field"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              <div className="input-group password-group">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Password"
                  className="input-field"
                  value={formData.password}
                  onChange={handleChange}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="password-toggle"
                >
                  {showPassword ? <EyeOff className="icon" /> : <Eye className="icon" />}
                </button>
              </div>
            </div>

            {/* Captcha placeholder */}
            <div className="captcha-container">
              <div className="captcha-content">
                <input type="checkbox" className="captcha-checkbox" />
                <span className="captcha-text">Verify you are human</span>
                <img src="https://www.cloudflare.com/favicon.ico" alt="Cloudflare" className="captcha-icon" />
              </div>
            </div>

            <button type="submit" className="sign-in-button">
              {isSignUp ? 'Sign Up' : 'Sign In'}
            </button>

            <div className="auth-links">
              {!isSignUp && (
                <a href="#" className="forgot-password">
                  Forgot Password?
                </a>
              )}
              <a href="#" className="sign-up" onClick={(e) => {
                e.preventDefault();
                setIsSignUp(!isSignUp);
              }}>
                {isSignUp ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
              </a>
            </div>

            {/* Social Sign In */}
            <div className="social-login">
              <div className="divider">
                <span className="divider-text">
                  or you can sign in with
                </span>
              </div>

              <div className="social-buttons">
                <button className="social-button">
                  <span className="sr-only">Sign in with Google</span>
                  <svg className="social-icon" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"/>
                  </svg>
                </button>
                <button className="social-button">
                  <span className="sr-only">Sign in with GitHub</span>
                  <Github className="social-icon" />
                </button>
                <button className="social-button">
                  <span className="sr-only">Sign in with Facebook</span>
                  <svg className="social-icon" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-links">
            <a href="#" className="footer-link">Help Center</a>
            <a href="#" className="footer-link">Jobs</a>
            <a href="#" className="footer-link">Bug Bounty</a>
            <a href="#" className="footer-link">Online Interview</a>
            <a href="#" className="footer-link">Students</a>
            <a href="#" className="footer-link">Terms</a>
            <a href="#" className="footer-link">Privacy Policy</a>
          </div>
          <div className="footer-copyright">
            <p>Copyright © 2025 LeetCode</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Sign;
