import { useState, useEffect, useRef } from 'react';
import './BlockchainVault.css';

const mockTransactions = [
  { hash: '0x7f3a...c2b1', type: 'Location Update', time: '2s ago', size: '2.4 KB', status: 'confirmed' },
  { hash: '0x1e9d...f840', type: 'Health Profile Sync', time: '1m ago', size: '8.1 KB', status: 'confirmed' },
  { hash: '0xb3c2...4a7e', type: 'Trail Checkpoint', time: '4m ago', size: '1.2 KB', status: 'confirmed' },
  { hash: '0x9a5f...d3b2', type: 'Emergency Contact Update', time: '12m ago', size: '0.8 KB', status: 'confirmed' },
  { hash: '0x4d8e...c5f1', type: 'Trail Review Submitted', time: '28m ago', size: '3.5 KB', status: 'confirmed' },
];

const privacyFeatures = [
  { title: 'Zero-Knowledge Proofs', desc: 'Prove location without revealing exact coordinates', icon: '🧮' },
  { title: 'Self-Sovereign Identity', desc: 'You control who accesses your data, always', icon: '🆔' },
  { title: 'Immutable Audit Trail', desc: 'Every data access is logged and verifiable', icon: '📒' },
  { title: 'End-to-End Encryption', desc: '256-bit AES encryption for all stored data', icon: '🔐' },
];

export default function BlockchainVault() {
  const [blocks, setBlocks] = useState([
    { id: 1, hash: '0x7f3a', prev: 'Genesis', txs: 3, verified: true },
    { id: 2, hash: '0x1e9d', prev: '0x7f3a', txs: 5, verified: true },
    { id: 3, hash: '0xb3c2', prev: '0x1e9d', txs: 2, verified: true },
    { id: 4, hash: '0x9a5f', prev: '0xb3c2', txs: 4, verified: true },
  ]);
  const [mining, setMining] = useState(false);
  const chainRef = useRef(null);

  const mineBlock = () => {
    if (mining) return;
    setMining(true);
    setTimeout(() => {
      const newId = blocks.length + 1;
      const hashes = ['0x4d8e', '0xc7f2', '0x2b9a', '0xe5d3'];
      setBlocks(prev => [...prev, {
        id: newId,
        hash: hashes[Math.floor(Math.random() * hashes.length)],
        prev: prev[prev.length - 1].hash,
        txs: Math.floor(Math.random() * 5) + 1,
        verified: true,
      }]);
      setMining(false);
      setTimeout(() => {
        if (chainRef.current) chainRef.current.scrollLeft = 9999;
      }, 100);
    }, 2000);
  };

  return (
    <section id="blockchain" className="blockchain-section">
      <div className="blockchain-inner">
        <div className="section-center">
          <span className="section-label" style={{ color: '#a78bfa', borderColor: 'rgba(139,92,246,0.3)', background: 'rgba(139,92,246,0.08)' }}>
            <span className="pulse-dot" style={{ background: '#8b5cf6' }} />
            Blockchain Security
          </span>
          <h2 className="section-title">
            Your Data, Your Vault<br />
            <span style={{ background: 'linear-gradient(135deg,#a78bfa,#60a5fa)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent' }}>
              Decentralized &amp; Immutable
            </span>
          </h2>
          <p className="section-desc">
            All hiker data is secured on a permissioned blockchain. No central server holds your information.
            Every location update, health record, and trail checkpoint is cryptographically sealed.
          </p>
        </div>

        {/* Live Blockchain Visualizer */}
        <div className="chain-container">
          <div className="chain-header">
            <div>
              <span className="chain-title">TrailGuard Ledger</span>
              <span className="chain-sub">Block #{blocks.length} • {blocks.reduce((s, b) => s + b.txs, 0)} transactions</span>
            </div>
            <button className={`btn-mine ${mining ? 'mining' : ''}`} onClick={mineBlock}>
              {mining ? (
                <><span className="spin-icon">⚙️</span> Mining Block...</>
              ) : (
                <><span>⛏️</span> Mine New Block</>
              )}
            </button>
          </div>

          <div className="chain-scroll" ref={chainRef}>
            {blocks.map((block, i) => (
              <div key={block.id} className="block-group">
                <div className={`block-card ${block.verified ? 'verified' : ''}`}>
                  <div className="block-number">Block #{block.id}</div>
                  <div className="block-hash">{block.hash}...</div>
                  <div className="block-detail">
                    <span>Prev: {block.prev}</span>
                    <span>{block.txs} txs</span>
                  </div>
                  <div className="block-verified">
                    <span className="verified-icon">✓</span> Verified
                  </div>
                </div>
                {i < blocks.length - 1 && <div className="chain-link">→</div>}
              </div>
            ))}
            {mining && (
              <div className="block-group">
                <div className="chain-link">→</div>
                <div className="block-card mining-block">
                  <div className="block-number">Block #{blocks.length + 1}</div>
                  <div className="mining-anim">
                    <div className="mining-bar" />
                  </div>
                  <div className="block-detail"><span>Mining...</span></div>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="blockchain-bottom">
          {/* Transaction Feed */}
          <div className="tx-feed">
            <div className="tx-feed-header">
              <span>Live Transaction Feed</span>
              <span className="live-badge">
                <span className="pulse-dot" style={{width:'6px',height:'6px'}} />
                LIVE
              </span>
            </div>
            <div className="tx-list">
              {mockTransactions.map((tx, i) => (
                <div className="tx-row" key={i}>
                  <div className="tx-status-icon">🔗</div>
                  <div className="tx-info">
                    <div className="tx-type">{tx.type}</div>
                    <div className="tx-hash">{tx.hash} • {tx.size}</div>
                  </div>
                  <div className="tx-right">
                    <span className="tx-confirmed">✓ Confirmed</span>
                    <span className="tx-time">{tx.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Privacy Features */}
          <div className="privacy-grid">
            {privacyFeatures.map((f, i) => (
              <div className="privacy-card" key={i}>
                <div className="privacy-icon">{f.icon}</div>
                <div>
                  <div className="privacy-title">{f.title}</div>
                  <div className="privacy-desc">{f.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
