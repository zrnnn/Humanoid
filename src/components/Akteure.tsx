import { motion } from 'framer-motion';
import { User } from 'lucide-react';

const stakeholders = [
  { id: 1, name: 'Prof. Dr. Johannes Weber', role: 'Inhaber Lehrstuhl Robotik', org: 'TUM München', image: './portraits/1.png' },
  { id: 2, name: 'Dr. Maria Lindner', role: 'Head of Automation', org: 'KUKA AG', image: './portraits/2.png' },
  { id: 3, name: 'Prof. Dr. Sven Meyer', role: 'Direktor KI-Institut', org: 'FAU Erlangen', image: './portraits/3.png' },
  { id: 4, name: 'Elena Rossi', role: 'CEO', org: 'Bavaria Robotics', image: './portraits/1.png' },
  { id: 5, name: 'Dr. Karsten Bauer', role: 'Senior Researcher', org: 'Fraunhofer IIS', image: './portraits/2.png' },
  { id: 6, name: 'Lisa Wagner', role: 'Leitung Innovation', org: 'BMW Group', image: './portraits/3.png' },
  { id: 7, name: 'Prof. Dr. Alena Kovic', role: 'Prof. für Sensorik', org: 'TH Augsburg', image: './portraits/1.png' },
  { id: 8, name: 'Michael Schmidt', role: 'CTO', org: 'RoboServe GmbH', image: './portraits/2.png' }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const cardVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.4, ease: 'easeOut' } }
};

export default function Akteure() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-24">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-black tracking-tight text-slate-900 mb-6 drop-shadow-sm">Netzwerk der Expertise</h2>
        <p className="text-lg text-slate-600 max-w-3xl mx-auto font-medium leading-relaxed">
          Das Bayerische Kompetenznetzwerk für humanoide Robotik vereint Akteure aus Universitäten, außeruniversitären Forschungseinrichtungen und der Industrie. 
          Die interdisziplinäre Zusammensetzung des Netzwerks ist bewusst angelegt: Grundlagenforschung, angewandte Entwicklung und industrielle Skalierung greifen unmittelbar ineinander. 
          Ziel ist es, wissenschaftliche Erkenntnis aus dem Labor in marktreife, gesellschaftlich wirksame Systeme zu überführen — mit Bayern als Modellregion für eine
          souveräne, verantwortungsvolle Robotik-Renaissance in Europa.
        </p>
      </div>

      <motion.div 
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
      >
        {stakeholders.map((person) => (
          <motion.div 
            key={person.id}
            variants={cardVariants}
            className="group relative h-[400px] rounded-3xl overflow-hidden cursor-pointer"
          >
            {/* Background Image */}
            {person.image ? (
              <img src={person.image} alt={person.name} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
            ) : (
              <div className="absolute inset-0 bg-slate-100 flex items-center justify-center">
                <User className="w-16 h-16 text-slate-300" />
              </div>
            )}
            
            {/* Gradient Overlay for Text Readability - Updated for light mode photos */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/30 to-transparent flex opacity-90 group-hover:opacity-100 transition-opacity duration-300"></div>

            {/* Hover Frame Glow */}
            <div className="absolute inset-0 border-2 border-slate-200/50 group-hover:border-blue-500 rounded-3xl transition-colors duration-300 pointer-events-none shadow-inner"></div>

            {/* Content Bottom Left */}
            <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
              <h3 className="text-xl font-bold text-white mb-1 tracking-tight drop-shadow-md">{person.name}</h3>
              <p className="text-sm text-blue-300 font-bold mb-1 drop-shadow-md">{person.role}</p>
              <p className="text-xs text-slate-200 font-medium drop-shadow-md">{person.org}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>
      
      <div className="text-center mt-12">
        <button className="text-blue-600 font-bold hover:text-blue-700 transition-colors">
          Alle Akteure anzeigen &rarr;
        </button>
      </div>
    </div>
  );
}
