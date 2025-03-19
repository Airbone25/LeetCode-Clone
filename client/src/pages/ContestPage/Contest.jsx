import React from 'react';
import styles from './Contest.module.css';
import { Trophy, Clock, Users, Star, ArrowRight } from 'lucide-react';

const contests = [
  {
    id: 1,
    title: 'Weekly Contest 367',
    startTime: '2025-03-25 08:00 AM',
    duration: '1.5 hours',
    participants: 12458,
    difficulty: 'Medium',
    status: 'Upcoming'
  },
  {
    id: 2,
    title: 'Biweekly Contest 114',
    startTime: '2025-03-31 08:00 AM',
    duration: '1.5 hours',
    participants: 8945,
    difficulty: 'Medium',
    status: 'Upcoming'
  },
  {
    id: 3,
    title: 'Weekly Contest 366',
    startTime: '2025-04-07 08:00 AM',
    duration: '1.5 hours',
    participants: 15678,
    difficulty: 'Medium',
    status: 'Completed'
  }
];

const Contest = () => {
  return (
    <div className={styles.contestContainer}>
      <div className={styles.header}>
        <h1>LeetCode Contests</h1>
        <div className={styles.stats}>
          <div className={styles.statItem}>
            <Trophy size={20} />
            <span>Global Ranking: #12345</span>
          </div>
          <div className={styles.statItem}>
            <Star size={20} />
            <span>Rating: 1523</span>
          </div>
        </div>
      </div>

      <div className={styles.contestList}>
        {contests.map(contest => (
          <div key={contest.id} className={styles.contestCard}>
            <div className={styles.contestInfo}>
              <h2>{contest.title}</h2>
              <div className={styles.contestDetails}>
                <div className={styles.detailItem}>
                  <Clock size={16} />
                  <span>{contest.startTime}</span>
                </div>
                <div className={styles.detailItem}>
                  <Clock size={16} />
                  <span>{contest.duration}</span>
                </div>
                <div className={styles.detailItem}>
                  <Users size={16} />
                  <span>{contest.participants.toLocaleString()} participants</span>
                </div>
              </div>
            </div>
            <div className={styles.contestActions}>
              <span className={`${styles.status} ${styles[contest.status.toLowerCase()]}`}>
                {contest.status}
              </span>
              <button className={styles.registerButton}>
                {contest.status === 'Completed' ? 'View Results' : 'Register Now'}
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Contest;