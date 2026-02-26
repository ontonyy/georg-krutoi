import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Lore from './components/Lore';
import Portfolio from './components/Portfolio';
import Playground from './components/Playground';
import Contact from './components/Contact';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor';
import SecretRoom from './components/SecretRoom';
import Notes from './components/Notes';
import { useState, useEffect } from 'react';

function App() {
  const [showSecret, setShowSecret] = useState(false);
  const [input, setInput] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const nextInput = (input + e.key).slice(-5);
      setInput(nextInput);
      if (nextInput === 'chaos') {
        setShowSecret(true);
        setInput('');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [input]);

  return (
    <div className="d-flex flex-column min-vh-100">
      {showSecret && <SecretRoom onClose={() => setShowSecret(false)} />}
      <CustomCursor />
      <Navbar />
      <Hero />
      <Lore onOpenSecret={() => setShowSecret(true)} />
      <Portfolio />
      <Playground />
      <Notes />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;
