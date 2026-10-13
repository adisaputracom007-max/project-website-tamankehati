import React from 'react';
import { Globe, MapPin, Phone, Mail, ShieldCheck, ExternalLink, Compass, Trees, Map, Calendar, Navigation, Lock } from 'lucide-react';
import { MESUJI_MAPS_URL, NavTabKey } from './Navbar';
import { useAdmin } from '../context/AdminContext';

interface FooterProps {
  onOpenDomainDetails: () => void;
  onSelectTab?: (tab: NavTabKey) => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenDomainDetails, onSelectTab }) => {
  const { isAdmin, openLoginModal } = useAdmin();
  const handleNav = (tab: NavTabKey) => {
    if (onSelectTab) {
      onSelectTab(tab);
    }
  };

  return (
    <footer className="bg-stone-950 text-stone-300 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <button
              onClick={() => handleNav('beranda')}
              className="text-2xl font-extrabold text-white tracking-tight text-left hover:text-emerald-400 transition-colors cursor-pointer"
            >
              Taman Kehati Mesuji
            </button>
            <p className="text-stone-400 text-xs sm:text-sm leading-relaxed max-w-sm">
              Taman Keanekaragaman Hayati (Kehati) Kabupaten Mesuji seluas kurang lebih 10 hektar. Ruang konservasi ex-situ tumbuhan dan satwa lokal khas dataran rendah Lampung, pusat rekreasi alam edukatif, dan paru-paru hijau daerah.
            </p>
            <div className="pt-2 text-xs space-y-1.5 text-stone-400">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Desa Mekar Jaya, Kec. Tanjung Raya, Kabupaten Mesuji, Lampung</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Dinas Lingkungan Hidup Kab. Mesuji: (0726) 775-8000</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>kehati@mesujikab.go.id</span>
              </div>
            </div>
          </div>

          {/* Quick Links Nav - separated menu pages */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Menu Informasi Terpisah
            </h4>
            <ul className="space-y-2.5 text-xs text-stone-400">
              <li>
                <button
                  onClick={() => handleNav('satwa')}
                  className="hover:text-emerald-400 transition-colors flex items-center gap-2 text-left cursor-pointer"
                >
                  <Compass className="w-3.5 h-3.5 text-stone-500" />
                  <span>Koleksi Satwa & Flora</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('fasilitas')}
                  className="hover:text-emerald-400 transition-colors flex items-center gap-2 text-left cursor-pointer"
                >
                  <Trees className="w-3.5 h-3.5 text-stone-500" />
                  <span>Fasilitas Wisata Alam</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('peta')}
                  className="hover:text-emerald-400 transition-colors flex items-center gap-2 text-left cursor-pointer"
                >
                  <Map className="w-3.5 h-3.5 text-stone-500" />
                  <span>Peta Kawasan (±10 Ha)</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('jadwal')}
                  className="hover:text-emerald-400 transition-colors flex items-center gap-2 text-left cursor-pointer"
                >
                  <Calendar className="w-3.5 h-3.5 text-stone-500" />
                  <span>Jadwal Aktivitas & Show</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('panduan')}
                  className="hover:text-emerald-400 transition-colors flex items-center gap-2 text-left cursor-pointer"
                >
                  <Navigation className="w-3.5 h-3.5 text-stone-500" />
                  <span>Lokasi & Panduan Rute</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Program Konservasi */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Konservasi Kehati
            </h4>
            <ul className="space-y-2 text-xs text-stone-400">
              <li>
                <span className="text-stone-300">Penangkaran Rusa Sambar</span>
              </li>
              <li>
                <span className="text-stone-300">Restorasi Ikan Air Tawar DAS Mesuji</span>
              </li>
              <li>
                <span className="text-stone-300">Koleksi Pohon Endemik Sumatera</span>
              </li>
              <li>
                <span className="text-stone-300">Embung Resapan & Rawa Basah</span>
              </li>
              <li>
                <span className="text-stone-300">Edukasi Ekologi Sekolah Lingkungan</span>
              </li>
            </ul>
          </div>

          {/* Lokasi & Layanan Online */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Akses & Navigasi
            </h4>
            <div className="space-y-3 text-xs">
              <a
                href={MESUJI_MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 px-3 bg-emerald-800 hover:bg-emerald-700 text-white font-bold rounded-lg transition-colors text-center flex items-center justify-center gap-1.5"
              >
                <MapPin className="w-3.5 h-3.5 text-emerald-300" />
                <span>Navigasi Google Maps</span>
                <ExternalLink className="w-3.5 h-3.5 text-emerald-300" />
              </a>
              <button
                onClick={onOpenDomainDetails}
                className="w-full py-2 px-3 bg-stone-900 hover:bg-stone-800 border border-stone-800 text-stone-300 rounded-lg transition-colors text-center flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Globe className="w-3.5 h-3.5 text-emerald-400" />
                <span>Info Domain & SSL</span>
              </button>
              <div className="text-[11px] text-stone-500 pt-1">
                Buka Setiap Hari: 08:00 - 17:00 WIB
              </div>
            </div>
          </div>
        </div>

        {/* Legal & Accreditation Notice */}
        <div className="pt-8 border-t border-stone-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            <span>
              Kawasan Konservasi Keanekaragaman Hayati Pemerintah Kabupaten Mesuji, Lampung (±10 Hektar)
            </span>
          </div>

          <div className="text-stone-400">
            © 2026 Taman Kehati Kabupaten Mesuji. Dinas Lingkungan Hidup Kab. Mesuji.
          </div>
        </div>
      </div>
    </footer>
  );
};
