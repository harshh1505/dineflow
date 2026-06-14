'use client';

import { useState, useTransition } from 'react';
import Link from 'next/link';
import { 
  QrCode, 
  Store, 
  Globe, 
  User, 
  Phone, 
  ListTodo, 
  Grid3X3, 
  Briefcase, 
  Loader2, 
  ArrowRight, 
  CheckCircle,
  HelpCircle,
  Calendar,
  Clock,
  Smartphone,
  Zap,
  TrendingUp
} from 'lucide-react';
import { submitEnquiry } from '@/app/actions/enquiry';

export default function EnquirePage() {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [selectedDay, setSelectedDay] = useState<number>(15);
  const [selectedTime, setSelectedTime] = useState<string>('10:00 AM');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    const formData = new FormData(e.currentTarget);

    // Send preferred demo slot details as separate fields
    formData.set('demoDate', `June ${selectedDay}, 2026`);
    formData.set('demoTime', selectedTime);

    startTransition(async () => {
      const res = await submitEnquiry(null, formData);
      if (res?.error) {
        setError(res.error);
      } else if (res?.success) {
        setSuccess(true);
      }
    });
  };

  if (success) {
    return (
      <div className="min-h-screen bg-[#FAFAFA] flex flex-col justify-center py-12 px-6 selection:bg-[#FF6B35] selection:text-white">
        <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
          <Link href="/" className="inline-flex items-center gap-2 mb-6 group">
            <div className="bg-[#FF6B35] p-2 rounded-xl text-white group-hover:scale-105 transition-transform duration-200">
              <QrCode className="w-5 h-5" />
            </div>
            <span className="font-extrabold text-xl tracking-tight text-[#111827]">DineFlow</span>
          </Link>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-12 px-6 border border-[#EAEAEA] rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.02)] sm:px-10 text-center space-y-6">
            <div className="flex justify-center">
              <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center border border-emerald-100 text-emerald-500 animate-bounce">
                <CheckCircle className="w-8 h-8" />
              </div>
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-black text-[#111827]">Enquiry Submitted!</h3>
              <p className="text-xs text-slate-500 leading-relaxed font-semibold max-w-sm mx-auto">
                Thank you for your interest in DineFlow. We have received your request and reserved your preferred slot (June {selectedDay}, 2026 at {selectedTime}). Our team will reach out to you via WhatsApp shortly.
              </p>
            </div>
            <div className="pt-4 border-t border-[#EAEAEA] flex flex-col gap-3">
              <Link 
                href="/" 
                className="w-full bg-[#FF6B35] hover:bg-[#e05420] text-white font-bold py-3 px-4 rounded-xl transition-all duration-300 flex items-center justify-center gap-1.5 text-xs shadow-xs"
              >
                Back to Homepage <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Generate calendar days for June 2026
  // June 1, 2026 is Monday.
  const daysInJune = Array.from({ length: 30 }, (_, i) => i + 1);
  // If Sunday is first day of the week, Monday (June 1) has 1 blank cell (Sunday).
  const blanks = Array.from({ length: 1 }, () => null);
  const calendarCells = [...blanks, ...daysInJune];

  const timeSlots = [
    '10:00 AM',
    '11:30 AM',
    '01:00 PM',
    '02:30 PM',
    '04:00 PM',
    '05:30 PM',
    '07:00 PM'
  ];

  return (
    <div className="min-h-screen bg-[#FAFAFA] flex flex-col justify-center py-8 px-4 sm:px-6 lg:px-8 selection:bg-[#FF6B35] selection:text-white">
      <div className="max-w-7xl w-full mx-auto">
        
        {/* Header */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-3 group">
            <div className="bg-[#FF6B35] p-2 rounded-xl text-white group-hover:scale-105 transition-transform duration-200">
              <QrCode className="w-5 h-5" />
            </div>
            <span className="font-extrabold text-xl tracking-tight text-[#111827]">DineFlow</span>
          </Link>
          <h2 className="text-2xl font-black text-[#111827] tracking-tight animate-fade-in">Request a Custom Demo</h2>
          <p className="mt-1 text-xs text-slate-500 font-semibold max-w-md mx-auto">
            Tell us about your restaurant and choose a convenient time slot for a personalized DineFlow walk-through.
          </p>
        </div>

        {/* Two-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* Left Column - Enquiry Form */}
          <div className="lg:col-span-6 bg-white py-6 px-5 sm:px-8 border border-[#EAEAEA] rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.015)] flex flex-col justify-between">
            <div>
              <div className="mb-4 border-b border-[#EAEAEA] pb-3">
                <h3 className="text-base font-bold text-[#111827]">1. Restaurant & Contact Details</h3>
                <p className="text-[11px] text-slate-400 font-medium mt-0.5">Please fill in the details below to initialize your profile setup.</p>
              </div>

              {error && (
                <div className="mb-4 bg-rose-50 border border-rose-100 text-rose-600 text-xs p-3 rounded-lg flex items-center gap-2 font-medium animate-shake">
                  <span className="w-1.5 h-1.5 bg-rose-600 rounded-full shrink-0" />
                  {error}
                </div>
              )}

              <form className="space-y-4" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  
                  {/* Restaurant Name */}
                  <div className="col-span-2">
                    <label htmlFor="restaurantName" className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                      Restaurant / Cafe Name <span className="text-[#FF6B35]">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                        <Store className="w-3.5 h-3.5" />
                      </div>
                      <input
                        id="restaurantName"
                        name="restaurantName"
                        type="text"
                        required
                        className="block w-full pl-9 pr-3 py-2 bg-white border border-[#EAEAEA] rounded-lg text-[#111827] placeholder-slate-400 text-xs transition-colors focus:border-[#FF6B35]/50 focus:outline-none"
                        placeholder="The Gourmet Kitchen"
                      />
                    </div>
                  </div>

                  {/* Website */}
                  <div className="col-span-2">
                    <label htmlFor="website" className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                      Website URL <span className="text-slate-400 font-normal">(optional)</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                        <Globe className="w-3.5 h-3.5" />
                      </div>
                      <input
                        id="website"
                        name="website"
                        type="url"
                        className="block w-full pl-9 pr-3 py-2 bg-white border border-[#EAEAEA] rounded-lg text-[#111827] placeholder-slate-400 text-xs transition-colors focus:border-[#FF6B35]/50 focus:outline-none"
                        placeholder="https://myrestaurant.com"
                      />
                    </div>
                  </div>

                  {/* Name of POC */}
                  <div>
                    <label htmlFor="pocName" className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                      Name of POC <span className="text-[#FF6B35]">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                        <User className="w-3.5 h-3.5" />
                      </div>
                      <input
                        id="pocName"
                        name="pocName"
                        type="text"
                        required
                        className="block w-full pl-9 pr-3 py-2 bg-white border border-[#EAEAEA] rounded-lg text-[#111827] placeholder-slate-400 text-xs transition-colors focus:border-[#FF6B35]/50 focus:outline-none"
                        placeholder="Arjun Sharma"
                      />
                    </div>
                  </div>

                  {/* Designation of POC */}
                  <div>
                    <label htmlFor="pocDesignation" className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                      Designation of POC <span className="text-[#FF6B35]">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                        <Briefcase className="w-3.5 h-3.5" />
                      </div>
                      <input
                        id="pocDesignation"
                        name="pocDesignation"
                        type="text"
                        required
                        className="block w-full pl-9 pr-3 py-2 bg-white border border-[#EAEAEA] rounded-lg text-[#111827] placeholder-slate-400 text-xs transition-colors focus:border-[#FF6B35]/50 focus:outline-none"
                        placeholder="Owner / General Manager"
                      />
                    </div>
                  </div>

                  {/* WhatsApp Number */}
                  <div>
                    <label htmlFor="whatsapp" className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                      WhatsApp Number <span className="text-[#FF6B35]">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                        <Phone className="w-3.5 h-3.5" />
                      </div>
                      <input
                        id="whatsapp"
                        name="whatsapp"
                        type="tel"
                        required
                        className="block w-full pl-9 pr-3 py-2 bg-white border border-[#EAEAEA] rounded-lg text-[#111827] placeholder-slate-400 text-xs transition-colors focus:border-[#FF6B35]/50 focus:outline-none"
                        placeholder="+91 98765 43210"
                      />
                    </div>
                  </div>

                  {/* Number of Tables */}
                  <div>
                    <label htmlFor="numTables" className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                      Number of Tables <span className="text-[#FF6B35]">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                        <Grid3X3 className="w-3.5 h-3.5" />
                      </div>
                      <input
                        id="numTables"
                        name="numTables"
                        type="number"
                        min="1"
                        required
                        className="block w-full pl-9 pr-3 py-2 bg-white border border-[#EAEAEA] rounded-lg text-[#111827] placeholder-slate-400 text-xs transition-colors focus:border-[#FF6B35]/50 focus:outline-none"
                        placeholder="15"
                      />
                    </div>
                  </div>
                </div>

                {/* Requirements Textarea */}
                <div>
                  <label htmlFor="requirements" className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                    Requirements / Special Instructions <span className="text-slate-400 font-normal">(optional)</span>
                  </label>
                  <div className="relative">
                    <div className="absolute top-2.5 left-3 text-slate-400">
                      <ListTodo className="w-3.5 h-3.5" />
                    </div>
                    <textarea
                      id="requirements"
                      name="requirements"
                      rows={2}
                      className="block w-full pl-9 pr-3 py-2 bg-white border border-[#EAEAEA] rounded-lg text-[#111827] placeholder-slate-400 text-xs transition-colors focus:border-[#FF6B35]/50 focus:outline-none resize-none"
                      placeholder="Need custom QR templates, multi-language support, custom ordering flows, etc."
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isPending}
                  className="w-full bg-[#FF6B35] hover:bg-[#e05420] text-white font-bold py-2.5 px-4 rounded-xl transition-all duration-300 flex items-center justify-center gap-1.5 text-xs shadow-xs hover:shadow-md hover:-translate-y-0.5 cursor-pointer animate-button-glow"
                >
                  {isPending ? (
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  ) : (
                    <>
                      Submit Enquiry & Book Demo <ArrowRight className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
            </form>
          </div>
        </div>

          {/* Right Column - Booking Calendar Card */}
          <div className="lg:col-span-6 bg-white py-6 px-5 sm:px-8 border border-[#EAEAEA] rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.015)] flex flex-col justify-between">
            
            {/* Header / Instructions */}
            <div className="border-b border-[#EAEAEA] pb-3 mb-4">
              <h3 className="text-base font-bold text-[#111827]">2. Select Demo Date & Time</h3>
              <p className="text-[11px] text-slate-400 font-medium mt-0.5">Select a slot for your live, personalized walkthrough.</p>
            </div>

            {/* Infographics / Value Props Row */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 my-0.5">
              <div className="bg-[#FF6B35]/5 border border-[#FF6B35]/10 rounded-xl p-2 text-center space-y-1 transition-all hover:bg-[#FF6B35]/10 hover:scale-[1.01] duration-200">
                <div className="w-6 h-6 rounded-lg bg-[#FF6B35]/15 text-[#FF6B35] flex items-center justify-center mx-auto">
                  <Smartphone className="w-3.5 h-3.5" />
                </div>
                <h4 className="text-[9px] font-extrabold text-[#111827] uppercase tracking-wider">1. Scan QR</h4>
                <p className="text-[8.5px] text-slate-500 font-semibold leading-snug">
                  Customers scan QR at table to view menu instantly.
                </p>
              </div>

              <div className="bg-[#FF6B35]/5 border border-[#FF6B35]/10 rounded-xl p-2 text-center space-y-1 transition-all hover:bg-[#FF6B35]/10 hover:scale-[1.01] duration-200">
                <div className="w-6 h-6 rounded-lg bg-[#FF6B35]/15 text-[#FF6B35] flex items-center justify-center mx-auto">
                  <Zap className="w-3.5 h-3.5" />
                </div>
                <h4 className="text-[9px] font-extrabold text-[#111827] uppercase tracking-wider">2. Self Order</h4>
                <p className="text-[8.5px] text-slate-500 font-semibold leading-snug">
                  Orders print directly in kitchen, routing instantly.
                </p>
              </div>

              <div className="bg-[#FF6B35]/5 border border-[#FF6B35]/10 rounded-xl p-2 text-center space-y-1 transition-all hover:bg-[#FF6B35]/10 hover:scale-[1.01] duration-200">
                <div className="w-6 h-6 rounded-lg bg-[#FF6B35]/15 text-[#FF6B35] flex items-center justify-center mx-auto">
                  <TrendingUp className="w-3.5 h-3.5" />
                </div>
                <h4 className="text-[9px] font-extrabold text-[#111827] uppercase tracking-wider">3. Scale Sales</h4>
                <p className="text-[8.5px] text-slate-500 font-semibold leading-snug">
                  Smart upselling raises ticket sizes by up to 32%.
                </p>
              </div>
            </div>

            {/* Side-by-side Internal Grid for Calendar & Slots on larger viewports */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-start">
              
              {/* Internal Column 1 - Calendar Grid */}
              <div className="space-y-3">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-3.5 h-3.5 text-[#FF6B35]" />
                    <span className="font-extrabold text-xs text-[#111827]">June 2026</span>
                  </div>
                  <div className="text-[8px] bg-[#FF6B35]/10 text-[#FF6B35] px-1.5 py-0.5 rounded-full font-bold uppercase tracking-wide">
                    Recent Month
                  </div>
                </div>

                {/* Day Name Headers */}
                <div className="grid grid-cols-7 gap-1 text-center text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                  <div>Su</div>
                  <div>Mo</div>
                  <div>Tu</div>
                  <div>We</div>
                  <div>Th</div>
                  <div>Fr</div>
                  <div>Sa</div>
                </div>

                {/* Day Cells */}
                <div className="grid grid-cols-7 gap-1 text-center">
                  {calendarCells.map((day, idx) => {
                    if (day === null) {
                      return <div key={`empty-${idx}`} />;
                    }
                    
                    // Today is June 15, 2026. Prior days are disabled.
                    const isPast = day < 15;
                    const isSelected = selectedDay === day;
                    const isToday = day === 15;
                    
                    return (
                      <button
                        key={`day-${day}`}
                        type="button"
                        disabled={isPast}
                        onClick={() => setSelectedDay(day)}
                        className={`
                          aspect-square flex flex-col items-center justify-center text-xs font-bold rounded-lg transition-all border relative cursor-pointer
                          ${isPast 
                            ? 'text-slate-300 bg-slate-50/50 cursor-not-allowed pointer-events-none border-transparent' 
                            : isSelected
                              ? 'bg-[#FF6B35] text-white border-[#FF6B35] shadow-[0_4px_12px_rgba(255,107,53,0.2)] font-extrabold scale-105'
                              : 'text-slate-700 bg-white hover:bg-[#FF6B35]/10 hover:text-[#FF6B35] hover:border-transparent border-transparent'
                          }
                        `}
                      >
                        <span>{day}</span>
                        {isToday && !isSelected && (
                          <span className="absolute bottom-1 w-1 h-1 bg-[#FF6B35] rounded-full" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Internal Column 2 - Time Slot Picker & Details */}
              <div className="space-y-4">
                
                {/* Time Slots */}
                <div>
                  <div className="flex items-center gap-1.5 mb-2">
                    <Clock className="w-3.5 h-3.5 text-[#FF6B35]" />
                    <span className="font-extrabold text-xs text-[#111827]">Available Slots</span>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-1.5">
                    {timeSlots.map((slot) => {
                      const isSelected = selectedTime === slot;
                      return (
                        <button
                          key={slot}
                          type="button"
                          onClick={() => setSelectedTime(slot)}
                          className={`
                            text-center py-1.5 px-0.5 rounded-lg text-[11px] font-semibold transition-all border cursor-pointer
                            ${isSelected
                              ? 'bg-[#FF6B35] text-white border-[#FF6B35] shadow-xs font-bold'
                              : 'bg-white hover:bg-slate-50 text-slate-600 border-[#EAEAEA]'
                            }
                          `}
                        >
                          {slot}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Summary Widget */}
                <div className="bg-[#FAFAFA] border border-[#EAEAEA] rounded-xl p-2.5 space-y-1">
                  <h4 className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Your Demo Booking</h4>
                  <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 text-[11px] font-bold text-[#111827]">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-[#FF6B35]" />
                      <span>June {selectedDay}</span>
                    </div>
                    <span className="text-slate-300">|</span>
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-[#FF6B35]" />
                      <span>{selectedTime}</span>
                    </div>
                  </div>
                </div>

                {/* What to Expect */}
                <div className="text-[10px] text-slate-400 font-semibold leading-normal bg-slate-50 rounded-xl p-2.5 border border-[#F0F0F0]">
                  <span className="font-bold text-[#111827] block mb-0.5">What to expect:</span>
                  1-on-1 walk-through of custom layouts, QR templates, ordering flows & analytics dashboard.
                </div>

              </div>

            </div>

          </div>
          
        </div>
      </div>
    </div>
  );
}
