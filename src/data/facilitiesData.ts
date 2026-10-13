export interface Facility {
  id: string;
  name: string;
  category: 'Wahana & Rekreasi' | 'Edukasi Lingkungan' | 'Kuliner' | 'Ibadah' | 'Fasilitas Umum & Medis';
  badge: string;
  image?: string;
  tagline: string;
  description: string;
  hours: string;
  location: string;
  features: string[];
  wheelchairAccessible: boolean;
}

// Daftar fasilitas awal dikosongkan agar bisa diisi secara manual
export const FACILITIES_DATA: Facility[] = [];

// Template opsional fasilitas Taman Kehati Kabupaten Mesuji (luas ±10 Ha)
export const PRESET_SAMPLE_MESUJI_FACILITIES: Facility[] = [
  {
    id: 'embung-air-kehati',
    name: 'Embung & Danau Wisata Air Kehati',
    category: 'Wahana & Rekreasi',
    badge: 'Ikon Utama',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
    tagline: 'Wahana air tawar dan danau rekreasi keluarga di pusat Taman Kehati',
    description: 'Embung buatan seluas 2 hektar yang berfungsi sebagai daerah resapan air, habitat ikan air tawar, serta sarana rekreasi perahu kayuh dan bebek air bagi pengunjung.',
    hours: '08:00 - 17:00 WIB',
    location: 'Sektor Tengah Kawasan Kehati',
    features: ['Wahana Perahu Bebek Air', 'Tepian Danau Berpagar Pengaman', 'Spot Foto Dermaga Kayu', 'Tempat Pemancingan Terkendali'],
    wheelchairAccessible: true
  },
  {
    id: 'gedung-edukasi-kehati',
    name: 'Pusat Informasi & Edukasi Lingkungan',
    category: 'Edukasi Lingkungan',
    badge: 'Sarana Edukasi',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80',
    tagline: 'Ruang pembelajaran keanekaragaman hayati dan pembibitan pohon endemik',
    description: 'Pusat edukasi yang memamerkan informasi jenis flora endemik Mesuji, konservasi tanah dan air, serta aula pertemuan untuk studi wisata sekolah dan komunitas.',
    hours: '08:30 - 16:00 WIB',
    location: 'Dekat Gerbang Masuk Utama',
    features: ['Galeri Herbarium & Bibit Pohon', 'Ruang Audio Visual Ber-AC', 'Pemandu Edukasi DLH Mesuji', 'Brosur & Panduan Flora'],
    wheelchairAccessible: true
  },
  {
    id: 'kantin-kuliner-kehati',
    name: 'Pusat Kuliner & Kantin Wisata Mesuji',
    category: 'Kuliner',
    badge: 'Kuliner Lokal',
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80',
    tagline: 'Aneka kuliner khas Mesuji dan aneka jajanan segar ramah keluarga',
    description: 'Deretan gerai kuliner UMKM lokal yang menyajikan makanan khas Sumatera dan nusantara, es kelapa muda segar, dan minuman pelepas dahaga dengan area santai beratap sejuk.',
    hours: '08:00 - 17:00 WIB',
    location: 'Plaza Kuliner Sisi Timur',
    features: ['Menu Tradisional & Minuman Dingin', 'Tempat Duduk Bersih & Teduh', 'Harga Terjangkau Standar Pemkab', 'Tempat Cuci Tangan Tersedia'],
    wheelchairAccessible: true
  },
  {
    id: 'mushola-kehati-mesuji',
    name: 'Mushola Taman Kehati',
    category: 'Ibadah',
    badge: 'Sarana Ibadah',
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=80',
    tagline: 'Tempat ibadah nyaman, bersih dan asri di tengah rindang pepohonan',
    description: 'Fasilitas mushola yang nyaman dilengkapi dengan tempat wudhu bersih terpisah, perlengkapan sholat terawat, dan ventilasi udara alami yang sejuk.',
    hours: '05:00 - 18:00 WIB',
    location: 'Dekat Area Gazebo Utama',
    features: ['Tempat Wudhu Air Bersih Mengalir', 'Mukena & Sajadah Bersih', 'Loker Alas Kaki', 'Ruang Terpisah Pria & Wanita'],
    wheelchairAccessible: true
  },
  {
    id: 'pos-kesehatan-informasi',
    name: 'Pos Pelayanan Medis & Informasi Pengunjung',
    category: 'Fasilitas Umum & Medis',
    badge: 'Layanan Publik',
    image: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=800&q=80',
    tagline: 'Layanan bantuan pertama, ruang informasi, dan toilet umum ramah difabel',
    description: 'Pos siaga petugas keamanan dan pertolongan pertama (P3K) siap membantu kebutuhan pengunjung, kehilangan barang, serta informasi seputar kawasan wisata.',
    hours: '08:00 - 17:00 WIB',
    location: 'Pintu Gerbang Utama & Kantor Pengelola',
    features: ['Kotak P3K & Petugas Siaga', 'Pusat Informasi & Pengaduan', 'Toilet Difabel & Laktasi', 'Area Parkir Luas'],
    wheelchairAccessible: true
  }
];
