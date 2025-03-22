import {BrowserRouter as Router, Route, Routes, Navigate} from 'react-router-dom'
import HomePage from "./pages/HomePage";
import ProblemPage from './pages/Problems/ProblemPage'
import Contest from './pages/ContestPage/Contest';
import Sign from './pages/SignUp/Sign';
import Store from './pages/StorePage/Store';
import ProblemsPage from './pages/Problems/ProblemsPage';
import { useContext } from 'react';
import { UserContext } from './contexts/UserContext';

function App() {
  const context = useContext(UserContext)
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage/>}/>
          <Route path="/problems" element={context.user ? <ProblemsPage/> : <Navigate to={'/signup'}/>}/>
          <Route path="/problems/:id" element={context.user ? <ProblemPage/> : <Navigate to={'/signup'}/>}/>
          <Route path="/contest" element={<Contest/>}/>
          <Route path="/signup" element={!context.user ? <Sign/> : <Navigate to={'/'}/>}/>
          <Route path="/store" element={<Store/>}/>
        </Routes>
      </Router>
    </div>
  )
}

export default App
