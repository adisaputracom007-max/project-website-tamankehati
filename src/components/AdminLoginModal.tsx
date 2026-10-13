import React, { useState } from 'react';
import { Lock, ShieldCheck, X, KeyRound, AlertCircle, CheckCircle2 } from 'lucide-react';
import { useAdmin } from '../context/AdminContext';

export const AdminLoginModal: React.FC = () => {
  const { isLoginModalOpen, closeLoginModal, login } = useAdmin();
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  if (!isLoginModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (login(password)) {
      setSuccess(true);
      setError(false);
      setTimeout(() => {
        setSuccess(false);
        setPassword('');
      }, 500);
    } else {
      setError(true);
      setSuccess(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/70 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl border border-stone-200 overflow-hidden">
        {/* Header */}
        <div className="bg-emerald-950 text-white p-6 relative">
          <button
            onClick={closeLoginModal}
            className="absolute top-4 right-4 p-1.5 rounded-lg text-emerald-300 hover:text-white hover:bg-emerald-900/50 transition-colors cursor-pointer"
            aria-label="Tutup"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="w-12 h-12 rounded-xl bg-emerald-800/80 border border-emerald-700/50 flex items-center justify-center mb-3">
            <Lock className="w-6 h-6 text-emerald-300" />
          </div>
          <h3 className="text-xl font-bold">Akses Pengelola / Admin</h3>
          <p className="text-emerald-200 text-xs mt-1">
            Dinas Lingkungan Hidup Kabupaten Mesuji (Taman Kehati)
          </p>
        </div>

        {/* Content */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="text-xs text-stone-600 leading-relaxed bg-stone-50 p-3.5 rounded-xl border border-stone-200/80">
            <p className="font-semibold text-stone-800 mb-1 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-700" />
              <span>Proteksi Halaman Publik</span>
            </p>
            Pengunjung umum hanya dapat melihat data secara publik (*read-only*). Masukkan PIN / Kata Sandi admin pengelola untuk menambah, mengubah, atau menghapus daftar satwa dan fasilitas.
          </div>

          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1.5">
              PIN / Kata Sandi Admin:
            </label>
            <div className="relative">
              <KeyRound className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError(false);
                }}
                placeholder="Masukkan kata sandi admin..."
                autoFocus
                className="w-full pl-10 pr-4 py-2.5 bg-white border border-stone-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-700/30 focus:border-emerald-700 transition-all font-mono"
              />
            </div>
            {error && (
              <p className="text-xs text-rose-600 mt-2 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>Kata sandi salah. Coba: <strong>admin123</strong> atau <strong>kehatimesuji</strong></span>
              </p>
            )}
            {success && (
              <p className="text-xs text-emerald-700 mt-2 flex items-center gap-1 font-semibold">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Berhasil masuk sebagai Admin Pengelola!</span>
              </p>
            )}
          </div>

          <div className="pt-2 flex items-center justify-between text-xs text-stone-500 border-t border-stone-100">
            <span>PIN Pengelola: <strong>admin123</strong></span>
            <button
              type="button"
              onClick={() => setPassword('admin123')}
              className="text-emerald-700 hover:text-emerald-900 font-medium underline cursor-pointer"
            >
              Gunakan Default
            </button>
          </div>

          {/* Action buttons */}
          <div className="pt-2 flex gap-3">
            <button
              type="button"
              onClick={closeLoginModal}
              className="flex-1 py-2.5 px-4 rounded-xl border border-stone-300 text-stone-700 text-sm font-semibold hover:bg-stone-50 transition-colors cursor-pointer"
            >
              Batal
            </button>
            <button
              type="submit"
              className="flex-1 py-2.5 px-4 rounded-xl bg-emerald-900 hover:bg-emerald-850 text-white text-sm font-semibold transition-colors shadow-sm cursor-pointer"
            >
              Masuk Mode Admin
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
