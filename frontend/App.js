import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import Login from './components/Login';
import Signup from './components/Signup';
import CareerSelection from './components/CareerSelection';
import SkillInput from './components/SkillInput';
import SkillRecommendations from './components/SkillRecommendations';
import LearningRoadmap from './components/LearningRoadmap';
import ResourceCenter from './components/ResourceCenter';
import ProgressDashboard from './components/ProgressDashboard';
import JobRecommendations from './components/JobRecommendations';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (token) {
      fetchUser();
    }
  }, [token]);

  const fetchUser = async () => {
    try {
      const response = await fetch('/api/auth/me', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      setUser(data);
    } catch (error) {
      console.error('Error fetching user:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
  };

  return (
    <Router>
      <div className="App">
        <nav className="navbar">
          <div className="nav-container">
            <div className="logo">
              <span className="logo-icon">✨</span>
              <span className="logo-text">NexPath</span>
            </div>
            <div className="nav-links">
              {token && (
                <>
                  <span className="user-greeting">Hello, {user?.firstName}!</span>
                  <button onClick={handleLogout} className="logout-btn">Logout</button>
                </>
              )}
            </div>
          </div>
        </nav>

        <Routes>
          <Route path="/" element={!token ? <LandingPage /> : <Navigate to="/career" />} />
          <Route path="/login" element={!token ? <Login setToken={setToken} /> : <Navigate to="/career" />} />
          <Route path="/signup" element={!token ? <Signup setToken={setToken} /> : <Navigate to="/career" />} />
          <Route path="/career" element={token ? <CareerSelection token={token} /> : <Navigate to="/login" />} />
          <Route path="/skills" element={token ? <SkillInput token={token} /> : <Navigate to="/login" />} />
          <Route path="/recommendations" element={token ? <SkillRecommendations token={token} /> : <Navigate to="/login" />} />
          <Route path="/roadmap" element={token ? <LearningRoadmap token={token} /> : <Navigate to="/login" />} />
          <Route path="/resources/:skill" element={token ? <ResourceCenter token={token} /> : <Navigate to="/login" />} />
          <Route path="/progress" element={token ? <ProgressDashboard token={token} /> : <Navigate to="/login" />} />
          <Route path="/jobs" element={token ? <JobRecommendations token={token} /> : <Navigate to="/login" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;