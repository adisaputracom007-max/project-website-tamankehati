import React, { useState } from 'react';
import { ShieldCheck, AlertTriangle, Car, Bus, HelpCircle, ChevronDown, ChevronUp, Star, Send, Check, MapPin, ExternalLink } from 'lucide-react';
import { MESUJI_MAPS_URL } from './Navbar';

export const VisitorGuide: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [reviews, setReviews] = useState([
    {
      name: 'Dr. Hendra Gunawan',
      role: 'Pakar Konservasi Hayati',
      rating: 5,
      date: 'Oktober 2026',
      comment: 'Standardisasi kandang terbuka dan penataan habitat sangat mengagumkan. Harimau Sumatera tampak aktif dan sehat tanpa tanda stres.'
    },
    {
      name: 'Rina Kusuma Dewi',
      role: 'Wisatawan Keluarga (Jakarta)',
      rating: 5,
      date: 'September 2026',
      comment: 'Anak-anak sangat bahagia naik Sky Gondola dan Safari Tram listrik. Pemandunya sangat menguasai materi edukasi dan ramah.'
    },
    {
      name: 'Bima Satrio',
      role: 'Fotografer Satwa Liar',
      rating: 5,
      date: 'Agustus 2026',
      comment: 'Pencahayaan kanopi dan sudut observasi Aviarium Kubah juara dunia! Tiket online barcode langsung bisa dipakai masuk tanpa antre.'
    }
  ]);

  const [newReviewName, setNewReviewName] = useState('');
  const [newReviewComment, setNewReviewComment] = useState('');
  const [newReviewRating, setNewReviewRating] = useState(5);
  const [submittedReview, setSubmittedReview] = useState(false);

  const faqs = [
    {
      q: 'Berapa luas kawasan Taman Kehati Kabupaten Mesuji?',
      a: 'Taman Kehati Mesuji memiliki luas lahan kurang lebih 10 hektar yang difungsikan sebagai kawasan perlindungan keanekaragaman hayati, embung penampungan air tawar, penangkaran satwa dan flora lokal, serta ruang rekreasi hijau masyarakat.'
    },
    {
      q: 'Kapan jam operasional kunjungan Taman Kehati Mesuji?',
      a: 'Taman Kehati Mesuji buka setiap hari mulai pukul 08:00 hingga 17:00 WIB. Disarankan berkunjung pada pagi atau sore hari untuk menikmati suasana danau embung dan kicau burung yang teduh.'
    },
    {
      q: 'Apakah fasilitas ramah untuk bayi (stroller) dan lansia / kursi roda?',
      a: 'Ya, jalur pedestrian utama, area gazebo, dan mushola dilengkapi akses ramah kursi roda dan stroller anak.'
    },
    {
      q: 'Apakah diperbolehkan membawa makanan dari luar?',
      a: 'Pengunjung dipersilakan membawa bekal keluarga untuk disantap di gazebo tepi embung, dengan kewajiban membuang sampah pada tempat yang telah disediakan demi menjaga kebersihan ekosistem.'
    }
  ];

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReviewName || !newReviewComment) return;
    setReviews([
      {
        name: newReviewName,
        role: 'Pengunjung Terverifikasi',
        rating: newReviewRating,
        date: 'Hari Ini',
        comment: newReviewComment
      },
      ...reviews
    ]);
    setNewReviewName('');
    setNewReviewComment('');
    setSubmittedReview(true);
    setTimeout(() => setSubmittedReview(false), 3000);
  };

  return (
    <section id="panduan" className="py-20 bg-white text-stone-900 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-800 mb-2">
            <span>Informasi & Pengalaman Wisata</span>
            <span aria-hidden="true">·</span>
            <span>Panduan Kunjungan</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-stone-900 [text-wrap:balance]">
            Tata Tertib & Panduan Menuju Lokasi
          </h2>
          <p className="text-stone-600 text-sm sm:text-base mt-2">
            Pastikan liburan Anda bersama keluarga berjalan menyenangkan, aman, dan tetap mendukung kelestarian margasatwa nusantara.
          </p>
        </div>

        {/* 2 Column Guide: Rules and Transportation */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {/* Rules & Etiquette */}
          <div className="bg-stone-50 rounded-2xl border border-stone-200 p-6 sm:p-8">
            <h3 className="text-lg font-bold text-stone-900 mb-4 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-800" />
              <span>Tata Tertib Demi Keselamatan Satwa & Tamu</span>
            </h3>

            <div className="space-y-4 text-xs sm:text-sm text-stone-600">
              <div className="flex items-start gap-3">
                <span className="font-bold text-stone-900">01.</span>
                <p>
                  <strong className="text-stone-800">Dilarang Membunyikan Klakson / Suara Bising:</strong> Satwa memiliki pendengaran sensitif. Jaga ketenangan selama melintasi zona rimba.
                </p>
              </div>

              <div className="flex items-start gap-3">
                <span className="font-bold text-stone-900">02.</span>
                <p>
                  <strong className="text-stone-800">Pemberian Pakan Khusus Petugas:</strong> Jangan melempar plastik atau makanan manusia ke dalam habitat satwa.
                </p>
              </div>

              <div className="flex items-start gap-3">
                <span className="font-bold text-stone-900">03.</span>
                <p>
                  <strong className="text-stone-800">Kawasan Bebas Asap Rokok 100%:</strong> Merokok dan rokok elektrik hanya diizinkan di titik khusus designated smoking area di luar plaza satwa.
                </p>
              </div>

              <div className="flex items-start gap-3">
                <span className="font-bold text-stone-900">04.</span>
                <p>
                  <strong className="text-stone-800">Dilarang Menyalakan Flash Kamera di Zona Nokturnal:</strong> Lindungi mata satwa nokturnal dari kilatan cahaya mendadak.
                </p>
              </div>
            </div>
          </div>

          {/* Access & Transportation */}
          <div className="bg-stone-50 rounded-2xl border border-stone-200 p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <h3 className="text-lg font-bold text-stone-900 mb-4 flex items-center gap-2">
                <Car className="w-5 h-5 text-emerald-800" />
                <span>Akses Jalan & Rute Navigasi</span>
              </h3>

              <div className="space-y-4 text-xs sm:text-sm text-stone-600">
                <div>
                  <h4 className="font-bold text-stone-900 mb-1 flex items-center gap-2">
                    <Car className="w-4 h-4 text-stone-500" />
                    <span>Kendaraan Pribadi via Tol Trans-Sumatera (JTTS):</span>
                  </h4>
                  <p className="leading-relaxed">
                    Gunakan Jalan Tol Terbanggi Besar - Pematang Panggang - Kayu Agung (Terpeka) dan ambil Gerbang Tol Simpang Pematang (KM 218), kemudian arahkan kendaraan ke Kompleks Taman Kehati Mekar Jaya, Kabupaten Mesuji (~15 menit perjalanan).
                  </p>
                </div>

                <div className="pt-2 border-t border-stone-200/60">
                  <h4 className="font-bold text-stone-900 mb-1 flex items-center gap-2">
                    <Bus className="w-4 h-4 text-stone-500" />
                    <span>Akses Rute Antar-Kota & Terminal:</span>
                  </h4>
                  <p className="leading-relaxed">
                    Dari Terminal Simpang Pematang atau Pasar Brabasan Mesuji, tersedia angkutan kawasan dan ojek lokal terdaftar yang melayani rute langsung menuju pintu masuk Taman Kehati.
                  </p>
                </div>
              </div>
            </div>

            {/* Google Maps Direct Button */}
            <div className="mt-6 pt-4 border-t border-stone-200">
              <a
                href={MESUJI_MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-4 bg-emerald-900 hover:bg-emerald-800 text-white rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-sm transition-all"
              >
                <MapPin className="w-4 h-4 text-emerald-300" />
                <span>Buka Rute di Google Maps (Taman Kehati Mesuji)</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
              <div className="flex items-center justify-between text-[11px] text-stone-500 mt-2">
                <span>Koordinat: -3.9531075, 105.3248656</span>
                <span className="font-medium text-emerald-800">Luas: Kurang lebih 10 Hektar</span>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Accordion */}
        <div className="max-w-3xl mx-auto mb-16">
          <h3 className="text-xl font-bold text-stone-900 text-center mb-6">
            Pertanyaan yang Sering Diajukan (FAQ)
          </h3>
          <div className="space-y-3">
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div
                  key={index}
                  className="rounded-xl border border-stone-200 bg-stone-50/50 overflow-hidden"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    className="w-full px-5 py-4 text-left flex items-center justify-between text-sm font-bold text-stone-900 hover:text-emerald-900 transition-colors cursor-pointer"
                  >
                    <span>{faq.q}</span>
                    {isOpen ? <ChevronUp className="w-4 h-4 shrink-0 text-stone-400" /> : <ChevronDown className="w-4 h-4 shrink-0 text-stone-400" />}
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-4 text-xs sm:text-sm text-stone-600 leading-relaxed border-t border-stone-200/60 pt-3">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Visitor Reviews & Real Experience Feed */}
        <div className="pt-12 border-t border-stone-200">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
            <div>
              <h3 className="text-2xl font-bold text-stone-900">
                Ulasan & Pengalaman Pengunjung
              </h3>
              <p className="text-stone-500 text-xs sm:text-sm mt-1">
                Kesan asli dari para pecinta satwa, fotografer alam, dan wisatawan keluarga.
              </p>
            </div>
            <div className="flex items-center gap-1.5 text-amber-500">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
              ))}
              <span className="text-stone-900 font-bold font-mono text-sm ml-1">4.9 / 5.0</span>
              <span className="text-stone-500 text-xs">(12.480+ Ulasan)</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            {reviews.map((rev, i) => (
              <div key={i} className="p-5 rounded-xl border border-stone-200 bg-stone-50/50 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex gap-0.5 text-amber-500">
                      {[...Array(rev.rating)].map((_, idx) => (
                        <Star key={idx} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <span className="text-[11px] font-mono text-stone-400">{rev.date}</span>
                  </div>
                  <p className="text-stone-700 text-xs sm:text-sm leading-relaxed italic mb-4">
                    "{rev.comment}"
                  </p>
                </div>
                <div className="pt-3 border-t border-stone-200/60">
                  <h4 className="font-bold text-stone-900 text-xs">{rev.name}</h4>
                  <p className="text-[11px] text-stone-500">{rev.role}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Review Form */}
          <div className="bg-stone-50 rounded-2xl border border-stone-200 p-6 max-w-2xl mx-auto">
            <h4 className="text-sm font-bold uppercase tracking-wider text-stone-900 mb-2">
              Bagikan Pengalaman Berkunjung Anda
            </h4>
            <form onSubmit={handleReviewSubmit} className="space-y-3 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  type="text"
                  required
                  placeholder="Nama Lengkap Anda..."
                  value={newReviewName}
                  onChange={(e) => setNewReviewName(e.target.value)}
                  className="px-3 py-2 bg-white border border-stone-300 rounded-lg text-stone-900 focus:outline-none focus:border-emerald-800"
                />
                <div className="flex items-center gap-2 bg-white border border-stone-300 rounded-lg px-3 py-2">
                  <span className="text-stone-500">Rating:</span>
                  <select
                    value={newReviewRating}
                    onChange={(e) => setNewReviewRating(Number(e.target.value))}
                    className="bg-transparent font-bold text-stone-800 focus:outline-none cursor-pointer"
                  >
                    <option value={5}>⭐⭐⭐⭐⭐ (5 Bintang)</option>
                    <option value={4}>⭐⭐⭐⭐ (4 Bintang)</option>
                    <option value={3}>⭐⭐⭐ (3 Bintang)</option>
                  </select>
                </div>
              </div>

              <textarea
                required
                rows={2}
                placeholder="Tulis ulasan Anda mengenai satwa, kebersihan fasilitas, atau keramahan ranger..."
                value={newReviewComment}
                onChange={(e) => setNewReviewComment(e.target.value)}
                className="w-full px-3 py-2 bg-white border border-stone-300 rounded-lg text-stone-900 focus:outline-none focus:border-emerald-800"
              />

              <div className="flex items-center justify-between">
                {submittedReview && (
                  <span className="text-emerald-700 font-medium flex items-center gap-1">
                    <Check className="w-4 h-4" /> Ulasan Anda berhasil diterbitkan!
                  </span>
                )}
                {!submittedReview && <span className="text-stone-400">Ulasan akan ditampilkan ke publik.</span>}

                <button
                  type="submit"
                  className="px-4 py-2 bg-emerald-900 hover:bg-emerald-800 text-white font-bold rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Kirim Ulasan</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
