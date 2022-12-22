import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {Game} from './components/Game/Game';
import {MobileController} from './components/Mobile/MobileController';

function App() {

  return (<>
      <Router>
        
        <Routes>
          <Route path="/" element={<Game/>}/>
          <Route path="/:id" element={<MobileController/>}/>
        </Routes>
      </Router>
  </>
  );
}

export default App;
