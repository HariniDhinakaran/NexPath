import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function LearningRoadmap({ token }) {
  const [roadmap, setRoadmap] = useState([]);
  const [career, setCareer] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchRoadmap();
  }, []);

  const fetchRoadmap = async () => {
    try {
      const response = await fetch('/api/career/recommendations', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      if (response.ok) {
        setRoadmap(data.roadmap);
        setCareer(data.career);
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError('Failed to load roadmap');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="dashboard-container">
        <div className="card" style={{ textAlign: 'center' }}>
          <h3>Creating your personalized roadmap... 🗺️</h3>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <h2 className="section-title">Your Learning Roadmap for {career} 📚</h2>
      
      <div className="card">
        {roadmap.map((week, index) => (
          <div key={index} className="roadmap-item">
            <div className="week-badge">Week {week.week}</div>
            <h3 style={{ marginBottom: '0.5rem' }}>{week.topic}</h3>
            <div className="skill-list">
              {week.skills.map((skill, idx) => (
                <button
                  key={idx}
                  onClick={() => navigate(`/resources/${skill}`)}
                  className="skill-tag"
                  style={{ cursor: 'pointer' }}
                >
                  {skill} 📖
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div style={{ textAlign: 'center', marginTop: '2rem' }}>
        <button onClick={() => navigate('/progress')} className="btn-primary" style={{ padding: '0.75rem 2rem' }}>
          Track Your Progress →
        </button>
      </div>
    </div>
  );
}

export default LearningRoadmap;