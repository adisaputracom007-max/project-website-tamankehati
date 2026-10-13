import React from 'react';
import { ShieldCheck, LogOut, Lock, Plus } from 'lucide-react';
import { useAdmin } from '../context/AdminContext';
import { NavTabKey } from './Navbar';

interface AdminBannerProps {
  onSelectTab?: (tab: NavTabKey) => void;
}

export const AdminBanner: React.FC<AdminBannerProps> = ({ onSelectTab }) => {
  const { isAdmin, logout, openLoginModal } = useAdmin();

  if (!isAdmin) {
    return null;
  }

  return (
    <div className="bg-amber-600 text-amber-950 px-4 py-2 text-xs font-medium shadow-inner border-b border-amber-700/30">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-950 animate-ping inline-block" />
          <span className="font-bold text-white uppercase tracking-wide">
            Mode Admin Pengelola Aktif
          </span>
          <span className="hidden md:inline text-amber-100">·</span>
          <span className="hidden md:inline text-amber-100">
            Dinas Lingkungan Hidup Kab. Mesuji (Hak Akses Tambah, Edit & Hapus Terbuka)
          </span>
        </div>

        <div className="flex items-center gap-2">
          {onSelectTab && (
            <>
              <button
                onClick={() => onSelectTab('satwa')}
                className="px-2.5 py-1 bg-amber-700/80 hover:bg-amber-800 text-white rounded font-semibold transition-colors cursor-pointer flex items-center gap-1"
              >
                <Plus className="w-3 h-3" />
                <span>Kelola Satwa</span>
              </button>
              <button
                onClick={() => onSelectTab('fasilitas')}
                className="px-2.5 py-1 bg-amber-700/80 hover:bg-amber-800 text-white rounded font-semibold transition-colors cursor-pointer flex items-center gap-1"
              >
                <Plus className="w-3 h-3" />
                <span>Kelola Fasilitas</span>
              </button>
            </>
          )}

          <button
            onClick={logout}
            className="px-2.5 py-1 bg-white hover:bg-stone-100 text-stone-900 rounded font-semibold transition-colors cursor-pointer flex items-center gap-1 shadow-xs ml-1"
            title="Kunci kembali ke mode public / pengunjung biasa"
          >
            <LogOut className="w-3 h-3 text-stone-700" />
            <span>Kunci / Keluar Admin</span>
          </button>
        </div>
      </div>
    </div>
  );
};
