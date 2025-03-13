const express = require('express');
const cors = require('cors');
const fs = require('fs');
const app = express();

app.use(cors());
app.use(express.json());

const testCases = [
  {input: 1, output: 2},
  {input: 2, output: 3},
  {input: 3, output: 4}
]

app.post('/code', (req, res) => {
    const code = req.body.data
    const execute = `(function(){
      ${code}
      const results = []
      testCases.forEach(test=>{
        const output = addOne(test.input)
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