import React, { useState, useEffect } from 'react';
import './Problemspage.css'; 
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const ProblemsList = () => {
  const [problems, setProblems] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchProblems = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/problems`);
      const data = await response.json();
      console.log(data);
      setProblems(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchProblems();
  }, []);

  const filteredProblems = problems.filter(problem =>
    problem.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getDifficultyClass = (difficulty) => {
    switch (difficulty.toLowerCase()) {
      case 'easy': return 'tag-easy';
      case 'medium': return 'tag-medium';
      case 'hard': return 'tag-hard';
      default: return '';
    }
  };

  return (
    <div className="problems-container">
      <h1 className="title">Problems List</h1>

      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search problems..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-bar"
      />

      {/* Problems Table */}
      <table className="problems-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Difficulty</th>
          </tr>
        </thead>
        <tbody>
          {filteredProblems.map((problem) => (
            <tr key={problem.id} className="problem-row">
              <td>{problem.id}</td>
              <td className="problem-title"><Link to={`/problems/${problem.id}`}>{problem.title}</Link></td>
              <td>
                <span className={`difficulty-tag ${getDifficultyClass(problem.difficulty)}`}>
                  {problem.difficulty}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProblemsList;
