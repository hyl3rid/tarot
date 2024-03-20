import './App.css';
import { BrowserRouter as Router, Routes, Route, Outlet} from 'react-router-dom';
import { CardProvider } from './context/CardsProvider';

import Home from './components/Home'
import Meanings from './components/Meanings'
import Board from './components/Board'
import Reveal from './components/Reveal'

function App() {
  return (
    <>
      <CardProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/meanings" element={<Meanings />}></Route>
            <Route path="/board" element={<Board />}></Route>
            <Route path="/reveal" element={<Reveal />}></Route>
          </Routes>
        </Router>
        <Outlet/>
      </CardProvider>
    </>
  );
}

export default App;
