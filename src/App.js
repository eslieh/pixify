// App.js
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar/Sidebar';
import Rightbar from './components/Rightbar/Rightbar';

function App() {
  return (
    <Router>
      <div className="App">
        <>
        <Sidebar />
        </>
      </div>
    </Router>
  );
}

export default App;
