import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import TrailMap from './components/TrailMap';
import SOSPanel from './components/SOSPanel';
import BlockchainVault from './components/BlockchainVault';
import Community from './components/Community';
import Footer from './components/Footer';
import './App.css';

function App() {
  return (
    <div className="app">
      <Navbar />
      <main>
        <Hero />
        <Features />
        <TrailMap />
        <SOSPanel />
        <BlockchainVault />
        <Community />
      </main>
      <Footer />
    </div>
  );
}

export default App;
