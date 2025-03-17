import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./HomePage.css";

export default function HomePage() {
  const [problems, setProblems] = useState();

  async function getProblems() {
    const res = await fetch("https://leetcode-clone-api-umber.vercel.app/problems");
    const data = await res.json();
    setProblems(data);
  }

  useEffect(() => {
    getProblems();
  }, []);

return (
    <div className="homepage">
        <header className="homepage-header">
            <nav className="homepage-nav">
                <div className="logo">
                    <img src="your-logo.png" alt="Logo" />
                </div>
                <div className="nav-links">
                    <Link className="nav-link active" to="/home">Home</Link>
                    <Link className="nav-link" to="/problems">Problems</Link>
                    <Link className="nav-link" to="/contest">Contest</Link>
                    <Link className="nav-link" to="/store">Store</Link>
                </div>

                <div className="right-icons">
                    <Link className="nav-link" to="/signup">Sign Up</Link>
                </div>
            </nav>
        </header>
    </div>
);
}