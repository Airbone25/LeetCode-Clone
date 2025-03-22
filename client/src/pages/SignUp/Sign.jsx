import React, { useContext, useState } from 'react';
import { Code2, Eye, EyeOff, Github } from 'lucide-react';
import { toast, ToastContainer } from 'react-toastify';
import styles from './Sign.module.css';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../contexts/UserContext';

const Sign = () => {
  const [username,setUsername] = useState('')
  const [password,setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);

  const navigate = useNavigate()

  const context = useContext(UserContext)

  async function postSignup(value){
    try{
      const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/signup`,{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(value)
      })
      const data = await res.json()
      if(data.token){
        console.log(data)
        localStorage.setItem('token',JSON.stringify(data))
        context.setUser(localStorage.getItem('token'))
        toast.success("Signup Successful")
        navigate('/')
      }
      if(data.error){
        toast.error(data.error)
      }
    }catch(err){
      console.error(err)
      toast.error("Error Signing Up")
    }
  }

  async function postLogin(value){
    try{
      const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/login`,{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(value)
      })
      const data = await res.json()
      if(data.token){
        console.log(data)
        localStorage.setItem('token',JSON.stringify(data))
        context.setUser(localStorage.getItem('token'))
        toast.success("Login Successful")
        navigate('/')
      }
      if(data.error){
        toast.error(data.error)
      }
    }catch(err){
      console.error(err)
      toast.error("Error Logging In")
    }
  }


  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      username,
      password
    };
    console.log(data)

    if(isSignUp){
      postSignup(data)
      setUsername('')
      setPassword('')
    }
    if(!isSignUp){
      postLogin(data)
      setUsername('')
      setPassword('')
    }

  };

  return (
    <div className={styles.pageContainer}>
      {/* Main Content */}
      <div className={styles.mainContent}>
        <div className={styles.loginContainer}>
          {/* Logo */}
          <div className={styles.logo}>
            <Code2 size={32} className={styles.logoIcon} />
            <span className={styles.logoText}>LeetCode</span>
          </div>

          {/* Form */}
          <form className={styles.loginForm} onSubmit={handleSubmit}>
            <div className={styles.formFields}>
              <div className={styles.inputGroup}>
                <input
                  type="text"
                  name="username"
                  placeholder="Enter a unique username"
                  className={styles.inputField}
                  onChange={(e)=>setUsername(e.target.value)}
                  required
                />
              </div>
              <div className={`${styles.inputGroup} ${styles.passwordGroup}`}>
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  placeholder="Password"
                  className={styles.inputField}
                  onChange={(e)=>setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className={styles.passwordToggle}
                >
                  {showPassword ? <EyeOff className={styles.icon} /> : <Eye className={styles.icon} />}
                </button>
              </div>

              {/* Confirm Password for Sign Up */}
              {isSignUp && (
                <div className={styles.inputGroup}>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    className={styles.inputField}
                    onChange={(e)=>{
                      if(e.target.value !== password){
                        e.target.setCustomValidity('Passwords do not match!')
                      }else{
                        e.target.setCustomValidity('')
                      }
                    }}
                    required
                  />
                </div>
              )}
            </div>

            {/* Captcha */}
            <div className={styles.captchaContainer}>
              <div className={styles.captchaContent}>
                <input type="checkbox" className={styles.captchaCheckbox} required />
                <span className={styles.captchaText}>Verify you are human</span>
                <img src="https://www.cloudflare.com/favicon.ico" alt="Cloudflare" className={styles.captchaIcon} />
              </div>
            </div>

            {/* Submit Button */}
            <button type="submit" className={styles.signInButton}>
              {isSignUp ? 'Sign Up' : 'Sign In'}
            </button>

            {/* Toggle Between Sign In & Sign Up */}
            <div className={styles.authLinks}>
              <a href="#" className={styles.forgotPassword}>Forgot Password?</a>
              <button
                type="button"
                className={styles.toggleButton}
                onClick={() => setIsSignUp(!isSignUp)}
              >
                {isSignUp ? ' Sign In' : " Sign Up"}
              </button>
            </div>

            {/* Social Sign In */}
            <div className={styles.socialLogin}>
              <div className={styles.divider}>
                <span className={styles.dividerText}>
                  or you can sign in with
                </span>
              </div>

              <div className={styles.socialButtons}>
                <button className={styles.socialButton}>
                  <span className={styles.srOnly}>Sign in with Google</span>
                  <svg className={styles.socialIcon} fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"/>
                  </svg>
                </button>
                <button className={styles.socialButton}>
                  <span className={styles.srOnly}>Sign in with GitHub</span>
                  <Github className={styles.socialIcon} />
                </button>
                <button className={styles.socialButton}>
                  <span className={styles.srOnly}>Sign in with Facebook</span>
                  <svg className={styles.socialIcon} fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </button>
                <button className={styles.socialButton}>
                  <span className={styles.srOnly}>More options</span>
                  <svg className={styles.socialIcon} fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>
                  </svg>
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>

      {/* Footer */}
      <footer className={styles.footer}>
        <div className={styles.footerContent}>
          <div className={styles.footerLinks}>
            <a href="#" className={styles.footerLink}>Help Center</a>
            <a href="#" className={styles.footerLink}>Jobs</a>
            <a href="#" className={styles.footerLink}>Bug Bounty</a>
            <a href="#" className={styles.footerLink}>Online Interview</a>
            <a href="#" className={styles.footerLink}>Students</a>
            <a href="#" className={styles.footerLink}>Terms</a>
            <a href="#" className={styles.footerLink}>Privacy Policy</a>
          </div>
          <div className={styles.footerCopyright}>
            <p>Copyright © 2025 LeetCode</p>
          </div>
        </div>
      </footer>
      <ToastContainer />
    </div>
  );
};

export default Sign;
