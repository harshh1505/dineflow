import InfoLayout from '@/app/components/info-layout';
import Link from 'next/link';
import { Globe, ArrowRight, CheckCircle2, Smartphone, LayoutDashboard, Star, QrCode, Utensils } from 'lucide-react';

export default function LiveDemoPage() {
  const guestFeatures = [
    'Zero app installation required — works in any phone browser',
    'Fast item search and dietary preference filter (Veg / Non-Veg / Jain)',
    'Smooth category scroll with animated selection states',
    'Cart with item quantity controls and order notes',
    'One-tap order submission that sends to the kitchen in real-time',
    'Responsive on all screen sizes from iPhone SE to large Android tablets'
  ];

  const merchantFeatures = [
    'Incoming live order feed from all tables simultaneously',
    'Per-table order history and session tracking',
    'Menu item management — add, edit, toggle availability, reorder',
    'Category creation and drag-to-sort ordering',
    'Table setup with individual QR code generation and PDF export',
    'Branding controls — logo, accent color, header image configuration'
  ];

  const demoScenarios = [
    {
      icon: Utensils,
      title: 'Scan as a First-time Guest',
      desc: 'Open the Customer Menu link on your mobile device. Experience the exact flow a dining guest would go through — browse categories, filter by dietary type, add items to cart, and submit an order. The interface loads in under 2 seconds and requires no registration.',
      link: '/menu/the-coffee-corner',
      linkText: 'Open Guest Menu Demo',
      color: 'border-[#FF6B35]/30 bg-[#FFF7F2]/30',
      badgeColor: 'text-[#FF6B35] bg-[#FFF7F2]',
      badge: 'Guest Perspective',
      external: true
    },
    {
      icon: LayoutDashboard,
      title: 'Explore the Merchant Dashboard',
      desc: 'Request a walk-through of the merchant administration dashboard — order management, menu editor, table manager, and branding configurator. We provide a live sandbox environment with mock data so you can test every control without affecting real orders.',
      link: '/enquire',
      linkText: 'Request Dashboard Access',
      color: 'border-indigo-200 bg-indigo-50/20',
      badgeColor: 'text-indigo-600 bg-indigo-50',
      badge: 'Restaurant Controls',
      external: false
    },
    {
      icon: QrCode,
      title: 'Preview a QR Code Export',
      desc: 'See an example of the printable QR code PDF that Restreasy generates for each table. The PDF includes the table number label, high-resolution vector QR code, and the Restreasy branding — all formatted for A6 standee cards or standard A4 sheets.',
      link: '/enquire',
      linkText: 'Request Sample PDF',
      color: 'border-emerald-200 bg-emerald-50/20',
      badgeColor: 'text-emerald-600 bg-emerald-50',
      badge: 'QR Code Preview',
      external: false
    }
  ];

  const steps = [
    { num: '01', label: 'Open the demo link on your mobile' },
    { num: '02', label: 'Browse the menu categories and items' },
    { num: '03', label: 'Add items to cart and submit an order' },
    { num: '04', label: 'See the order appear in the merchant view' },
  ];

  return (
    <InfoLayout
      title="Live Demo"
      subtitle="Explore Restreasy from both the customer's perspective and the merchant dashboard — no account needed."
      category="Product Trials"
      icon={Globe}
      accentColor="text-[#FF6B35] bg-[#FFF7F2] border-[#FF6B35]/20"
    >
      <div className="space-y-12 font-sans">

        {/* Intro */}
        <div className="space-y-3">
          <h2 className="text-sm font-black text-slate-800 uppercase tracking-wider">Test Drive the Experience</h2>
          <p className="text-slate-500 font-semibold text-xs leading-relaxed">
            Restreasy operates as a dual-channel system: a guest-facing QR menu that runs in any mobile browser, and a merchant administration dashboard for restaurant staff. Our live demo lets you experience both sides without setting up an account. Select your demo scenario below.
          </p>
        </div>

        {/* Demo Flow Steps */}
        <div className="bg-[#FFF7F2] border border-[#FF6B35]/20 rounded-2xl p-6 space-y-4">
          <h3 className="text-xs font-black text-[#FF6B35] uppercase tracking-wider flex items-center gap-1.5">
            <Star className="w-3.5 h-3.5 fill-[#FF6B35]" /> Recommended Demo Flow
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {steps.map((s, si) => (
              <div key={si} className="text-center space-y-2">
                <div className="w-10 h-10 rounded-full bg-[#FF6B35] text-white font-black text-xs flex items-center justify-center mx-auto">
                  {s.num}
                </div>
                <p className="text-[10px] font-bold text-slate-600 leading-tight">{s.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Demo Scenarios */}
        <div className="border-t border-[#EFEFEF] pt-8 space-y-5">
          <h2 className="text-sm font-black text-slate-800 uppercase tracking-wider">Demo Scenarios</h2>
          <div className="space-y-4">
            {demoScenarios.map((d, di) => (
              <div key={di} className={`border rounded-2xl p-6 space-y-4 ${d.color}`}>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white border border-[#EFEFEF] flex items-center justify-center shrink-0">
                    <d.icon className="w-5 h-5 text-slate-600" />
                  </div>
                  <div className="space-y-0.5">
                    <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${d.badgeColor} inline-block`}>{d.badge}</span>
                    <h3 className="font-black text-[#111827] text-sm">{d.title}</h3>
                  </div>
                </div>
                <p className="text-slate-500 font-semibold text-xs leading-relaxed">{d.desc}</p>
                <Link
                  href={d.link}
                  target={d.external ? '_blank' : undefined}
                  className="inline-flex items-center gap-1.5 bg-[#FF6B35] hover:bg-[#e05420] text-white font-bold px-5 py-2.5 rounded-xl text-xs transition-all shadow-sm hover:shadow-md"
                >
                  {d.linkText} <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* What to Explore sections */}
        <div className="border-t border-[#EFEFEF] pt-8 space-y-6">
          <h2 className="text-sm font-black text-slate-800 uppercase tracking-wider">What to Explore in Each View</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* Guest View */}
            <div className="border border-[#EFEFEF] rounded-2xl p-6 space-y-4 bg-white">
              <div className="flex items-center gap-2">
                <Smartphone className="w-4 h-4 text-[#FF6B35]" />
                <h3 className="font-black text-[#111827] text-sm">Guest Menu View</h3>
              </div>
              <p className="text-slate-500 font-semibold text-xs leading-relaxed">
                Open the guest demo on your phone for the most realistic experience. This is exactly what a customer sees after scanning the QR code standee at their table.
              </p>
              <ul className="space-y-2">
                {guestFeatures.map((f, fi) => (
                  <li key={fi} className="flex items-start gap-2 text-slate-500 font-semibold text-xs leading-relaxed">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#FF6B35] shrink-0 mt-0.5" />
                    {f}
                  </li>
                ))}
              </ul>
              <Link
                href="/menu/the-coffee-corner"
                target="_blank"
                className="w-full text-center py-2.5 rounded-xl font-bold text-xs bg-[#FF6B35] text-white hover:bg-[#e05420] flex items-center justify-center gap-1.5 shadow-2xs transition-colors"
              >
                Open Guest Menu <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Merchant View */}
            <div className="border border-[#EFEFEF] rounded-2xl p-6 space-y-4 bg-white">
              <div className="flex items-center gap-2">
                <LayoutDashboard className="w-4 h-4 text-indigo-600" />
                <h3 className="font-black text-[#111827] text-sm">Merchant Dashboard</h3>
              </div>
              <p className="text-slate-500 font-semibold text-xs leading-relaxed">
                The merchant dashboard is available to restaurant managers and owners. Access is granted after enquiry submission. Request a sandbox walkthrough to explore all controls.
              </p>
              <ul className="space-y-2">
                {merchantFeatures.map((f, fi) => (
                  <li key={fi} className="flex items-start gap-2 text-slate-500 font-semibold text-xs leading-relaxed">
                    <CheckCircle2 className="w-3.5 h-3.5 text-indigo-500 shrink-0 mt-0.5" />
                    {f}
                  </li>
                ))}
              </ul>
              <Link
                href="/enquire"
                className="w-full text-center py-2.5 rounded-xl font-bold text-xs bg-indigo-600 text-white hover:bg-indigo-700 flex items-center justify-center gap-1.5 shadow-2xs transition-colors"
              >
                Request Merchant Access <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

          </div>
        </div>

        {/* Mobile Recommendation */}
        <div className="border border-amber-200 bg-amber-50/30 rounded-2xl p-5 flex items-start gap-3">
          <Smartphone className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <h4 className="font-black text-[#111827] text-xs">For Best Results, Use a Mobile Device</h4>
            <p className="text-slate-500 font-semibold text-xs leading-relaxed">
              The guest menu is optimized for mobile browsers. While it works on desktop, we recommend opening the demo link on a smartphone to experience exactly how your restaurant guests will interact with the QR menu at their table.
            </p>
          </div>
        </div>

        {/* After Demo CTA */}
        <div className="border-t border-[#EFEFEF] pt-8 space-y-4 text-center">
          <h2 className="text-sm font-black text-slate-800 uppercase tracking-wider">Liked What You Saw?</h2>
          <p className="text-slate-500 font-semibold text-xs leading-relaxed max-w-md mx-auto">
            Submit an enquiry and our team will set up a custom Restreasy instance for your restaurant — including menu upload, table QR setup, and branding configuration — within 24 hours.
          </p>
          <Link href="/enquire" className="inline-flex items-center gap-1.5 bg-[#FF6B35] hover:bg-[#e05420] text-white font-bold px-8 py-3 rounded-xl text-xs transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5">
            Set Up My Restaurant's Menu <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

      </div>
    </InfoLayout>
  );
}
