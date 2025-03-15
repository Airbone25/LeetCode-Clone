import React,{useEffect, useState} from 'react'
import { Link } from 'react-router-dom'

export default function HomePage() {

    const [problems,setProblems] = useState()

    async function getProblems(){
        const res = await fetch('https://leetcode-clone-ao0616y40-airbone25s-projects.vercel.app/problems')
        const data = await res.json()
        setProblems(data)
    }

    useEffect(()=>{
        getProblems()
    },[])

  return (
    <div className='p-4 space-y-4 text-center'>
        <h1 className='text-6xl'>LeetCode Clone</h1>
        <h3 className='text-3xl'>Problems</h3>
        <ul className='flex flex-col space-y-4'>
            {problems && problems.map(problem=>(
                <Link to={`/problems/${problem.id}`}><li key={problem.id} className='border-2 inline-block px-3'>{problem.title}</li></Link>
            ))}
        </ul>
    </div>
  )
}
