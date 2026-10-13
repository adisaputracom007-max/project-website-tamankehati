export interface TicketPackage {
  id: string;
  name: string;
  tier: string;
  priceWeekday: number;
  priceWeekend: number;
  badge?: string;
  description: string;
  benefits: string[];
  popular?: boolean;
}

export const TICKET_PACKAGES: TicketPackage[] = [
  {
    id: 'ticket-reguler',
    name: 'Tiket Masuk Kehati Reguler',
    tier: 'Pilihan Populer',
    priceWeekday: 20000,
    priceWeekend: 25000,
    badge: 'Tiket Standar',
    description: 'Akses penuh seluruh zona konservasi satwa, embung air tawar, taman bunga, dan jembatan kanopi Kehati Mesuji.',
    benefits: [
      'Akses ke seluruh Zona Konservasi Satwa & Tumbuhan',
      'Keliling jalur pedestrian & jembatan kanopi hutan',
      'Akses ke area embung rekreasi dan gazebo keluarga',
      'Akses ke taman bermain anak dan plaza edukasi',
      'Asuransi pengunjung resmi Pemkab Mesuji'
    ],
    popular: true
  },
  {
    id: 'ticket-all-access',
    name: 'Tiket Safari All-Inclusive + Sky Gondola',
    tier: 'Lengkap & Favorit',
    priceWeekday: 135000,
    priceWeekend: 165000,
    badge: 'Termasuk Kereta Gantung',
    description: 'Paket terlengkap termasuk tiket naik Safari Sky Gondola bolak-balik dan voucher makan di Restoran Savana.',
    benefits: [
      'Semua fasilitas Tiket Safari Reguler',
      'Tiket 2-Arah Safari Sky Gondola (Kereta Gantung)',
      'Voucher makan & minum senilai Rp 25.000',
      'Jalur antrean khusus Fast Track masuk gerbang',
      'Peta panduan fisik eksklusif & suvenir pin satwa'
    ],
    popular: false
  },
  {
    id: 'ticket-safari-night',
    name: 'Safari Night Adventure & Fire Theater',
    tier: 'Pengalaman Malam',
    priceWeekday: 160000,
    priceWeekend: 185000,
    badge: 'Edisi Spesial Malam',
    description: 'Menyusuri rimba malam hari dengan tram berpengawal ranger, melihat aktivitas satwa nokturnal, & pertunjukan spektakuler teater api.',
    benefits: [
      'Tur malam hari dipandu Ranger Ahli Satwa',
      'Pertunjukan Spektakuler Tari Api Colossal Fire Theater',
      'Gratis Welcome Drink Rempah Tradisional Hangat',
      'Akses ke Hutan Kunang-Kunang & Aviari Malam',
      'Suvenir senter inframerah edukasi anak'
    ],
    popular: false
  },
  {
    id: 'ticket-vip-jeep',
    name: 'VIP Private 4x4 Safari Expedition',
    tier: 'Eksklusif Privat',
    priceWeekday: 650000,
    priceWeekend: 750000,
    badge: 'Maks. 5 Orang / Kendaraan',
    description: 'Petualangan off-road privat dengan mobil Jeep Safari tertutup terbuka dipandu dokter hewan & ranger pribadi, bebas rute & foto eksklusif.',
    benefits: [
      '1 Unit Mobil Jeep 4x4 Khusus (Kapasitas hingga 5 Orang)',
      'Pemandu Ahli / Ranger Pribadi & Jalur Dekat Eksklusif',
      'Sesi Feeding Pribadi Satwa Herbivora (Pakan Disediakan)',
      'Termasuk Tiket Sky Gondola untuk seluruh penumpang',
      'Snack Box Premium & Air Mineral Dingin di dalam Jeep'
    ],
    popular: false
  }
];

export const ADDON_OPTIONS = [
  { id: 'addon-gondola', name: 'Tiket Sky Gondola Tambahan', price: 40000, desc: 'Per orang (jika memilih paket reguler)' },
  { id: 'addon-feed-giraffe', name: 'Voucher Pakan Satwa (Jerapah/Gajah)', price: 25000, desc: '1 Keranjang buah & sayur segar' },
  { id: 'addon-buggy-rent', name: 'Voucher Buggy Listrik (1 Jam)', price: 120000, desc: 'Kapasitas 4 orang keliling rute mandiri' }
];
