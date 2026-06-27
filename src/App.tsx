import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import AiHomeDesign from '@/components/AiHomeDesign';
import About from '@/components/About';
import Projects from '@/components/Projects';
import Skills from '@/components/Skills';
import ContactFooter from '@/components/ContactFooter';

export default function App() {
  return (
    <div className="min-h-screen bg-base text-text-primary">
      <Navbar />
      <main>
        <Hero />
        <AiHomeDesign />
        <About />
        <Projects />
        <Skills />
      </main>
      <ContactFooter />
    </div>
  );
}
