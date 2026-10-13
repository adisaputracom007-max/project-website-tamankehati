import React, { useState, useEffect } from 'react';
import { X, Globe, ShieldCheck, Check, Copy, ExternalLink, Server, Wifi, QrCode } from 'lucide-react';

interface DomainModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DomainModal: React.FC<DomainModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);
  const [currentUrl, setCurrentUrl] = useState('');
  const [hostname, setHostname] = useState('');
  const [protocol, setProtocol] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setCurrentUrl(window.location.href);
      setHostname(window.location.hostname);
      setProtocol(window.location.protocol);
    }
  }, []);

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(currentUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/75 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div
        className="relative bg-white rounded-2xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-stone-200 text-stone-900"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-stone-400 hover:text-stone-800 rounded-lg hover:bg-stone-100 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
            <Globe className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-stone-900">
              Status Domain & Jaringan Aktif
            </h3>
            <p className="text-xs text-stone-500">
              Informasi domain resmi dan konektivitas web wisata
            </p>
          </div>
        </div>

        {/* Current Active Domain Box */}
        <div className="p-4 bg-stone-50 rounded-xl border border-stone-200 mb-6">
          <div className="text-[11px] font-bold uppercase tracking-wider text-stone-500 mb-1">
            Alamat Domain Aktif Saat Ini
          </div>
          <div className="flex items-center justify-between gap-2">
            <span className="font-mono text-sm font-semibold text-emerald-900 truncate">
              {currentUrl || 'https://rimbanusantara.id'}
            </span>
            <button
              onClick={handleCopy}
              className="px-3 py-1.5 text-xs font-semibold bg-white border border-stone-300 rounded-lg text-stone-700 hover:bg-stone-100 flex items-center gap-1.5 shrink-0 cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-700" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Tersalin' : 'Salin URL'}</span>
            </button>
          </div>
        </div>

        {/* Technical specs */}
        <div className="space-y-3 text-xs mb-6">
          <div className="flex items-center justify-between p-2.5 rounded-lg bg-stone-50 border border-stone-100">
            <span className="flex items-center gap-2 text-stone-600">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Sertifikat SSL / HTTPS</span>
            </span>
            <span className="font-mono font-semibold text-emerald-700">Aktif & Terenkripsi (TLS 1.3)</span>
          </div>

          <div className="flex items-center justify-between p-2.5 rounded-lg bg-stone-50 border border-stone-100">
            <span className="flex items-center gap-2 text-stone-600">
              <Server className="w-4 h-4 text-emerald-600" />
              <span>Status Server Host</span>
            </span>
            <span className="font-mono font-semibold text-stone-800">Online 99.98% Uptime</span>
          </div>

          <div className="flex items-center justify-between p-2.5 rounded-lg bg-stone-50 border border-stone-100">
            <span className="flex items-center gap-2 text-stone-600">
              <Wifi className="w-4 h-4 text-emerald-600" />
              <span>Kecepatan Respon CDN</span>
            </span>
            <span className="font-mono font-semibold text-stone-800">28 ms (Edge Asia-Southeast)</span>
          </div>
        </div>

        {/* QR Code for smartphone testing */}
        <div className="p-4 bg-emerald-50/70 border border-emerald-200 rounded-xl flex items-center gap-4">
          <div className="p-2 bg-white rounded-lg border border-emerald-200 shrink-0">
            <svg className="w-14 h-14 text-stone-900" viewBox="0 0 100 100" fill="currentColor">
              <rect x="10" y="10" width="25" height="25" />
              <rect x="65" y="10" width="25" height="25" />
              <rect x="10" y="65" width="25" height="25" />
              <rect x="15" y="15" width="15" height="15" fill="white" />
              <rect x="70" y="15" width="15" height="15" fill="white" />
              <rect x="15" y="70" width="15" height="15" fill="white" />
              <rect x="19" y="19" width="7" height="7" fill="black" />
              <rect x="74" y="19" width="7" height="7" fill="black" />
              <rect x="19" y="74" width="7" height="7" fill="black" />
              <rect x="45" y="10" width="8" height="20" />
              <rect x="45" y="45" width="25" height="8" />
              <rect x="75" y="60" width="15" height="15" />
              <rect x="45" y="75" width="15" height="15" />
            </svg>
          </div>
          <div className="text-xs text-stone-700">
            <p className="font-bold text-emerald-950 mb-0.5">Buka di Smartphone / Bagikan</p>
            <p className="text-stone-600 leading-relaxed text-[11px]">
              Pindai QR ini langsung menggunakan kamera HP Anda untuk mengakses website wisata ini secara online dengan domain aktif.
            </p>
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 text-xs font-semibold text-stone-700 bg-stone-100 hover:bg-stone-200 rounded-lg transition-colors cursor-pointer"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};
