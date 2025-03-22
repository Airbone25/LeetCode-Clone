import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Trophy, Brain, Target, Siren as Fire, Bell, User, Mail, Star, TrendingUp } from 'lucide-react';
import styles from './HomePage.module.css';
import LeetCode from "../assets/leetcode.png";
import { UserContext } from "../contexts/UserContext";

export default function HomePage() {
  const [stats, setStats] = useState({
    solved: 2,
    attempted: 4
  });

  const [email, setEmail] = useState('');
  const [showWelcome, setShowWelcome] = useState(true);
  const [subscribeStatus, setSubscribeStatus] = useState('');

  const context = useContext(UserContext)
  const token = JSON.parse(localStorage.getItem('token'))

  async function fetchStats(){
    const res = await fetch(`${import.meta.env.VITE_API_URL}/stats`,{
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token.token}`
      }
    })
    const data = await res.json()
    setStats(data)
  }

  useEffect(() => {
    const timer = setTimeout(() => setShowWelcome(false), 3000);
    if(context.user){
      fetchStats()
    }
    return () => clearTimeout(timer);
  }, []);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribeStatus('Thanks! 🎉 Get ready for weekly coding tips in your inbox!');
      setEmail('');
    }
  };

  function handleLogout() {
    localStorage.removeItem('token');
    context.setUser(null);
  }

  return (
    <div className={styles.homepage}>
      {showWelcome && (
        <div className={styles.welcomeMessage}>
          <h3>👋 Hey coder! Ready to level up your skills today?</h3>
        </div>
      )}

      <header className={styles.header}>
        <nav className={styles.nav}>
          <div className={styles.logo}>
            <img src={LeetCode} alt="Logo" />
          </div>
          <div className={styles.navLinks}>
            <Link className={`${styles.navLink} ${styles.active}`} to="/home">Home</Link>
            <Link className={styles.navLink} to="/problems">Problems</Link>
            <Link className={styles.navLink} to="/contest">Contest</Link>
            <Link className={styles.navLink} to="/store">Store</Link>
          </div>
          <div className={styles.rightIcons}>

            {!context.user && <Link className={styles.signUpButton} to="/signup">Sign Up</Link>}
            {context.user && <button onClick={handleLogout} className={styles.signUpButton}>Logout</button>}
          </div>
        </nav>
      </header>

      <main className={styles.main}>
        <section className={styles.hero}>
          <h1>Level Up Your Coding Game! </h1>
          <p>Join our community of passionate developers who crack coding challenges daily. Whether you're prepping for interviews or just love problem-solving, we've got your back!</p>
          <div className={styles.heroButtons}>
            <button className={styles.primaryButton}>Start Coding Now </button>
            <button className={styles.secondaryButton}>Explore Problems </button>
          </div>
        </section>

        <section style={{"display": `${!context.user ? "none" : "grid"}`}} className={styles.stats}>
          <div className={styles.statCard}>
            <Brain size={24} />
            <h3>Problems Solved</h3>
            <p>{stats.solved} / 11</p>
            <div className={styles.statProgress}>
              <div className={styles.progressBar}>
                <div className={styles.progressFill} style={{ width: `${(stats.solved/11) * 100}%` }}></div>
              </div>
            </div>
            <span className={styles.encouragement}>Keep going! You're doing great! </span>
          </div>
          <div className={styles.statCard}>
            <Trophy size={24} />
            <h3>Problems Attempted</h3>
            <p>{stats.attempted}/11</p>
            <span className={styles.encouragement}>You miss every shot you don't take</span>
          </div>
          <div className={styles.statCard}>
            <Target size={24} />
            <h3>Accuracy</h3>
            <p>{(stats.solved/stats.attempted)*100}%</p>
            <span className={styles.encouragement}>Accuracy is the key </span>
          </div>
        </section>

        <section className={styles.newsletter}>
          <div className={styles.newsletterContent}>
            <Star size={32} className={styles.newsletterIcon} />
            <h2>Get Weekly Coding Tips & Tricks! </h2>
            <p>Join thousands of developers receiving weekly insights on:</p>
            <ul className={styles.newsletterPerks}>
              <li> Problem-solving strategies</li>
              <li> Interview preparation tips</li>
              <li> Latest coding challenges</li>
              <li> Success stories from our community</li>
            </ul>
            <form onSubmit={handleSubscribe} className={styles.subscribeForm}>
              <div className={styles.inputWrapper}>
                <Mail size={20} className={styles.mailIcon} />
                <input
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={styles.emailInput}
                />
              </div>
              <button type="submit" className={styles.subscribeButton}>
                Count me in! 
              </button>
            </form>
            {subscribeStatus && (
              <div className={styles.subscribeStatus}>
                {subscribeStatus}
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}