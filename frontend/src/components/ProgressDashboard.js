import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Line, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

function ProgressDashboard({ token }) {
  const [progress, setProgress] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchProgress();
  }, []);

  const fetchProgress = async () => {
    try {
      const response = await fetch('/api/progress/progress', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      setProgress(data);
    } catch (err) {
      setError('Failed to load progress');
    } finally {
      setLoading(false);
    }
  };

  const handleMarkComplete = async (weekIndex, skillName) => {
    try {
      const response = await fetch('/api/progress/update-week', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          week: weekIndex + 1,
          skillsCompleted: [skillName]
        })
      });
      
      if (response.ok) {
        fetchProgress(); // Refresh progress
      }
    } catch (err) {
      console.error('Error updating progress:', err);
    }
  };

  if (loading) {
    return (
      <div className="dashboard-container">
        <div className="card" style={{ textAlign: 'center' }}>
          <h3>Loading your progress... 📊</h3>
        </div>
      </div>
    );
  }

  const lineChartData = {
    labels: progress?.weeklyProgress?.map((_, i) => `Week ${i + 1}`) || [],
    datasets: [
      {
        label: 'Weekly Progress',
        data: progress?.weeklyProgress?.map(week => week.completionPercentage) || [],
        borderColor: 'rgb(99, 102, 241)',
        backgroundColor: 'rgba(99, 102, 241, 0.5)',
        tension: 0.4
      }
    ]
  };

  const doughnutData = {
    labels: ['Completed', 'Remaining'],
    datasets: [
      {
        data: [progress?.overallProgress || 0, 100 - (progress?.overallProgress || 0)],
        backgroundColor: ['#10b981', '#e5e7eb'],
        borderWidth: 0
      }
    ]
  };

  return (
    <div className="dashboard-container">
      <h2 className="section-title">Your Learning Progress 📈</h2>
      
      <div className="cards-grid">
        <div className="card">
          <h3 className="card-title">Overall Progress</h3>
          <div style={{ height: '200px' }}>
            <Doughnut data={doughnutData} options={{ responsive: true, maintainAspectRatio: false }} />
          </div>
          <h2 style={{ textAlign: 'center', marginTop: '1rem' }}>
            {Math.round(progress?.overallProgress || 0)}%
          </h2>
        </div>

        <div className="card">
          <h3 className="card-title">Weekly Progress Trend</h3>
          <Line data={lineChartData} options={{ responsive: true }} />
        </div>
      </div>

      <div className="card">
        <h3 className="card-title">Weekly Learning Checklist ✅</h3>
        {progress?.weeklyProgress?.map((week, weekIndex) => (
          <div key={weekIndex} style={{ marginBottom: '1.5rem', borderBottom: '1px solid #e5e7eb', paddingBottom: '1rem' }}>
            <h4>Week {week.week}</h4>
            <div className="skill-list">
              {week.skills?.map((skill, skillIndex) => (
                <div key={skillIndex} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                  <input
                    type="checkbox"
                    checked={skill.completed}
                    onChange={() => handleMarkComplete(weekIndex, skill.name)}
                    style={{ cursor: 'pointer' }}
                  />
                  <span style={{ textDecoration: skill.completed ? 'line-through' : 'none' }}>
                    {skill.name}
                  </span>
                  {!skill.completed && (
                    <button
                      onClick={() => navigate(`/resources/${skill.name}`)}
                      className="btn-secondary"
                      style={{ padding: '0.25rem 0.5rem', fontSize: '0.75rem' }}
                    >
                      Learn
                    </button>
                  )}
                </div>
              ))}
            </div>
            <div style={{ marginTop: '0.5rem' }}>
              <div style={{ background: '#e5e7eb', borderRadius: '0.5rem', overflow: 'hidden' }}>
                <div
                  style={{
                    width: `${week.completionPercentage}%`,
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    padding: '0.25rem',
                    textAlign: 'center',
                    color: 'white',
                    fontSize: '0.75rem'
                  }}
                >
                  {Math.round(week.completionPercentage)}%
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div style={{ textAlign: 'center', marginTop: '2rem' }}>
        <button onClick={() => navigate('/jobs')} className="btn-primary" style={{ padding: '0.75rem 2rem' }}>
          View Job Opportunities →
        </button>
      </div>
    </div>
  );
}

export default ProgressDashboard;