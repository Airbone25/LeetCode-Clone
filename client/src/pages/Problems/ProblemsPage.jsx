import React,{useEffect, useState} from 'react'
import { Link } from 'react-router-dom';

export default function ProblemsPage() {

    const [problems, setProblems] = useState([]);

    async function getProblems() {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/problems`);
        const data = await res.json();
        setProblems(data);
    }

    useEffect(() => {
        getProblems();
    },[]);


  return (
    <div>{problems.map(e=>{
        return <Link key={e.id} to={`/problems/${e.id}`}><div key={e.id}>{e.title}</div></Link>
    })}</div>
  )
}
