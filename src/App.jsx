import { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import TrailMap from './components/TrailMap';
import SOSPanel from './components/SOSPanel';
import BlockchainVault from './components/BlockchainVault';
import Community from './components/Community';
import Footer from './components/Footer';
import TrailExplorer from './components/TrailExplorer';
import './App.css';

function App() {
  const [explorerOpen, setExplorerOpen] = useState(false);

  return (
    <div className="app">
      <Navbar />
      <main>
        <Hero onOpenExplorer={() => setExplorerOpen(true)} />
        <Features />
        <TrailMap />
        <SOSPanel />
        <BlockchainVault />
        <Community />
      </main>
      <Footer />
      {explorerOpen && <TrailExplorer onClose={() => setExplorerOpen(false)} />}
    </div>
  );
}

export default App;
