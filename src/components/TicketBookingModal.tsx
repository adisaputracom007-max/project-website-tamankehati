import React, { useState } from 'react';
import { X, Ticket, Check, Calendar, Users, ShieldCheck, Sparkles, QrCode, Printer, Download, CreditCard, ArrowRight, Clock, MapPin } from 'lucide-react';
import { TICKET_PACKAGES, ADDON_OPTIONS, TicketPackage } from '../data/ticketsData';

interface TicketBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultPackageId?: string;
}

export const TicketBookingModal: React.FC<TicketBookingModalProps> = ({
  isOpen,
  onClose,
  defaultPackageId = 'ticket-reguler'
}) => {
  const [selectedPackage, setSelectedPackage] = useState<TicketPackage>(
    TICKET_PACKAGES.find((p) => p.id === defaultPackageId) || TICKET_PACKAGES[0]
  );
  const [visitDate, setVisitDate] = useState<string>(() => {
    const today = new Date();
    today.setDate(today.getDate() + 1); // default tomorrow
    return today.toISOString().split('T')[0];
  });
  const [adultCount, setAdultCount] = useState<number>(2);
  const [childCount, setChildCount] = useState<number>(1);
  const [selectedAddons, setSelectedAddons] = useState<Record<string, number>>({});

  // Visitor Form
  const [visitorName, setVisitorName] = useState('');
  const [visitorPhone, setVisitorPhone] = useState('');
  const [visitorEmail, setVisitorEmail] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'qris' | 'va' | 'card'>('qris');

  // Booking Flow Steps: 1: 'select', 2: 'checkout', 3: 'success'
  const [bookingStep, setBookingStep] = useState<'select' | 'checkout' | 'success'>('select');
  const [confirmedBookingCode, setConfirmedBookingCode] = useState<string>('');

  if (!isOpen) return null;

  // Determine if chosen date is weekend
  const isWeekend = () => {
    if (!visitDate) return false;
    const day = new Date(visitDate).getDay();
    return day === 0 || day === 6; // Sunday or Saturday
  };

  const currentPricePerAdult = isWeekend() ? selectedPackage.priceWeekend : selectedPackage.priceWeekday;
  const currentPricePerChild = Math.round(currentPricePerAdult * 0.7); // 30% discount for children

  // Calculate Add-on totals
  const totalAddonPrice = Object.entries(selectedAddons).reduce((acc, [addonId, qty]) => {
    const addon = ADDON_OPTIONS.find((a) => a.id === addonId);
    return acc + (addon ? addon.price * qty : 0);
  }, 0);

  const subtotal = adultCount * currentPricePerAdult + childCount * currentPricePerChild + totalAddonPrice;
  const adminFee = 3500;
  const grandTotal = subtotal + adminFee;

  const handleAddonToggle = (addonId: string) => {
    setSelectedAddons((prev) => {
      const current = prev[addonId] || 0;
      if (current > 0) {
        const copy = { ...prev };
        delete copy[addonId];
        return copy;
      } else {
        return { ...prev, [addonId]: 1 };
      }
    });
  };

  const handleConfirmOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!visitorName || !visitorPhone || !visitorEmail) {
      alert('Harap lengkapi nama lengkap, nomor WhatsApp, dan email pemesan.');
      return;
    }
    const randomCode = 'RN-' + Math.floor(100000 + Math.random() * 900000);
    setConfirmedBookingCode(randomCode);
    setBookingStep('success');
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/75 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div
        className="relative bg-white rounded-2xl max-w-4xl w-full overflow-hidden shadow-2xl border border-stone-200 text-stone-900 my-4"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="px-6 py-4 bg-stone-900 text-white flex items-center justify-between border-b border-stone-800">
          <div className="flex items-center gap-2">
            <Ticket className="w-5 h-5 text-emerald-400" />
            <h2 className="text-base sm:text-lg font-bold">
              {bookingStep === 'success'
                ? 'E-Tiket Resmi Berhasil Diterbitkan'
                : 'Reservasi Tiket Taman Kehati Kabupaten Mesuji'}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-white rounded-lg hover:bg-stone-800 transition-colors cursor-pointer"
            aria-label="Tutup"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 max-h-[80vh] overflow-y-auto">
          {bookingStep === 'select' && (
            <div className="space-y-8">
              {/* Step 1: Package Selection */}
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 block mb-2">
                  Langkah 1: Pilih Paket Kunjungan
                </span>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {TICKET_PACKAGES.map((pkg) => {
                    const isSelected = selectedPackage.id === pkg.id;
                    return (
                      <div
                        key={pkg.id}
                        onClick={() => setSelectedPackage(pkg)}
                        className={`p-5 rounded-xl border transition-all cursor-pointer flex flex-col justify-between ${
                          isSelected
                            ? 'bg-emerald-50/60 border-emerald-700 ring-2 ring-emerald-700/20 shadow-sm'
                            : 'bg-stone-50 border-stone-200 hover:border-stone-300'
                        }`}
                      >
                        <div>
                          <div className="flex items-center justify-between text-xs mb-1">
                            <span className="font-semibold text-emerald-800">{pkg.badge}</span>
                            <span className="text-stone-500 font-mono">
                              {isWeekend() ? 'Tarif Weekend' : 'Tarif Weekday'}
                            </span>
                          </div>

                          <h3 className="text-base font-bold text-stone-900 mb-1">
                            {pkg.name}
                          </h3>

                          <p className="text-stone-600 text-xs mb-3">
                            {pkg.description}
                          </p>

                          <div className="text-base font-extrabold text-stone-900 font-mono tabular-nums mb-3">
                            Rp {(isWeekend() ? pkg.priceWeekend : pkg.priceWeekday).toLocaleString('id-ID')}
                            <span className="text-xs font-normal text-stone-500 font-sans"> / orang</span>
                          </div>

                          <ul className="space-y-1 text-xs text-stone-600 border-t border-stone-200/60 pt-2">
                            {pkg.benefits.slice(0, 3).map((b, i) => (
                              <li key={i} className="flex items-start gap-1.5">
                                <Check className="w-3.5 h-3.5 text-emerald-700 shrink-0 mt-0.5" />
                                <span>{b}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="mt-4 pt-2 text-right">
                          <span
                            className={`text-xs font-semibold px-3 py-1 rounded-md ${
                              isSelected
                                ? 'bg-emerald-800 text-white'
                                : 'bg-stone-200 text-stone-700'
                            }`}
                          >
                            {isSelected ? 'Dipilih' : 'Pilih Paket'}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Step 2: Date & Visitor Quantity */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-stone-200">
                {/* Date Picker */}
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-stone-800 block mb-2">
                    Langkah 2: Tanggal Kunjungan
                  </label>
                  <div className="relative">
                    <input
                      type="date"
                      value={visitDate}
                      min={new Date().toISOString().split('T')[0]}
                      onChange={(e) => setVisitDate(e.target.value)}
                      className="w-full px-4 py-2.5 bg-stone-50 border border-stone-300 rounded-lg text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-emerald-800/20 focus:border-emerald-800 font-mono"
                    />
                  </div>
                  <p className="text-xs text-stone-500 mt-1">
                    {isWeekend()
                      ? '📅 Tarif Akhir Pekan (Sabtu / Minggu / Hari Libur)'
                      : '📅 Tarif Hari Kerja (Senin - Jumat)'}
                  </p>
                </div>

                {/* Ticket Counters */}
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-stone-800 block mb-2">
                    Langkah 3: Jumlah Pengunjung
                  </span>
                  <div className="space-y-3">
                    {/* Dewasa */}
                    <div className="flex items-center justify-between p-2.5 bg-stone-50 rounded-lg border border-stone-200 text-xs">
                      <div>
                        <span className="font-bold text-stone-900 block">Dewasa</span>
                        <span className="text-stone-500 font-mono">
                          Rp {currentPricePerAdult.toLocaleString('id-ID')}
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <button
                          type="button"
                          onClick={() => setAdultCount(Math.max(1, adultCount - 1))}
                          className="w-7 h-7 rounded bg-white border border-stone-300 font-bold hover:bg-stone-100 flex items-center justify-center cursor-pointer"
                        >
                          -
                        </button>
                        <span className="font-mono font-bold text-sm min-w-6 text-center tabular-nums">
                          {adultCount}
                        </span>
                        <button
                          type="button"
                          onClick={() => setAdultCount(adultCount + 1)}
                          className="w-7 h-7 rounded bg-white border border-stone-300 font-bold hover:bg-stone-100 flex items-center justify-center cursor-pointer"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    {/* Anak-anak */}
                    <div className="flex items-center justify-between p-2.5 bg-stone-50 rounded-lg border border-stone-200 text-xs">
                      <div>
                        <span className="font-bold text-stone-900 block">Anak (Tinggi &lt; 120cm)</span>
                        <span className="text-stone-500 font-mono">
                          Rp {currentPricePerChild.toLocaleString('id-ID')} (Diskon 30%)
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <button
                          type="button"
                          onClick={() => setChildCount(Math.max(0, childCount - 1))}
                          className="w-7 h-7 rounded bg-white border border-stone-300 font-bold hover:bg-stone-100 flex items-center justify-center cursor-pointer"
                        >
                          -
                        </button>
                        <span className="font-mono font-bold text-sm min-w-6 text-center tabular-nums">
                          {childCount}
                        </span>
                        <button
                          type="button"
                          onClick={() => setChildCount(childCount + 1)}
                          className="w-7 h-7 rounded bg-white border border-stone-300 font-bold hover:bg-stone-100 flex items-center justify-center cursor-pointer"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Step 3: Add-ons */}
              <div className="pt-4 border-t border-stone-200">
                <span className="text-xs font-bold uppercase tracking-wider text-stone-800 block mb-2">
                  Tambahan Pengalaman Khusus (Opsional)
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {ADDON_OPTIONS.map((addon) => {
                    const isAdded = !!selectedAddons[addon.id];
                    return (
                      <div
                        key={addon.id}
                        onClick={() => handleAddonToggle(addon.id)}
                        className={`p-3 rounded-lg border text-xs cursor-pointer transition-all flex flex-col justify-between ${
                          isAdded
                            ? 'bg-emerald-50 border-emerald-600 text-emerald-950 font-medium'
                            : 'bg-stone-50 border-stone-200 text-stone-700 hover:border-stone-300'
                        }`}
                      >
                        <div>
                          <div className="font-bold mb-0.5">{addon.name}</div>
                          <div className="text-stone-500 text-[11px] mb-2">{addon.desc}</div>
                        </div>
                        <div className="flex items-center justify-between pt-1 border-t border-stone-200/50">
                          <span className="font-mono font-bold text-emerald-800">
                            +Rp {addon.price.toLocaleString('id-ID')}
                          </span>
                          <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${isAdded ? 'bg-emerald-800 text-white' : 'bg-stone-200 text-stone-700'}`}>
                            {isAdded ? 'Ditambahkan' : '+ Tambah'}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Price Summary and Next Button */}
              <div className="pt-6 border-t border-stone-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <span className="text-xs text-stone-500 block">Total Estimasi Pembayaran:</span>
                  <div className="text-2xl font-extrabold text-stone-900 font-mono tabular-nums">
                    Rp {grandTotal.toLocaleString('id-ID')}
                    <span className="text-xs font-normal text-stone-500 font-sans ml-1">
                      (Termasuk PPN & Biaya Layanan Rp 3.500)
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setBookingStep('checkout')}
                  className="px-6 py-3 bg-emerald-800 hover:bg-emerald-700 text-white font-bold text-sm rounded-lg shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Lanjut Isi Data Pemesan</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {bookingStep === 'checkout' && (
            <form onSubmit={handleConfirmOrder} className="space-y-6">
              <div className="flex items-center justify-between pb-3 border-b border-stone-200">
                <button
                  type="button"
                  onClick={() => setBookingStep('select')}
                  className="text-xs text-stone-500 hover:text-stone-900 underline flex items-center gap-1 cursor-pointer"
                >
                  ← Kembali ubah paket tiket
                </button>
                <span className="text-xs font-mono font-semibold text-emerald-800">
                  {selectedPackage.name} · {visitDate}
                </span>
              </div>

              {/* Form Data Pemesan */}
              <div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-stone-900 mb-3">
                  Informasi Kontak Pemesan
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="block text-stone-700 font-medium mb-1">
                      Nama Lengkap (Sesuai KTP / SIM) *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Contoh: Budi Santoso"
                      value={visitorName}
                      onChange={(e) => setVisitorName(e.target.value)}
                      className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-lg text-sm text-stone-900 focus:outline-none focus:border-emerald-800"
                    />
                  </div>

                  <div>
                    <label className="block text-stone-700 font-medium mb-1">
                      Nomor WhatsApp Aktif *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="081234567890"
                      value={visitorPhone}
                      onChange={(e) => setVisitorPhone(e.target.value)}
                      className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-lg text-sm text-stone-900 focus:outline-none focus:border-emerald-800 font-mono"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-stone-700 font-medium mb-1">
                      Alamat Email (Pengiriman E-Tiket PDF) *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="nama@email.com"
                      value={visitorEmail}
                      onChange={(e) => setVisitorEmail(e.target.value)}
                      className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-lg text-sm text-stone-900 focus:outline-none focus:border-emerald-800"
                    />
                  </div>
                </div>
              </div>

              {/* Payment Methods */}
              <div className="pt-4 border-t border-stone-200">
                <h3 className="text-sm font-bold uppercase tracking-wider text-stone-900 mb-3">
                  Pilih Saluran Pembayaran Resmi
                </h3>
                <div className="grid grid-cols-3 gap-3 text-xs">
                  <div
                    onClick={() => setPaymentMethod('qris')}
                    className={`p-3 rounded-lg border cursor-pointer text-center transition-all ${
                      paymentMethod === 'qris'
                        ? 'bg-emerald-50 border-emerald-700 ring-2 ring-emerald-700/20 font-bold text-emerald-950'
                        : 'bg-stone-50 border-stone-200 text-stone-600'
                    }`}
                  >
                    <div className="font-mono text-sm font-bold">QRIS</div>
                    <div className="text-[11px] text-stone-500 mt-0.5">Semua E-Wallet & Bank</div>
                  </div>

                  <div
                    onClick={() => setPaymentMethod('va')}
                    className={`p-3 rounded-lg border cursor-pointer text-center transition-all ${
                      paymentMethod === 'va'
                        ? 'bg-emerald-50 border-emerald-700 ring-2 ring-emerald-700/20 font-bold text-emerald-950'
                        : 'bg-stone-50 border-stone-200 text-stone-600'
                    }`}
                  >
                    <div className="font-mono text-sm font-bold">Virtual Account</div>
                    <div className="text-[11px] text-stone-500 mt-0.5">BCA / Mandiri / BRI / BNI</div>
                  </div>

                  <div
                    onClick={() => setPaymentMethod('card')}
                    className={`p-3 rounded-lg border cursor-pointer text-center transition-all ${
                      paymentMethod === 'card'
                        ? 'bg-emerald-50 border-emerald-700 ring-2 ring-emerald-700/20 font-bold text-emerald-950'
                        : 'bg-stone-50 border-stone-200 text-stone-600'
                    }`}
                  >
                    <div className="font-mono text-sm font-bold">Kartu Debit / Kredit</div>
                    <div className="text-[11px] text-stone-500 mt-0.5">Visa / Mastercard / GPN</div>
                  </div>
                </div>
              </div>

              {/* Order Breakdown Box */}
              <div className="p-4 bg-stone-50 rounded-xl border border-stone-200 text-xs space-y-2">
                <div className="flex justify-between text-stone-600">
                  <span>{selectedPackage.name} ({adultCount} Dewasa, {childCount} Anak)</span>
                  <span className="font-mono tabular-nums">
                    Rp {(adultCount * currentPricePerAdult + childCount * currentPricePerChild).toLocaleString('id-ID')}
                  </span>
                </div>
                {totalAddonPrice > 0 && (
                  <div className="flex justify-between text-stone-600">
                    <span>Tambahan Wahana / Pakan Satwa</span>
                    <span className="font-mono tabular-nums">Rp {totalAddonPrice.toLocaleString('id-ID')}</span>
                  </div>
                )}
                <div className="flex justify-between text-stone-600">
                  <span>Biaya Layanan & Asuransi Jasa Raharja</span>
                  <span className="font-mono tabular-nums">Rp {adminFee.toLocaleString('id-ID')}</span>
                </div>
                <div className="pt-2 border-t border-stone-200 flex justify-between font-bold text-sm text-stone-900">
                  <span>Total Tagihan:</span>
                  <span className="font-mono tabular-nums text-emerald-900">
                    Rp {grandTotal.toLocaleString('id-ID')}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 text-xs text-stone-500">
                <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0" />
                <span>Transaksi aman dengan enkripsi SSL 256-bit dan barcode terintegrasi pintu gerbang otomatis.</span>
              </div>

              <div className="pt-4 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setBookingStep('select')}
                  className="px-4 py-2.5 text-xs font-semibold text-stone-700 bg-stone-100 hover:bg-stone-200 rounded-lg transition-colors cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 text-xs font-bold text-white bg-emerald-900 hover:bg-emerald-800 rounded-lg shadow transition-colors flex items-center gap-2 cursor-pointer"
                >
                  <span>Konfirmasi & Terbitkan E-Tiket</span>
                  <Check className="w-4 h-4" />
                </button>
              </div>
            </form>
          )}

          {bookingStep === 'success' && (
            <div className="space-y-6 text-center">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-800 rounded-full flex items-center justify-center mx-auto">
                <Check className="w-8 h-8 stroke-[3]" />
              </div>

              <div>
                <h3 className="text-2xl font-extrabold text-stone-900">
                  Pembayaran Berhasil Terverifikasi!
                </h3>
                <p className="text-stone-600 text-sm mt-1">
                  E-Tiket resmi telah diterbitkan dan dikirimkan ke <strong className="text-stone-800">{visitorEmail}</strong>.
                </p>
              </div>

              {/* Digital E-Ticket Pass Card */}
              <div className="max-w-md mx-auto bg-stone-950 text-white rounded-2xl p-6 text-left shadow-xl border border-stone-800 relative overflow-hidden print:border print:border-black print:text-black print:bg-white">
                {/* Header */}
                <div className="flex items-center justify-between pb-4 border-b border-stone-800">
                  <div>
                    <span className="text-[10px] uppercase font-mono tracking-widest text-emerald-400 block">
                      OFFICIAL BOARDING PASS
                    </span>
                    <h4 className="text-lg font-black tracking-tight text-white">
                      Taman Kehati Mesuji
                    </h4>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-stone-400 block font-mono">KODE BOOKING</span>
                    <span className="text-sm font-mono font-bold text-emerald-400">
                      {confirmedBookingCode}
                    </span>
                  </div>
                </div>

                {/* Details */}
                <div className="py-4 space-y-3 text-xs border-b border-stone-800">
                  <div className="flex justify-between">
                    <span className="text-stone-400">Nama Pemesan:</span>
                    <span className="font-semibold text-white">{visitorName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-400">Tanggal Kunjungan:</span>
                    <span className="font-semibold text-white font-mono">{visitDate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-400">Paket:</span>
                    <span className="font-semibold text-white">{selectedPackage.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-400">Total Pengunjung:</span>
                    <span className="font-semibold text-white font-mono">
                      {adultCount} Dewasa, {childCount} Anak
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-400">Total Biaya:</span>
                    <span className="font-bold text-emerald-400 font-mono">
                      Rp {grandTotal.toLocaleString('id-ID')}
                    </span>
                  </div>
                </div>

                {/* Simulated Barcode / QR Code representation */}
                <div className="pt-4 flex items-center justify-between gap-4">
                  <div className="p-2 bg-white rounded-lg">
                    {/* SVG Clean QR Code Representation */}
                    <svg className="w-20 h-20 text-stone-900" viewBox="0 0 100 100" fill="currentColor">
                      <rect x="10" y="10" width="25" height="25" />
                      <rect x="65" y="10" width="25" height="25" />
                      <rect x="10" y="65" width="25" height="25" />
                      <rect x="15" y="15" width="15" height="15" fill="white" />
                      <rect x="70" y="15" width="15" height="15" fill="white" />
                      <rect x="15" y="70" width="15" height="15" fill="white" />
                      <rect x="19" y="19" width="7" height="7" fill="black" />
                      <rect x="74" y="19" width="7" height="7" fill="black" />
                      <rect x="19" y="74" width="7" height="7" fill="black" />
                      <rect x="45" y="10" width="8" height="15" />
                      <rect x="45" y="35" width="20" height="8" />
                      <rect x="75" y="45" width="15" height="8" />
                      <rect x="45" y="55" width="10" height="20" />
                      <rect x="65" y="65" width="12" height="12" />
                      <rect x="80" y="80" width="10" height="10" />
                      <rect x="38" y="80" width="8" height="10" />
                    </svg>
                  </div>

                  <div className="text-xs text-stone-400 space-y-1">
                    <p className="font-semibold text-white">Instruksi Masuk:</p>
                    <p className="text-[11px] leading-tight">
                      Arahkan barcode ini ke sensor scanner turnstile di Pintu Masuk Gerbang Utama.
                    </p>
                    <p className="text-[10px] text-emerald-400 font-mono">
                      STATUS: AKTIF & TERVERIFIKASI
                    </p>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={handlePrint}
                  className="px-4 py-2 text-xs font-semibold bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <Printer className="w-4 h-4" />
                  <span>Cetak E-Tiket Fisik</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    alert(`E-Tiket (${confirmedBookingCode}) berhasil diunduh dalam format digital.`);
                  }}
                  className="px-4 py-2 text-xs font-semibold bg-emerald-900 hover:bg-emerald-800 text-white rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  <span>Simpan E-Tiket Digital (PDF)</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setBookingStep('select');
                    onClose();
                  }}
                  className="px-4 py-2 text-xs font-semibold text-stone-500 hover:text-stone-800"
                >
                  Selesai & Tutup
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
