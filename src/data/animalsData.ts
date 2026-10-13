export interface Animal {
  id: string;
  name: string;
  scientificName: string;
  category: 'Mamalia' | 'Aves' | 'Reptil' | 'Primata' | 'Ikan & Air' | 'Lainnya';
  iucnStatus: 'Kritis' | 'Terancam' | 'Rentan' | 'Risiko Rendah' | 'Dilindungi UU' | 'Domestik';
  habitat: string;
  diet: 'Karnivora' | 'Herbivora' | 'Omnivora';
  origin: string;
  image?: string;
  description: string;
  funFact?: string;
  conservationAction?: string;
  feedingTime?: string;
  weight?: string;
  lifespan?: string;
  soundCue?: string;
  featured?: boolean;
}

// Daftar satwa awal dikosongkan sesuai permintaan pengguna agar bisa diisi secara manual
export const ANIMALS_DATA: Animal[] = [];

// Template sampel opsional khas ekosistem Taman Kehati Mesuji jika dibutuhkan
export const PRESET_SAMPLE_MESUJI_ANIMALS: Animal[] = [
  {
    id: 'rusa-sambar-mesuji',
    name: 'Rusa Sambar',
    scientificName: 'Rusa unicolor',
    category: 'Mamalia',
    iucnStatus: 'Rentan',
    habitat: 'Zona Hutan Dataran Rendah & Padang Rumput Kehati',
    diet: 'Herbivora',
    origin: 'Sumatera & Dataran Mesuji, Lampung',
    image: 'https://images.unsplash.com/photo-1547721064-362abbe60938?auto=format&fit=crop&w=800&q=80',
    description: 'Spesies rusa terbesar di Indonesia dengan tanduk bercabang kokoh. Menjadi salah satu ikon fauna herbivora yang dikembangbiakkan di kawasan konservasi Taman Kehati Mesuji.',
    funFact: 'Tanduk rusa jantan dapat berganti dan tumbuh kembali setiap tahun.',
    conservationAction: 'Penangkaran terkontrol dan penyediaan padang gembala rumput gajah alami di Mesuji.',
    feedingTime: '08:00 & 16:00 WIB',
    weight: '150 - 260 kg',
    lifespan: '16 - 20 tahun',
    soundCue: 'Dengkingan melengking saat mendeteksi keberadaan pemangsa',
    featured: true
  },
  {
    id: 'ikan-belida-mesuji',
    name: 'Ikan Belida Sumatera',
    scientificName: 'Chitala lopis',
    category: 'Ikan & Air',
    iucnStatus: 'Kritis',
    habitat: 'Danau & Embung Konservasi Perairan Kehati',
    diet: 'Karnivora',
    origin: 'Daerah Aliran Sungai (DAS) Mesuji & Tulang Bawang',
    image: 'https://images.unsplash.com/photo-1522069169874-c58ec4b76be5?auto=format&fit=crop&w=800&q=80',
    description: 'Ikan air tawar endemik bernilai historis tinggi dengan tubuh pipih memanjang melengkung menyerupai bilah pisau atau belati.',
    funFact: 'Merupakan satwa air tawar yang dilindungi penuh oleh Permen LHK No. P.106/2018.',
    conservationAction: 'Restorasi embung pemijahan dan larangan penangkapan liar di perairan Mesuji.',
    feedingTime: '09:00 & 15:30 WIB (Pelet Protein & Udang Rawa)',
    weight: '1.5 - 7 kg',
    lifespan: '8 - 12 tahun',
    soundCue: 'Gerakan kepakan sirip ventral lembut di dasar air tawar',
    featured: true
  },
  {
    id: 'buaya-muara-mesuji',
    name: 'Buaya Muara',
    scientificName: 'Crocodylus porosus',
    category: 'Reptil',
    iucnStatus: 'Risiko Rendah',
    habitat: 'Zona Rawa Basah & Danau Kehati Mesuji',
    diet: 'Karnivora',
    origin: 'Rawa & Muara Sungai Mesuji',
    image: '/src/assets/images/komodo_dragon_nature_1791856687979.jpg',
    description: 'Reptil perairan rawa terbesar di dunia dengan moncong kokoh dan kemampuan adaptasi tinggi di ekosistem perairan rawa dataran rendah Sumatera.',
    funFact: 'Kekuatan gigitan buaya muara mencapai lebih dari 3.700 psi, salah satu yang terkuat di dunia satwa.',
    conservationAction: 'Pengamanan perimeter zona rawa terisolasi dan edukasi mitigasi konflik manusia-buaya.',
    feedingTime: '11:00 WIB (Sesi Tertentu)',
    weight: '300 - 800 kg',
    lifespan: '60 - 70 tahun',
    soundCue: 'Desisan peringatan teritori dan raungan frekuensi rendah',
    featured: false
  }
];
