import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function JobRecommendations({ token }) {
  const [jobData, setJobData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const response = await fetch('/api/career/job-links', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      setJobData(data);
    } catch (err) {
      setError('Failed to load job recommendations');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="dashboard-container">
        <div className="card" style={{ textAlign: 'center' }}>
          <h3>Finding job opportunities for you... 💼</h3>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <h2 className="section-title">Your Career Opportunities 🚀</h2>
      
      <div className="card">
        <h3 className="card-title">You're now ready for: {jobData?.career}</h3>
        <p style={{ marginBottom: '1rem' }}>
          Congratulations! Based on your completed learning roadmap, you're now qualified for this role.
          Here are some job portals where you can start your job search:
        </p>
        
        <div className="skill-list">
          {jobData?.links?.map((link, index) => (
            <a
              key={index}
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="skill-tag"
              style={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                textDecoration: 'none',
                display: 'inline-block',
                cursor: 'pointer'
              }}
            >
              {link.includes('linkedin') ? '🔗 LinkedIn Jobs' : 
               link.includes('indeed') ? '🔍 Indeed Jobs' : 
               '📌 Job Portal'}
            </a>
          ))}
        </div>

        <div style={{ marginTop: '2rem', padding: '1rem', background: '#f3f4f6', borderRadius: '0.5rem' }}>
          <h4>💡 Pro Tips for Your Job Search:</h4>
          <ul style={{ marginTop: '0.5rem', marginLeft: '1.5rem' }}>
            <li>Update your LinkedIn profile with your newly acquired skills</li>
            <li>Create a portfolio showcasing your projects</li>
            <li>Network with professionals in your field</li>
            <li>Prepare for technical interviews</li>
            <li>Customize your resume for each application</li>
          </ul>
        </div>
      </div>

      <div style={{ textAlign: 'center', marginTop: '2rem' }}>
        <button onClick={() => navigate('/progress')} className="btn-secondary" style={{ padding: '0.75rem 2rem' }}>
          ← Back to Progress
        </button>
      </div>
    </div>
  );
}

export default JobRecommendations;