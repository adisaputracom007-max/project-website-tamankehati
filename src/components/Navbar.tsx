import React, { useState } from 'react';
import { Menu, X, MapPin, ExternalLink, Compass, Trees, Map, Calendar, Navigation, Home, Lock, ShieldCheck, LogOut } from 'lucide-react';
import { useAdmin } from '../context/AdminContext';

export const MESUJI_MAPS_URL =
  'https://www.google.com/maps/place/taman+kehati/@-3.9548981,105.3248272,3052m/data=!3m1!1e3!4m8!1m2!10m1!1e1!3m4!1s0x2e3ec117e269a5df:0xab3695620e5706a3!8m2!3d-3.9531075!4d105.3248656?entry=ttu';

export type NavTabKey = 'beranda' | 'satwa' | 'fasilitas' | 'peta' | 'jadwal' | 'panduan';

export interface NavItem {
  id: NavTabKey;
  name: string;
  shortName: string;
  icon: React.ComponentType<{ className?: string }>;
}

export const NAV_ITEMS: NavItem[] = [
  { id: 'beranda', name: 'Beranda', shortName: 'Beranda', icon: Home },
  { id: 'satwa', name: 'Koleksi Satwa', shortName: 'Satwa', icon: Compass },
  { id: 'fasilitas', name: 'Fasilitas Wisata', shortName: 'Fasilitas', icon: Trees },
  { id: 'peta', name: 'Peta Kawasan (±10 Ha)', shortName: 'Peta Kawasan', icon: Map },
  { id: 'jadwal', name: 'Jadwal Aktivitas', shortName: 'Jadwal', icon: Calendar },
  { id: 'panduan', name: 'Lokasi & Panduan', shortName: 'Panduan', icon: Navigation },
];

interface NavbarProps {
  activeTab: NavTabKey;
  onSelectTab: (tab: NavTabKey) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, onSelectTab }) => {
  const { isAdmin, openLoginModal, logout } = useAdmin();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (tabId: NavTabKey) => {
    onSelectTab(tabId);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-stone-200 transition-colors shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4 h-20">
          {/* Zone 1: Single text element wordmark */}
          <button
            onClick={() => handleNavClick('beranda')}
            className="flex items-center gap-2.5 text-left group cursor-pointer focus:outline-none"
          >
            <div className="w-10 h-10 rounded-xl bg-emerald-900 text-white flex items-center justify-center font-bold text-lg shadow-sm group-hover:bg-emerald-800 transition-colors shrink-0">
              TK
            </div>
            <div>
              <span className="block text-lg sm:text-xl font-extrabold tracking-tight text-emerald-950 font-sans leading-tight">
                Taman Kehati Mesuji
              </span>
              <span className="text-[11px] font-medium text-emerald-800/80 block">
                Kabupaten Mesuji, Lampung (±10 Ha)
              </span>
            </div>
          </button>

          {/* Zone 2: 5 clean separated menu tabs */}
          <nav className="hidden lg:flex items-center gap-1.5 text-sm font-medium">
            {NAV_ITEMS.map((link) => {
              const Icon = link.icon;
              const isActive = activeTab === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`px-3.5 py-2 rounded-lg text-sm font-semibold transition-all flex items-center gap-2 cursor-pointer ${
                    isActive
                      ? 'bg-emerald-900 text-white shadow-xs'
                      : 'text-stone-700 hover:text-emerald-900 hover:bg-stone-100'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-emerald-300' : 'text-stone-500'}`} />
                  <span>{link.shortName}</span>
                </button>
              );
            })}
          </nav>

          {/* Medium screen navigation (md: tablet) */}
          <nav className="hidden md:flex lg:hidden items-center gap-1 text-xs font-semibold">
            {NAV_ITEMS.slice(0, 4).map((link) => {
              const isActive = activeTab === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`px-2.5 py-1.5 rounded-md transition-all cursor-pointer ${
                    isActive
                      ? 'bg-emerald-900 text-white'
                      : 'text-stone-700 hover:text-emerald-900 hover:bg-stone-100'
                  }`}
                >
                  {link.shortName}
                </button>
              );
            })}
          </nav>

          {/* Zone 3: Admin Status & Direct Location Map Link */}
          <div className="hidden sm:flex items-center gap-2.5 shrink-0">
            {isAdmin ? (
              <div className="flex items-center gap-1.5 bg-amber-50 border border-amber-300 text-amber-900 px-3 py-1.5 rounded-lg text-xs font-semibold">
                <span className="w-2 h-2 rounded-full bg-amber-600 animate-pulse" />
                <span>Admin DLH</span>
                <button
                  onClick={logout}
                  className="ml-1 p-1 hover:bg-amber-200 rounded text-amber-950 transition-colors cursor-pointer"
                  title="Keluar mode admin"
                >
                  <LogOut className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <button
                onClick={openLoginModal}
                className="px-3 py-2 text-xs font-semibold text-stone-600 hover:text-emerald-900 hover:bg-stone-100 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer border border-stone-200"
                title="Akses pengelola untuk mengisi data"
              >
                <Lock className="w-3.5 h-3.5 text-stone-500" />
                <span>Login Admin</span>
              </button>
            )}

            <a
              href={MESUJI_MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 text-xs sm:text-sm font-semibold text-white bg-emerald-900 hover:bg-emerald-850 rounded-lg shadow-xs transition-all hover:shadow active:scale-[0.98] whitespace-nowrap shrink-0 flex items-center gap-2"
            >
              <MapPin className="w-4 h-4 text-emerald-300" />
              <span>Google Maps</span>
              <ExternalLink className="w-3.5 h-3.5 text-emerald-300" />
            </a>
          </div>

          {/* Mobile menu hamburger toggle */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-stone-700 hover:text-stone-900 hover:bg-stone-100 transition-colors cursor-pointer"
              aria-label="Buka menu navigasi"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-stone-200 bg-white px-4 pt-3 pb-6 space-y-2">
          <p className="text-[11px] font-bold uppercase tracking-wider text-stone-500 px-3 pt-1">
            Menu Informasi Kawasan
          </p>
          <nav className="flex flex-col space-y-1">
            {NAV_ITEMS.map((link) => {
              const Icon = link.icon;
              const isActive = activeTab === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`w-full text-left px-3.5 py-2.5 rounded-lg text-sm font-semibold transition-colors flex items-center justify-between cursor-pointer ${
                    isActive
                      ? 'bg-emerald-900 text-white shadow-xs'
                      : 'text-stone-700 hover:text-emerald-900 hover:bg-stone-50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-emerald-300' : 'text-stone-500'}`} />
                    <span>{link.name}</span>
                  </div>
                  {isActive && (
                    <span className="text-[11px] bg-emerald-800 text-emerald-200 px-2 py-0.5 rounded">
                      Aktif
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
          <div className="pt-3 border-t border-stone-100 space-y-2">
            {isAdmin ? (
              <div className="flex items-center justify-between p-3 bg-amber-50 border border-amber-200 rounded-lg text-xs text-amber-900 font-semibold">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-amber-600 animate-pulse" />
                  <span>Mode Admin Aktif</span>
                </div>
                <button
                  onClick={() => {
                    logout();
                    setMobileMenuOpen(false);
                  }}
                  className="px-2.5 py-1 bg-white border border-amber-300 rounded font-bold hover:bg-amber-100 transition-colors"
                >
                  Keluar Admin
                </button>
              </div>
            ) : (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  openLoginModal();
                }}
                className="w-full py-2.5 px-3 rounded-lg border border-stone-300 text-stone-700 text-xs font-semibold hover:bg-stone-50 transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <Lock className="w-4 h-4 text-stone-500" />
                <span>Akses Pengelola / Login Admin</span>
              </button>
            )}

            <a
              href={MESUJI_MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 text-center text-sm font-semibold text-white bg-emerald-900 rounded-lg shadow-xs flex items-center justify-center gap-2"
            >
              <MapPin className="w-4 h-4 text-emerald-300" />
              <span>Buka Lokasi di Google Maps</span>
              <ExternalLink className="w-4 h-4 text-emerald-300" />
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
