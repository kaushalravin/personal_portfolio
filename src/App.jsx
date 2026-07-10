import './App.css';

import Navbar       from './components/navbar';
import Hero         from './components/Hero';
import AboutMe      from './components/AboutMe';
import Projects     from './components/Projects';
import Skills       from './components/Skills';
import About        from './components/About';
import Achievements from './components/Achievements';

import Footer       from './components/Footer';

export default function App() {
  return (
    <div className="min-h-screen bg-primary">
      <Navbar />

      <main>
        <Hero />
        <AboutMe />
        <Projects />
        <Skills />
        <About />
        <Achievements />

      </main>

      <Footer />
    </div>
  );
}

