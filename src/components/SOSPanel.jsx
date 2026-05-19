import { useState, useRef } from 'react';
import './SOSPanel.css';

const contacts = [
  { name: 'Mountain Rescue Unit', type: 'rescue', status: 'online', eta: '12 min' },
  { name: 'Park Ranger Station', type: 'ranger', status: 'online', eta: '8 min' },
  { name: 'Sarah (Emergency Contact)', type: 'personal', status: 'online', eta: 'Notified' },
];

export default function SOSPanel() {
  const [sosActive, setSosActive] = useState(false);
  const [countdown, setCountdown] = useState(5);
  const [dispatched, setDispatched] = useState(false);
  const [holding, setHolding] = useState(false);
  const timerRef = useRef(null);
  const countRef = useRef(null);

  const handleSosStart = () => {
    setHolding(true);
    setCountdown(5);
    setSosActive(false);
    timerRef.current = setTimeout(() => {
      setSosActive(true);
      setHolding(false);
      setTimeout(() => setDispatched(true), 1500);
    }, 3000);
    countRef.current = setInterval(() => {
      setCountdown(c => c > 0 ? c - 1 : 0);
    }, 600);
  };

  const handleSosEnd = () => {
    if (!sosActive) {
      clearTimeout(timerRef.current);
      clearInterval(countRef.current);
      setHolding(false);
      setCountdown(5);
    }
  };

  const resetSos = () => {
    setSosActive(false);
    setDispatched(false);
    setHolding(false);
    setCountdown(5);
  };

  return (
    <section id="sos" className="sos-section">
      <div className="sos-bg-pulse" />

      <div className="sos-layout">
        {/* Left Info */}
        <div className="sos-info">
          <span className="section-label" style={{ color: '#fca5a5', borderColor: 'rgba(239,68,68,0.3)', background: 'rgba(239,68,68,0.08)' }}>
            <span className="pulse-dot" style={{ background: '#ef4444' }} />
            Emergency System
          </span>
          <h2 className="section-title">
            One Button Between<br />
            <span style={{ background: 'linear-gradient(135deg,#f87171,#fb923c)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent' }}>
              You &amp; Help
            </span>
          </h2>
          <p className="sos-desc">
            TrailGuard's SOS system instantly broadcasts your real-time GPS position,
            health profile, trail data, and emergency contacts to rescue teams.
            Response is guaranteed within 15 minutes, even in remote areas.
          </p>

          <div className="sos-features">
            {[
              { icon: '📡', text: 'Satellite signal backup — works without cell service' },
              { icon: '🔐', text: 'Encrypted health profile shared only with responders' },
              { icon: '🗺️', text: 'Precise trail position & last 2-hour movement history' },
              { icon: '📱', text: 'Auto-notifies your 5 emergency contacts' },
            ].map((f, i) => (
              <div key={i} className="sos-feature-item">
                <span>{f.icon}</span>
                <span>{f.text}</span>
              </div>
            ))}
          </div>

          {/* Emergency contacts */}
          <div className="contacts-panel">
            <div className="contacts-header">Dispatch Ready</div>
            {contacts.map((c, i) => (
              <div key={i} className="contact-row">
                <div className={`contact-type-icon type-${c.type}`}>
                  {c.type === 'rescue' ? '🚁' : c.type === 'ranger' ? '🏕️' : '👤'}
                </div>
                <div className="contact-info">
                  <div className="contact-name">{c.name}</div>
                  <div className="contact-eta">ETA: {c.eta}</div>
                </div>
                <div className={`contact-status ${c.status}`}>
                  <span className="pulse-dot" style={{width:'6px',height:'6px', background: c.status === 'online' ? 'var(--emerald)' : '#f59e0b'}} />
                  {c.status}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* SOS Button */}
        <div className="sos-button-area">
          {!sosActive ? (
            <div className="sos-button-wrap">
              <div className={`sos-ring-outer ${holding ? 'sos-ringing' : ''}`} />
              <div className={`sos-ring-mid ${holding ? 'sos-ringing' : ''}`} />
              <button
                className={`sos-btn ${holding ? 'sos-holding' : ''}`}
                onMouseDown={handleSosStart}
                onMouseUp={handleSosEnd}
                onTouchStart={handleSosStart}
                onTouchEnd={handleSosEnd}
              >
                <div className="sos-icon">🆘</div>
                <div className="sos-label">SOS</div>
                <div className="sos-sub">{holding ? `Sending in ${countdown}...` : 'Hold to Activate'}</div>
              </button>
            </div>
          ) : (
            <div className="sos-active-state">
              <div className="sos-active-icon">📡</div>
              <div className="sos-active-title">
                {dispatched ? 'Help Is On The Way!' : 'Dispatching...'}
              </div>
              <div className="sos-active-sub">
                {dispatched
                  ? 'Rescue team notified. Stay calm and visible.'
                  : 'Broadcasting your coordinates...'}
              </div>
              {dispatched && (
                <div className="sos-dispatched-cards">
                  {contacts.map((c, i) => (
                    <div key={i} className="dispatched-card">
                      <span>{c.type === 'rescue' ? '🚁' : c.type === 'ranger' ? '🏕️' : '👤'}</span>
                      <span>{c.name}</span>
                      <span className="eta-badge">ETA {c.eta}</span>
                    </div>
                  ))}
                </div>
              )}
              <button className="btn-cancel-sos" onClick={resetSos}>
                Cancel SOS (Demo Reset)
              </button>
            </div>
          )}

          {/* Signal strength bars */}
          <div className="signal-widget">
            <span className="signal-label">Signal Strength</span>
            <div className="signal-bars">
              {[1,2,3,4,5].map(b => (
                <div key={b} className={`signal-bar ${b <= 4 ? 'active' : ''}`} style={{ height: `${b * 6 + 8}px` }} />
              ))}
            </div>
            <span className="signal-value">4G + GPS</span>
          </div>
        </div>
      </div>
    </section>
  );
}
