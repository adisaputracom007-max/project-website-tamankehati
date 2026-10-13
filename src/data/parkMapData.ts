export interface ParkZone {
  id: string;
  name: string;
  code: string;
  badge: string;
  color: string;
  bgColor: string;
  textColor: string;
  description: string;
  highlights: string[];
  animalsIncluded: string[];
  facilitiesIncluded: string[];
  recommendedDuration: string;
  coordinates: { x: number; y: number }; // Percentage for interactive map pin overlay
}

// 6 Zona Tata Ruang Kawasan Taman Kehati Kabupaten Mesuji (Luas ±10 Hektar)
export const PARK_ZONES: ParkZone[] = [
  {
    id: 'zona-embung-air-kehati',
    name: 'Zona Embung Air & Wisata Tirta',
    code: 'Z-01',
    badge: 'Ikon Utama Embung Kehati',
    color: '#0284c7',
    bgColor: 'bg-sky-50 border-sky-200',
    textColor: 'text-sky-800',
    description: 'Danau embung air tawar di tengah kawasan yang berfungsi sebagai resapan air tanah, habitat fauna perairan, serta wahana rekreasi perahu dan sepeda air bebek.',
    highlights: ['Dermaga Kayu & Perahu Bebek Air', 'Embung Penampungan Air Tawar', 'Tepian Danau Berpagar Pengaman'],
    animalsIncluded: ['Ikan Belida Sumatera', 'Ikan Gurame & Nila', 'Burung Pecuk Padi Rawa'],
    facilitiesIncluded: ['Dermaga Wisata Air', 'Shelter Santai Tepi Embung', 'Spot Foto Panorama'],
    recommendedDuration: '45 Menit',
    coordinates: { x: 50, y: 45 }
  },
  {
    id: 'zona-penangkaran-rusa',
    name: 'Zona Penangkaran Rusa & Fauna Lokal',
    code: 'Z-02',
    badge: 'Konservasi Satwa Ex-Situ',
    color: '#059669',
    bgColor: 'bg-emerald-50 border-emerald-200',
    textColor: 'text-emerald-800',
    description: 'Padang rumput berpagar alami tempat pemeliharaan dan penangkaran Rusa Sambar serta satwa darat lokal yang dilindungi di Kabupaten Mesuji.',
    highlights: ['Padang Gembala Rumput Gajah', 'Anjungan Observasi Pakan Rusa', 'Kandang Pemulihan Satwa'],
    animalsIncluded: ['Rusa Sambar', 'Unggas Rawa Liar', 'Kelinci Domestik'],
    facilitiesIncluded: ['Pos Jaga Petugas Ranger', 'Pondok Pakan Satwa', 'Pagar Pengaman Edukasi'],
    recommendedDuration: '30 Menit',
    coordinates: { x: 30, y: 30 }
  },
  {
    id: 'zona-kebun-bibit-endemik',
    name: 'Zona Hutan Koleksi & Pembibitan Pohon Endemik',
    code: 'Z-03',
    badge: 'Keanekaragaman Hayati Flora',
    color: '#16a34a',
    bgColor: 'bg-green-50 border-green-200',
    textColor: 'text-green-800',
    description: 'Area arboretum dan pembibitan pohon hutan dataran rendah Sumatera seperti Jelutung, Meranti, Gaharu, serta tanaman buah langka lokal Mesuji.',
    highlights: ['Kebun Bibit Pohon Endemik', 'Jalur Papan Edukasi Botani', 'Pohon Jelutung & Ramin Langka'],
    animalsIncluded: ['Kupu-kupu Tropis', 'Burung Kutilang & Perkutut', 'Capung Air Rawa'],
    facilitiesIncluded: ['Rumah Pembibitan (Nursery)', 'Plang Informasi Taksonomi', 'Jalur Teduh Kanopi'],
    recommendedDuration: '40 Menit',
    coordinates: { x: 75, y: 35 }
  },
  {
    id: 'zona-edukasi-lingkungan',
    name: 'Zona Gedung Edukasi & Informasi DLH',
    code: 'Z-04',
    badge: 'Pusat Edukasi Lingkungan',
    color: '#7c3aed',
    bgColor: 'bg-purple-50 border-purple-200',
    textColor: 'text-purple-800',
    description: 'Gedung pusat riset dan informasi Dinas Lingkungan Hidup Kabupaten Mesuji untuk kegiatan studi lingkungan, seminar alam, dan edukasi pelajar.',
    highlights: ['Galeri Informasi Kehati Mesuji', 'Aula Pertemuan Studi Wisata', 'Laboratorium Uji Air & Tanah'],
    animalsIncluded: ['Spesimen Herbarium & Awetan Biologi'],
    facilitiesIncluded: ['Gedung Edukasi Ber-AC', 'Ruang Laktasi & Medis', 'Toilet Bersih'],
    recommendedDuration: '30 Menit',
    coordinates: { x: 68, y: 70 }
  },
  {
    id: 'zona-gazebo-taman-bunga',
    name: 'Zona Gazebo Keluarga & Taman Rekreasi',
    code: 'Z-05',
    badge: 'Ruang Terbuka Hijau Publik',
    color: '#ea580c',
    bgColor: 'bg-orange-50 border-orange-200',
    textColor: 'text-orange-800',
    description: 'Hamparan taman rumput hijau asri dilengkapi deretan gazebo kayu beratap sirap, taman bunga warna-warni, dan arena bermain anak ramah keluarga.',
    highlights: ['Deretan Gazebo Santai Keluarga', 'Taman Bunga Asri', 'Area Bermain Anak (Playground)'],
    animalsIncluded: ['Burung Madu Kelapa', 'Kupu-kupu Bunga'],
    facilitiesIncluded: ['Kantin Kuliner Lokal', 'Tempat Cuci Tangan', 'Tong Sampah Terpilah'],
    recommendedDuration: '45 Menit',
    coordinates: { x: 35, y: 65 }
  },
  {
    id: 'zona-gerbang-parkir',
    name: 'Zona Gerbang Utama, Parkir & Mushola',
    code: 'Z-00',
    badge: 'Akses Utama & Fasilitas Ibadah',
    color: '#475569',
    bgColor: 'bg-slate-50 border-slate-200',
    textColor: 'text-slate-800',
    description: 'Pintu gerbang masuk terpadu, area parkir roda dua dan roda empat yang luas, mushola nyaman, serta pos keamanan penjaga.',
    highlights: ['Gapura Khas Kabupaten Mesuji', 'Area Parkir Kendaraan Luas', 'Mushola Asri Wudhu Mengalir'],
    animalsIncluded: ['Pohon Peneduh Trembesi & Angsana'],
    facilitiesIncluded: ['Mushola Taman Kehati', 'Pos Keamanan', 'Lahan Parkir Luas'],
    recommendedDuration: '15 Menit',
    coordinates: { x: 50, y: 88 }
  }
];

export const SCHEDULE_SHOWS = [
  {
    id: 's-1',
    time: '08:30 WIB',
    title: 'Sesi Edukasi & Pemberian Pakan Rusa Sambar',
    location: 'Kandang Padang Gembala Rusa (Zona Z-02)',
    category: 'Edukasi Satwa',
    duration: '30 Menit',
    description: 'Pengunjung dapat melihat proses pemberian rumput gajah segar dan pakan konsentrat bagi kawanan rusa sambar binaan.'
  },
  {
    id: 's-2',
    time: '09:30 WIB',
    title: 'Pengenalan Koleksi Flora & Tanaman Endemik',
    location: 'Zona Pembibitan Pohon (Zona Z-03)',
    category: 'Edukasi Lingkungan',
    duration: '45 Menit',
    description: 'Panduan langsung oleh staf konservasi DLH Mesuji mengenai cara pembibitan pohon Jelutung dan tanaman kayu langka Sumatera.'
  },
  {
    id: 's-3',
    time: '11:00 WIB',
    title: 'Pemberian Pakan Ikan & Pemeliharaan Embung',
    location: 'Dermaga Danau Embung Kehati (Zona Z-01)',
    category: 'Konservasi Perairan',
    duration: '25 Menit',
    description: 'Pengamatan keragaman ikan air tawar di embung dan sesi memberi makan pelet ikan ramah lingkungan.'
  },
  {
    id: 's-4',
    time: '14:30 WIB',
    title: 'Tur Panduan Konservasi Kehati untuk Pelajar & Komunitas',
    location: 'Gedung Edukasi Lingkungan (Zona Z-04)',
    category: 'Edukasi Lingkungan',
    duration: '40 Menit',
    description: 'Penyampaian materi konservasi lahan basah dan keanekaragaman hayati Mesuji di ruang audio visual.'
  },
  {
    id: 's-5',
    time: '16:00 WIB',
    title: 'Sesi Santai Sore & Rekreasi Air Keluarga',
    location: 'Plaza Gazebo & Dermaga Perahu (Zona Z-01 & Z-05)',
    category: 'Rekreasi Publik',
    duration: '60 Menit',
    description: 'Waktu terbaik menikmati keindahan matahari terbenam di atas embung air tawar sambil bersantai di gazebo.'
  }
];
