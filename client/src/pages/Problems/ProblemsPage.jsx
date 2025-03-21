import React, { useState, useEffect } from 'react';
import './Problemspage.css'; 

const ProblemsList = () => {
  const [problems, setProblems] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {

    const fetchProblems = async () => {
      const data = [
        { id: 1, title: "Two Sum", difficulty: "Easy", status: "Completed" },
        { id: 2, title: "Three Sum", difficulty: "Medium", status: "In Progress" },
        { id: 3, title: "Longest Substring Without Repeating Characters", difficulty: "Hard", status: "Not Started" },
        { id: 4, title: "Median of Two Sorted Arrays", difficulty: "Medium", status: "Completed" },
        { id: 5, title: "Longest Palindromic Substring", difficulty: "Hard", status: "In Progress" },
        { id: 6, title: "Remove Nth Node From End of List", difficulty: "Easy", status: "Not Started" },
        { id: 7, title: "Reverse Integer", difficulty: "Medium", status: "Completed" },
        { id: 8, title: "String to Integer (atoi)", difficulty: "Hard", status: "In Progress" },
        { id: 9, title: "Palindrome Number", difficulty: "Easy", status: "Not Started" },
        { id: 10, title: "Regular Expression Matching", difficulty: "Hard", status: "Completed" }
      ];
      setProblems(data);
    };
    fetchProblems();
  }, []);

  const filteredProblems = problems.filter(problem =>
    problem.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="problems-list">
      <h1>Problems List</h1>

      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search problems..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-bar"
      />

      {/* Problems Table */}
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Difficulty</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {filteredProblems.map(problem => (
            <tr key={problem.id}>
              <td>{problem.id}</td>
              <td>{problem.title}</td>
              <td>{problem.difficulty}</td>
              <td>{problem.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProblemsList;