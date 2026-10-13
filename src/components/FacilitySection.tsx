import React, { useState, useEffect } from 'react';
import { Clock, MapPin, CheckCircle, Accessibility, Plus, Trash2, Edit3, X, Check, FolderPlus, RefreshCw, Sparkles, ChevronRight, Lock, ShieldCheck } from 'lucide-react';
import { FACILITIES_DATA, PRESET_SAMPLE_MESUJI_FACILITIES, Facility } from '../data/facilitiesData';
import { useAdmin } from '../context/AdminContext';

const FACILITIES_STORAGE_KEY = 'taman_kehati_mesuji_facilities_catalog';

export const FacilitySection: React.FC = () => {
  const { isAdmin, openLoginModal } = useAdmin();

  // Initialized: if saved in localStorage use that, otherwise use official Mesuji sample presets
  const [facilities, setFacilities] = useState<Facility[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem(FACILITIES_STORAGE_KEY);
        if (saved) {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed) && parsed.length > 0) {
            return parsed;
          }
        }
      } catch (e) {
        console.error('Error reading saved facilities', e);
      }
    }
    return PRESET_SAMPLE_MESUJI_FACILITIES;
  });

  const [selectedCategory, setSelectedCategory] = useState<string>('Semua');
  const [activeFacility, setActiveFacility] = useState<Facility | null>(null);

  // Form Modal State
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingFacilityId, setEditingFacilityId] = useState<string | null>(null);

  // Form Fields
  const [formName, setFormName] = useState('');
  const [formCategory, setFormCategory] = useState<Facility['category']>('Wahana & Rekreasi');
  const [formBadge, setFormBadge] = useState('Fasilitas');
  const [formTagline, setFormTagline] = useState('');
  const [formDescription, setFormDescription] = useState('');
  const [formHours, setFormHours] = useState('08:00 - 17:00 WIB');
  const [formLocation, setFormLocation] = useState('Area Kawasan Taman Kehati Mesuji');
  const [formFeaturesText, setFormFeaturesText] = useState('');
  const [formImage, setFormImage] = useState('');
  const [formWheelchair, setFormWheelchair] = useState(true);

  // Persist to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(FACILITIES_STORAGE_KEY, JSON.stringify(facilities));
    } catch (e) {
      console.error('Error writing facilities to storage', e);
    }
  }, [facilities]);

  const categories = [
    'Semua',
    'Wahana & Rekreasi',
    'Edukasi Lingkungan',
    'Kuliner',
    'Ibadah',
    'Fasilitas Umum & Medis'
  ];

  const filteredFacilities = facilities.filter(
    (item) => selectedCategory === 'Semua' || item.category === selectedCategory
  );

  const handleOpenAddForm = () => {
    setEditingFacilityId(null);
    setFormName('');
    setFormCategory('Wahana & Rekreasi');
    setFormBadge('Wahana');
    setFormTagline('');
    setFormDescription('');
    setFormHours('08:00 - 17:00 WIB');
    setFormLocation('Kawasan Taman Kehati Mesuji');
    setFormFeaturesText('Area Bersih & Teduh, Akses Mudah, Ramah Keluarga');
    setFormImage('');
    setFormWheelchair(true);
    setIsFormOpen(true);
  };

  const handleOpenEditForm = (facility: Facility, e: React.MouseEvent) => {
    e.stopPropagation();
    setEditingFacilityId(facility.id);
    setFormName(facility.name);
    setFormCategory(facility.category);
    setFormBadge(facility.badge);
    setFormTagline(facility.tagline);
    setFormDescription(facility.description);
    setFormHours(facility.hours);
    setFormLocation(facility.location);
    setFormFeaturesText(facility.features.join(', '));
    setFormImage(facility.image || '');
    setFormWheelchair(facility.wheelchairAccessible);
    setIsFormOpen(true);
  };

  const handleDeleteFacility = (id: string, name: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm(`Hapus fasilitas "${name}"?`)) {
      setFacilities((prev) => prev.filter((f) => f.id !== id));
      if (activeFacility?.id === id) {
        setActiveFacility(null);
      }
    }
  };

  const handleSaveFacility = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim() || !formDescription.trim()) {
      alert('Nama fasilitas dan deskripsi wajib diisi.');
      return;
    }

    const featureList = formFeaturesText
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);

    if (editingFacilityId) {
      setFacilities((prev) =>
        prev.map((f) => {
          if (f.id === editingFacilityId) {
            return {
              ...f,
              name: formName,
              category: formCategory,
              badge: formBadge || formCategory,
              tagline: formTagline || formName,
              description: formDescription,
              hours: formHours || '08:00 - 17:00 WIB',
              location: formLocation || 'Taman Kehati Mesuji',
              features: featureList.length > 0 ? featureList : ['Fasilitas Terawat'],
              image: formImage || undefined,
              wheelchairAccessible: formWheelchair
            };
          }
          return f;
        })
      );
    } else {
      const newFacility: Facility = {
        id: 'facility-' + Date.now(),
        name: formName,
        category: formCategory,
        badge: formBadge || formCategory,
        tagline: formTagline || formName,
        description: formDescription,
        hours: formHours || '08:00 - 17:00 WIB',
        location: formLocation || 'Taman Kehati Mesuji',
        features: featureList.length > 0 ? featureList : ['Fasilitas Terawat'],
        image: formImage || undefined,
        wheelchairAccessible: formWheelchair
      };
      setFacilities((prev) => [newFacility, ...prev]);
    }

    setIsFormOpen(false);
  };

  const handleLoadSamplePresets = () => {
    if (facilities.length > 0) {
      if (!window.confirm('Muat contoh fasilitas khas Taman Kehati Mesuji? Data akan digabungkan.')) {
        return;
      }
    }
    setFacilities((prev) => [...PRESET_SAMPLE_MESUJI_FACILITIES, ...prev]);
  };

  const handleClearAll = () => {
    if (window.confirm('Kosongkan semua daftar fasilitas?')) {
      setFacilities([]);
      localStorage.removeItem(FACILITIES_STORAGE_KEY);
    }
  };

  return (
    <section id="fasilitas" className="py-20 bg-white text-stone-900 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-800 mb-2">
              <span>Sarana Wisata, Edukasi & Rekreasi</span>
              <span aria-hidden="true">·</span>
              <span className="font-mono text-emerald-700">{facilities.length} Fasilitas Terdaftar</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-stone-900 [text-wrap:balance]">
              Fasilitas Taman Kehati Kabupaten Mesuji
            </h2>
            <p className="text-stone-600 text-sm sm:text-base mt-2 max-w-2xl">
              Informasi sarana prasarana, wahana rekreasi air, gedung edukasi lingkungan, kantin kuliner, serta fasilitas ibadah. Data dapat diisi dan diperbarui secara manual.
            </p>
          </div>

          {/* Action Header: Add Facility Button (Admin only) */}
          <div className="flex items-center gap-3">
            {isAdmin ? (
              <button
                onClick={handleOpenAddForm}
                className="px-4 py-2.5 bg-emerald-900 hover:bg-emerald-850 text-white text-xs sm:text-sm font-bold rounded-lg shadow-sm hover:shadow transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-[0.98]"
              >
                <Plus className="w-4 h-4 text-emerald-300 stroke-[3]" />
                <span>Tambah Fasilitas Manual</span>
              </button>
            ) : (
              <div className="flex items-center gap-2 text-xs font-semibold text-emerald-900 bg-emerald-50 px-3.5 py-2 rounded-lg border border-emerald-200 shadow-2xs">
                <ShieldCheck className="w-4 h-4 text-emerald-700" />
                <span>Fasilitas Terverifikasi DLH</span>
              </div>
            )}
          </div>
        </div>

        {/* Filter Tabs & Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-1.5 p-1 bg-stone-100 rounded-xl max-w-max overflow-x-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 text-xs sm:text-sm font-medium rounded-lg transition-all whitespace-nowrap shrink-0 cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-white text-stone-900 shadow-sm font-semibold'
                    : 'text-stone-600 hover:text-stone-900 hover:bg-stone-200/50'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2 text-xs">
            {isAdmin ? (
              facilities.length > 0 ? (
                <button
                  onClick={handleClearAll}
                  className="text-stone-500 hover:text-rose-700 transition-colors flex items-center gap-1 cursor-pointer"
                  title="Hapus semua fasilitas"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Kosongkan Fasilitas</span>
                </button>
              ) : (
                <button
                  onClick={handleLoadSamplePresets}
                  className="text-emerald-800 hover:text-emerald-950 font-medium underline underline-offset-2 flex items-center gap-1 cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Muat Contoh Fasilitas Khas Mesuji (Embung, Edukasi, Mushola)</span>
                </button>
              )
            ) : null}
          </div>
        </div>

        {/* Facilities Grid or Empty State */}
        {facilities.length === 0 ? (
          <div className="py-20 px-6 text-center bg-stone-50 rounded-2xl border border-dashed border-stone-300 max-w-2xl mx-auto shadow-sm">
            <div className="w-16 h-16 rounded-2xl bg-emerald-50 text-emerald-800 flex items-center justify-center mx-auto mb-4 border border-emerald-100">
              <FolderPlus className="w-8 h-8 text-emerald-700 stroke-[1.5]" />
            </div>

            <h3 className="text-xl font-extrabold text-stone-900 mb-2">
              Daftar Fasilitas Masih Kosong
            </h3>

            <p className="text-stone-600 text-sm max-w-md mx-auto leading-relaxed mb-6">
              Basis data fasilitas, wahana, edukasi, kuliner, dan ibadah telah dikosongkan.
            </p>

            {isAdmin ? (
              <div className="flex flex-wrap items-center justify-center gap-3">
                <button
                  onClick={handleOpenAddForm}
                  className="px-5 py-2.5 bg-emerald-900 hover:bg-emerald-800 text-white text-xs sm:text-sm font-bold rounded-lg shadow transition-all flex items-center gap-2 cursor-pointer"
                >
                  <Plus className="w-4 h-4 stroke-[3]" />
                  <span>+ Tambah Fasilitas Pertama</span>
                </button>

                <button
                  onClick={handleLoadSamplePresets}
                  className="px-4 py-2.5 bg-white hover:bg-stone-200 text-stone-700 border border-stone-200 text-xs sm:text-sm font-semibold rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Muat Contoh Fasilitas Mesuji</span>
                </button>
              </div>
            ) : (
              <p className="text-xs text-stone-500">
                Data fasilitas resmi sedang dalam pemutakhiran oleh Dinas Lingkungan Hidup Kab. Mesuji.
              </p>
            )}
          </div>
        ) : filteredFacilities.length === 0 ? (
          <div className="py-16 text-center bg-stone-50 rounded-xl border border-stone-200">
            <p className="text-base text-stone-600 font-medium">
              Tidak ada fasilitas pada kategori "{selectedCategory}"
            </p>
            <button
              onClick={() => setSelectedCategory('Semua')}
              className="mt-4 px-4 py-2 text-xs font-semibold text-emerald-900 bg-white border border-stone-200 rounded-lg hover:bg-stone-100 transition-colors cursor-pointer"
            >
              Tampilkan Semua Kategori
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredFacilities.map((facility) => (
              <div
                key={facility.id}
                onClick={() => setActiveFacility(facility)}
                className="group bg-stone-50 rounded-2xl border border-stone-200 overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col cursor-pointer relative"
              >
                {/* Edit & Delete Actions (Admin only) */}
                {isAdmin && (
                  <div className="absolute top-3 right-3 z-20 flex items-center gap-1.5 opacity-90 group-hover:opacity-100">
                    <button
                      onClick={(e) => handleOpenEditForm(facility, e)}
                      className="p-1.5 rounded-md bg-stone-900/75 hover:bg-stone-900 text-white backdrop-blur-sm transition-colors cursor-pointer"
                      title="Edit Fasilitas"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={(e) => handleDeleteFacility(facility.id, facility.name, e)}
                      className="p-1.5 rounded-md bg-rose-900/80 hover:bg-rose-900 text-white backdrop-blur-sm transition-colors cursor-pointer"
                      title="Hapus Fasilitas"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}

                {/* Facility Image with Fallback */}
                <div className="relative aspect-[16/10] bg-emerald-950 overflow-hidden flex items-center justify-center">
                  {facility.image ? (
                    <img
                      src={facility.image}
                      alt={facility.name}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        (e.target as HTMLElement).style.display = 'none';
                      }}
                    />
                  ) : (
                    <div className="text-center p-6 text-emerald-200">
                      <span className="text-4xl block mb-2">🏛️</span>
                      <span className="text-xs font-mono tracking-wider uppercase text-emerald-300">
                        {facility.category} · Kehati Mesuji
                      </span>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent" />

                  {/* Unboxed Metadata in photo */}
                  <div className="absolute bottom-3 left-4 right-4 text-white">
                    <div className="flex items-center gap-2 text-xs text-stone-300">
                      <span>{facility.category}</span>
                      <span aria-hidden="true">·</span>
                      <span className="text-amber-300 font-medium">{facility.badge}</span>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-stone-900 group-hover:text-emerald-900 transition-colors">
                      {facility.name}
                    </h3>

                    {facility.tagline && (
                      <p className="text-stone-500 text-xs italic mt-1 font-normal">
                        "{facility.tagline}"
                      </p>
                    )}

                    <p className="text-stone-600 text-xs sm:text-sm mt-3 line-clamp-2 leading-relaxed">
                      {facility.description}
                    </p>

                    {/* Highlights list */}
                    <ul className="mt-4 space-y-1.5 text-xs text-stone-600">
                      {facility.features.slice(0, 3).map((feat, idx) => (
                        <li key={idx} className="flex items-center gap-2">
                          <CheckCircle className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Footer metadata */}
                  <div className="mt-6 pt-4 border-t border-stone-200/80 space-y-2 text-xs">
                    <div className="flex items-center justify-between text-stone-500">
                      <span className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-stone-400" />
                        <span>{facility.hours}</span>
                      </span>

                      {facility.wheelchairAccessible && (
                        <span className="flex items-center gap-1 text-emerald-800 font-medium">
                          <Accessibility className="w-3.5 h-3.5" />
                          <span>Ramah Akses Difabel</span>
                        </span>
                      )}
                    </div>

                    <div className="flex items-center justify-between text-stone-700 pt-1 font-medium">
                      <span className="truncate max-w-[200px] text-stone-600">
                        {facility.location}
                      </span>
                      <span className="text-emerald-900 font-semibold text-xs flex items-center gap-0.5 group-hover:translate-x-0.5 transition-transform">
                        Lihat Rincian
                        <ChevronRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Manual Facility Form Modal */}
      {isFormOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/75 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
          <div
            className="relative bg-white rounded-2xl max-w-2xl w-full overflow-hidden shadow-2xl border border-stone-200 text-stone-900 my-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="px-6 py-4 bg-emerald-950 text-white flex items-center justify-between">
              <div>
                <span className="text-[11px] font-mono uppercase tracking-widest text-emerald-400 block">
                  Taman Kehati Kabupaten Mesuji (±10 Ha)
                </span>
                <h3 className="text-base sm:text-lg font-bold">
                  {editingFacilityId ? 'Edit Data Fasilitas' : 'Tambah Fasilitas Baru (Manual)'}
                </h3>
              </div>
              <button
                onClick={() => setIsFormOpen(false)}
                className="p-1.5 text-stone-400 hover:text-white rounded-lg hover:bg-stone-900 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveFacility} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-stone-700 font-semibold mb-1">
                    Nama Fasilitas / Wahana *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: Embung Wisata Air / Mushola Kehati"
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-lg text-sm text-stone-900 focus:outline-none focus:border-emerald-800"
                  />
                </div>

                <div>
                  <label className="block text-stone-700 font-semibold mb-1">
                    Kategori
                  </label>
                  <select
                    value={formCategory}
                    onChange={(e) => setFormCategory(e.target.value as Facility['category'])}
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-lg text-sm text-stone-900 focus:outline-none focus:border-emerald-800 cursor-pointer"
                  >
                    <option value="Wahana & Rekreasi">Wahana & Rekreasi</option>
                    <option value="Edukasi Lingkungan">Edukasi Lingkungan</option>
                    <option value="Kuliner">Kuliner & Kantin</option>
                    <option value="Ibadah">Ibadah (Mushola)</option>
                    <option value="Fasilitas Umum & Medis">Fasilitas Umum & Medis</option>
                  </select>
                </div>

                <div>
                  <label className="block text-stone-700 font-semibold mb-1">
                    Label Singkat (Badge)
                  </label>
                  <input
                    type="text"
                    placeholder="Contoh: Ikon Utama / Sarana Ibadah / Kuliner"
                    value={formBadge}
                    onChange={(e) => setFormBadge(e.target.value)}
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-lg text-sm text-stone-900 focus:outline-none focus:border-emerald-800"
                  />
                </div>

                <div>
                  <label className="block text-stone-700 font-semibold mb-1">
                    Jam Operasional / Layanan
                  </label>
                  <input
                    type="text"
                    placeholder="Contoh: 08:00 - 17:00 WIB"
                    value={formHours}
                    onChange={(e) => setFormHours(e.target.value)}
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-lg text-sm text-stone-900 focus:outline-none focus:border-emerald-800"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-stone-700 font-semibold mb-1">
                    Lokasi di Kawasan Taman Kehati Mesuji
                  </label>
                  <input
                    type="text"
                    placeholder="Contoh: Area Embung Tengah / Samping Gazebo Utama"
                    value={formLocation}
                    onChange={(e) => setFormLocation(e.target.value)}
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-lg text-sm text-stone-900 focus:outline-none focus:border-emerald-800"
                  />
                </div>
              </div>

              <div>
                <label className="block text-stone-700 font-semibold mb-1">
                  Tagline / Ringkasan Menarik
                </label>
                <input
                  type="text"
                  placeholder="Contoh: Tempat rekreasi air ramah keluarga dengan panorama alam sejuk"
                  value={formTagline}
                  onChange={(e) => setFormTagline(e.target.value)}
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-lg text-sm text-stone-900 focus:outline-none focus:border-emerald-800"
                />
              </div>

              <div>
                <label className="block text-stone-700 font-semibold mb-1">
                  Deskripsi Lengkap *
                </label>
                <textarea
                  required
                  rows={3}
                  placeholder="Jelaskan fungsi, keunggulan, serta daya tarik fasilitas ini bagi pengunjung..."
                  value={formDescription}
                  onChange={(e) => setFormDescription(e.target.value)}
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-lg text-sm text-stone-900 focus:outline-none focus:border-emerald-800 leading-relaxed"
                />
              </div>

              <div>
                <label className="block text-stone-700 font-semibold mb-1">
                  Fitur & Keunggulan (Pisahkan dengan koma)
                </label>
                <input
                  type="text"
                  placeholder="Contoh: Toilet Bersih, Gazebo Teduh, Tempat Parkir, Air Mengalir"
                  value={formFeaturesText}
                  onChange={(e) => setFormFeaturesText(e.target.value)}
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-lg text-sm text-stone-900 focus:outline-none focus:border-emerald-800"
                />
              </div>

              <div>
                <label className="block text-stone-700 font-semibold mb-1">
                  URL Foto Fasilitas (Opsional)
                </label>
                <input
                  type="url"
                  placeholder="https://... atau biarkan kosong untuk kartu ilustrasi visual"
                  value={formImage}
                  onChange={(e) => setFormImage(e.target.value)}
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-lg text-sm text-stone-900 focus:outline-none focus:border-emerald-800 font-mono text-xs"
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="wheelchair"
                  checked={formWheelchair}
                  onChange={(e) => setFormWheelchair(e.target.checked)}
                  className="w-4 h-4 rounded text-emerald-800 focus:ring-emerald-800 cursor-pointer"
                />
                <label htmlFor="wheelchair" className="text-stone-700 font-medium cursor-pointer">
                  Akses Ramah Kursi Roda & Stroller (Tersedia jalur landai ramp)
                </label>
              </div>

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
                  <span>{editingFacilityId ? 'Simpan Perubahan' : 'Tambahkan Fasilitas'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Facility Detail Modal */}
      {activeFacility && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 sm:p-8 relative border border-stone-200 text-stone-900 shadow-2xl">
            <button
              onClick={() => setActiveFacility(null)}
              className="absolute top-4 right-4 p-2 text-stone-500 hover:text-stone-900 rounded-full hover:bg-stone-100 transition-colors cursor-pointer"
            >
              ✕
            </button>

            <div className="text-xs text-stone-500 mb-1 flex items-center gap-2">
              <span>{activeFacility.category}</span>
              <span aria-hidden="true">·</span>
              <span className="text-emerald-800 font-medium">{activeFacility.badge}</span>
            </div>

            <h3 className="text-2xl font-extrabold text-stone-900 mb-2">
              {activeFacility.name}
            </h3>

            {activeFacility.tagline && (
              <p className="text-stone-500 text-xs italic mb-4">
                "{activeFacility.tagline}"
              </p>
            )}

            <p className="text-stone-600 text-sm leading-relaxed mb-6">
              {activeFacility.description}
            </p>

            <div className="space-y-4 py-4 border-y border-stone-200 text-xs">
              <div className="flex justify-between items-center">
                <span className="text-stone-500">Jam Operasional:</span>
                <span className="font-semibold text-stone-800">{activeFacility.hours}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-stone-500">Lokasi Penempatan:</span>
                <span className="font-semibold text-stone-800 text-right">{activeFacility.location}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-stone-500">Aksesibilitas:</span>
                <span className="font-semibold text-emerald-800 text-right">
                  {activeFacility.wheelchairAccessible ? 'Tersedia Jalur Ramah Difabel' : 'Jalur Standar'}
                </span>
              </div>
            </div>

            <div className="mt-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-stone-900 mb-2">
                Fasilitas & Keunggulan
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-stone-600">
                {activeFacility.features.map((f, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                    <span>{f}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 flex justify-end">
              <button
                onClick={() => setActiveFacility(null)}
                className="px-5 py-2 text-xs font-semibold text-stone-700 bg-stone-100 hover:bg-stone-200 rounded-lg transition-colors cursor-pointer"
              >
                Tutup Rincian
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
