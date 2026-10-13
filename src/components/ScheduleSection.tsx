import React, { useState } from 'react';
import { Clock, MapPin, Calendar, Sparkles, Bell, CheckCircle2 } from 'lucide-react';
import { SCHEDULE_SHOWS } from '../data/parkMapData';

export const ScheduleSection: React.FC = () => {
  const [filterCategory, setFilterCategory] = useState<string>('Semua');
  const [remindedShows, setRemindedShows] = useState<Record<string, boolean>>({});

  const categories = ['Semua', 'Feeding Show', 'Edukasi Satwa', 'Atraksi Bebas', 'Special Night Event'];

  const filteredShows = SCHEDULE_SHOWS.filter(
    (item) => filterCategory === 'Semua' || item.category === filterCategory
  );

  const toggleReminder = (id: string) => {
    setRemindedShows((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  return (
    <section id="jadwal" className="py-20 bg-stone-50 text-stone-900 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-800 mb-2">
              <span>Agenda Harian Taman Kehati</span>
              <span aria-hidden="true">·</span>
              <span>Aktivitas Edukasi & Pengamatan Satwa</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-stone-900 [text-wrap:balance]">
              Jadwal Pertunjukan & Sesi Pemberian Pakan
            </h2>
            <p className="text-stone-600 text-sm sm:text-base mt-2 max-w-2xl">
              Jangan lewatkan interaksi edukatif dengan satwa dan penjaga satwa profesional. Seluruh sesi ramah satwa dan bebas eksploitasi.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs text-stone-600">
            <Clock className="w-4 h-4 text-emerald-800" />
            <span>Disarankan tiba di lokasi panggung 15 menit sebelum acara dimulai</span>
          </div>
        </div>

        {/* Filter categories */}
        <div className="flex items-center gap-1.5 p-1 bg-stone-200/80 rounded-xl max-w-max mb-10 overflow-x-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilterCategory(cat)}
              className={`px-4 py-2 text-xs sm:text-sm font-medium rounded-lg transition-all whitespace-nowrap shrink-0 cursor-pointer ${
                filterCategory === cat
                  ? 'bg-white text-emerald-950 shadow-sm font-semibold'
                  : 'text-stone-600 hover:text-stone-900 hover:bg-stone-200/50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Timeline Schedule Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredShows.map((show) => {
            const isReminded = remindedShows[show.id];
            return (
              <div
                key={show.id}
                className="bg-white rounded-xl border border-stone-200 p-6 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow relative overflow-hidden"
              >
                <div>
                  {/* Top Bar with Time and category */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="font-mono text-base font-bold text-emerald-800 tabular-nums">
                      {show.time}
                    </span>
                    <span className="text-xs text-stone-500 font-medium">
                      {show.duration}
                    </span>
                  </div>

                  {/* Clean unboxed category */}
                  <div className="text-xs text-stone-500 font-medium mb-1">
                    {show.category}
                  </div>

                  <h3 className="text-lg font-bold text-stone-900 mb-2 leading-snug">
                    {show.title}
                  </h3>

                  <p className="text-stone-600 text-xs sm:text-sm leading-relaxed mb-4">
                    {show.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-stone-100 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1.5 text-stone-500 truncate max-w-[180px]">
                    <MapPin className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                    <span className="truncate">{show.location}</span>
                  </div>

                  <button
                    onClick={() => toggleReminder(show.id)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
                      isReminded
                        ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                        : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
                    }`}
                  >
                    {isReminded ? (
                      <>
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
                        <span>Tersimpan</span>
                      </>
                    ) : (
                      <>
                        <Bell className="w-3.5 h-3.5" />
                        <span>Pasang Pengingat</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
