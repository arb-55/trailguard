import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-top">
          {/* Brand */}
          <div className="footer-brand">
            <div className="footer-logo">
              <div className="footer-logo-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M3 17l4-8 4 4 4-6 4 10" />
                  <circle cx="12" cy="12" r="10" />
                </svg>
              </div>
              <span>Trail<strong>Guard</strong></span>
            </div>
            <p className="footer-tagline">
              AI-Powered Tourist Safety Platform. Keeping hikers safe with real-time GPS,
              blockchain security, and community intelligence.
            </p>
            <div className="footer-badges">
              <span className="footer-badge">🔒 Blockchain Secured</span>
              <span className="footer-badge">🤖 AI Powered</span>
              <span className="footer-badge">📡 Real-Time</span>
            </div>
          </div>

          {/* Links */}
          {[
            {
              title: 'Platform',
              links: ['Trail Map', 'SOS System', 'AI Detection', 'Weather Alerts', 'Offline Mode'],
            },
            {
              title: 'Security',
              links: ['Blockchain Vault', 'Data Privacy', 'Zero-Knowledge', 'Data Export', 'Trust Center'],
            },
            {
              title: 'Community',
              links: ['Trail Reports', 'Hiker Forum', 'Safety Blog', 'Trail Guides', 'Partner Rangers'],
            },
          ].map(col => (
            <div className="footer-col" key={col.title}>
              <h4 className="footer-col-title">{col.title}</h4>
              <ul className="footer-links">
                {col.links.map(link => (
                  <li key={link}><a href="#">{link}</a></li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="footer-bottom">
          <span>© 2024 TrailGuard. Built with React.js + Blockchain Technology</span>
          <div className="footer-bottom-links">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
            <a href="#">Emergency Protocols</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
