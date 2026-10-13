import React, { useState, useEffect } from 'react';
import { DomainBanner } from './components/DomainBanner';
import { Navbar, NavTabKey } from './components/Navbar';
import { Hero } from './components/Hero';
import { BerandaMenuGrid } from './components/BerandaMenuGrid';
import { MenuTabBar, MenuBottomSwitcher } from './components/MenuTabBar';
import { AnimalCatalog } from './components/AnimalCatalog';
import { FacilitySection } from './components/FacilitySection';
import { ParkMapExplorer } from './components/ParkMapExplorer';
import { ScheduleSection } from './components/ScheduleSection';
import { VisitorGuide } from './components/VisitorGuide';
import { Footer } from './components/Footer';
import { DomainModal } from './components/DomainModal';

export default function App() {
  const [isDomainModalOpen, setIsDomainModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<NavTabKey>(() => {
    if (typeof window !== 'undefined') {
      const hash = window.location.hash.replace('#', '').toLowerCase();
      if (['satwa', 'fasilitas', 'peta', 'jadwal', 'panduan', 'beranda'].includes(hash)) {
        return hash as NavTabKey;
      }
    }
    return 'beranda';
  });

  // Listen to browser hash changes (support back / forward buttons)
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '').toLowerCase();
      if (['satwa', 'fasilitas', 'peta', 'jadwal', 'panduan', 'beranda'].includes(hash)) {
        setActiveTab(hash as NavTabKey);
      } else if (!hash) {
        setActiveTab('beranda');
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleSelectTab = (tab: NavTabKey) => {
    setActiveTab(tab);
    if (tab === 'beranda') {
      // Remove hash from URL without reloading
      if (window.location.hash) {
        history.pushState('', document.title, window.location.pathname + window.location.search);
      }
    } else {
      window.location.hash = tab;
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenDomainModal = () => {
    setIsDomainModalOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-stone-50 text-stone-900 selection:bg-emerald-900 selection:text-white">
      {/* 1. Official Live Domain Banner */}
      <DomainBanner onOpenDomainDetails={handleOpenDomainModal} />

      {/* 2. Top Bar Navigation with separated menu tabs */}
      <Navbar activeTab={activeTab} onSelectTab={handleSelectTab} />

      {/* 3. Main Content Flow - Separated by Menu */}
      <main className="flex-1">
        {/* Menu Tab Bar for non-beranda views (Breadcrumb & direct menu jump) */}
        <MenuTabBar activeTab={activeTab} onSelectTab={handleSelectTab} />

        {/* View 1: Beranda Utama (Overview & Menu Navigator Grid) */}
        {activeTab === 'beranda' && (
          <>
            <Hero onSelectTab={handleSelectTab} />
            <BerandaMenuGrid onSelectTab={handleSelectTab} />
          </>
        )}

        {/* View 2: Menu Koleksi Satwa (Halaman Terpisah) */}
        {activeTab === 'satwa' && (
          <div className="min-h-[60vh]">
            <AnimalCatalog />
          </div>
        )}

        {/* View 3: Menu Fasilitas Wisata (Halaman Terpisah) */}
        {activeTab === 'fasilitas' && (
          <div className="min-h-[60vh]">
            <FacilitySection />
          </div>
        )}

        {/* View 4: Menu Peta Kawasan ±10 Ha (Halaman Terpisah) */}
        {activeTab === 'peta' && (
          <div className="min-h-[60vh]">
            <ParkMapExplorer />
          </div>
        )}

        {/* View 5: Menu Jadwal Aktivitas (Halaman Terpisah) */}
        {activeTab === 'jadwal' && (
          <div className="min-h-[60vh]">
            <ScheduleSection />
          </div>
        )}

        {/* View 6: Menu Lokasi & Panduan (Halaman Terpisah) */}
        {activeTab === 'panduan' && (
          <div className="min-h-[60vh]">
            <VisitorGuide />
          </div>
        )}

        {/* Bottom Switcher to seamlessly browse other menus */}
        <MenuBottomSwitcher activeTab={activeTab} onSelectTab={handleSelectTab} />
      </main>

      {/* 4. Quiet Editorial Footer */}
      <Footer onOpenDomainDetails={handleOpenDomainModal} onSelectTab={handleSelectTab} />

      {/* Active Domain Verification Modal */}
      <DomainModal
        isOpen={isDomainModalOpen}
        onClose={() => setIsDomainModalOpen(false)}
      />
    </div>
  );
}
