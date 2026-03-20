import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function SkillInput({ token }) {
  const [currentSkills, setCurrentSkills] = useState('');
  const [skillsList, setSkillsList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchUserSkills();
  }, []);

  const fetchUserSkills = async () => {
    try {
      const response = await fetch('/api/auth/me', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      if (data.currentSkills && data.currentSkills.length > 0) {
        setSkillsList(data.currentSkills);
        setCurrentSkills(data.currentSkills.join(', '));
      }
    } catch (err) {
      console.error('Error fetching skills:', err);
    }
  };

  const handleAddSkill = () => {
    if (currentSkills.trim()) {
      const newSkills = currentSkills.split(',').map(s => s.trim()).filter(s => s);
      setSkillsList([...skillsList, ...newSkills]);
      setCurrentSkills('');
    }
  };

  const handleRemoveSkill = (skillToRemove) => {
    setSkillsList(skillsList.filter(skill => skill !== skillToRemove));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (skillsList.length === 0) {
      setError('Please add at least one skill');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('/api/career/update-skills', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ skills: skillsList })
      });

      if (response.ok) {
        navigate('/recommendations');
      } else {
        const data = await response.json();
        setError(data.message);
      }
    } catch (err) {
      setError('Network error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="dashboard-container">
      <h2 className="section-title">Tell Us About Your Skills 💪</h2>
      <div className="card">
        {error && <div className="error-message">{error}</div>}
        <div className="form-group">
          <label>Enter your current skills (separate with commas):</label>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <input
              type="text"
              value={currentSkills}
              onChange={(e) => setCurrentSkills(e.target.value)}
              placeholder="e.g., Python, JavaScript, Communication"
              style={{ flex: 1 }}
            />
            <button onClick={handleAddSkill} className="btn-primary" style={{ padding: '0.5rem 1rem' }}>
              Add
            </button>
          </div>
        </div>

        {skillsList.length > 0 && (
          <div className="skill-list">
            {skillsList.map((skill, index) => (
              <div key={index} className="skill-tag" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                {skill}
                <button
                  onClick={() => handleRemoveSkill(skill)}
                  style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer' }}
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        )}

        <button onClick={handleSubmit} className="btn-submit" disabled={loading} style={{ marginTop: '1rem' }}>
          {loading ? 'Analyzing Skills...' : 'Get Recommendations'}
        </button>
      </div>
    </div>
  );
}

export default SkillInput;