import { useState } from 'react';
import './Community.css';

const reports = [
  {
    id: 1, user: 'Alex K.', avatar: '🧗', trail: 'Eagle Peak Summit',
    type: 'hazard', time: '14 min ago',
    message: 'Large fallen tree blocking trail at KM 6.2. Easy to bypass on left side. Marked with orange tape.',
    likes: 24, verified: true,
  },
  {
    id: 2, user: 'Priya S.', avatar: '🥾', trail: 'Crystal Falls Loop',
    type: 'info', time: '1h ago',
    message: 'Trail is absolutely stunning right now! Waterfall running strong after last week\'s rain. Bring layers.',
    likes: 47, verified: true,
  },
  {
    id: 3, user: 'Mike R.', avatar: '🏕️', trail: 'Sunset Ridge Trail',
    type: 'caution', time: '2h ago',
    message: 'Muddy section near rest point at KM 3.8. Not dangerous but slippery. Trekking poles recommended.',
    likes: 18, verified: false,
  },
  {
    id: 4, user: 'Luna W.', avatar: '🌿', trail: 'Emerald Valley Path',
    type: 'info', time: '3h ago',
    message: 'Spotted a family of deer near the valley lookout around 7am. Amazing photo opportunity!',
    likes: 91, verified: true,
  },
];

const typeStyles = {
  hazard: { bg: 'rgba(239,68,68,0.1)', border: 'rgba(239,68,68,0.3)', color: '#f87171', label: '⚠️ Hazard' },
  caution: { bg: 'rgba(245,158,11,0.1)', border: 'rgba(245,158,11,0.3)', color: '#fbbf24', label: '🟡 Caution' },
  info: { bg: 'rgba(16,185,129,0.1)', border: 'rgba(16,185,129,0.3)', color: 'var(--emerald-light)', label: '✓ Info' },
};

export default function Community() {
  const [liked, setLiked] = useState({});

  const toggleLike = (id) => {
    setLiked(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <section id="community" className="community-section">
      <div className="community-inner">
        <div className="community-header">
          <div>
            <span className="section-label">
              <span className="pulse-dot" />
              Community Intelligence
            </span>
            <h2 className="section-title">
              Trail Reports From<br />
              <span className="gradient-text">Real Hikers, Right Now</span>
            </h2>
            <p className="section-desc" style={{ maxWidth: '440px' }}>
              Crowdsourced, blockchain-verified trail updates from your hiking community.
              Every report is timestamped and GPS-tagged.
            </p>
          </div>

          <div className="community-stats">
            {[
              { value: '2.4K', label: 'Reports Today', icon: '📝' },
              { value: '98%', label: 'Accuracy Rate', icon: '✅' },
              { value: '340', label: 'Active Trails', icon: '🗺️' },
            ].map(s => (
              <div className="comm-stat" key={s.label}>
                <div className="comm-stat-icon">{s.icon}</div>
                <div className="comm-stat-value">{s.value}</div>
                <div className="comm-stat-label">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Reports Feed */}
        <div className="reports-grid">
          {reports.map(r => {
            const style = typeStyles[r.type];
            return (
              <div className="report-card" key={r.id}>
                <div className="report-header">
                  <div className="report-user">
                    <div className="report-avatar">{r.avatar}</div>
                    <div>
                      <div className="report-name">
                        {r.user}
                        {r.verified && <span className="verified-badge" title="Verified Hiker">✓</span>}
                      </div>
                      <div className="report-trail">{r.trail}</div>
                    </div>
                  </div>
                  <div className="report-type-badge" style={{ background: style.bg, borderColor: style.border, color: style.color }}>
                    {style.label}
                  </div>
                </div>

                <p className="report-message">{r.message}</p>

                <div className="report-footer">
                  <span className="report-time">🕒 {r.time}</span>
                  <button className={`like-btn ${liked[r.id] ? 'liked' : ''}`} onClick={() => toggleLike(r.id)}>
                    {liked[r.id] ? '❤️' : '🤍'} {r.likes + (liked[r.id] ? 1 : 0)}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Submit Report CTA */}
        <div className="submit-report-banner">
          <div className="submit-text">
            <h3>Spot Something on the Trail?</h3>
            <p>Your report could save a fellow hiker's day. Submit hazards, conditions, and discoveries.</p>
          </div>
          <div className="submit-actions">
            <button className="btn-submit-report type-hazard-btn">⚠️ Report Hazard</button>
            <button className="btn-submit-report type-info-btn">📝 Share Conditions</button>
          </div>
        </div>
      </div>
    </section>
  );
}
