import React, { useState } from 'react';
import { MapPin, Navigation, Clock, Eye, Sparkles, Check, ArrowRight, ExternalLink, Layers, Satellite, Map as MapIcon } from 'lucide-react';
import { PARK_ZONES, ParkZone } from '../data/parkMapData';
import { MESUJI_MAPS_URL } from './Navbar';

export const ParkMapExplorer: React.FC = () => {
  const [selectedZone, setSelectedZone] = useState<ParkZone>(PARK_ZONES[0]);
  const [mapViewMode, setMapViewMode] = useState<'satellite' | 'roadmap' | 'interactive'>('satellite');

  // Exact coordinates of Taman Kehati Mesuji from Google Maps
  const latitude = -3.9531075;
  const longitude = 105.3248656;

  // Google Maps Embed URL
  const googleMapsEmbedUrl =
    mapViewMode === 'satellite'
      ? `https://maps.google.com/maps?q=${latitude},${longitude}&t=k&z=16&ie=UTF8&iwloc=&output=embed`
      : `https://maps.google.com/maps?q=${latitude},${longitude}&t=m&z=16&ie=UTF8&iwloc=&output=embed`;

  return (
    <section id="peta" className="py-20 bg-stone-900 text-stone-100 border-b border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-400 mb-2">
              <span>Tata Ruang Kawasan Kurang Lebih 10 Hektar</span>
              <span aria-hidden="true">·</span>
              <span>Integrasi Google Maps Real-Time</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white [text-wrap:balance]">
              Peta Kawasan Taman Kehati Kabupaten Mesuji
            </h2>
            <p className="text-stone-400 text-sm sm:text-base mt-2 max-w-2xl">
              Peta lokasi riil terintegrasi dengan Google Maps. Lihat citra satelit embung air, kebun bibit, area penangkaran rusa, serta pembagian zona di kawasan seluas ±10 hektar.
            </p>
          </div>

          {/* Direct link to external Google Maps */}
          <div className="flex flex-wrap items-center gap-3">
            <a
              href={MESUJI_MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 bg-emerald-700 hover:bg-emerald-600 text-white rounded-lg text-xs sm:text-sm font-bold flex items-center gap-2 transition-all shadow-md active:scale-[0.98]"
            >
              <MapPin className="w-4 h-4 text-emerald-200" />
              <span>Buka di Google Maps Langsung</span>
              <ExternalLink className="w-3.5 h-3.5 text-emerald-200" />
            </a>
          </div>
        </div>

        {/* View Mode Switcher Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-1.5 p-1 bg-stone-950 border border-stone-800 rounded-xl">
            <button
              onClick={() => setMapViewMode('satellite')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 cursor-pointer ${
                mapViewMode === 'satellite'
                  ? 'bg-emerald-800 text-white shadow-sm font-semibold'
                  : 'text-stone-400 hover:text-white'
              }`}
            >
              <Satellite className="w-3.5 h-3.5" />
              <span>Citra Satelit Google Maps</span>
            </button>

            <button
              onClick={() => setMapViewMode('roadmap')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 cursor-pointer ${
                mapViewMode === 'roadmap'
                  ? 'bg-emerald-800 text-white shadow-sm font-semibold'
                  : 'text-stone-400 hover:text-white'
              }`}
            >
              <MapIcon className="w-3.5 h-3.5" />
              <span>Peta Jalan & Topografi</span>
            </button>

            <button
              onClick={() => setMapViewMode('interactive')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 cursor-pointer ${
                mapViewMode === 'interactive'
                  ? 'bg-emerald-800 text-white shadow-sm font-semibold'
                  : 'text-stone-400 hover:text-white'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Skema 6 Zona Tata Ruang</span>
            </button>
          </div>

          <div className="flex items-center gap-3 text-xs text-stone-400 font-mono">
            <span>Koordinat: -3.9531075, 105.3248656</span>
            <span className="text-stone-700 hidden sm:inline">|</span>
            <span className="hidden sm:inline text-emerald-400">Luas: ±10 Hektar</span>
          </div>
        </div>

        {/* Map Explorer Grid: Map Viewport on Left, Zone Details on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Map Display Container */}
          <div className="lg:col-span-7 bg-stone-950 rounded-2xl border border-stone-800 p-4 sm:p-5 flex flex-col justify-between relative overflow-hidden">
            {mapViewMode === 'interactive' ? (
              /* Interactive Schematic Overlay with clickable pins */
              <div className="relative w-full aspect-[4/3] rounded-xl bg-stone-900 border border-stone-800 overflow-hidden flex items-center justify-center select-none">
                {/* Visual SVG schematic representing the 10-Ha park & central reservoir */}
                <svg className="absolute inset-0 w-full h-full opacity-30 pointer-events-none" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <pattern id="kehati-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#10b981" strokeWidth="0.5" />
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#kehati-grid)" />
                  {/* Embung Reservoir shape in center */}
                  <ellipse cx="280" cy="180" rx="140" ry="85" fill="#0284c7" opacity="0.45" />
                  {/* Outer park perimeter */}
                  <rect x="40" y="30" width="480" height="300" rx="30" fill="none" stroke="#22c55e" strokeWidth="2" strokeDasharray="8,6" opacity="0.6" />
                </svg>

                {/* Reservoir Water label */}
                <div className="absolute top-[42%] left-[40%] -translate-x-1/2 text-[11px] font-mono font-bold text-sky-300/80 uppercase tracking-widest pointer-events-none text-center">
                  EMBUNG AIR WISATA KEHATI
                </div>

                {/* Park Boundary tag */}
                <div className="absolute bottom-3 left-4 text-[10px] font-mono text-emerald-400/80 flex items-center gap-1.5 pointer-events-none">
                  <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                  <span>Batas Kawasan Hutan & Wisata (±10 Hektar)</span>
                </div>

                {/* Interactive Zone Pins */}
                {PARK_ZONES.map((zone) => {
                  const isSelected = selectedZone.id === zone.id;
                  return (
                    <button
                      key={zone.id}
                      onClick={() => setSelectedZone(zone)}
                      style={{ left: `${zone.coordinates.x}%`, top: `${zone.coordinates.y}%` }}
                      className={`absolute -translate-x-1/2 -translate-y-1/2 group p-1.5 rounded-full transition-all duration-300 z-20 cursor-pointer ${
                        isSelected
                          ? 'scale-125 ring-4 ring-emerald-500/50 bg-emerald-500 text-stone-950 shadow-xl'
                          : 'bg-stone-800 hover:bg-stone-700 text-stone-200 hover:scale-110 shadow'
                      }`}
                      title={zone.name}
                    >
                      <div className="flex items-center gap-1 px-2 py-0.5 text-[11px] font-bold font-mono">
                        <span>{zone.code}</span>
                      </div>

                      {/* Tooltip */}
                      <div
                        className={`absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2.5 py-1 rounded bg-stone-950/95 text-stone-200 text-[11px] font-medium whitespace-nowrap border border-stone-800 shadow-md transition-opacity pointer-events-none ${
                          isSelected ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                        }`}
                      >
                        {zone.name}
                      </div>
                    </button>
                  );
                })}
              </div>
            ) : (
              /* Real Google Maps Embed with Iframe */
              <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden border border-stone-800 bg-stone-950 shadow-inner">
                <iframe
                  title="Peta Google Maps Taman Kehati Kabupaten Mesuji"
                  src={googleMapsEmbedUrl}
                  width="100%"
                  height="100%"
                  className="w-full h-full border-0 rounded-xl"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
                {/* Floating link overlay in corner */}
                <div className="absolute top-3 right-3 z-10">
                  <a
                    href={MESUJI_MAPS_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 bg-stone-900/90 hover:bg-stone-900 text-white rounded-lg text-xs font-semibold backdrop-blur-sm border border-stone-700 flex items-center gap-1.5 shadow transition-all"
                  >
                    <span>Layar Penuh Google Maps</span>
                    <ExternalLink className="w-3 h-3 text-emerald-400" />
                  </a>
                </div>
              </div>
            )}

            {/* Bottom Map Info Footer */}
            <div className="mt-4 pt-3 border-t border-stone-800 flex flex-wrap items-center justify-between gap-3 text-xs text-stone-400">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-emerald-400" />
                <span>Desa Mekar Jaya, Kec. Tanjung Raya, Kab. Mesuji, Lampung</span>
              </div>
              <span className="text-[11px] font-mono text-emerald-400">
                Pusat Kawasan: -3.9531075° S, 105.3248656° E
              </span>
            </div>
          </div>

          {/* Zone Detail & Space Planning Panel */}
          <div className="lg:col-span-5 bg-stone-950 rounded-2xl border border-stone-800 p-6 sm:p-8 flex flex-col justify-between">
            <div>
              {/* Header of zone detail */}
              <div className="flex items-center justify-between mb-3 text-xs">
                <div className="flex items-center gap-2">
                  <span className="font-mono font-bold text-emerald-400 text-sm">{selectedZone.code}</span>
                  <span className="text-stone-600">·</span>
                  <span className="text-stone-300 font-medium">{selectedZone.badge}</span>
                </div>
                <div className="flex items-center gap-1 text-stone-400 font-mono">
                  <Clock className="w-3.5 h-3.5 text-amber-400" />
                  <span>Estimasi: {selectedZone.recommendedDuration}</span>
                </div>
              </div>

              <h3 className="text-2xl font-bold text-white mb-3">
                {selectedZone.name}
              </h3>

              <p className="text-stone-300 text-sm leading-relaxed mb-6">
                {selectedZone.description}
              </p>

              {/* Highlights */}
              <div className="mb-6">
                <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400 mb-2.5">
                  Daya Tarik & Karakteristik Zona
                </h4>
                <ul className="space-y-2 text-xs sm:text-sm text-stone-300">
                  {selectedZone.highlights.map((hl, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <Sparkles className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{hl}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Flora / Fauna in this zone */}
              <div className="mb-6 pt-4 border-t border-stone-800">
                <h4 className="text-xs font-bold uppercase tracking-wider text-stone-400 mb-2">
                  Flora & Fauna Terkait
                </h4>
                <div className="flex flex-wrap gap-2 text-xs">
                  {selectedZone.animalsIncluded.map((animal, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 bg-stone-900 border border-stone-800 rounded-md text-stone-200"
                    >
                      {animal}
                    </span>
                  ))}
                </div>
              </div>

              {/* Facilities in this zone */}
              <div className="pt-4 border-t border-stone-800">
                <h4 className="text-xs font-bold uppercase tracking-wider text-stone-400 mb-2">
                  Sarana Pendukung
                </h4>
                <div className="flex flex-wrap gap-2 text-xs text-stone-300">
                  {selectedZone.facilitiesIncluded.map((fac, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 bg-emerald-950/40 border border-emerald-900/60 rounded-md text-emerald-300"
                    >
                      {fac}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Quick zone selector switcher */}
            <div className="mt-8 pt-4 border-t border-stone-800">
              <span className="text-[11px] uppercase tracking-wider text-stone-500 block mb-2 font-medium">
                Pilih Tata Ruang Zona Lainnya:
              </span>
              <div className="grid grid-cols-3 gap-1.5 text-xs">
                {PARK_ZONES.map((z) => (
                  <button
                    key={z.id}
                    onClick={() => {
                      setSelectedZone(z);
                    }}
                    className={`p-2 rounded-lg text-left transition-colors font-mono cursor-pointer ${
                      selectedZone.id === z.id
                        ? 'bg-emerald-900/60 text-emerald-200 border border-emerald-700/60 font-semibold'
                        : 'bg-stone-900 text-stone-400 hover:text-stone-200 hover:bg-stone-800 border border-stone-800'
                    }`}
                  >
                    <span className="block font-bold">{z.code}</span>
                    <span className="block truncate text-[11px] font-sans text-stone-300">
                      {z.name.replace('Zona ', '')}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
