import React,{useState,useEffect} from 'react'
import { useParams } from 'react-router-dom'
import CodeEditor from "../components/CodeEditor";

export default function ProblemPage() {

    const {id} = useParams()
    const [problem, setProblem] = useState()
    const [value, setValue] = useState("")
    const [result, setResult] = useState()

    const onChange = (value) => {
        setValue(value)
    }

    async function runCode(){
        if(!problem){
          return
        }
        const res = await fetch('https://leetcode-clone-api-umber.vercel.app/code',{
          method: 'POST',
          headers:{
            'Content-Type':'application/json'
          },
          body: JSON.stringify({code:value,id: problem.id})
        })
        const results = await res.json()
        console.log(results)
        setResult(results)
    }

    useEffect(()=>{
        getProblem(id)
    },[])

    async function getProblem(id){
        const res = await fetch(`https://leetcode-clone-api-umber.vercel.app/problems/${id}`)
        const data = await res.json()
        console.log(data)
        setProblem(data)
        setValue(`function outputFunction(${data.inputs.map((vr)=>vr).join(',')}){\n\t\n}`)
        setResult()
    }

  return (
    <div className='p-4 flex'>
        <div className='w-1/2'>
            <h1 className='text-4xl'>{problem && problem.title}</h1>
            <p className=''>{problem && problem.description}</p>
        </div>
        <CodeEditor runCode={runCode} value={value} onChange={onChange} result={result}/>
        <div className='flex'>
          {result && result.map((res, index)=>(
            <div key={index} className={`${res.toString() == 'true' ? 'text-green-500' : 'text-red-600'} mx-6`}>{res.toString()}</div>
          ))}
        </div>
    </div>
  )
}
