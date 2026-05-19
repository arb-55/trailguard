import { useState, useEffect } from 'react';
import './Navbar.css';

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'Features', href: '#features' },
  { label: 'Trail Map', href: '#trail-map' },
  { label: 'SOS', href: '#sos' },
  { label: 'Blockchain', href: '#blockchain' },
  { label: 'Community', href: '#community' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="navbar-inner">
        {/* Logo */}
        <a href="#home" className="navbar-logo">
          <div className="logo-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 17l4-8 4 4 4-6 4 10" />
              <circle cx="12" cy="12" r="10" />
            </svg>
          </div>
          <span>Trail<strong>Guard</strong></span>
        </a>

        {/* Desktop Links */}
        <ul className="navbar-links">
          {navLinks.map(link => (
            <li key={link.label}>
              <a href={link.href}>{link.label}</a>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <div className="navbar-actions">
          <a href="#sos" className="btn-sos-nav">
            <span className="pulse-dot" />
            Emergency SOS
          </a>
        </div>

        {/* Hamburger */}
        <button
          className={`hamburger ${menuOpen ? 'open' : ''}`}
          onClick={() => setMenuOpen(v => !v)}
          aria-label="Toggle menu"
        >
          <span /><span /><span />
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${menuOpen ? 'open' : ''}`}>
        {navLinks.map(link => (
          <a key={link.label} href={link.href} onClick={() => setMenuOpen(false)}>
            {link.label}
          </a>
        ))}
        <a href="#sos" className="btn-sos-mobile" onClick={() => setMenuOpen(false)}>
          🚨 Emergency SOS
        </a>
      </div>
    </nav>
  );
}
