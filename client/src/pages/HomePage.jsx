import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Trophy, Brain, Target, Siren as Fire, Bell, User, Mail, Star, TrendingUp } from 'lucide-react';
import styles from './HomePage.module.css';
import LeetCode from "../assets/LeetCode.png";

export default function HomePage() {
  const [problems, setProblems] = useState();
  const [stats, setStats] = useState({
    solved: 235,
    totalProblems: 2547,
    ranking: 254879,
    contestRating: 1523,
    streak: 15
  });

  const [email, setEmail] = useState('');
  const [showWelcome, setShowWelcome] = useState(true);
  const [subscribeStatus, setSubscribeStatus] = useState('');

  async function getProblems() {
    const res = await fetch("https://leetcode-clone-api-umber.vercel.app/problems");
    const data = await res.json();
    setProblems(data);
  }

  useEffect(() => {
    getProblems();
    const timer = setTimeout(() => setShowWelcome(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribeStatus('Thanks! 🎉 Get ready for weekly coding tips in your inbox!');
      setEmail('');
    }
  };

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

            <Link className={styles.signUpButton} to="/signup">Sign Up</Link>
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

        <section className={styles.stats}>
          <div className={styles.statCard}>
            <Brain size={24} />
            <h3>Your Problem-Solving Journey</h3>
            <p>{stats.solved} / {stats.totalProblems}</p>
            <div className={styles.statProgress}>
              <div className={styles.progressBar}>
                <div className={styles.progressFill} style={{ width: `${(stats.solved/stats.totalProblems) * 100}%` }}></div>
              </div>
            </div>
            <span className={styles.encouragement}>Keep going! You're doing great! </span>
          </div>
          <div className={styles.statCard}>
            <Trophy size={24} />
            <h3>Contest Champion Status</h3>
            <p>{stats.contestRating}</p>
            <span className={styles.ratingTrend}>
              <TrendingUp size={16} /> +25 this week 📈
            </span>
            <span className={styles.encouragement}>On fire! Keep climbing! </span>
          </div>
          <div className={styles.statCard}>
            <Target size={24} />
            <h3>Global Standing</h3>
            <p>#{stats.ranking}</p>
            <span className={styles.rankImprovement}>Top 15% </span>
            <span className={styles.encouragement}>You're among the stars! </span>
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