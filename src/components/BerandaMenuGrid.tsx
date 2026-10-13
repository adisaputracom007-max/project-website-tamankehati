import React from 'react';
import { Compass, Trees, Map, Navigation, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { NavTabKey } from './Navbar';

interface BerandaMenuGridProps {
  onSelectTab: (tab: NavTabKey) => void;
}

export const BerandaMenuGrid: React.FC<BerandaMenuGridProps> = ({ onSelectTab }) => {
  const menuCards = [
    {
      id: 'satwa' as NavTabKey,
      title: 'Koleksi Satwa & Flora',
      tag: 'Katalog Konservasi',
      description:
        'Eksplorasi satwa dilindungi dan tanaman endemik Sumatera. Dilengkapi fitur penambahan data satwa mandiri, status konservasi IUCN, dan waktu makan satwa.',
      icon: Compass,
      accentBg: 'bg-emerald-50 text-emerald-800 border-emerald-200',
      badgeColor: 'bg-emerald-100 text-emerald-800',
      buttonText: 'Buka Koleksi Satwa',
      features: ['Katalog Satwa Mandiri', 'Status Perlindungan', 'Info Pakan & Habitat']
    },
    {
      id: 'fasilitas' as NavTabKey,
      title: 'Fasilitas Wisata & Rekreasi',
      tag: 'Wahana & Sarana',
      description:
        'Informasi wahana air embung, gazebo santai, taman bermain anak, mushola, toilet bersih, dan kantin lokal. Tersedia form penambahan fasilitas mandiri.',
      icon: Trees,
      accentBg: 'bg-teal-50 text-teal-800 border-teal-200',
      badgeColor: 'bg-teal-100 text-teal-800',
      buttonText: 'Buka Fasilitas Wisata',
      features: ['Wahana Air Embung', 'Gazebo & Rest Area', 'Akses Ramah Difabel']
    },
    {
      id: 'peta' as NavTabKey,
      title: 'Peta Kawasan (±10 Ha)',
      tag: 'Citra Satelit & Zonasi',
      description:
        'Peta tata ruang riil kawasan seluas kurang lebih 10 hektar. Tinjau citra satelit Google Maps terintegrasi, koordinat GPS, dan 6 pembagian zona utama.',
      icon: Map,
      accentBg: 'bg-cyan-50 text-cyan-800 border-cyan-200',
      badgeColor: 'bg-cyan-100 text-cyan-800',
      buttonText: 'Buka Peta Kawasan',
      features: ['Citra Satelit Google Maps', 'Titik Koordinat Akurat', 'Navigasi 6 Zona']
    },
    {
      id: 'panduan' as NavTabKey,
      title: 'Lokasi & Panduan Kunjungan',
      tag: 'Rute & Info Wisatawan',
      description:
        'Petunjuk arah dari Gerbang Tol Simpang Pematang, tips berkunjung, peraturan konservasi keanekaragaman hayati, FAQ umum, dan ulasan pengunjung.',
      icon: Navigation,
      accentBg: 'bg-stone-100 text-stone-800 border-stone-300',
      badgeColor: 'bg-stone-200 text-stone-800',
      buttonText: 'Buka Lokasi & Panduan',
      features: ['Akses Tol JTTS Lampung', 'Aturan Konservasi', 'Pertanyaan Umum (FAQ)']
    }
  ];

  return (
    <section className="py-16 sm:py-20 bg-stone-100/60 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-800 mb-2">
            <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
            <span>Navigasi Menu Terpisah Taman Kehati</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-stone-900 tracking-tight">
            Pilih Halaman Menu yang Ingin Dilihat
          </h2>
          <p className="mt-3 text-stone-600 text-sm sm:text-base leading-relaxed">
            Seluruh konten telah dipisahkan menjadi halaman mandiri agar memudahkan pengunjung mencari informasi satwa, fasilitas, peta kawasan, atau panduan rute.
          </p>
        </div>

        {/* 4 Separated Content Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {menuCards.map((card) => {
            const Icon = card.icon;
            return (
              <div
                key={card.id}
                className="flex flex-col justify-between bg-white rounded-2xl p-6 sm:p-7 border border-stone-200/90 shadow-sm hover:shadow-md transition-all group"
              >
                <div>
                  {/* Top Bar of card */}
                  <div className="flex items-center justify-between mb-5">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${card.accentBg} border`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className={`text-[11px] font-bold px-2.5 py-1 rounded-md ${card.badgeColor}`}>
                      {card.tag}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-stone-900 group-hover:text-emerald-900 transition-colors mb-2.5">
                    {card.title}
                  </h3>

                  <p className="text-stone-600 text-xs sm:text-sm leading-relaxed mb-5">
                    {card.description}
                  </p>

                  {/* Bullet features */}
                  <div className="space-y-1.5 pt-3 border-t border-stone-100 mb-6">
                    {card.features.map((feat, fidx) => (
                      <div key={fidx} className="flex items-center gap-2 text-xs text-stone-600 font-medium">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Direct Action Button */}
                <button
                  onClick={() => onSelectTab(card.id)}
                  className="w-full py-3 px-4 rounded-xl font-semibold text-sm text-white bg-emerald-900 hover:bg-emerald-850 group-hover:bg-emerald-800 transition-colors flex items-center justify-center gap-2 shadow-xs cursor-pointer active:scale-[0.99]"
                >
                  <span>{card.buttonText}</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            );
          })}
        </div>

        {/* Info callout on bottom */}
        <div className="mt-12 bg-emerald-900 text-white rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-md">
          <div className="space-y-1 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2 text-emerald-300 text-xs font-semibold">
              <ShieldCheck className="w-4 h-4" />
              <span>Portal Resmi DLH Kabupaten Mesuji</span>
            </div>
            <h4 className="text-lg sm:text-xl font-bold">
              Kawasan Konservasi Keanekaragaman Hayati Kurang Lebih 10 Hektar
            </h4>
            <p className="text-stone-300 text-xs sm:text-sm max-w-2xl">
              Terletak di Desa Mekar Jaya, Kecamatan Tanjung Raya, Mesuji, Lampung. Dilengkapi embung air penampung alami, penangkaran flora-fauna, dan wahana ramah keluarga.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              onClick={() => onSelectTab('peta')}
              className="px-5 py-2.5 text-xs sm:text-sm font-semibold text-stone-900 bg-white hover:bg-stone-100 rounded-lg transition-colors cursor-pointer"
            >
              Cek Peta & Satelit
            </button>
            <button
              onClick={() => onSelectTab('panduan')}
              className="px-5 py-2.5 text-xs sm:text-sm font-semibold text-emerald-100 hover:text-white bg-emerald-800 hover:bg-emerald-700 rounded-lg transition-colors cursor-pointer border border-emerald-700"
            >
              Panduan Rute Jalan
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
