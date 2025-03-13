import React, { useState } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";

function App() {
  const [value, setValue] = useState("function addOne(a){\n\n}")
  const [result, setResult] = useState()

  const onChange = (value) => {
    setValue(value)
  }

  async function postData(data){
    const res = await fetch('http://localhost:3000/code',{
      method: 'POST',
      headers:{
        'Content-Type':'application/json'
      },
      body: JSON.stringify({data})
    })
    const results = await res.json()
    console.log(results)
    setResult(results)
  }

  const onSubmit = ()=>{
    postData(value)
  }

  return (
    <div>
      <CodeMirror
        value={value}
        height="200px"
        extensions={[javascript()]}
        onChange={onChange}
      />
      <button className="px-2 py-4 border-2 rounded-lg" onClick={onSubmit}>Submit</button>
      <div>
        {result && result.map((res, index)=>(
          <div key={index} className={`${res.toString() == 'true' ? 'text-green-500' : 'text-red-600'}`}>{res.toString()}</div>
        ))}
      </div>
    </div>
  )
}

export default App
