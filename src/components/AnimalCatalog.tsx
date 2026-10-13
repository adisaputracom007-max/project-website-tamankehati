import React, { useState, useMemo, useEffect } from 'react';
import { Search, Plus, Trash2, Edit3, Sparkles, ArrowUpRight, FolderPlus, RefreshCw, X, Check, Image as ImageIcon, Lock, ShieldCheck } from 'lucide-react';
import { ANIMALS_DATA, PRESET_SAMPLE_MESUJI_ANIMALS, Animal } from '../data/animalsData';
import { AnimalDetailModal } from './AnimalDetailModal';
import { useAdmin } from '../context/AdminContext';

const STORAGE_KEY = 'taman_kehati_mesuji_animals_catalog';

export const AnimalCatalog: React.FC = () => {
  const { isAdmin, openLoginModal } = useAdmin();

  // Initialize: if saved in localStorage use that, otherwise use official Mesuji sample presets
  const [animals, setAnimals] = useState<Animal[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed) && parsed.length > 0) {
            return parsed;
          }
        }
      } catch (e) {
        console.error('Error loading stored animals', e);
      }
    }
    return PRESET_SAMPLE_MESUJI_ANIMALS;
  });

  const [selectedCategory, setSelectedCategory] = useState<string>('Semua');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeAnimal, setActiveAnimal] = useState<Animal | null>(null);

  // Manual Add / Edit Form Modal state
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingAnimalId, setEditingAnimalId] = useState<string | null>(null);

  // Form Fields
  const [formName, setFormName] = useState('');
  const [formScientificName, setFormScientificName] = useState('');
  const [formCategory, setFormCategory] = useState<Animal['category']>('Mamalia');
  const [formIucnStatus, setFormIucnStatus] = useState<Animal['iucnStatus']>('Dilindungi UU');
  const [formHabitat, setFormHabitat] = useState('');
  const [formDiet, setFormDiet] = useState<Animal['diet']>('Herbivora');
  const [formOrigin, setFormOrigin] = useState('Kabupaten Mesuji, Lampung');
  const [formImage, setFormImage] = useState('');
  const [formDescription, setFormDescription] = useState('');
  const [formFunFact, setFormFunFact] = useState('');
  const [formConservation, setFormConservation] = useState('');
  const [formFeedingTime, setFormFeedingTime] = useState('');
  const [formWeight, setFormWeight] = useState('');
  const [formLifespan, setFormLifespan] = useState('');
  const [formSoundCue, setFormSoundCue] = useState('');

  // Persist to localStorage whenever animals change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(animals));
    } catch (e) {
      console.error('Error persisting animals', e);
    }
  }, [animals]);

  const categories = ['Semua', 'Mamalia', 'Aves', 'Reptil', 'Primata', 'Ikan & Air', 'Lainnya'];

  const filteredAnimals = useMemo(() => {
    return animals.filter((animal) => {
      const matchesCategory =
        selectedCategory === 'Semua' || animal.category === selectedCategory;
      const matchesSearch =
        animal.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        animal.scientificName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        animal.habitat.toLowerCase().includes(searchQuery.toLowerCase()) ||
        animal.origin.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [animals, selectedCategory, searchQuery]);

  const handleOpenAddForm = () => {
    setEditingAnimalId(null);
    setFormName('');
    setFormScientificName('');
    setFormCategory('Mamalia');
    setFormIucnStatus('Dilindungi UU');
    setFormHabitat('Zona Hutan Konservasi Kehati Mesuji');
    setFormDiet('Herbivora');
    setFormOrigin('Kabupaten Mesuji, Lampung');
    setFormImage('');
    setFormDescription('');
    setFormFunFact('');
    setFormConservation('Perlindungan habitat ex-situ & pemantauan rutin Dinas Lingkungan Hidup Kab. Mesuji');
    setFormFeedingTime('08:30 & 15:30 WIB');
    setFormWeight('');
    setFormLifespan('');
    setFormSoundCue('');
    setIsFormOpen(true);
  };

  const handleOpenEditForm = (animal: Animal, e: React.MouseEvent) => {
    e.stopPropagation();
    setEditingAnimalId(animal.id);
    setFormName(animal.name);
    setFormScientificName(animal.scientificName);
    setFormCategory(animal.category);
    setFormIucnStatus(animal.iucnStatus);
    setFormHabitat(animal.habitat);
    setFormDiet(animal.diet);
    setFormOrigin(animal.origin);
    setFormImage(animal.image || '');
    setFormDescription(animal.description);
    setFormFunFact(animal.funFact || '');
    setFormConservation(animal.conservationAction || '');
    setFormFeedingTime(animal.feedingTime || '');
    setFormWeight(animal.weight || '');
    setFormLifespan(animal.lifespan || '');
    setFormSoundCue(animal.soundCue || '');
    setIsFormOpen(true);
  };

  const handleDeleteAnimal = (id: string, name: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm(`Hapus satwa "${name}" dari katalog Taman Kehati Mesuji?`)) {
      setAnimals((prev) => prev.filter((a) => a.id !== id));
      if (activeAnimal?.id === id) {
        setActiveAnimal(null);
      }
    }
  };

  const handleSaveAnimal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim() || !formDescription.trim()) {
      alert('Nama satwa dan deskripsi wajib diisi.');
      return;
    }

    if (editingAnimalId) {
      // Update existing
      setAnimals((prev) =>
        prev.map((a) => {
          if (a.id === editingAnimalId) {
            return {
              ...a,
              name: formName,
              scientificName: formScientificName || '-',
              category: formCategory,
              iucnStatus: formIucnStatus,
              habitat: formHabitat || 'Zona Konservasi Mesuji',
              diet: formDiet,
              origin: formOrigin || 'Mesuji, Lampung',
              image: formImage || undefined,
              description: formDescription,
              funFact: formFunFact || undefined,
              conservationAction: formConservation || undefined,
              feedingTime: formFeedingTime || 'Sesuai Jadwal Ranger',
              weight: formWeight || 'Belum terdata',
              lifespan: formLifespan || 'Belum terdata',
              soundCue: formSoundCue || undefined
            };
          }
          return a;
        })
      );
    } else {
      // Create new
      const newAnimal: Animal = {
        id: 'satwa-' + Date.now(),
        name: formName,
        scientificName: formScientificName || '-',
        category: formCategory,
        iucnStatus: formIucnStatus,
        habitat: formHabitat || 'Zona Konservasi Kehati Mesuji',
        diet: formDiet,
        origin: formOrigin || 'Kabupaten Mesuji, Lampung',
        image: formImage || undefined,
        description: formDescription,
        funFact: formFunFact || undefined,
        conservationAction: formConservation || undefined,
        feedingTime: formFeedingTime || 'Sesuai Jadwal Ranger',
        weight: formWeight || 'Belum terdata',
        lifespan: formLifespan || 'Belum terdata',
        soundCue: formSoundCue || undefined
      };
      setAnimals((prev) => [newAnimal, ...prev]);
    }

    setIsFormOpen(false);
  };

  const handleLoadSamplePresets = () => {
    if (animals.length > 0) {
      if (!window.confirm('Muat contoh data satwa khas Mesuji? Data yang ada akan digabungkan.')) {
        return;
      }
    }
    setAnimals((prev) => [...PRESET_SAMPLE_MESUJI_ANIMALS, ...prev]);
  };

  const handleClearAll = () => {
    if (window.confirm('Kosongkan semua daftar satwa kembali?')) {
      setAnimals([]);
      localStorage.removeItem(STORAGE_KEY);
    }
  };

  return (
    <section id="satwa" className="py-20 bg-stone-50 text-stone-900 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-800 mb-2">
              <span>Konservasi Keanekaragaman Hayati</span>
              <span aria-hidden="true">·</span>
              <span className="font-mono text-emerald-700">
                {animals.length} Spesies Terdaftar
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-stone-900 [text-wrap:balance]">
              Daftar Satwa Taman Kehati Kabupaten Mesuji
            </h2>
            <p className="text-stone-600 text-sm sm:text-base mt-2 max-w-2xl">
              Basis data koleksi flora & fauna suaka alam Taman Kehati Mesuji. Pengelola dapat mengisi dan memperbarui entri satwa secara mandiri.
            </p>
          </div>

          {/* Action Header: Add Animal Button (Admin only) & Quick Search */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            {isAdmin ? (
              <button
                onClick={handleOpenAddForm}
                className="px-4 py-2.5 bg-emerald-900 hover:bg-emerald-850 text-white text-xs sm:text-sm font-bold rounded-lg shadow-sm hover:shadow transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-[0.98]"
              >
                <Plus className="w-4 h-4 text-emerald-300 stroke-[3]" />
                <span>Tambah Satwa Manual</span>
              </button>
            ) : (
              <div className="flex items-center gap-2 text-xs font-semibold text-emerald-900 bg-emerald-50 px-3.5 py-2 rounded-lg border border-emerald-200 shadow-2xs">
                <ShieldCheck className="w-4 h-4 text-emerald-700" />
                <span>Katalog Resmi Terverifikasi DLH</span>
              </div>
            )}

            {animals.length > 0 && (
              <div className="relative min-w-[240px]">
                <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Cari satwa di Kehati Mesuji..."
                  className="w-full pl-10 pr-4 py-2.5 bg-white border border-stone-300 rounded-lg text-xs sm:text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-emerald-800/20 focus:border-emerald-800 transition-all shadow-sm"
                />
              </div>
            )}
          </div>
        </div>

        {/* Filter Tabs & Data Management Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-1.5 p-1 bg-stone-200/80 rounded-xl max-w-max overflow-x-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 text-xs sm:text-sm font-medium rounded-lg transition-all whitespace-nowrap shrink-0 cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-white text-emerald-950 shadow-sm font-semibold'
                    : 'text-stone-600 hover:text-stone-900 hover:bg-stone-200/60'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2 text-xs">
            {isAdmin ? (
              animals.length > 0 ? (
                <button
                  onClick={handleClearAll}
                  className="text-stone-500 hover:text-rose-700 transition-colors flex items-center gap-1 cursor-pointer"
                  title="Hapus semua data satwa"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Kosongkan Daftar</span>
                </button>
              ) : (
                <button
                  onClick={handleLoadSamplePresets}
                  className="text-emerald-800 hover:text-emerald-950 font-medium underline underline-offset-2 flex items-center gap-1 cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Muat Contoh Khas Mesuji (Rusa, Belida, Buaya)</span>
                </button>
              )
            ) : null}
          </div>
        </div>

        {/* Animals Grid or Empty State */}
        {animals.length === 0 ? (
          /* Proper Empty State when list is empty */
          <div className="py-20 px-6 text-center bg-white rounded-2xl border border-dashed border-stone-300 max-w-2xl mx-auto shadow-sm">
            <div className="w-16 h-16 rounded-2xl bg-emerald-50 text-emerald-800 flex items-center justify-center mx-auto mb-4 border border-emerald-100">
              <FolderPlus className="w-8 h-8 text-emerald-700 stroke-[1.5]" />
            </div>

            <h3 className="text-xl font-extrabold text-stone-900 mb-2">
              Daftar Satwa Masih Kosong
            </h3>

            <p className="text-stone-600 text-sm max-w-md mx-auto leading-relaxed mb-6">
              Basis data satwa Taman Kehati Kabupaten Mesuji telah dikosongkan.
            </p>

            {isAdmin ? (
              <div className="flex flex-wrap items-center justify-center gap-3">
                <button
                  onClick={handleOpenAddForm}
                  className="px-5 py-2.5 bg-emerald-900 hover:bg-emerald-850 text-white text-xs sm:text-sm font-bold rounded-lg shadow transition-all flex items-center gap-2 cursor-pointer"
                >
                  <Plus className="w-4 h-4 stroke-[3]" />
                  <span>+ Tambah Satwa Pertama</span>
                </button>

                <button
                  onClick={handleLoadSamplePresets}
                  className="px-4 py-2.5 bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs sm:text-sm font-semibold rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Muat Contoh Satwa Khas Mesuji</span>
                </button>
              </div>
            ) : (
              <p className="text-xs text-stone-500">
                Data satwa resmi sedang dalam pemutakhiran oleh Dinas Lingkungan Hidup Kab. Mesuji.
              </p>
            )}
          </div>
        ) : filteredAnimals.length === 0 ? (
          <div className="py-16 text-center bg-white rounded-xl border border-stone-200">
            <p className="text-base text-stone-600 font-medium">
              Tidak ditemukan satwa dengan kata kunci "{searchQuery}" pada kategori {selectedCategory}
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('Semua');
              }}
              className="mt-4 px-4 py-2 text-xs font-semibold text-emerald-900 bg-emerald-50 hover:bg-emerald-100 rounded-lg transition-colors cursor-pointer"
            >
              Reset Filter & Pencarian
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredAnimals.map((animal) => (
              <div
                key={animal.id}
                onClick={() => setActiveAnimal(animal)}
                className="group bg-white rounded-xl border border-stone-200 hover:border-emerald-700/50 overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer flex flex-col relative"
              >
                {/* Top Action Buttons (Edit & Delete) - Only visible for Admin */}
                {isAdmin && (
                  <div className="absolute top-3 right-3 z-20 flex items-center gap-1.5 opacity-90 group-hover:opacity-100">
                    <button
                      onClick={(e) => handleOpenEditForm(animal, e)}
                      className="p-1.5 rounded-md bg-stone-900/75 hover:bg-stone-900 text-white backdrop-blur-sm transition-colors cursor-pointer"
                      title="Edit Satwa"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={(e) => handleDeleteAnimal(animal.id, animal.name, e)}
                      className="p-1.5 rounded-md bg-rose-900/80 hover:bg-rose-900 text-white backdrop-blur-sm transition-colors cursor-pointer"
                      title="Hapus Satwa"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}

                {/* Animal Photo with resilient fallback container */}
                <div className="relative aspect-[4/3] bg-emerald-950 overflow-hidden flex items-center justify-center">
                  {animal.image ? (
                    <img
                      src={animal.image}
                      alt={animal.name}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        (e.target as HTMLElement).style.display = 'none';
                      }}
                    />
                  ) : (
                    <div className="text-center p-6 text-emerald-200">
                      <span className="text-4xl block mb-2">🌿</span>
                      <span className="text-xs font-mono tracking-wider uppercase text-emerald-300">
                        {animal.category} · Kehati Mesuji
                      </span>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

                  {/* Unboxed Metadata in Photo Overlay */}
                  <div className="absolute bottom-3 left-4 right-4 text-white">
                    <div className="flex items-center gap-2 text-xs text-stone-300">
                      <span>{animal.category}</span>
                      <span aria-hidden="true">·</span>
                      <span className="italic">{animal.scientificName}</span>
                    </div>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Quiet 1-line kicker (No pill badges) */}
                    <div className="flex items-center justify-between text-xs text-stone-500 mb-2">
                      <div className="flex items-center gap-1.5">
                        <span className="font-semibold text-stone-700">{animal.diet}</span>
                        <span aria-hidden="true">·</span>
                        <span>Status: <strong className="text-stone-700">{animal.iucnStatus}</strong></span>
                      </div>
                      <span className="text-stone-400 font-mono text-[11px] truncate max-w-[110px]">
                        {animal.habitat.split(' ')[0]}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-stone-900 group-hover:text-emerald-900 transition-colors">
                      {animal.name}
                    </h3>

                    <p className="text-stone-600 text-xs sm:text-sm line-clamp-2 mt-2 leading-relaxed">
                      {animal.description}
                    </p>
                  </div>

                  {/* Card Bottom */}
                  <div className="mt-5 pt-3 border-t border-stone-100 flex items-center justify-between text-xs">
                    <div className="text-stone-500 truncate max-w-[200px]">
                      <span>Lokasi: </span>
                      <strong className="text-stone-700 font-medium">{animal.habitat}</strong>
                    </div>

                    <span className="font-semibold text-emerald-800 flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                      Detail
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Manual Animal Add / Edit Form Modal */}
      {isFormOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/75 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
          <div
            className="relative bg-white rounded-2xl max-w-2xl w-full overflow-hidden shadow-2xl border border-stone-200 text-stone-900 my-6"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="px-6 py-4 bg-emerald-950 text-white flex items-center justify-between">
              <div>
                <span className="text-[11px] font-mono uppercase tracking-widest text-emerald-400 block">
                  Taman Kehati Kabupaten Mesuji
                </span>
                <h3 className="text-base sm:text-lg font-bold">
                  {editingAnimalId ? 'Edit Data Satwa' : 'Tambah Satwa Baru (Manual)'}
                </h3>
              </div>
              <button
                onClick={() => setIsFormOpen(false)}
                className="p-1.5 text-stone-400 hover:text-white rounded-lg hover:bg-stone-900 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSaveAnimal} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-stone-700 font-semibold mb-1">
                    Nama Satwa *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: Rusa Sambar"
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-lg text-sm text-stone-900 focus:outline-none focus:border-emerald-800"
                  />
                </div>

                <div>
                  <label className="block text-stone-700 font-semibold mb-1">
                    Nama Ilmiah / Latin
                  </label>
                  <input
                    type="text"
                    placeholder="Contoh: Rusa unicolor"
                    value={formScientificName}
                    onChange={(e) => setFormScientificName(e.target.value)}
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-lg text-sm text-stone-900 italic focus:outline-none focus:border-emerald-800"
                  />
                </div>

                <div>
                  <label className="block text-stone-700 font-semibold mb-1">
                    Kategori Satwa
                  </label>
                  <select
                    value={formCategory}
                    onChange={(e) => setFormCategory(e.target.value as Animal['category'])}
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-lg text-sm text-stone-900 focus:outline-none focus:border-emerald-800 cursor-pointer"
                  >
                    <option value="Mamalia">Mamalia</option>
                    <option value="Aves">Aves (Burung)</option>
                    <option value="Reptil">Reptil</option>
                    <option value="Primata">Primata</option>
                    <option value="Ikan & Air">Ikan & Fauna Perairan</option>
                    <option value="Lainnya">Lainnya</option>
                  </select>
                </div>

                <div>
                  <label className="block text-stone-700 font-semibold mb-1">
                    Status Konservasi
                  </label>
                  <select
                    value={formIucnStatus}
                    onChange={(e) => setFormIucnStatus(e.target.value as Animal['iucnStatus'])}
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-lg text-sm text-stone-900 focus:outline-none focus:border-emerald-800 cursor-pointer"
                  >
                    <option value="Dilindungi UU">Dilindungi UU (RI)</option>
                    <option value="Kritis">Kritis (Critically Endangered)</option>
                    <option value="Terancam">Terancam (Endangered)</option>
                    <option value="Rentan">Rentan (Vulnerable)</option>
                    <option value="Risiko Rendah">Risiko Rendah (Least Concern)</option>
                    <option value="Domestik">Domestik / Ramah Pengunjung</option>
                  </select>
                </div>

                <div>
                  <label className="block text-stone-700 font-semibold mb-1">
                    Habitat / Zona di Kehati Mesuji
                  </label>
                  <input
                    type="text"
                    placeholder="Contoh: Zona Hutan Dataran Rendah / Embung Kehati"
                    value={formHabitat}
                    onChange={(e) => setFormHabitat(e.target.value)}
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-lg text-sm text-stone-900 focus:outline-none focus:border-emerald-800"
                  />
                </div>

                <div>
                  <label className="block text-stone-700 font-semibold mb-1">
                    Pola Makan (Diet)
                  </label>
                  <select
                    value={formDiet}
                    onChange={(e) => setFormDiet(e.target.value as Animal['diet'])}
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-lg text-sm text-stone-900 focus:outline-none focus:border-emerald-800 cursor-pointer"
                  >
                    <option value="Herbivora">Herbivora (Tumbuhan/Rumput)</option>
                    <option value="Karnivora">Karnivora (Daging/Ikan)</option>
                    <option value="Omnivora">Omnivora (Segala)</option>
                  </select>
                </div>
              </div>

              {/* URL Foto Satwa */}
              <div>
                <label className="block text-stone-700 font-semibold mb-1">
                  URL Foto Satwa (Opsional)
                </label>
                <input
                  type="url"
                  placeholder="https://... atau biarkan kosong untuk kartu ilustrasi alam"
                  value={formImage}
                  onChange={(e) => setFormImage(e.target.value)}
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-lg text-sm text-stone-900 focus:outline-none focus:border-emerald-800 font-mono text-xs"
                />
                <div className="flex flex-wrap gap-2 mt-1.5">
                  <span className="text-[11px] text-stone-500">Pilihan Cepat:</span>
                  <button
                    type="button"
                    onClick={() => setFormImage('https://images.unsplash.com/photo-1547721064-362abbe60938?auto=format&fit=crop&w=800&q=80')}
                    className="text-[11px] text-emerald-800 hover:underline cursor-pointer"
                  >
                    + Rusa/Fauna Padang
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormImage('https://images.unsplash.com/photo-1552728089-57bdde30beb3?auto=format&fit=crop&w=800&q=80')}
                    className="text-[11px] text-emerald-800 hover:underline cursor-pointer"
                  >
                    + Burung/Unggas
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormImage('https://images.unsplash.com/photo-1522069169874-c58ec4b76be5?auto=format&fit=crop&w=800&q=80')}
                    className="text-[11px] text-emerald-800 hover:underline cursor-pointer"
                  >
                    + Ikan/Air Tawar
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormImage('')}
                    className="text-[11px] text-stone-500 hover:underline cursor-pointer"
                  >
                    Kosongkan Foto
                  </button>
                </div>
              </div>

              {/* Deskripsi */}
              <div>
                <label className="block text-stone-700 font-semibold mb-1">
                  Deskripsi & Karakteristik Satwa *
                </label>
                <textarea
                  required
                  rows={3}
                  placeholder="Jelaskan ciri fisik, kebiasaan, serta peran satwa di Taman Kehati Mesuji..."
                  value={formDescription}
                  onChange={(e) => setFormDescription(e.target.value)}
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-lg text-sm text-stone-900 focus:outline-none focus:border-emerald-800 leading-relaxed"
                />
              </div>

              {/* Fakta Unik & Jadwal Feeding */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-stone-700 font-semibold mb-1">
                    Fakta Unik Lapangan (Opsional)
                  </label>
                  <input
                    type="text"
                    placeholder="Contoh: Tanduk jantan berganti secara alami tiap tahun..."
                    value={formFunFact}
                    onChange={(e) => setFormFunFact(e.target.value)}
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-lg text-sm text-stone-900 focus:outline-none focus:border-emerald-800"
                  />
                </div>

                <div>
                  <label className="block text-stone-700 font-semibold mb-1">
                    Jadwal Pemberian Makan / Perawatan
                  </label>
                  <input
                    type="text"
                    placeholder="Contoh: 08:30 & 15:30 WIB"
                    value={formFeedingTime}
                    onChange={(e) => setFormFeedingTime(e.target.value)}
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-lg text-sm text-stone-900 focus:outline-none focus:border-emerald-800"
                  />
                </div>

                <div>
                  <label className="block text-stone-700 font-semibold mb-1">
                    Berat / Ukuran Rata-rata
                  </label>
                  <input
                    type="text"
                    placeholder="Contoh: 150 - 250 kg"
                    value={formWeight}
                    onChange={(e) => setFormWeight(e.target.value)}
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-lg text-sm text-stone-900 focus:outline-none focus:border-emerald-800"
                  />
                </div>

                <div>
                  <label className="block text-stone-700 font-semibold mb-1">
                    Karakter Suara / Vokalisasi
                  </label>
                  <input
                    type="text"
                    placeholder="Contoh: Lenguhan pendek bernada rendah..."
                    value={formSoundCue}
                    onChange={(e) => setFormSoundCue(e.target.value)}
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-lg text-sm text-stone-900 focus:outline-none focus:border-emerald-800"
                  />
                </div>
              </div>

              {/* Action buttons */}
              <div className="pt-4 border-t border-stone-200 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsFormOpen(false)}
                  className="px-4 py-2 text-stone-600 bg-stone-100 hover:bg-stone-200 rounded-lg font-semibold transition-colors cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-emerald-900 hover:bg-emerald-800 text-white rounded-lg font-bold shadow transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <Check className="w-4 h-4 stroke-[3]" />
                  <span>{editingAnimalId ? 'Simpan Perubahan' : 'Tambahkan Satwa'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Animal Detail Modal */}
      {activeAnimal && (
        <AnimalDetailModal
          animal={activeAnimal}
          onClose={() => setActiveAnimal(null)}
        />
      )}
    </section>
  );
};
