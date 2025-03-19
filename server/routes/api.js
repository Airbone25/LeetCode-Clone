const express = require('express');
const router = express.Router();

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

router.get('/', (req, res) => {
  res.send('API works');
});

router.get('/problems', (req, res) => {
  res.json(problems);
});

router.get('/problems/:id', (req, res) => {
  const id = req.params.id;
  const problem = problems.find(problem => problem.id == id);
  res.json(problem);
});

router.post('/code', (req, res) => {
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

module.exports = router;