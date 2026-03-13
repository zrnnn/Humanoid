import { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { ComposableMap, Geographies, Geography, Marker } from "react-simple-maps";
import { X, MapPin, Building2, GraduationCap } from 'lucide-react';

// Bavaria GeoJSON from a reliable high-detail source
const GEO_URL = "https://raw.githubusercontent.com/isellsoap/deutschlandGeoJSON/main/2_bundeslaender/1_sehr_hoch.geo.json";

const nodes = [
  { id: 'tum', name: 'TU München', city: 'München', coordinates: [11.5820, 48.1351], color: '#3b82f6', role: 'Wissenschaft', desc: 'Die Technische Universität München (MIRMI) ist das Epizentrum der bayerischen Robotikforschung. Schwerpunkte umfassen KI-basierte Steuerung, taktile Sensorik und humanoide Systeme für Industrie und Medizin.', type: 'science' },
  { id: 'nuremberg_region', name: 'Metropolregion Nürnberg', city: 'Nürnberg/Erlangen/Fürth', coordinates: [11.0267, 49.5221], color: '#6366f1', role: 'Forschungs-Hub', desc: 'Gebündelte Kompetenz aus FAU, TH Nürnberg und Testzentrum Fürth: Fokus auf Medizinrobotik, KI in der Logistik und standardisierte Sicherheitsvalidierung der Mensch-Maschine-Kollaboration.', type: 'industry' },
  { id: 'tha', name: 'TH Augsburg', city: 'Augsburg', coordinates: [10.8978, 48.3705], color: '#6366f1', role: 'Wirtschaft & Industrie', desc: 'Zentrum für mechatronische Systeme in enger Zusammenarbeit mit KUKA — zukünftige Produktionskonzepte mit flexiblen humanoiden Systemen.', type: 'industry' },
  { id: 'oth', name: 'OTH Regensburg', city: 'Regensburg', coordinates: [12.0951, 49.0134], color: '#3b82f6', role: 'Wissenschaft', desc: 'Hochperformante Sensornetzwerke und dezentrale KI für autonome Echtzeit-Wahrnehmung mobiler humanoider Roboter.', type: 'science' },
  { id: 'thi', name: 'TH Ingolstadt', city: 'Ingolstadt', coordinates: [11.4168, 48.7665], color: '#6366f1', role: 'Wirtschaft & Industrie', desc: 'Robotik verbunden mit autonomen Systemen — Computer Vision für selbstständige Navigation in dynamischen Umgebungen.', type: 'industry' },
  { id: 'jmu', name: 'Universität Würzburg', city: 'Würzburg', coordinates: [9.9250, 49.7940], color: '#3b82f6', role: 'Wissenschaft', desc: 'International bekannt für Raumfahrt-Telematik und Explorationsrobotik — Autonomiekonzepte für humanoide Systeme in gefährlichen Zonen.', type: 'science' },
  { id: 'uni_ba', name: 'Universität Bamberg', city: 'Bamberg', coordinates: [10.9028, 49.8988], color: '#3b82f6', role: 'Wissenschaft', desc: 'Kognitive und psychologische Architektur von Maschinen — wie Roboter soziales Verhalten und Empathie verstehen können.', type: 'science' },
  { id: 'uni_bt', name: 'Universität Bayreuth', city: 'Bayreuth', coordinates: [11.5761, 49.9456], color: '#3b82f6', role: 'Wissenschaft', desc: 'Smarte Materialien & adaptive Aktoren — polymerbasierte künstliche Muskeln für die nächste Generation weicher Roboter.', type: 'science' }
];

export default function Kompetenzlandkarte() {
  const [activeNode, setActiveNode] = useState<typeof nodes[0] | null>(null);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <div className="w-full relative py-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 mb-16 text-center">
        <motion.h2
          className="text-4xl md:text-5xl font-black tracking-tight text-slate-900 mb-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Kompetenzlandkarte
        </motion.h2>
        <motion.p
          className="text-lg text-slate-500 max-w-2xl mx-auto font-medium"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Klicke auf einen Standort für Details zum Forschungsschwerpunkt.
        </motion.p>
      </div>

      {/* Legend */}
      <div className="max-w-7xl mx-auto px-6 mb-6 flex gap-6 justify-center">
        <div className="flex items-center gap-2 text-sm font-semibold text-slate-600">
          <GraduationCap className="w-4 h-4 text-blue-500" />
          <span>Wissenschaft</span>
        </div>
        <div className="flex items-center gap-2 text-sm font-semibold text-slate-600">
          <Building2 className="w-4 h-4 text-indigo-500" />
          <span>Wirtschaft & Industrie</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 flex flex-col lg:flex-row gap-6 items-start" ref={ref}>

        {/* MAP */}
        <motion.div
          className="w-full lg:w-3/5 rounded-3xl overflow-hidden border border-slate-200/70 shadow-2xl shadow-slate-300/30 bg-gradient-to-br from-slate-50 to-blue-50/40"
          initial={{ scale: 0.95, opacity: 0 }}
          animate={isInView ? { scale: 1, opacity: 1 } : {}}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <ComposableMap
            projection="geoMercator"
            projectionConfig={{ scale: 8200, center: [11.4, 48.7] }}
            style={{ width: '100%', height: '580px' }}
          >
            <defs>
              <radialGradient id="bavFill" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#f0f9ff" />
                <stop offset="100%" stopColor="#e8f0fe" />
              </radialGradient>
              <filter id="mapShadow">
                <feDropShadow dx="0" dy="8" stdDeviation="12" floodColor="#1e40af" floodOpacity="0.12" />
              </filter>
              <filter id="nodeShadow">
                <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#1e40af" floodOpacity="0.25" />
              </filter>
            </defs>

            <Geographies geography={GEO_URL}>
              {({ geographies }) =>
                geographies
                  .filter(geo => geo.properties.name !== 'Bayern')
                  .map((geo) => (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      fill="transparent"
                      stroke="transparent"
                      strokeWidth={0}
                      style={{ default: { outline: 'none' }, hover: { outline: 'none' }, pressed: { outline: 'none' } }}
                    />
                  ))
              }
            </Geographies>

            {/* Bavaria filled shape */}
            <Geographies geography={GEO_URL}>
              {({ geographies }) =>
                geographies
                  .filter(geo => geo.properties.name === 'Bayern')
                  .map((geo) => (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      fill="url(#bavFill)"
                      stroke="#bfdbfe"
                      strokeWidth={1.5}
                      style={{
                        default: { outline: 'none', filter: 'url(#mapShadow)' },
                        hover:   { outline: 'none', filter: 'url(#mapShadow)' },
                        pressed: { outline: 'none' },
                      }}
                    />
                  ))
              }
            </Geographies>

            {/* Subtle precise dashed Bavaria border overlay */}
            <Geographies geography={GEO_URL}>
              {({ geographies }) =>
                geographies
                  .filter(geo => geo.properties.name === 'Bayern')
                  .map((geo) => (
                    <Geography
                      key={`border-${geo.rsmKey}`}
                      geography={geo}
                      fill="none"
                      stroke="#3b82f6"
                      strokeWidth={0.7}
                      strokeOpacity={0.4}
                      strokeDasharray="5 4"
                      style={{ default: { outline: 'none' }, hover: { outline: 'none' }, pressed: { outline: 'none' } }}
                    />
                  ))
              }
            </Geographies>

            {/* Node Markers */}
            {nodes.map((node) => (
              <Marker key={node.id} coordinates={node.coordinates as [number, number]}>
                <g
                  className="cursor-pointer"
                  onClick={() => setActiveNode(activeNode?.id === node.id ? null : node)}
                  style={{ filter: 'url(#nodeShadow)' }}
                >
                  {/* Outer pulse ring for active */}
                  {activeNode?.id === node.id && (
                    <circle r={14} fill={node.color} fillOpacity={0.15} />
                  )}
                  {/* Main dot */}
                  <circle
                    r={activeNode?.id === node.id ? 9 : 7}
                    fill={activeNode?.id === node.id ? node.color : '#ffffff'}
                    stroke={node.color}
                    strokeWidth={activeNode?.id === node.id ? 0 : 2.5}
                    style={{ transition: 'all 0.2s ease' }}
                  />
                  {/* Inner dot */}
                  {activeNode?.id === node.id && (
                    <circle r={3.5} fill="#ffffff" />
                  )}
                  {/* City label */}
                  <text
                    y={22}
                    textAnchor="middle"
                    style={{
                      fontSize: '9px',
                      fontWeight: 700,
                      fill: activeNode?.id === node.id ? node.color : '#64748b',
                      pointerEvents: 'none',
                      letterSpacing: '0.03em',
                    }}
                  >
                    {node.city}
                  </text>
                </g>
              </Marker>
            ))}
          </ComposableMap>
        </motion.div>

        {/* SIDE PANEL */}
        <div className="w-full lg:w-2/5 min-h-[400px] flex items-start">
          <AnimatePresence mode="wait">
            {activeNode ? (
              <motion.div
                key={activeNode.id}
                initial={{ opacity: 0, x: 20, y: 10 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.25, ease: 'easeOut' }}
                className="w-full bg-white rounded-3xl border border-slate-100 shadow-2xl shadow-slate-200/60 overflow-hidden"
              >
                {/* Color accent bar */}
                <div className="h-1.5 w-full" style={{ background: `linear-gradient(90deg, ${activeNode.color}, ${activeNode.color}aa)` }} />

                <div className="p-8">
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <span
                        className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-bold rounded-full mb-3"
                        style={{ backgroundColor: `${activeNode.color}15`, color: activeNode.color }}
                      >
                        {activeNode.type === 'science' ? <GraduationCap className="w-3.5 h-3.5" /> : <Building2 className="w-3.5 h-3.5" />}
                        {activeNode.role}
                      </span>
                      <h3 className="text-2xl font-black text-slate-900 tracking-tight">{activeNode.city}</h3>
                      <p className="text-sm font-semibold text-slate-400 mt-1">{activeNode.name}</p>
                    </div>
                    <button
                      onClick={() => setActiveNode(null)}
                      className="text-slate-300 hover:text-slate-600 hover:bg-slate-100 p-2 rounded-full transition-all"
                    >
                      <X size={18} />
                    </button>
                  </div>

                  <p className="text-slate-600 leading-relaxed text-[15px] font-medium">
                    {activeNode.desc}
                  </p>

                  <div className="mt-8 pt-6 border-t border-slate-50 grid grid-cols-2 gap-4 text-xs text-slate-400 font-semibold">
                    <div>
                      <p className="text-slate-300 font-medium mb-1">LÄNGENGRAD</p>
                      <p className="text-slate-600">{activeNode.coordinates[0].toFixed(4)}°</p>
                    </div>
                    <div>
                      <p className="text-slate-300 font-medium mb-1">BREITENGRAD</p>
                      <p className="text-slate-600">{activeNode.coordinates[1].toFixed(4)}°</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="w-full flex flex-col items-center justify-center text-center p-12 text-slate-300 space-y-5"
              >
                <div className="w-20 h-20 rounded-full bg-blue-50 border-2 border-dashed border-blue-100 flex items-center justify-center">
                  <MapPin size={28} className="text-blue-200" />
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-400">Standort auswählen</p>
                  <p className="text-xs text-slate-300 mt-1">Klicke auf einen Punkt in der Karte<br/>um Details zu sehen.</p>
                </div>
                <div className="flex flex-col gap-2 text-left w-full max-w-xs">
                  {nodes.slice(0, 4).map(n => (
                    <button
                      key={n.id}
                      onClick={() => setActiveNode(n)}
                      className="flex items-center gap-3 text-left px-4 py-2.5 rounded-xl bg-slate-50 hover:bg-blue-50 transition-colors group"
                    >
                      <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: n.color }} />
                      <span className="text-sm font-semibold text-slate-500 group-hover:text-blue-600 transition-colors">{n.city}</span>
                    </button>
                  ))}
                  <p className="text-xs text-slate-300 text-center pt-1">+ {nodes.length - 4} weitere Standorte</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
}
