import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence, useScroll } from 'framer-motion';
import { ChevronRight, X } from 'lucide-react';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.95, y: 30 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 15,
      mass: 1
    }
  }
};

const fields = [
  {
    id: 'infra',
    title: 'Infrastruktur',
    description: 'Aufbau robuster, hochskalierbarer Forschungs- und Testumgebungen für die nächste Generation humanoider Robotik in Bayern.',
    fullStory: 'Wir vernetzen High-Performance-Rechenzentren, hochsensible Sensorik-Hubs und KI-Labore zu einer nahtlosen Infrastruktur. Dies ermöglicht die beschleunigte Entwicklung komplexer Bewegungsmodelle in realistischen und sicheren Umgebungen. Durch den direkten Zugang zu modernster Hardware können lokale Start-ups und etablierte Unternehmen ihre Prototypen in einem Bruchteil der bisherigen Zeit trainieren und validieren. \n\n**Warum das so wichtig ist:**\nOhne gebündelte Rechen- und Testkapazitäten wandern technologische Innovationen ins Ausland ab. Unsere geteilte Infrastruktur senkt die absurden Einstiegshürden (Hardwarekosten) für innovative KI-Start-ups massiv. Nur so kann Bayern als geschlossenes Ökosystem wettbewerbsfähig gegenüber globalen Tech-Giganten aus den USA und Asien bleiben und technologische Souveränität wahren.',
    color: 'text-blue-600',
    bgHover: 'hover:bg-blue-50/50',
    bgExpanded: 'bg-blue-50/30 border-blue-200',
    image: './hf-kognitiv.png'
  },
  {
    id: 'usecase',
    title: 'Leuchtturmprojekte',
    description: 'Initiierung realer Leuchtturmprojekte in Schlüsselbranchen wie der Industrie 4.0 und der fortschrittlichen Pflegemedizin.',
    fullStory: 'Wir überführen theoretische Konzepte in greifbare, wirtschaftlich tragfähige Anwendungsfälle, um frühzeitiges Vertrauen zu schaffen und die Markteinführung innovativer Systeme zu beschleunigen. Ob Roboter, die in der Pflege bei physisch belastenden Aufgaben unterstützen, oder autarke humanoide Assistenten in der hochautomatisierten Fertigung – wir zeigen, dass die Zukunft bereits Realität ist.\n\n**Warum das so wichtig ist:**\nGesellschaftliche Akzeptanz entsteht nicht im Labor, sondern in der Praxis. Leuchtturmprojekte bauen die abstrakte Angst vor der Maschine ab und veranschaulichen den konkreten Mehrwert. Gerade in Zeiten extremen Fachkräftemangels in der Pflege oder Logistik muss nachvollziehbar demonstriert werden, wie Humanoide den Menschen unterstützen und entlasten, anstatt ihn zu ersetzen.',
    color: 'text-emerald-600',
    bgHover: 'hover:bg-emerald-50/50',
    bgExpanded: 'bg-emerald-50/30 border-emerald-200',
    image: './hf-aktoren.png'
  },
  {
    id: 'reg',
    title: 'Regulatorik & Sandbox',
    description: 'Proaktive Entwicklung sicherer rechtlicher Rahmenbedingungen und isolierter Sandbox-Umgebungen für Stresstests.',
    fullStory: 'Diese geschützten Räume gewährleisten die vollständige Compliance mit dem europäischen AI Act und evaluieren die sichere Mensch-Roboter-Kollaboration. Wir arbeiten eng mit Zertifizierungsstellen zusammen, um standardisierte Prüfverfahren für KI-gesteuerte autonome Systeme zu entwickeln, bevor sie auf den freien Markt gelangen. Sicherheit und Ethik stehen hier an oberster Stelle.\n\n**Warum das so wichtig ist:**\nDie sicherste Technologie ist wertlos, wenn Richtlinien ihren Einsatz illegal machen. Gleichzeitig darf Innovation nicht ungebremst auf unsere Gesellschaft prallen. Regulatorische Sandbox-Umgebungen ermöglichen es uns, Gesetze aktiv *mitzugestalten*, anstatt nur auf sie zu reagieren. Wer die Prüfstandards etabliert, definiert auch den Markt.',
    color: 'text-indigo-600',
    bgHover: 'hover:bg-indigo-50/50',
    bgExpanded: 'bg-indigo-50/30 border-indigo-200',
    image: './hf-system.png'
  }
];

export default function Handlungsfelder() {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [openScrollY, setOpenScrollY] = useState(0);
  const { scrollY } = useScroll();

  const selectedField = fields.find(f => f.id === expandedId);

  // Scroll to close logic
  useEffect(() => {
    if (!expandedId) return;

    const unsubscribe = scrollY.on('change', (latest) => {
      if (Math.abs(latest - openScrollY) > 150) {
        setExpandedId(null);
      }
    });

    return () => unsubscribe();
  }, [expandedId, openScrollY, scrollY]);

  const handleOpen = (id: string) => {
    setOpenScrollY(scrollY.get());
    setExpandedId(id);
  };

  return (
    <div className="max-w-7xl mx-auto px-6 text-center">
      <motion.div
        className="text-center mb-24"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-4xl md:text-5xl font-black tracking-tight text-slate-900 mb-6 drop-shadow-sm">Handlungsfelder</h2>
        <p className="text-lg text-slate-600 mb-16 max-w-2xl mx-auto font-medium">
          Wir konzentrieren uns auf drei strategische Säulen, um Bayern als globalen Vorreiter in der humanoiden Robotik zu etablieren.
        </p>
      </motion.div>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
      >
        {fields.map((field) => (
          <motion.div
            layoutId={`card-${field.id}`}
            key={field.id}
            variants={itemVariants}
            onClick={() => handleOpen(field.id)}
            className={`group flex flex-col bg-white border border-slate-200 rounded-3xl overflow-hidden cursor-pointer hover:shadow-2xl hover:shadow-blue-900/10 ${field.bgHover}`}
          >
            {/* Photorealistic Image Header */}
            <motion.div layoutId={`image-${field.id}`} className="w-full h-48 relative overflow-hidden">
              <img 
                src={field.image} 
                alt={field.title} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 to-transparent"></div>
            </motion.div>

            <div className="p-8 relative z-10 flex-1 flex flex-col">
              <motion.h3 layoutId={`title-${field.id}`} className="text-2xl font-bold text-slate-900 mb-3 tracking-tight flex justify-between items-center">
                {field.title}
                <button className={`p-2 rounded-full transition-colors ${field.color} bg-slate-50 group-hover:bg-slate-100`}>
                  <ChevronRight size={20} />
                </button>
              </motion.h3>
              <motion.p layoutId={`desc-${field.id}`} className="text-slate-600 leading-relaxed font-medium">
                {field.description}
              </motion.p>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Expanded Overlay using React Portal to guarantee absolute highest z-index */}
      {typeof document !== 'undefined' && createPortal(
        <AnimatePresence>
          {selectedField && (
            <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4 md:p-12">
              <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setExpandedId(null)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-md cursor-pointer"
            />
            
            <motion.div
              layoutId={`card-${selectedField.id}`}
              className="relative w-full max-w-4xl bg-white rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row h-auto max-h-[90vh]"
            >
              {/* Image Side */}
              <motion.div layoutId={`image-${selectedField.id}`} className="w-full md:w-2/5 h-64 md:h-auto relative">
                <img 
                  src={selectedField.image} 
                  alt={selectedField.title} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-slate-900/80 via-slate-900/40 to-transparent"></div>
              </motion.div>

              {/* Content Side */}
              <div className="w-full md:w-3/5 p-8 md:p-12 text-left relative overflow-y-auto">
                {/* Close button */}
                <button 
                  onClick={() => setExpandedId(null)}
                  className="absolute top-6 right-6 p-2 bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-900 rounded-full transition-colors z-20"
                >
                  <X size={24} />
                </button>

                <motion.h3 layoutId={`title-${selectedField.id}`} className="text-3xl md:text-4xl font-bold text-slate-900 mb-6 pr-12">
                  {selectedField.title}
                </motion.h3>
                <motion.p layoutId={`desc-${selectedField.id}`} className="text-lg md:text-xl text-slate-700 font-serif leading-relaxed font-medium mb-8">
                  {selectedField.description}
                </motion.p>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.4 }}
                  className="pt-8 border-t border-slate-200"
                >
                  <p className="text-lg text-slate-600 font-serif leading-relaxed">
                    {selectedField.fullStory}
                  </p>
                </motion.div>
              </div>
            </motion.div>
            </div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </div>
  );
}
