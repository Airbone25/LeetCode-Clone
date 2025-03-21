import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import HomePage from "./pages/HomePage";
import ProblemPage from './pages/Problems/ProblemPage'
import Contest from './pages/ContestPage/Contest';
import Sign from './pages/SignUp/Sign';
import Store from './pages/StorePage/Store';
import ProblemsPage from './pages/Problems/ProblemsPage';

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage/>}/>
          <Route path="/problems" element={<ProblemsPage/>}/>
          <Route path="/problems/:id" element={<ProblemPage/>}/>
          <Route path="/contest" element={<Contest/>}/>
          <Route path="/signup" element={<Sign/>}/>
          <Route path="/store" element={<Store/>}/>
        </Routes>
      </Router>
    </div>
  )
}

export default App
