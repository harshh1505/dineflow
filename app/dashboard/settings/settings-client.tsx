'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2, Check, Store, Phone, Mail, MapPin, Palette, FileImage } from 'lucide-react';
import { updateRestaurantProfile } from '@/app/actions/restaurant';

interface Restaurant {
  id: string;
  name: string;
  slug: string;
  themeColor: string;
  logoUrl: string | null;
}

interface ContactDetails {
  phone?: string;
  email?: string;
  address?: string;
}

interface Props {
  restaurant: Restaurant;
  contactDetails: ContactDetails;
  canCustomizeColor: boolean;
  canUploadLogo: boolean;
}

const COLOR_PRESETS = [
  { name: 'Zomato Red', value: '#ef4444' },
  { name: 'Orange Sunset', value: '#f97316' },
  { name: 'Forest Green', value: '#10b981' },
  { name: 'Teal Teal', value: '#14b8a6' },
  { name: 'Ocean Blue', value: '#0ea5e9' },
  { name: 'Indigo Sleek', value: '#6366f1' },
  { name: 'Charcoal Dark', value: '#374151' },
];

export default function SettingsFormClient({
  restaurant,
  contactDetails,
  canCustomizeColor,
  canUploadLogo,
}: Props) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  
  const [selectedColor, setSelectedColor] = useState(
    canCustomizeColor ? restaurant.themeColor : '#ef4444'
  );
  
  const [logoPreview, setLogoPreview] = useState<string | null>(restaurant.logoUrl);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    const formData = new FormData(e.currentTarget);
    formData.append('themeColor', selectedColor);

    startTransition(async () => {
      const res = await updateRestaurantProfile(restaurant.id, formData);
      if (res.error) {
        setError(res.error);
      } else {
        setSuccess(true);
        router.refresh();
        setTimeout(() => setSuccess(false), 3000);
      }
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="bg-rose-50 border border-rose-100 text-rose-600 text-xs p-3 rounded-lg font-medium">
          {error}
        </div>
      )}

      {success && (
        <div className="bg-emerald-50 border border-emerald-100 text-emerald-600 text-xs p-3 rounded-lg flex items-center gap-2 font-medium">
          <Check className="w-4 h-4 text-emerald-650 shrink-0" /> Branding settings updated successfully!
        </div>
      )}

      <div className="bg-white border border-[#EAEAEA] rounded-xl p-6 space-y-6">
        <h3 className="text-xs font-bold text-[#111827] uppercase tracking-wider mb-2">Profile & Logo</h3>
        
        <div className="grid sm:grid-cols-2 gap-6">
          {/* Restaurant Name */}
          <div>
            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
              Restaurant Name *
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <Store className="w-4 h-4" />
              </div>
              <input
                type="text"
                name="name"
                required
                defaultValue={restaurant.name}
                className="w-full bg-white border border-[#EAEAEA] rounded-lg pl-10 pr-3 py-2.5 text-xs text-[#111827] focus:outline-none focus:ring-1 focus:ring-[#F97316] focus:border-[#F97316]"
              />
            </div>
          </div>

          {/* Logo Upload */}
          <div>
            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
              Restaurant Logo
            </label>
            <div className={`flex items-center gap-4 bg-[#FAFAFA] p-2.5 rounded-lg border border-[#EAEAEA] ${!canUploadLogo ? 'opacity-40' : ''}`}>
              <div className="absolute pointer-events-none pl-3.5 text-slate-400 hidden sm:block">
                <FileImage className="w-4 h-4" />
              </div>
              <input
                type="file"
                name="logo"
                accept="image/*"
                disabled={!canUploadLogo}
                onChange={e => {
                  const file = e.target.files?.[0];
                  if (file) {
                    setLogoPreview(URL.createObjectURL(file));
                  }
                }}
                className="text-xs text-slate-500 file:mr-4 file:py-1.5 file:px-3 file:rounded-md file:border file:border-[#EAEAEA] file:text-xs file:font-semibold file:bg-white file:text-slate-700 file:cursor-pointer hover:file:bg-[#FAFAFA] disabled:pointer-events-none w-full"
              />

              {logoPreview && (
                <img
                  src={logoPreview}
                  alt="Logo"
                  className="w-10 h-10 rounded-lg object-cover border border-[#EAEAEA] shrink-0"
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Theme Colors */}
      <div className="bg-white border border-[#EAEAEA] rounded-xl p-6 space-y-6">
        <h3 className="text-xs font-bold text-[#111827] uppercase tracking-wider mb-2 flex items-center gap-2">
          <Palette className="w-4 h-4 text-[#F97316]" /> Color Theme
        </h3>
        
        <div className={`space-y-4 ${!canCustomizeColor ? 'opacity-40' : ''}`}>
          <div className="flex flex-wrap gap-2.5">
            {COLOR_PRESETS.map(preset => (
              <button
                key={preset.name}
                type="button"
                disabled={!canCustomizeColor}
                onClick={() => setSelectedColor(preset.value)}
                style={{ backgroundColor: preset.value }}
                className="w-8 h-8 rounded-full border-2 border-white relative flex items-center justify-center cursor-pointer transition-transform hover:scale-105 active:scale-95 disabled:pointer-events-none shadow-xs"
                title={preset.name}
              >
                {selectedColor === preset.value && (
                  <Check className="w-4 h-4 text-white drop-shadow-md" />
                )}
              </button>
            ))}

            {canCustomizeColor && (
              <div className="flex items-center gap-2 ml-4">
                <input
                  type="color"
                  value={selectedColor}
                  onChange={e => setSelectedColor(e.target.value)}
                  className="w-8 h-8 bg-transparent border-0 rounded cursor-pointer"
                  title="Custom Color"
                />
                <span className="text-[10px] font-mono font-bold text-slate-500 uppercase">
                  {selectedColor}
                </span>
              </div>
            )}
          </div>
          <p className="text-[10px] text-slate-500 font-medium">
            This color will dictate headers, active filters, and primary button indicators on the customer menu.
          </p>
        </div>
      </div>

      {/* Contacts Details */}
      <div className="bg-white border border-[#EAEAEA] rounded-xl p-6 space-y-6">
        <h3 className="text-xs font-bold text-[#111827] uppercase tracking-wider mb-2">Customer Contacts</h3>
        
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
              Phone Number
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <Phone className="w-4 h-4" />
              </div>
              <input
                type="tel"
                name="phone"
                defaultValue={contactDetails.phone || ''}
                placeholder="+1 234 567 890"
                className="w-full bg-white border border-[#EAEAEA] rounded-lg pl-10 pr-3 py-2.5 text-xs text-[#111827] focus:outline-none focus:ring-1 focus:ring-[#F97316] focus:border-[#F97316]"
              />
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
              Support Email
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <Mail className="w-4 h-4" />
              </div>
              <input
                type="email"
                name="email"
                defaultValue={contactDetails.email || ''}
                placeholder="support@gourmet.com"
                className="w-full bg-white border border-[#EAEAEA] rounded-lg pl-10 pr-3 py-2.5 text-xs text-[#111827] focus:outline-none focus:ring-1 focus:ring-[#F97316] focus:border-[#F97316]"
              />
            </div>
          </div>
        </div>

        <div>
          <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
            Physical Address
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 pt-3 pointer-events-none text-slate-400">
              <MapPin className="w-4 h-4" />
            </div>
            <textarea
              name="address"
              defaultValue={contactDetails.address || ''}
              rows={2}
              placeholder="123 Delicious Lane, Foodie City"
              className="w-full bg-white border border-[#EAEAEA] rounded-lg pl-10 pr-3 py-2.5 text-xs text-[#111827] focus:outline-none focus:ring-1 focus:ring-[#F97316] focus:border-[#F97316]"
            />
          </div>
        </div>
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="bg-[#F97316] hover:bg-[#ea580c] text-white font-bold py-2.5 px-6 rounded-lg text-xs transition-colors flex items-center gap-2 disabled:opacity-50 shadow-2xs font-sans"
      >
        {isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Save Changes'}
      </button>
    </form>
  );
}
