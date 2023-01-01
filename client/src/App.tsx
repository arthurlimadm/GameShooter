import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {Game} from './components/Game/Game';
import {MobileController} from './components/Mobile/MobileController';
import { Score } from './components/Score/Score';

function App() {

  return (<>
      <Router>
        
        <Routes>
          <Route path="/" element={<Game/>}/>
          <Route path="/:id" element={<MobileController/>}/>
          <Route path="/score" element={<Score/>}/>
        </Routes>
      </Router>
  </>
  );
}

export default App;
