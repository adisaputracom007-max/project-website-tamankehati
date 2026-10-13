import React from 'react';
import { Compass, ArrowRight, ShieldCheck, TreePine, MapPin, ExternalLink, Trees, Map, Navigation } from 'lucide-react';
import { MESUJI_MAPS_URL, NavTabKey } from './Navbar';

interface HeroProps {
  onSelectTab: (tab: NavTabKey) => void;
}

export const Hero: React.FC<HeroProps> = ({ onSelectTab }) => {
  return (
    <section className="relative bg-stone-900 text-stone-100 overflow-hidden">
      {/* Background Hero Image with measured scrim */}
      <div className="absolute inset-0 z-0">
        <img
          src="/src/assets/images/hero_wildlife_park_1791856687463.jpg"
          alt="Lanskap Taman Kehati Kabupaten Mesuji dengan kanopi pepohonan hijau dan danau embung air alami"
          className="w-full h-full object-cover object-center scale-105 transition-transform duration-1000"
          referrerPolicy="no-referrer"
        />
        {/* Measured scrim according to Rule 1.F: 4.5:1 text contrast */}
        <div className="absolute inset-0 bg-gradient-to-r from-stone-950/90 via-stone-950/75 to-stone-950/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-transparent to-stone-950/30" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-20 lg:pt-24 lg:pb-28">
        <div className="max-w-3xl">
          {/* Unboxed natural editorial subtitle */}
          <div className="flex items-center gap-2 text-xs md:text-sm text-emerald-400 font-medium tracking-wide mb-4">
            <span>Taman Keanekaragaman Hayati (Kehati)</span>
            <span aria-hidden="true">·</span>
            <span>Kabupaten Mesuji, Lampung</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.15] mb-6 [text-wrap:balance]">
            Konservasi Flora & Fauna Alami di Bumi Ragab Begawe Caram
          </h1>

          <p className="text-base sm:text-lg text-stone-300 leading-relaxed mb-8 max-w-2xl font-normal">
            Kawasan konservasi alam seluas kurang lebih 10 hektar yang memadukan perlindungan keanekaragaman hayati lokal, embung penampungan air tawar, penangkaran flora endemik, dan ruang rekreasi publik asri terpadu Kabupaten Mesuji.
          </p>

          {/* Action Buttons: Direct Google Maps & Explore Catalog */}
          <div className="flex flex-wrap items-center gap-4 mb-8">
            <button
              onClick={() => onSelectTab('satwa')}
              className="px-6 py-3.5 text-sm sm:text-base font-semibold text-white bg-emerald-700 hover:bg-emerald-600 rounded-lg shadow-lg hover:shadow-emerald-900/40 transition-all flex items-center gap-2 active:scale-[0.98] cursor-pointer"
            >
              <Compass className="w-5 h-5 text-emerald-200" />
              <span>Buka Menu Koleksi Satwa</span>
              <ArrowRight className="w-4 h-4 text-emerald-200" />
            </button>

            <a
              href={MESUJI_MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-3.5 text-sm sm:text-base font-medium text-stone-200 hover:text-white bg-white/10 hover:bg-white/15 backdrop-blur-sm border border-white/20 rounded-lg transition-all flex items-center gap-2 active:scale-[0.98]"
            >
              <MapPin className="w-5 h-5 text-emerald-300" />
              <span>Titik Lokasi Google Maps</span>
              <ExternalLink className="w-4 h-4 text-emerald-300" />
            </a>
          </div>

          {/* Quick Menu Picker Pills */}
          <div className="pt-4 border-t border-white/10">
            <span className="text-xs uppercase tracking-wider font-semibold text-emerald-400 block mb-3">
              Pilih Menu Konten Mandiri:
            </span>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => onSelectTab('satwa')}
                className="px-3.5 py-1.5 text-xs font-semibold rounded-lg bg-stone-800/80 hover:bg-stone-700 text-stone-200 hover:text-white border border-stone-700/60 transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <Compass className="w-3.5 h-3.5 text-emerald-400" />
                <span>Koleksi Satwa</span>
              </button>
              <button
                onClick={() => onSelectTab('fasilitas')}
                className="px-3.5 py-1.5 text-xs font-semibold rounded-lg bg-stone-800/80 hover:bg-stone-700 text-stone-200 hover:text-white border border-stone-700/60 transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <Trees className="w-3.5 h-3.5 text-emerald-400" />
                <span>Fasilitas Wisata</span>
              </button>
              <button
                onClick={() => onSelectTab('peta')}
                className="px-3.5 py-1.5 text-xs font-semibold rounded-lg bg-stone-800/80 hover:bg-stone-700 text-stone-200 hover:text-white border border-stone-700/60 transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <Map className="w-3.5 h-3.5 text-emerald-400" />
                <span>Peta Kawasan (±10 Ha)</span>
              </button>
              <button
                onClick={() => onSelectTab('panduan')}
                className="px-3.5 py-1.5 text-xs font-semibold rounded-lg bg-stone-800/80 hover:bg-stone-700 text-stone-200 hover:text-white border border-stone-700/60 transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <Navigation className="w-3.5 h-3.5 text-emerald-400" />
                <span>Lokasi & Panduan</span>
              </button>
            </div>
          </div>

          {/* Location & Trust markers */}
          <div className="mt-8 pt-4 flex flex-wrap items-center gap-x-6 gap-y-3 text-xs text-stone-400">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Dinas Lingkungan Hidup Kab. Mesuji</span>
            </div>
            <span className="text-stone-600 hidden sm:inline">·</span>
            <div className="flex items-center gap-2">
              <TreePine className="w-4 h-4 text-emerald-400" />
              <span>Luas Area: Kurang Lebih 10 Hektar</span>
            </div>
            <span className="text-stone-600 hidden sm:inline">·</span>
            <a
              href={MESUJI_MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-emerald-300 hover:underline"
            >
              <MapPin className="w-4 h-4 text-emerald-400" />
              <span>Titik Koordinat: -3.9531075, 105.3248656</span>
            </a>
          </div>
        </div>
      </div>

      {/* KPI Proof Strip */}
      <div className="relative z-10 border-t border-stone-800 bg-stone-950/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 divide-y md:divide-y-0 md:divide-x divide-stone-800">
            <div className="pt-2 md:pt-0">
              <p className="text-2xl sm:text-3xl font-extrabold text-white font-mono tabular-nums">±10 Ha</p>
              <p className="text-xs text-stone-400 mt-1">Luas Kawasan Konservasi</p>
            </div>
            <div className="pt-2 md:pt-0 md:pl-6">
              <p className="text-2xl sm:text-3xl font-extrabold text-white font-mono tabular-nums">Mesuji</p>
              <p className="text-xs text-stone-400 mt-1">Provinsi Lampung, Indonesia</p>
            </div>
            <div className="pt-2 md:pt-0 md:pl-6">
              <p className="text-2xl sm:text-3xl font-extrabold text-white font-mono tabular-nums">Embung Air</p>
              <p className="text-xs text-stone-400 mt-1">Wahana Rekreasi & Resapan</p>
            </div>
            <div className="pt-2 md:pt-0 md:pl-6">
              <p className="text-2xl sm:text-3xl font-extrabold text-emerald-400 font-mono tabular-nums">100%</p>
              <p className="text-xs text-stone-400 mt-1">Terbuka untuk Wisata & Edukasi</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
