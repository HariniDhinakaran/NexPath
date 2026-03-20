import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function ResourceCenter({ token }) {
  const { skill } = useParams();
  const [resource, setResource] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchResource();
  }, [skill]);

  const fetchResource = async () => {
    try {
      const response = await fetch(`/api/career/resources/${skill}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      setResource(data);
    } catch (err) {
      setError('Failed to load resources');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="dashboard-container">
        <div className="card" style={{ textAlign: 'center' }}>
          <h3>Loading learning resources... 📖</h3>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <button 
        onClick={() => navigate('/roadmap')}
        className="btn-secondary"
        style={{ marginBottom: '1rem', padding: '0.5rem 1rem' }}
      >
        ← Back to Roadmap
      </button>
      
      <h2 className="section-title">Learn {skill} 🎓</h2>
      
      <div className="cards-grid">
        <div className="card">
          <h3 className="card-title">📄 Comprehensive Notes</h3>
          <p>{resource?.notes}</p>
        </div>

        <div className="card">
          <h3 className="card-title">📝 Quick Summary</h3>
          <p>{resource?.summary}</p>
        </div>

        <div className="card">
          <h3 className="card-title">🎥 Video Tutorial</h3>
          <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0, overflow: 'hidden' }}>
            <iframe
              src={resource?.videoUrl}
              title={`${skill} tutorial`}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
            ></iframe>
          </div>
        </div>
      </div>

      <div style={{ textAlign: 'center', marginTop: '2rem' }}>
        <button 
          onClick={() => navigate('/progress')}
          className="btn-primary"
          style={{ padding: '0.75rem 2rem' }}
        >
          Mark as Completed & Track Progress ✅
        </button>
      </div>
    </div>
  );
}

export default ResourceCenter;