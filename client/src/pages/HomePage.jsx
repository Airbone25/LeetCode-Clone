import React,{useEffect, useState} from 'react'
import { Link } from 'react-router-dom'

export default function HomePage() {

    const [problems,setProblems] = useState()

    async function getProblems(){
        const res = await fetch('http://localhost:3000/problems')
        const data = await res.json()
        setProblems(data)
    }

    useEffect(()=>{
        getProblems()
    },[])

  return (
    <div className='p-4 space-y-4'>
        <h1 className='text-6xl'>Problems</h1>
        <ul className='flex flex-col space-y-4'>
            {problems && problems.map(problem=>(
                <Link to={`/problems/${problem.id}`}><li key={problem.id} className='border-2 inline-block px-3'>{problem.title}</li></Link>
            ))}
        </ul>
    </div>
  )
}
