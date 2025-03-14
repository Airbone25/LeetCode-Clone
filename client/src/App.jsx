import React, { useEffect, useState } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";

function App() {
  const [value, setValue] = useState("")
  const [result, setResult] = useState()
  const [problems, setProblems] = useState()
  const [problem, setProblem] = useState()

  const onChange = (value) => {
    setValue(value)
  }

  useEffect(()=>{
    getProblems()
  }
  ,[])

  async function getProblems(){
    const res = await fetch('http://localhost:3000/problems')
    const data = await res.json()
    console.log(data)
    setProblems(data)
  }

  async function getProblem(id){
    const res = await fetch(`http://localhost:3000/problems/${id}`)
    const data = await res.json()
    console.log(data)
    setProblem(data)
    setValue(`function outputFunction(${data.testCases[0].input.map((input,index)=>`input${index}`).join(',')}){\n\t\n}`)
    setResult()
  }

  async function runCode(){
    if(!problem){
      return
    }
    const res = await fetch('http://localhost:3000/code',{
      method: 'POST',
      headers:{
        'Content-Type':'application/json'
      },
      body: JSON.stringify({code:value,id: problems.find(p=>p.id == problem.id).id})
    })
    const results = await res.json()
    console.log(results)
    setResult(results)
  }

  return (
    <div>
      <div>
        <select onChange={(e)=>getProblem(e.target.value)}>
          {problems && problems.map(problem=>(
            <option key={problem.id} value={problem.id}>{problem.title}</option>
          ))}
        </select>
      </div>

      <div>
        <h1>{problem && problem.title}</h1>
        <p>{problem && problem.description}</p>
        <CodeMirror
          value={value}
          height="200px"
          extensions={[javascript()]}
          onChange={onChange}
        />
        <button className="px-2 py-4 border-2 rounded-lg" onClick={runCode}>Submit</button>
        <div>
          {result && result.map((res, index)=>(
            <div key={index} className={`${res.toString() == 'true' ? 'text-green-500' : 'text-red-600'}`}>{res.toString()}</div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default App
