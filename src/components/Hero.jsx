import { useEffect, useRef } from 'react';
import './Hero.css';

export default function Hero() {
  const statsRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      },
      { threshold: 0.1 }
    );
    if (statsRef.current) observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="home" className="hero-section">
      {/* Background Elements */}
      <div className="hero-bg">
        <div className="hero-orb orb1" />
        <div className="hero-orb orb2" />
        <div className="hero-grid" />
      </div>

      <div className="hero-content">
        <div className="hero-badge">
          <span className="pulse-dot" />
          AI-Powered Trail Safety • Live Since 2024
        </div>

        <h1 className="hero-title">
          Never Get Lost<br />
          <span className="gradient-text">On The Trail Again</span>
        </h1>

        <p className="hero-subtitle">
          TrailGuard combines real-time GPS tracking, AI hazard detection, and
          blockchain-secured data to keep every hiker safe — from trailhead to summit.
        </p>

        <div className="hero-actions">
          <a href="#trail-map" className="btn-primary">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/>
              <circle cx="12" cy="9" r="2.5"/>
            </svg>
            Start Tracking
          </a>
          <a href="#features" className="btn-secondary">
            Explore Features
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </a>
        </div>

        {/* Stats */}
        <div className="hero-stats" ref={statsRef}>
          {[
            { value: '12K+', label: 'Active Hikers', icon: '🧗' },
            { value: '340+', label: 'Trails Mapped', icon: '🗺️' },
            { value: '99.9%', label: 'SOS Response', icon: '🚨' },
            { value: '256-bit', label: 'Encryption', icon: '🔒' },
          ].map((stat, i) => (
            <div className="stat-card" key={i} style={{ animationDelay: `${i * 0.1}s` }}>
              <div className="stat-icon">{stat.icon}</div>
              <div className="stat-value">{stat.value}</div>
              <div className="stat-label">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Radar Visualization */}
      <div className="hero-visual">
        <div className="radar-container">
          <div className="radar-ring ring1" />
          <div className="radar-ring ring2" />
          <div className="radar-ring ring3" />
          <div className="radar-sweep" />
          <div className="radar-center">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/>
              <circle cx="12" cy="9" r="2.5"/>
            </svg>
          </div>
          {/* Blip dots */}
          <div className="blip blip1" />
          <div className="blip blip2" />
          <div className="blip blip3" />
        </div>

        <div className="floating-cards">
          <div className="float-card fc-left">
            <div className="fc-icon green">📍</div>
            <div>
              <div className="fc-title">Location Secured</div>
              <div className="fc-sub">Blockchain verified</div>
            </div>
          </div>
          <div className="float-card fc-right">
            <div className="fc-icon red">⚠️</div>
            <div>
              <div className="fc-title">Hazard Detected</div>
              <div className="fc-sub">Trail KM 4.2</div>
            </div>
          </div>
          <div className="float-card fc-bottom">
            <div className="fc-icon cyan">🌤️</div>
            <div>
              <div className="fc-title">Weather: Clear</div>
              <div className="fc-sub">18°C • Low Wind</div>
            </div>
          </div>
        </div>
      </div>

      <a href="#features" className="hero-scroll-cue">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 5v14M5 12l7 7 7-7"/>
        </svg>
      </a>
    </section>
  );
}
