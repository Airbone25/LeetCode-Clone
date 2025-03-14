import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import HomePage from "./pages/HomePage";
import ProblemPage from './pages/ProblemPage'

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage/>}/>
          <Route path="/problems/:id" element={<ProblemPage/>}/>
        </Routes>
      </Router>
    </div>
  )
}

export default App
