import React, { useState } from 'react';
import { X, Volume2, VolumeX, Heart, Clock, Scale, Calendar, MapPin, ShieldAlert, Sparkles, AlertCircle } from 'lucide-react';
import { Animal } from '../data/animalsData';

interface AnimalDetailModalProps {
  animal: Animal | null;
  onClose: () => void;
  onBookmarkToggle?: (id: string) => void;
  isBookmarked?: boolean;
}

export const AnimalDetailModal: React.FC<AnimalDetailModalProps> = ({
  animal,
  onClose,
  onBookmarkToggle,
  isBookmarked = false
}) => {
  const [isPlayingSound, setIsPlayingSound] = useState(false);

  if (!animal) return null;

  const handlePlaySound = () => {
    setIsPlayingSound(true);
    // Visual sound indicator timeout
    setTimeout(() => {
      setIsPlayingSound(false);
    }, 3500);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/70 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div
        className="relative bg-white rounded-2xl max-w-3xl w-full overflow-hidden shadow-2xl border border-stone-200 text-stone-900 my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-stone-900/60 hover:bg-stone-900 text-white transition-colors cursor-pointer"
          aria-label="Tutup Detail Satwa"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header Image */}
        <div className="relative h-64 sm:h-80 w-full overflow-hidden bg-emerald-950 flex items-center justify-center">
          {animal.image ? (
            <img
              src={animal.image}
              alt={animal.name}
              className="w-full h-full object-cover object-center"
              referrerPolicy="no-referrer"
              onError={(e) => {
                (e.target as HTMLElement).style.display = 'none';
              }}
            />
          ) : (
            <div className="text-center p-6 text-emerald-200">
              <span className="text-4xl block mb-2">🌿</span>
              <span className="text-sm font-semibold tracking-wider uppercase font-mono">
                Taman Kehati Kabupaten Mesuji
              </span>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950/90 via-stone-950/30 to-transparent" />

          {/* Overlay info */}
          <div className="absolute bottom-4 left-6 right-6 text-white">
            <div className="flex items-center gap-2 text-xs font-mono text-emerald-300 mb-1">
              <span>{animal.category}</span>
              <span aria-hidden="true">·</span>
              <span className="italic">{animal.scientificName}</span>
              <span aria-hidden="true">·</span>
              <span>Status: {animal.iucnStatus}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
              {animal.name}
            </h2>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-6 max-h-[60vh] overflow-y-auto">
          {/* Metadata quick stats in clean unboxed typographic layout */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-4 border-y border-stone-200 text-xs">
            <div>
              <span className="text-stone-500 block mb-0.5">Habitat Kawasan</span>
              <span className="font-semibold text-stone-800">{animal.habitat}</span>
            </div>
            <div>
              <span className="text-stone-500 block mb-0.5">Pola Makan</span>
              <span className="font-semibold text-stone-800">{animal.diet}</span>
            </div>
            <div>
              <span className="text-stone-500 block mb-0.5">Berat Rata-rata</span>
              <span className="font-semibold font-mono tabular-nums text-stone-800">{animal.weight}</span>
            </div>
            <div>
              <span className="text-stone-500 block mb-0.5">Harapan Hidup</span>
              <span className="font-semibold font-mono tabular-nums text-stone-800">{animal.lifespan}</span>
            </div>
          </div>

          {/* Description */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-stone-900 mb-2">
              Karakteristik & Perilaku Alami
            </h3>
            <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
              {animal.description}
            </p>
          </div>

          {/* Fun Fact */}
          <div className="p-4 bg-amber-50/70 border border-amber-200 rounded-xl">
            <div className="flex items-center gap-2 text-amber-900 font-semibold text-xs tracking-wider uppercase mb-1">
              <Sparkles className="w-4 h-4 text-amber-600" />
              <span>Fakta Unik Lapangan</span>
            </div>
            <p className="text-stone-700 text-sm italic">
              "{animal.funFact}"
            </p>
          </div>

          {/* Feeding time & Sound preview */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 bg-emerald-50/60 border border-emerald-200 rounded-xl">
              <div className="flex items-center gap-2 text-emerald-900 font-semibold text-xs tracking-wider uppercase mb-1">
                <Clock className="w-4 h-4 text-emerald-700" />
                <span>Jadwal Feeding / Edukasi</span>
              </div>
              <p className="text-stone-800 text-sm font-medium">
                {animal.feedingTime}
              </p>
              <p className="text-stone-500 text-xs mt-1">
                Pengunjung dapat menyaksikan keeper berinteraksi dari dek observasi.
              </p>
            </div>

            <div className="p-4 bg-stone-50 border border-stone-200 rounded-xl flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-stone-900 font-semibold text-xs tracking-wider uppercase mb-1">
                  <Volume2 className="w-4 h-4 text-stone-600" />
                  <span>Karakter Suara Satwa</span>
                </div>
                <p className="text-stone-700 text-xs">
                  {animal.soundCue}
                </p>
              </div>

              <div className="mt-3 pt-2">
                <button
                  onClick={handlePlaySound}
                  className="w-full py-2 px-3 text-xs font-semibold rounded-lg bg-stone-900 text-white hover:bg-stone-800 transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  {isPlayingSound ? (
                    <>
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                      <span>Memutar Simulasi Bio-Akustik...</span>
                    </>
                  ) : (
                    <>
                      <Volume2 className="w-3.5 h-3.5" />
                      <span>Dengarkan Karakter Vokalisasi</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Conservation Action */}
          <div className="p-4 bg-stone-50 border border-stone-200 rounded-xl">
            <div className="flex items-center gap-2 text-stone-900 font-semibold text-xs tracking-wider uppercase mb-1">
              <ShieldAlert className="w-4 h-4 text-emerald-700" />
              <span>Upaya Konservasi Rimba Nusantara</span>
            </div>
            <p className="text-stone-600 text-xs sm:text-sm">
              {animal.conservationAction}
            </p>
          </div>
        </div>

        {/* Footer actions */}
        <div className="p-4 sm:px-8 bg-stone-50 border-t border-stone-200 flex items-center justify-between">
          <span className="text-xs text-stone-500">
            Asal Habitat: <strong className="text-stone-700">{animal.origin}</strong>
          </span>

          <button
            onClick={onClose}
            className="px-5 py-2 text-xs font-semibold text-stone-700 hover:text-stone-900 bg-white border border-stone-300 rounded-lg hover:bg-stone-100 transition-colors cursor-pointer"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};
