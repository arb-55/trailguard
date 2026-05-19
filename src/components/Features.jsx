import { useEffect, useRef } from 'react';
import './Features.css';

const features = [
  {
    icon: '📍',
    color: 'emerald',
    title: 'Real-Time GPS Tracking',
    desc: 'Live trail position sharing with 5-meter accuracy. Your exact location is always visible to your emergency contacts and rescue teams.',
    tags: ['GPS', 'Live Share', 'Offline Maps'],
  },
  {
    icon: '🤖',
    color: 'blue',
    title: 'AI Hazard Detection',
    desc: 'Machine learning models analyze terrain, weather patterns, and crowd reports to warn you of upcoming dangers before you reach them.',
    tags: ['Computer Vision', 'ML Models', 'Predictive'],
  },
  {
    icon: '🚨',
    color: 'red',
    title: 'One-Tap SOS',
    desc: 'Single-press emergency alert sends your GPS coordinates, trail data, and medical profile to rescue services and your contacts instantly.',
    tags: ['Emergency', 'Auto-Alert', '<3s Response'],
  },
  {
    icon: '🔒',
    color: 'purple',
    title: 'Blockchain Data Security',
    desc: 'Your travel data, health info, and location history are encrypted using blockchain technology — you own your data, always.',
    tags: ['Zero-Knowledge', 'Immutable', 'Self-Sovereign'],
  },
  {
    icon: '🌤️',
    color: 'cyan',
    title: 'Live Weather Alerts',
    desc: 'Hyper-local weather forecasting with storm warnings, visibility alerts, and trail condition updates updated every 15 minutes.',
    tags: ['Hyperlocal', '15-min Updates', 'Storm Radar'],
  },
  {
    icon: '👥',
    color: 'orange',
    title: 'Community Trail Reports',
    desc: 'Crowdsourced hazard and condition reports from verified hikers. Rate trails, report dangers, and help the community stay safe.',
    tags: ['Crowdsourced', 'Verified Reports', 'Community'],
  },
];

export default function Features() {
  const cardsRef = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.15 }
    );
    cardsRef.current.forEach(el => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section id="features" className="features-section">
      <div className="section-center">
        <span className="section-label">
          <span className="pulse-dot" />
          Core Features
        </span>
        <h2 className="section-title">
          Everything You Need<br />
          <span className="gradient-text">For Safe Adventures</span>
        </h2>
        <p className="section-desc">
          TrailGuard packs cutting-edge technology into a seamless experience designed
          for the modern hiker — from casual day-trips to multi-day expeditions.
        </p>
      </div>

      <div className="features-grid">
        {features.map((f, i) => (
          <div
            className="feature-card"
            key={i}
            ref={el => cardsRef.current[i] = el}
            style={{ '--delay': `${i * 0.1}s` }}
          >
            <div className={`feature-icon-wrap color-${f.color}`}>
              <span className="feature-icon">{f.icon}</span>
            </div>
            <h3 className="feature-title">{f.title}</h3>
            <p className="feature-desc">{f.desc}</p>
            <div className="feature-tags">
              {f.tags.map(tag => (
                <span className="feature-tag" key={tag}>{tag}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
