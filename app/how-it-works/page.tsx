import InfoLayout from '@/app/components/info-layout';
import Link from 'next/link';
import { Compass, CheckCircle2, Clock, ArrowRight, Printer, QrCode, LayoutDashboard, Settings } from 'lucide-react';

export default function HowItWorksPage() {
  const steps = [
    {
      step: '01',
      icon: LayoutDashboard,
      color: 'text-indigo-600 bg-indigo-50 border-indigo-100',
      title: 'Design and Structure Your Digital Menu',
      subtitle: 'Organize your dishes for maximum checkout conversions.',
      time: '~20 minutes',
      desc: 'Log in to your backoffice and begin adding menu content. Group your dishes into semantic categories like Appetizers, Main Course, Special Brews, and Desserts. For each menu item, upload high-res photos, set names, write descriptions, configure prices, and mark dietary preferences (Veg, Non-Veg, Jain). You can drag and drop categories to organize the layout sequence to match your kitchen\'s serving order.',
      substeps: [
        'Create menu categories (e.g. Starters, Mains, Beverages, Desserts)',
        'Add individual dish entries with name, description, and price',
        'Upload square or portrait photos for each menu item',
        'Mark each item\'s dietary type: Veg, Non-Veg, or Jain',
        'Toggle "Bestseller" or "Chef\'s Special" badges for high-priority items',
        'Mark any unavailable items as hidden to prevent ordering'
      ]
    },
    {
      step: '02',
      icon: Settings,
      color: 'text-[#FF6B35] bg-[#FFF7F2] border-[#FF6B35]/20',
      title: 'Customize Your Branding & Accent Colors',
      subtitle: 'Make the menu feel like an extension of your restaurant.',
      time: '~10 minutes',
      desc: 'Navigate to the branding settings panel. Upload your restaurant logo, set a primary accent color that matches your physical interior, and configure the header banner image. These changes instantly reflect across all active guest menu sessions — no re-printing required. Select from our pre-designed starter themes if you prefer a quick setup, then fine-tune from there.',
      substeps: [
        'Upload your logo (PNG or SVG format recommended)',
        'Set a primary hex accent color (matches your signage or branding)',
        'Choose a header background image or solid color',
        'Preview the guest-facing menu in mobile view before publishing',
        'Toggle between light and dark menu themes',
        'Enable optional announcement banner for today\'s specials'
      ]
    },
    {
      step: '03',
      icon: QrCode,
      color: 'text-emerald-600 bg-emerald-50 border-emerald-100',
      title: 'Define Tables and Export QR Code Sheets',
      subtitle: 'Give each dining table its own digital connection.',
      time: '~15 minutes',
      desc: 'Navigate to the Table Management screen. Input the list of tables at your physical venue (e.g., Table 1, Table 2, Patio 1, Bar Seating A). Restreasy automatically generates individual table-specific QR codes. These codes are not generic — they are permanently mapped to each table ID, so your kitchen always knows exactly which table placed an order. Download the printable A4 PDF sheets and place the codes on acrylic stands, card holders, or table surfaces.',
      substeps: [
        'Add all tables by name or number (e.g. Table 1, Table 2, Patio Seat A)',
        'System auto-generates a unique QR code per table',
        'Preview each QR code and its linked table URL',
        'Download the print-ready A4 PDF with all QR codes arranged',
        'Print on standard paper or acrylic at any print shop',
        'Place standees on tables — they never need to be re-printed'
      ]
    },
    {
      step: '04',
      icon: Printer,
      color: 'text-purple-600 bg-purple-50 border-purple-100',
      title: 'Guests Scan, Browse, and Place Orders',
      subtitle: 'Guests complete orders in under 60 seconds.',
      time: 'Every meal service',
      desc: 'When seated, guests scan the QR code standee using their default iOS or Android camera app — no QR reader app needed. It opens your branded menu instantly in their mobile browser. They can search items, filter by dietary preference, add items to their session cart, and tap "Submit Order". The order propagates to your merchant dashboard in real-time with full details: what was ordered, how many of each, and from which table number.',
      substeps: [
        'Guest scans QR code standee using phone camera',
        'Branded menu loads in mobile browser (under 2 seconds)',
        'Guest browses categories, taps items to add to cart',
        'Applies dietary filter (Veg only, Non-Veg, etc.) if preferred',
        'Reviews cart and taps "Submit Order"',
        'Order appears on merchant dashboard instantly'
      ]
    },
    {
      step: '05',
      icon: LayoutDashboard,
      color: 'text-amber-600 bg-amber-50 border-amber-100',
      title: 'Manage Orders from the Kitchen Dashboard',
      subtitle: 'Keep every order organized across your entire floor.',
      time: 'Ongoing during service',
      desc: 'Your merchant dashboard displays a live feed of all incoming orders from every table. Each order card shows the table number, timestamp, and full list of items with quantities. Mark orders as "In Progress" when the kitchen starts preparation, and "Served" once the items reach the table. The dashboard refreshes automatically so your floor manager always has the latest status without needing to reload the page.',
      substeps: [
        'Dashboard shows incoming orders in real-time across all tables',
        'Each order card shows table, time, and full item list',
        'Mark orders In Progress → Ready → Served',
        'Filter view by table number or order status',
        'Trigger kitchen notes or priority flags for complex orders',
        'View cumulative order summary for the day\'s service shift'
      ]
    }
  ];

  const tips = [
    {
      title: 'Optimize Item Photo Quality',
      desc: 'Use square (1:1) photos taken in natural light. Avoid cluttered backgrounds. High-quality images increase order frequency for those items by up to 30% based on menu engineering research.'
    },
    {
      title: 'Keep Descriptions Concise',
      desc: 'Write 1–2 sentence descriptions that highlight the key ingredients and any signature elements. Avoid long paragraphs — guests scan descriptions, they don\'t read them fully.'
    },
    {
      title: 'Put High-Margin Items at the Top',
      desc: 'The first category guests see gets the most attention. If your signature beverage or high-margin starter is buried in the middle, move it to the top category position.'
    },
    {
      title: 'Update Availability in Real-time',
      desc: 'If a dish runs out during peak hours, immediately toggle it off in your dashboard. This prevents out-of-stock orders from reaching the kitchen and frustrating guests who expected it.'
    }
  ];

  return (
    <InfoLayout
      title="How It Works"
      subtitle="Transition your dining room to a high-speed digital menu and ordering system in under an hour."
      category="Workflow Guide"
      icon={Compass}
      accentColor="text-indigo-600 bg-indigo-50 border-indigo-150"
    >
      <div className="space-y-12 font-sans">

        {/* Intro */}
        <div className="space-y-3">
          <h2 className="text-sm font-black text-slate-800 uppercase tracking-wider">Fast and Painless Integration</h2>
          <p className="text-slate-500 font-semibold text-xs leading-relaxed">
            Transitioning your restaurant from static paper lists to dynamic browser-based QR menus requires no technical background whatsoever. Our onboarding flow is designed so that any restaurant owner or manager can configure, launch, and go live with their digital menu in a single afternoon. Explore our complete five-step workflow below.
          </p>
          <div className="grid grid-cols-3 gap-4 mt-4">
            {[
              { label: 'Average setup time', value: '< 1 hour' },
              { label: 'Technical knowledge required', value: 'None' },
              { label: 'Hardware purchases needed', value: '₹0' }
            ].map((s, si) => (
              <div key={si} className="border border-[#EFEFEF] rounded-xl p-4 text-center bg-[#FAFAFA]/50">
                <div className="text-lg font-black text-indigo-600">{s.value}</div>
                <div className="text-[10px] font-bold text-slate-400 leading-tight mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Step-by-step Timeline */}
        <div className="space-y-10 pt-6 border-t border-[#EFEFEF]">
          {steps.map((s, idx) => (
            <div key={idx} className="flex flex-col md:flex-row gap-5 items-start border border-[#EFEFEF] rounded-2xl p-6 bg-[#FAFAFA]/30 hover:bg-white hover:shadow-sm transition-all">
              <div className="flex-shrink-0 flex flex-col items-center gap-2">
                <div className={`w-12 h-12 rounded-2xl border flex items-center justify-center shadow-2xs ${s.color}`}>
                  <s.icon className="w-5 h-5" />
                </div>
                <span className="text-[9px] font-black text-slate-400 uppercase tracking-wider">Step {s.step}</span>
              </div>
              <div className="space-y-3 flex-1">
                <div className="space-y-0.5">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                    <h3 className="font-black text-[#111827] text-sm">{s.title}</h3>
                    <div className="flex items-center gap-1 text-[10px] font-bold text-slate-400">
                      <Clock className="w-3 h-3" /> {s.time}
                    </div>
                  </div>
                  <span className="text-[10px] font-bold text-indigo-600 block uppercase tracking-wider">{s.subtitle}</span>
                </div>
                <p className="text-slate-500 font-semibold leading-relaxed text-xs">{s.desc}</p>
                <div className="border-t border-[#EFEFEF]/60 pt-3">
                  <h4 className="text-[10px] font-black text-slate-700 uppercase tracking-wider mb-2">Detailed Steps:</h4>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                    {s.substeps.map((sub, si) => (
                      <li key={si} className="flex items-start gap-1.5 text-slate-500 font-semibold text-xs leading-relaxed">
                        <CheckCircle2 className="w-3 h-3 text-indigo-500 shrink-0 mt-0.5" />
                        {sub}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pro Tips */}
        <div className="border-t border-[#EFEFEF] pt-8 space-y-5">
          <h2 className="text-sm font-black text-slate-800 uppercase tracking-wider">Pro Tips for Maximum Impact</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {tips.map((t, ti) => (
              <div key={ti} className="border border-[#EFEFEF] rounded-xl p-5 bg-[#FAFAFA]/50 space-y-2">
                <h3 className="font-black text-[#111827] text-xs">{t.title}</h3>
                <p className="text-slate-500 font-semibold text-xs leading-relaxed">{t.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Help & Onboarding Assist */}
        <div className="border-t border-[#EFEFEF] pt-8 space-y-4">
          <h2 className="text-sm font-black text-slate-800 uppercase tracking-wider">Need Help Setting Up?</h2>
          <p className="text-slate-500 font-semibold text-xs leading-relaxed max-w-lg">
            Our onboarding team can format and ingest your existing PDF menu sheets, map your table layout, and export your first print-ready QR code sheets — all within 24 hours of your enquiry. Submit your details below and we will handle the setup for you.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link href="/enquire" className="inline-flex items-center gap-1.5 bg-[#FF6B35] hover:bg-[#e05420] text-white font-bold px-8 py-3 rounded-xl text-xs transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5">
              Let Us Configure It for You <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            <Link href="/guides" className="inline-flex items-center gap-1.5 bg-white border border-[#EFEFEF] hover:bg-[#FFF7F2] hover:border-[#FF6B35]/30 text-slate-700 font-bold px-8 py-3 rounded-xl text-xs transition-all shadow-sm">
              Browse Setup Guides
            </Link>
          </div>
        </div>

      </div>
    </InfoLayout>
  );
}
