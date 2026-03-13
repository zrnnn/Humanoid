import HeroScene from './components/RobotHand3D';
import Handlungsfelder from './components/Handlungsfelder';
import Kompetenzlandkarte from './components/Kompetenzlandkarte';
import Akteure from './components/Akteure';
import { useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ErrorBoundary } from './ErrorBoundary';
import NewsletterModal from './components/NewsletterModal';
import logo from '/logo.png';
import alpineBg from '/alpine-bg.png';

export default function App() {
  const { scrollY } = useScroll();
  const scrollOpacity = useTransform(scrollY, [0, 300], [1, 0]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="bg-transparent min-h-screen text-slate-900 overflow-hidden font-sans">
      <NewsletterModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />



      {/* Main Layout Overlay */}
      <div className="relative z-10 w-full min-h-screen">
        
        {/* ═══════════════ HEADER ═══════════════ */}
        <header className="fixed top-0 w-full bg-white/70 backdrop-blur-2xl border-b border-slate-200/50 z-50">
          <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
            <a href="#" className="flex items-center gap-3 group">
              {/* Logo - mix-blend-multiply eliminates the white background artifact seamlessly */}
              <img src={logo} alt="Humanoids Bavaria Logo" className="h-14 w-14 object-contain rounded-lg transition-transform group-hover:scale-105 invert mix-blend-multiply opacity-90" />
              <span className="font-bold text-lg tracking-tight text-slate-900">
                Home of Humanoids
              </span>
            </a>
            <nav className="hidden md:flex gap-8 text-[13px] font-bold text-slate-500 uppercase tracking-wider">
              <a href="#vision" className="hover:text-blue-600 transition-colors duration-300 relative after:absolute after:-bottom-1.5 after:left-0 after:w-full after:h-[2px] after:bg-blue-600 after:scale-x-0 outline-none hover:after:scale-x-100 after:transition-transform after:origin-left">Vision</a>
              <a href="#handlungsfelder" className="hover:text-blue-600 transition-colors duration-300 relative after:absolute after:-bottom-1.5 after:left-0 after:w-full after:h-[2px] after:bg-blue-600 after:scale-x-0 outline-none hover:after:scale-x-100 after:transition-transform after:origin-left">Handlungsfelder</a>
              <a href="#netzwerk" className="hover:text-blue-600 transition-colors duration-300 relative after:absolute after:-bottom-1.5 after:left-0 after:w-full after:h-[2px] after:bg-blue-600 after:scale-x-0 outline-none hover:after:scale-x-100 after:transition-transform after:origin-left">Netzwerk</a>
              <a href="#akteure" className="hover:text-blue-600 transition-colors duration-300 relative after:absolute after:-bottom-1.5 after:left-0 after:w-full after:h-[2px] after:bg-blue-600 after:scale-x-0 outline-none hover:after:scale-x-100 after:transition-transform after:origin-left">Akteure</a>
            </nav>
            <button 
              onClick={() => setIsModalOpen(true)}
              className="bg-slate-900 text-white px-6 py-2.5 rounded-full text-sm font-semibold hover:bg-blue-600 transition-all duration-300 shadow-lg shadow-blue-500/20"
            >
              Beitreten
            </button>
          </div>
        </header>

        {/* ═══════════════ HERO ═══════════════ */}
        <section id="vision" className="relative w-full min-h-[85vh] flex flex-col items-start justify-start pt-32 md:pt-40 pb-20">
          {/* Subtle Photorealistic Alpine Background — smooth fade to transparent before the section ends */}
          <div 
            className="absolute inset-0 z-0 pointer-events-none opacity-[0.60] bg-cover bg-center bg-no-repeat transition-opacity duration-1000 mix-blend-multiply"
            style={{ 
              backgroundImage: `url(${alpineBg})`,
              maskImage: 'linear-gradient(to bottom, black 0%, rgba(0,0,0,0.2) 40%, transparent 60%)',
              WebkitMaskImage: 'linear-gradient(to bottom, black 0%, rgba(0,0,0,0.2) 40%, transparent 60%)' 
            }}
          />

          {/* Robot 3D scene — absolute within hero, scrolls with the section */}
          <div className="absolute inset-0 z-20 pointer-events-none">
            <ErrorBoundary>
              <HeroScene />
            </ErrorBoundary>
          </div>

          {/* Soft gradient for text readability — slightly adjusting z-index to sit above the photo but below text */}
          <div className="absolute inset-0 pointer-events-none z-10" style={{
            background: 'radial-gradient(ellipse 80% 70% at 20% 50%, rgba(219,234,254,0.85) 0%, rgba(238,242,255,0.65) 50%, transparent 100%)'
          }} />
          <div className="max-w-7xl mx-auto px-6 w-full relative z-30">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-3xl"
            >
              <p className="text-sm font-bold uppercase tracking-[0.3em] text-blue-600 mb-6 drop-shadow-sm">
                Bayerns Kompetenznetzwerk für humanoide Robotik
              </p>
              <h1 className="text-5xl sm:text-6xl md:text-8xl font-black tracking-tighter text-slate-900 mb-8 leading-[1.05] drop-shadow-sm font-sans">
                Die Zukunft <br />
                ist <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-700">Humanoid</span>.
              </h1>
              <p className="text-xl md:text-2xl text-slate-600 font-serif leading-relaxed max-w-2xl">
                Bayerns Kompetenznetzwerk für humanoide Robotik — ein Ökosystem für technologische Exzellenz und gesellschaftlichen Fortschritt.
              </p>
              
              <div className="mt-14 flex gap-4 flex-wrap">
                <motion.button 
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  className="bg-blue-600 text-white px-8 py-4 rounded-full font-bold hover:bg-blue-700 hover:shadow-[0_0_30px_rgba(37,99,235,0.3)] transition-all duration-300"
                >
                  Mehr erfahren
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setIsModalOpen(true)}
                  className="bg-white text-slate-700 border border-slate-200 px-8 py-4 rounded-full font-bold hover:bg-slate-50 hover:border-slate-300 shadow-sm transition-all duration-300"
                >
                  Netzwerk entdecken
                </motion.button>
              </div>
            </motion.div>
          </div>

          {/* Scroll indicator — larger animated chevron that fades out */}
          <motion.div 
            className="absolute bottom-12 left-1/2 -translate-x-1/2 z-30"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            style={{ opacity: scrollOpacity }}
          >
            <div className="w-8 h-12 rounded-full border-2 border-slate-400 flex items-start justify-center pt-2.5">
              <div className="w-1.5 h-3 rounded-full bg-slate-400" />
            </div>
          </motion.div>

        </section>

        {/* ═══════════════ UNSERE MISSION ═══════════════ */}
        <section className="relative w-full z-20 pt-40 pb-32 overflow-hidden bg-white/40">
          {/* Subtle background glow effect */}
          <div className="absolute inset-0 bg-gradient-to-b from-blue-50/50 via-white to-transparent" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px] bg-blue-100/40 rounded-full blur-[120px] pointer-events-none" />
          
          <div className="max-w-5xl mx-auto px-6 text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <h2 className="text-sm font-bold uppercase tracking-[0.4em] text-blue-600 mb-6 drop-shadow-sm">Die Mission</h2>
              <p className="text-4xl md:text-6xl font-black text-slate-900 leading-tight tracking-tighter mb-12 drop-shadow-sm">
                Wir machen Spitzenforschung zur industriellen Realität.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
              viewport={{ once: true, margin: "-100px" }}
              className="grid grid-cols-1 md:grid-cols-2 gap-12 text-left"
            >
              <div className="text-xl text-slate-600 font-serif leading-relaxed space-y-6">
                <p>
                  Das bayerische Kompetenznetzwerk bündelt zielgerichtet die Exzellenz führender Universitäten, unabhängiger Forschungseinrichtungen und innovativer Hightech-Unternehmen in einer nie dagewesenen Allianz.
                </p>
                <p>
                  Unser Auftrag ist es, humanoide Roboter nicht nur als technologische Machbarkeitsstudie zu betrachten, sondern sie als <strong className="text-blue-700 font-semibold">sichere, verlässliche und alltägliche Helfer</strong> fest in unserer europäischen Gesellschaft zu verankern.
                </p>
              </div>
              <div className="text-xl text-slate-600 font-serif leading-relaxed space-y-6 border-l-2 border-blue-100 pl-8 md:pl-12">
                <p>
                  Von der signifikanten Entlastung in der Pflegemedizin bis hin zur maximalen Effizienzsteigerung in hochautomatisierten Smart Factories – wir schaffen Lösungen, die den Menschen in den Mittelpunkt stellen.
                </p>
                <p>
                  Dabei legen wir höchsten Wert auf technologische Souveränität, datenschutzkonforme KI-Modelle nach strengen Vorgaben des europäischen AI Act und eine interdisziplinäre Zusammenarbeit, die grenzenloses Vertrauen und Innovationskraft vereint.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ═══════════════ HANDLUNGSFELDER ═══════════════ */}
        <div className="w-full relative z-20">
          <section id="handlungsfelder" className="w-full pb-32 pt-16 bg-transparent">
            <Handlungsfelder />
          </section>
        </div>

        {/* ═══════════════ KOMPETENZLANDKARTE ═══════════════ */}
        <section id="netzwerk" className="w-full bg-transparent relative z-20 pb-32">
          <ErrorBoundary>
            <Kompetenzlandkarte />
          </ErrorBoundary>
        </section>

        {/* ═══════════════ AKTEURE ═══════════════ */}
        <section id="akteure" className="w-full bg-transparent relative z-20 pb-32">
          <Akteure />
        </section>

        {/* ═══════════════ FOOTER ═══════════════ */}
        <footer className="w-full bg-white border-t border-slate-200 text-slate-500 py-16 relative z-20">
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12 text-sm">
            <div>
              <div className="flex items-center gap-3 mb-5">
                <img src={logo} alt="Logo" className="h-[50px] w-[50px] object-contain rounded-lg invert" />
                <span className="font-bold text-xl text-slate-900">Home of Humanoids</span>
              </div>
              <p className="max-w-xs leading-relaxed text-slate-500">
                Das Kompetenznetzwerk für die Zukunft der humanoiden Robotik. Gestalten Sie mit uns das Ökosystem von morgen.
              </p>
            </div>
            <div>
              <h4 className="text-slate-900 font-bold mb-5 uppercase tracking-wider text-xs">Navigation</h4>
              <ul className="space-y-3">
                <li><a href="#vision" className="hover:text-blue-600 transition duration-300">Vision</a></li>
                <li><a href="#handlungsfelder" className="hover:text-blue-600 transition duration-300">Handlungsfelder</a></li>
                <li><a href="#netzwerk" className="hover:text-blue-600 transition duration-300">Netzwerk</a></li>
                <li><a href="#akteure" className="hover:text-blue-600 transition duration-300">Akteure</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-slate-900 font-bold mb-5 uppercase tracking-wider text-xs">Kontakt & Rechtliches</h4>
              <ul className="space-y-3">
                <li><a href="#" className="hover:text-blue-600 transition duration-300">info@humanoids-bavaria.de</a></li>
                <li><a href="#" className="hover:text-blue-600 transition duration-300">Presse</a></li>
                <li><a href="#" className="hover:text-blue-600 transition duration-300">Datenschutz</a></li>
                <li><a href="#" className="hover:text-blue-600 transition duration-300">Impressum</a></li>
              </ul>
            </div>
          </div>
          <div className="max-w-7xl mx-auto px-6 mt-14 pt-8 border-t border-slate-200 text-xs text-center text-slate-400">
            &copy; 2026 Home of Humanoids. Alle Rechte vorbehalten.
          </div>
        </footer>

      </div>
    </div>
  );
}
