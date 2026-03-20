import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function SkillRecommendations({ token }) {
  const [recommendations, setRecommendations] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchRecommendations();
  }, []);

  const fetchRecommendations = async () => {
    try {
      const response = await fetch('/api/career/recommendations', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      if (response.ok) {
        setRecommendations(data);
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError('Failed to load recommendations');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="dashboard-container">
        <div className="card" style={{ textAlign: 'center' }}>
          <h3>Analyzing your profile... 🤔</h3>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <h2 className="section-title">Your Personalized Recommendations 🎯</h2>
      
      <div className="cards-grid">
        <div className="card">
          <h3 className="card-title">Required Skills</h3>
          <div className="skill-list">
            {recommendations?.requiredSkills?.map((skill, index) => (
              <div key={index} className="skill-tag">{skill}</div>
            ))}
          </div>
        </div>

        <div className="card">
          <h3 className="card-title">Skill Gaps</h3>
          {recommendations?.skillGaps?.length > 0 ? (
            <div className="skill-list">
              {recommendations.skillGaps.map((skill, index) => (
                <div key={index} className="skill-tag" style={{ background: '#f59e0b' }}>{skill}</div>
              ))}
            </div>
          ) : (
            <p>Great job! You have all the required skills! 🎉</p>
          )}
        </div>

        <div className="card">
          <h3 className="card-title">Recommended to Learn</h3>
          <div className="skill-list">
            {recommendations?.recommendedSkills?.map((skill, index) => (
              <div key={index} className="skill-tag" style={{ background: '#10b981' }}>{skill}</div>
            ))}
          </div>
        </div>
      </div>

      <div style={{ textAlign: 'center', marginTop: '2rem' }}>
        <button onClick={() => navigate('/roadmap')} className="btn-primary" style={{ padding: '0.75rem 2rem' }}>
          View Your Learning Roadmap →
        </button>
      </div>
    </div>
  );
}

export default SkillRecommendations;