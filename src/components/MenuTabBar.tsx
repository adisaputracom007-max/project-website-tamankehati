import React from 'react';
import { ChevronRight, Home, Compass, Trees, Map, Calendar, Navigation, ArrowLeft, ArrowRight } from 'lucide-react';
import { NavTabKey, NAV_ITEMS } from './Navbar';

interface MenuTabBarProps {
  activeTab: NavTabKey;
  onSelectTab: (tab: NavTabKey) => void;
}

const TAB_METADATA: Record<
  NavTabKey,
  {
    title: string;
    subtitle: string;
    badge: string;
    icon: React.ComponentType<{ className?: string }>;
  }
> = {
  beranda: {
    title: 'Beranda Utama',
    subtitle: 'Portal Resmi Wisata & Konservasi Taman Kehati Kabupaten Mesuji (±10 Hektar)',
    badge: 'Beranda',
    icon: Home,
  },
  satwa: {
    title: 'Koleksi Satwa & Flora Kehati',
    subtitle: 'Katalog perlindungan satwa lokal, tanaman endemik Sumatera, dan pencatatan data mandiri.',
    badge: 'Konservasi Satwa',
    icon: Compass,
  },
  fasilitas: {
    title: 'Fasilitas Wisata & Sarana Rekreasi',
    subtitle: 'Wahana air embung, gazebo peristirahatan, taman bermain anak, mushola, dan sarana publik.',
    badge: 'Fasilitas Alam',
    icon: Trees,
  },
  peta: {
    title: 'Peta Kawasan Taman Kehati (±10 Ha)',
    subtitle: 'Tata ruang zonasi kawasan terintegrasi Google Maps citra satelit dan koordinat presisi.',
    badge: 'Zonasi & Satelit',
    icon: Map,
  },
  jadwal: {
    title: 'Jadwal Aktivitas & Sesi Edukasi',
    subtitle: 'Agenda harian feeding time satwa, penangkaran flora, dan pemanduan edukasi lingkungan.',
    badge: 'Agenda Harian',
    icon: Calendar,
  },
  panduan: {
    title: 'Lokasi, Akses Rute & Panduan Kunjungan',
    subtitle: 'Petunjuk rute Tol Simpang Pematang, etika kunjungan konservasi, tanya jawab, dan ulasan.',
    badge: 'Panduan Wisata',
    icon: Navigation,
  },
};

export const MenuTabBar: React.FC<MenuTabBarProps> = ({ activeTab, onSelectTab }) => {
  if (activeTab === 'beranda') return null;

  const currentMeta = TAB_METADATA[activeTab];
  const CurrentIcon = currentMeta.icon;

  // Filter only the 5 main content tabs for the pill switcher
  const subMenuTabs = NAV_ITEMS.filter((item) => item.id !== 'beranda');

  // Find previous and next tabs
  const currentIndex = subMenuTabs.findIndex((t) => t.id === activeTab);
  const prevTab = currentIndex > 0 ? subMenuTabs[currentIndex - 1] : null;
  const nextTab = currentIndex < subMenuTabs.length - 1 ? subMenuTabs[currentIndex + 1] : null;

  return (
    <div className="bg-white border-b border-stone-200">
      {/* Top Header & Breadcrumb Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs text-stone-500" aria-label="Breadcrumb">
            <button
              onClick={() => onSelectTab('beranda')}
              className="flex items-center gap-1 font-medium hover:text-emerald-900 transition-colors cursor-pointer"
            >
              <Home className="w-3.5 h-3.5" />
              <span>Beranda</span>
            </button>
            <ChevronRight className="w-3.5 h-3.5 text-stone-400" />
            <span className="font-semibold text-emerald-950 flex items-center gap-1.5">
              <CurrentIcon className="w-3.5 h-3.5 text-emerald-700" />
              <span>{currentMeta.title}</span>
            </span>
          </nav>

          {/* Action: Kembali ke Beranda */}
          <button
            onClick={() => onSelectTab('beranda')}
            className="self-start sm:self-auto px-3 py-1.5 text-xs font-semibold text-stone-600 hover:text-stone-900 bg-stone-100 hover:bg-stone-200 rounded-md transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Kembali ke Beranda Utama</span>
          </button>
        </div>

        {/* Dedicated Section Page Hero Banner */}
        <div className="mt-4 pt-4 border-t border-stone-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-md mb-2">
              <CurrentIcon className="w-3.5 h-3.5 text-emerald-700" />
              <span>Halaman Terpisah: {currentMeta.badge}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
              {currentMeta.title}
            </h1>
            <p className="text-stone-600 text-xs sm:text-sm mt-1 max-w-2xl">
              {currentMeta.subtitle}
            </p>
          </div>

          {/* Next / Prev quick jump */}
          <div className="flex items-center gap-2 shrink-0 self-start md:self-auto">
            {prevTab && (
              <button
                onClick={() => onSelectTab(prevTab.id)}
                className="px-3 py-2 text-xs font-medium text-stone-700 hover:text-stone-900 bg-stone-50 hover:bg-stone-100 border border-stone-200 rounded-lg transition-colors flex items-center gap-1 cursor-pointer"
                title={`Ke menu: ${prevTab.name}`}
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Sebelumnya:</span> {prevTab.shortName}
              </button>
            )}
            {nextTab && (
              <button
                onClick={() => onSelectTab(nextTab.id)}
                className="px-3 py-2 text-xs font-semibold text-white bg-emerald-900 hover:bg-emerald-800 rounded-lg transition-colors flex items-center gap-1 cursor-pointer shadow-xs"
                title={`Ke menu: ${nextTab.name}`}
              >
                <span className="hidden sm:inline">Selanjutnya:</span> {nextTab.shortName}
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Tab Navigation Switcher Bar */}
        <div className="mt-6 pt-3 border-t border-stone-100">
          <div className="text-[11px] font-bold uppercase tracking-wider text-stone-400 mb-2">
            Pindah ke Menu Lain:
          </div>
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {subMenuTabs.map((item) => {
              const TabIcon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onSelectTab(item.id)}
                  className={`px-3 py-2 rounded-lg text-xs font-semibold whitespace-nowrap flex items-center gap-2 transition-all cursor-pointer shrink-0 ${
                    isActive
                      ? 'bg-emerald-900 text-white shadow-xs'
                      : 'bg-stone-100 hover:bg-stone-200 text-stone-700 hover:text-stone-900'
                  }`}
                >
                  <TabIcon className={`w-3.5 h-3.5 ${isActive ? 'text-emerald-300' : 'text-stone-500'}`} />
                  <span>{item.name}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export const MenuBottomSwitcher: React.FC<MenuTabBarProps> = ({ activeTab, onSelectTab }) => {
  if (activeTab === 'beranda') return null;

  const subMenuTabs = NAV_ITEMS.filter((item) => item.id !== 'beranda');

  return (
    <section className="bg-stone-100 border-t border-stone-200 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-stone-200 shadow-xs flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <h3 className="text-lg font-bold text-stone-900">
              Selesai Membaca Halaman Ini?
            </h3>
            <p className="text-stone-600 text-xs sm:text-sm">
              Jelajahi menu informasi Taman Kehati Kabupaten Mesuji lainnya atau kembali ke beranda.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2">
            <button
              onClick={() => onSelectTab('beranda')}
              className="px-4 py-2 text-xs font-semibold text-stone-700 bg-stone-100 hover:bg-stone-200 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Home className="w-3.5 h-3.5" />
              <span>Beranda Utama</span>
            </button>
            {subMenuTabs.map((item) => {
              if (item.id === activeTab) return null;
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => onSelectTab(item.id)}
                  className="px-3.5 py-2 text-xs font-semibold text-emerald-900 hover:text-white bg-emerald-50 hover:bg-emerald-900 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer border border-emerald-200/70"
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{item.shortName}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
