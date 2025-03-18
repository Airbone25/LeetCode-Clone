import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import HomePage from "./pages/HomePage";
import ProblemPage from './pages/ProblemPage'
import Contest from './pages/ContestPage/Contest';
import Sign from './pages/SignUp/Sign';

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage/>}/>
          <Route path="/problems/:id" element={<ProblemPage/>}/>
          <Route path="/contest" element={<Contest/>}/>
          <Route path="/signup" element={<Sign/>}/>
        </Routes>
      </Router>
    </div>
  )
}

export default App
