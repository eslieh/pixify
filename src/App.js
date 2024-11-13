import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar/Sidebar';
import Postfeed from './components/Postfeed/Postfeed'; // Keep this if needed
import Home from './pages/Home';
import Profile from './pages/Profile';

function App() {
  return (
    <Router>
      <div className="App">
        <>
          <Sidebar />
          
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
            {/* You can add a route for Postfeed if needed */}
          </Routes>
        </>
      </div>
    </Router>
  );
}

export default App;
