import { useState, useEffect } from 'react';
import './TrailMap.css';

const trails = [
  { id: 1, name: 'Sunset Ridge Trail', difficulty: 'Moderate', distance: '8.4 km', elevation: '420m', status: 'safe', hikers: 23, weather: '22°C Sunny', rating: 4.8 },
  { id: 2, name: 'Crystal Falls Loop', difficulty: 'Easy', distance: '4.2 km', elevation: '180m', status: 'safe', hikers: 47, weather: '19°C Cloudy', rating: 4.6 },
  { id: 3, name: 'Eagle Peak Summit', difficulty: 'Hard', distance: '14.7 km', elevation: '1240m', status: 'caution', hikers: 8, weather: '14°C Windy', rating: 4.9 },
  { id: 4, name: 'Emerald Valley Path', difficulty: 'Easy', distance: '3.1 km', elevation: '90m', status: 'safe', hikers: 62, weather: '24°C Clear', rating: 4.4 },
  { id: 5, name: 'Storm Peak Challenge', difficulty: 'Hard', distance: '19.2 km', elevation: '1850m', status: 'danger', hikers: 0, weather: '⚠️ Storm Warning', rating: 4.7 },
];

const markers = [
  { x: 30, y: 25, type: 'user', label: 'You' },
  { x: 55, y: 40, type: 'hazard', label: 'Slippery Rocks' },
  { x: 70, y: 65, type: 'checkpoint', label: 'Rest Point A' },
  { x: 20, y: 60, type: 'checkpoint', label: 'Water Source' },
  { x: 80, y: 30, type: 'peak', label: 'Summit 1840m' },
  { x: 45, y: 75, type: 'hiker', label: '4 Hikers' },
];

const statusColor = { safe: '#10b981', caution: '#f59e0b', danger: '#ef4444' };
const diffColor = { Easy: 'emerald', Moderate: 'orange', Hard: 'red' };

export default function TrailMap() {
  const [selected, setSelected] = useState(0);
  const [activeMarker, setActiveMarker] = useState(null);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setTick(v => v + 1), 2000);
    return () => clearInterval(t);
  }, []);

  const trail = trails[selected];

  return (
    <section id="trail-map" className="trailmap-section">
      <div className="section-center">
        <span className="section-label">
          <span className="pulse-dot" />
          Live Trail Intelligence
        </span>
        <h2 className="section-title">
          Interactive Trail Map<br />
          <span className="gradient-text">AI-Powered Safety Overlay</span>
        </h2>
      </div>

      <div className="trailmap-layout">
        {/* Trail List */}
        <div className="trail-list">
          <div className="trail-list-header">
            <span>Nearby Trails</span>
            <span className="live-badge">
              <span className="pulse-dot" style={{width:'6px',height:'6px'}} />
              LIVE
            </span>
          </div>
          {trails.map((t, i) => (
            <button
              key={t.id}
              className={`trail-item ${i === selected ? 'active' : ''}`}
              onClick={() => setSelected(i)}
            >
              <div className="trail-item-top">
                <span className="trail-item-name">{t.name}</span>
                <span className={`status-dot`} style={{ background: statusColor[t.status] }} />
              </div>
              <div className="trail-item-meta">
                <span className={`diff-badge diff-${diffColor[t.difficulty]}`}>{t.difficulty}</span>
                <span>{t.distance}</span>
                <span>↑{t.elevation}</span>
              </div>
            </button>
          ))}
        </div>

        {/* Map Canvas */}
        <div className="map-canvas">
          {/* Trail path SVG */}
          <svg className="trail-svg" viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
              <linearGradient id="trailGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#10b981" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.8" />
              </linearGradient>
            </defs>
            {/* Trail lines */}
            <polyline
              points="30,25 40,35 55,40 65,55 70,65"
              fill="none"
              stroke="url(#trailGrad)"
              strokeWidth="0.8"
              strokeDasharray="2,1"
            />
            <polyline
              points="30,25 20,40 20,60"
              fill="none"
              stroke="rgba(16,185,129,0.4)"
              strokeWidth="0.5"
              strokeDasharray="1,1"
            />
            <polyline
              points="55,40 70,32 80,30"
              fill="none"
              stroke="rgba(239,68,68,0.5)"
              strokeWidth="0.5"
              strokeDasharray="1,1"
            />
            {/* Elevation contours */}
            <ellipse cx="50" cy="50" rx="35" ry="28" fill="none" stroke="rgba(16,185,129,0.08)" strokeWidth="0.5"/>
            <ellipse cx="50" cy="48" rx="24" ry="18" fill="none" stroke="rgba(16,185,129,0.08)" strokeWidth="0.5"/>
            <ellipse cx="52" cy="45" rx="14" ry="10" fill="none" stroke="rgba(16,185,129,0.1)" strokeWidth="0.5"/>
          </svg>

          {/* Markers */}
          {markers.map((m, i) => (
            <div
              key={i}
              className={`map-marker type-${m.type} ${activeMarker === i ? 'marker-active' : ''}`}
              style={{ left: `${m.x}%`, top: `${m.y}%` }}
              onClick={() => setActiveMarker(activeMarker === i ? null : i)}
            >
              <div className="marker-icon">
                {m.type === 'user' && '🧍'}
                {m.type === 'hazard' && '⚠️'}
                {m.type === 'checkpoint' && '📌'}
                {m.type === 'peak' && '🏔️'}
                {m.type === 'hiker' && '👥'}
              </div>
              {activeMarker === i && (
                <div className="marker-tooltip">{m.label}</div>
              )}
            </div>
          ))}

          {/* Grid overlay */}
          <div className="map-grid-overlay" />

          {/* Scale bar */}
          <div className="map-scale">
            <div className="scale-bar" />
            <span>1 km</span>
          </div>

          {/* Compass */}
          <div className="compass">
            <div className="compass-needle">N</div>
          </div>
        </div>

        {/* Trail Detail Panel */}
        <div className="trail-detail">
          <div className="trail-detail-header">
            <h3>{trail.name}</h3>
            <div
              className="trail-status-badge"
              style={{ background: `${statusColor[trail.status]}22`, color: statusColor[trail.status], borderColor: statusColor[trail.status] }}
            >
              {trail.status === 'safe' && '✓ Safe'}
              {trail.status === 'caution' && '⚠ Caution'}
              {trail.status === 'danger' && '✕ Danger'}
            </div>
          </div>

          <div className="trail-stats-grid">
            {[
              { label: 'Distance', value: trail.distance, icon: '📏' },
              { label: 'Elevation', value: trail.elevation, icon: '⛰️' },
              { label: 'Weather', value: trail.weather, icon: '🌡️' },
              { label: 'Active Hikers', value: `${trail.hikers} people`, icon: '👥' },
            ].map(s => (
              <div className="trail-stat" key={s.label}>
                <span className="trail-stat-icon">{s.icon}</span>
                <div>
                  <div className="trail-stat-value">{s.value}</div>
                  <div className="trail-stat-label">{s.label}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="trail-rating">
            <span>Trail Rating</span>
            <div className="stars">
              {[1,2,3,4,5].map(n => (
                <span key={n} className={n <= Math.round(trail.rating) ? 'star filled' : 'star'}>★</span>
              ))}
              <span className="rating-num">{trail.rating}</span>
            </div>
          </div>

          {/* AI Recommendation */}
          <div className="ai-recommendation">
            <div className="ai-badge">
              <span>🤖</span> AI Assessment
            </div>
            <p>
              {trail.status === 'safe' && `Trail conditions optimal. ${trail.hikers} active hikers present. Recommended start window: Now — 4:00 PM.`}
              {trail.status === 'caution' && `Proceed with caution. Wind speeds elevated near summit. Recommend poles and layering.`}
              {trail.status === 'danger' && `Trail temporarily closed. Storm system approaching. Re-evaluate in 6–8 hours.`}
            </p>
          </div>

          <a href="#sos" className="btn-start-trail">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/>
              <circle cx="12" cy="9" r="2.5"/>
            </svg>
            Begin This Trail
          </a>
        </div>
      </div>
    </section>
  );
}
