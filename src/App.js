import './App.css';
import { BrowserRouter as Router, Routes, Route, Outlet} from 'react-router-dom';

import Home from './components/Home'
import Board from './components/Board'
import Reveal from './components/Reveal'

function App() {
  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/board" element={<Board />}></Route>
        <Route path="/reveal" element={<Reveal />}></Route>
      </Routes>
    </Router>
    <Outlet/>
    </>
  );
}

export default App;
