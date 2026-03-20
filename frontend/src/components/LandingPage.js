import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaRocket, FaChartLine, FaBook, FaBriefcase } from 'react-icons/fa';

function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="landing-container">
      <div className="hero-section">
        <h1 className="hero-title">Discover Your Dream Career Path</h1>
        <p className="hero-subtitle">
          AI-powered career guidance, personalized learning roadmaps, and job opportunities - all in one place
        </p>
        <div className="cta-buttons">
          <button onClick={() => navigate('/signup')} className="btn btn-primary">
            Get Started Free
          </button>
          <button onClick={() => navigate('/login')} className="btn btn-secondary">
            Login
          </button>
        </div>
      </div>

      <div className="features-grid">
        <div className="feature-card">
          <div className="feature-icon">🎯</div>
          <h3 className="feature-title">Smart Career Matching</h3>
          <p>Get personalized career recommendations based on your skills and interests</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon">📚</div>
          <h3 className="feature-title">Structured Learning</h3>
          <p>Follow weekly roadmaps with curated resources and video tutorials</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon">📊</div>
          <h3 className="feature-title">Track Your Progress</h3>
          <p>Visualize your learning journey with interactive charts and analytics</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon">💼</div>
          <h3 className="feature-title">Job Opportunities</h3>
          <p>Access curated job listings and application links for your dream roles</p>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;