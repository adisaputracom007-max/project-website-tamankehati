import React, { useState, useEffect } from 'react';
import { Globe, ShieldCheck, CheckCircle2, Copy, Check, ExternalLink, Sparkles, Clock, Sun } from 'lucide-react';

interface DomainBannerProps {
  onOpenDomainDetails: () => void;
}

export const DomainBanner: React.FC<DomainBannerProps> = ({ onOpenDomainDetails }) => {
  const [copied, setCopied] = useState(false);
  const [activeUrl, setActiveUrl] = useState('');
  const [hostname, setHostname] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const origin = window.location.origin;
      const host = window.location.hostname;
      setActiveUrl(origin);
      setHostname(host);
    }
  }, []);

  const handleCopy = () => {
    if (activeUrl) {
      navigator.clipboard.writeText(activeUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="bg-stone-900 text-stone-200 border-b border-stone-800 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
        <div className="flex flex-wrap items-center justify-between gap-y-2 gap-x-4">
          {/* Domain Status */}
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 text-emerald-400 font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              Domain Resmi Aktif
            </span>
            <span className="text-stone-600 hidden sm:inline">|</span>
            <span className="font-mono text-stone-300 truncate max-w-[200px] sm:max-w-xs md:max-w-md">
              {hostname || 'tamankehati.mesujikab.go.id'}
            </span>
            <button
              onClick={handleCopy}
              title="Salin Alamat Domain Lengkap"
              className="p-1 hover:text-white transition-colors text-stone-400"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
            <button
              onClick={onOpenDomainDetails}
              className="text-stone-400 hover:text-stone-200 underline underline-offset-2 ml-1 cursor-pointer"
            >
              Info Server & SSL
            </button>
          </div>

          {/* Park Quick Operational Info */}
          <div className="flex items-center gap-4 text-stone-400">
            <div className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-amber-400" />
              <span>Hari Ini: <strong className="text-stone-200 font-medium">08:00 - 17:00 WIB</strong></span>
            </div>
            <span className="text-stone-700 hidden md:inline">|</span>
            <div className="hidden md:flex items-center gap-1.5">
              <Sun className="w-3.5 h-3.5 text-amber-300" />
              <span>Mesuji, Lampung: 28°C Tropis Cerah</span>
            </div>
            <span className="text-stone-700 hidden lg:inline">|</span>
            <div className="hidden lg:flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Pemerintah Kabupaten Mesuji</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
