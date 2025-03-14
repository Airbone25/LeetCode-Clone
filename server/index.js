const express = require('express');
const cors = require('cors');
const fs = require('fs');
const app = express();

app.use(cors());
app.use(express.json());

const problems = [
  {
    id: 1,
    title: 'Add One',
    description: 'Write a function that takes in a number and returns that number plus one.',
    inputs: ['a'],
    testCases: [
      {input: [1], output: 2},
      {input: [2], output: 3},
      {input: [3], output: 4}
    ]
  },
  {
    id: 2,
    title: 'Sum of Two',
    description: 'Write a function that takes in two numbers and return the sum of the two numbers.',
    inputs: ['a', 'b'],
    testCases: [
      {input: [1, 2], output: 3},
      {input: [2, 3], output: 5},
      {input: [3, 4], output: 7}
    ]
  }
]

app.get('/problems',(req,res)=>{
  res.json(problems)
})

app.get('/problems/:id',(req,res)=>{
  const id = req.params.id
  const problem = problems.find(problem=>problem.id == id)
  res.json(problem)
})

app.post('/code', (req, res) => {
    const {code,id} = req.body
    const problem = problems.find(p=>p.id == id)
    
    const execute = `(function(){
      ${code}
      const results = []
      const testCases = ${JSON.stringify(problem.testCases)}
      testCases.forEach(test=>{
        const output = outputFunction(...test.input)
        results.push(output === test.output)
      })
      return results
      })()`
    const result = eval(execute)
    console.log(result)
    res.json(result)
})

app.listen(3000 || process.env.PORT, () => {
  console.log('Server is running on port 3000');
})