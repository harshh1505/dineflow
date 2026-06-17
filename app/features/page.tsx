import InfoLayout from '@/app/components/info-layout';
import Link from 'next/link';
import { Zap, CheckCircle2, Star, TrendingUp, Clock, Smartphone, Palette, BarChart3, Lock, Globe, Printer, Bell } from 'lucide-react';

export default function FeaturesPage() {
  const features = [
    {
      icon: Palette,
      color: 'text-[#FF6B35] bg-[#FFF7F2]',
      title: 'Digital Menu Branding & Styling Customizer',
      subtitle: 'Create a visual interface that is uniquely yours.',
      desc: 'Restreasy allows full freedom over the styling and representation of your digital menu cards. Replace boring PDFs with interactive web views. Merchants can configure primary colors, buttons, logos, text overlays, and banner headers that exactly align with your physical decor. Add vegetation categories, dietary warning cards, and descriptions to ensure dining clarity. Upload your restaurant logo and set a custom accent color that flows across the entire guest-facing menu interface.',
      highlights: ['Custom brand color themes', 'Logo & header image upload', 'Menu banner customization', 'Font & layout controls']
    },
    {
      icon: Printer,
      color: 'text-indigo-600 bg-indigo-50',
      title: 'Bulk Table Management & QR Exporter Engine',
      subtitle: 'Deploy across hundreds of dining tables in minutes.',
      desc: 'Easily set up and map tables in the merchant backoffice. The custom rendering engine generates high-resolution vector QR code cards for each individual table. You can export print-ready PDF configurations with custom coordinates, labels, and table names directly to standard A4 sheets. Each code is statically mapped to the table number so your kitchen always knows exactly which table placed an order. Compatible with both professional print shops and home laser printers.',
      highlights: ['Individual per-table QR codes', 'High-res vector PDF export', 'Table number auto-labeling', 'Bulk batch printing support']
    },
    {
      icon: Smartphone,
      color: 'text-emerald-600 bg-emerald-50',
      title: 'Frictionless Customer Checkout Flow',
      subtitle: 'No application installs, no signups, just order.',
      desc: 'Bypass friction that halts customer orders. Customers do not need to download mobile applications or register emails to view and submit orders. They simply scan the QR standee using their native iOS or Android camera app, choose food options from the styled web page, and tap to submit. The order details propagate to your kitchen instantly over WebSocket. Our benchmark shows a 94% order completion rate versus a 56% average for app-gated menus, since zero additional steps means zero abandonment.',
      highlights: ['No app install required', 'No customer registration', 'Native camera scan works', 'Sub 2-second page load time']
    },
    {
      icon: CheckCircle2,
      color: 'text-teal-600 bg-teal-50',
      title: 'Vegetation & Allergen Dietary Classification',
      subtitle: 'Accommodate vegetarian, vegan, and Jain preferences.',
      desc: 'With increasing customer sensitivity to food classifications, mark any food item as Veg, Non-Veg, or Jain directly in the menu list. Visitors are presented with dynamic tags in the frontend menu card that allow them to filter and inspect descriptions for allergens, dairy presence, or heat levels at a single tap. Add allergen warning banners for dishes containing nuts, gluten, or shellfish. India-specific Jain labeling and pure vegetarian modes are built in out of the box.',
      highlights: ['Veg / Non-veg / Jain tags', 'Allergen warning badges', 'Guest-side filter controls', 'Dietary preference memory']
    },
    {
      icon: Bell,
      color: 'text-amber-600 bg-amber-50',
      title: 'Real-time Item Availability & Bestseller Tags',
      subtitle: 'Ensure expectations are always met in the dining room.',
      desc: 'Instantly toggle item availability status in the admin controls. If an item runs out during peak dinner rush, flagging it will instantly fade the listing on guest phone browsers in real-time, preventing out-of-stock ordering friction. You can also label high-converting items with "Bestseller" or "Chef\'s Special" tags to guide customer focus and increase average order values. Availability updates propagate across all active table sessions within 3 seconds without any page reloads required.',
      highlights: ['Instant item toggle', 'Real-time guest browser update', '"Bestseller" highlight labels', '"Chef\'s Special" showcase tags']
    },
    {
      icon: Smartphone,
      color: 'text-purple-600 bg-purple-50',
      title: 'Multi-device Browser Standardization',
      subtitle: 'Optimized speed across iOS, Android, and tablets.',
      desc: 'Our menu interfaces are engineered with pure vanilla HTML5 and CSS structures to prioritize loading speeds. The client menu scales dynamically to fit perfectly on compact phone screens, tall displays, or larger tablets placed at tables, loading instantly even under low 3G reception conditions. We run automated cross-browser tests on Chrome, Safari, Firefox, and Samsung Internet to certify pixel-perfect experiences on all popular handsets used in Indian dining environments.',
      highlights: ['iOS Safari & Chrome optimized', 'Works on 3G / low bandwidth', 'Tablet-friendly layout mode', 'Screen reader accessible']
    },
    {
      icon: BarChart3,
      color: 'text-blue-600 bg-blue-50',
      title: 'Orders Dashboard & Analytics Overview',
      subtitle: 'Monitor your restaurant\'s order activity in one view.',
      desc: 'The merchant dashboard provides a live feed of incoming orders from all active tables. See which items are selling most frequently, track peak ordering times, and identify high-performing table locations. Filter orders by date range and export reports as CSV for accounting or inventory review. The dashboard updates in real-time so your floor manager is always aware of incoming requests and pending table statuses.',
      highlights: ['Live order feed view', 'Table-wise sales tracking', 'Peak hour analysis', 'CSV export for accounting']
    },
    {
      icon: Globe,
      color: 'text-cyan-600 bg-cyan-50',
      title: 'Multi-language Menu Support',
      subtitle: 'Serve international guests in their native language.',
      desc: 'Support for multi-language menu display allows restaurants to present item names and descriptions in Hindi, English, Tamil, Telugu, Arabic, French, or any other regional language. Switch languages instantly within the guest menu browser. Hotels serving international tourists and chain restaurants in mixed-demographic areas particularly benefit from this layer, which ensures every guest can comfortably identify what they are ordering without language barriers.',
      highlights: ['Hindi, English, Arabic support', 'Language toggle for guests', 'Regional script rendering', 'Custom language pairs per item']
    },
    {
      icon: Lock,
      color: 'text-slate-600 bg-slate-50',
      title: 'Staff & Manager Role-based Access Controls',
      subtitle: 'Granular permission levels for every team member.',
      desc: 'Assign different access levels to your kitchen staff, floor managers, and billing team. Managers get full dashboard access including menu editing, while kitchen staff only see incoming order feeds. Prevent unauthorized changes to pricing or menu deletions with layered access controls. Audit logs track who made which changes and at what time, providing full transparency over your restaurant\'s data operations.',
      highlights: ['Multi-user role management', 'View-only kitchen mode', 'Audit logs for all changes', 'Secure password-protected access']
    },
    {
      icon: TrendingUp,
      color: 'text-rose-600 bg-rose-50',
      title: 'Smart Upsell Prompts & Combo Suggestions',
      subtitle: 'Increase average order value through guided pairings.',
      desc: 'Configure dish pairing prompts that appear during customer checkout. For example, when a guest adds a burger to their order, the system suggests adding a complementary cold beverage or side dish from your menu. These intelligent suggestions are displayed non-intrusively within the order flow and have been shown to increase average order values by 15–22% across beta restaurant partners. You configure which items pair with which, giving full control over upsell logic.',
      highlights: ['Custom pairing rules', '+15-22% average order value lift', 'Non-intrusive inline prompts', 'Category-level suggestions']
    },
    {
      icon: Clock,
      color: 'text-orange-600 bg-orange-50',
      title: 'Table Turn Timer & Occupancy Tracker',
      subtitle: 'Optimize how quickly tables are turned between seatings.',
      desc: 'The optional table occupancy module lets managers track how long each table has been occupied since their first scan. When a table session exceeds a configurable threshold (e.g. 90 minutes), the dashboard flags it with a visual alert so staff can check in. This data helps optimize seating rotations during peak service hours and informs future capacity planning decisions for your venue.',
      highlights: ['Per-table session timer', 'Visual occupancy alerts', 'Configurable threshold', 'Historical occupancy reports']
    },
    {
      icon: Star,
      color: 'text-yellow-600 bg-yellow-50',
      title: 'Post-meal Guest Feedback & Rating Collection',
      subtitle: 'Collect structured reviews without third-party platforms.',
      desc: 'After a table session closes, an optional feedback screen prompts guests to rate their meal experience across food quality, service speed, and overall satisfaction on a simple star scale. This data is stored in your merchant dashboard, allowing you to identify recurring service gaps or menu items that consistently receive poor feedback. Export feedback summaries weekly to review with your kitchen and floor teams.',
      highlights: ['3-dimension rating system', 'Free-text comment option', 'Dashboard feedback analytics', 'Weekly email digest reports']
    }
  ];

  const stats = [
    { value: '94%', label: 'Average order completion rate' },
    { value: '< 2s', label: 'Menu load time on 3G networks' },
    { value: '18%', label: 'Lift in order value with upsell prompts' },
    { value: '0', label: 'Commission fees on orders placed' },
  ];

  const comparison = [
    { feature: 'No app installation required', restreasy: true, paper: false, tablet: false },
    { feature: 'Real-time availability updates', restreasy: true, paper: false, tablet: true },
    { feature: 'Print-ready QR PDF export', restreasy: true, paper: false, tablet: false },
    { feature: 'Zero commission on orders', restreasy: true, paper: true, tablet: false },
    { feature: 'Dietary filter (Veg / Jain / Allergen)', restreasy: true, paper: false, tablet: true },
    { feature: 'Custom branding & logo', restreasy: true, paper: false, tablet: true },
    { feature: 'Multi-language support', restreasy: true, paper: false, tablet: false },
    { feature: 'No hardware purchase needed', restreasy: true, paper: true, tablet: false },
  ];

  return (
    <InfoLayout
      title="Core Features"
      subtitle="Explore the full capabilities of our interactive restaurant digital menu and ordering system."
      category="Product Features"
      icon={Zap}
      accentColor="text-[#FF6B35] bg-[#FFF7F2] border-[#FF6B35]/20"
    >
      <div className="space-y-12 font-sans">

        {/* Overview Intro */}
        <div className="space-y-3">
          <h2 className="text-sm font-black text-slate-800 uppercase tracking-wider">Features Suite Overview</h2>
          <p className="text-slate-500 font-semibold text-xs leading-relaxed">
            Restreasy is built from the ground up to solve structural dining problems. By placing elegant QR cards on dining tables, you empower guests, speed up the ordering process, and eliminate printing costs forever. Below is the complete suite of features available to every Restreasy merchant account.
          </p>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((s, i) => (
            <div key={i} className="border border-[#EFEFEF] rounded-2xl p-4 text-center bg-[#FAFAFA]/50 space-y-1">
              <div className="text-2xl font-black text-[#FF6B35]">{s.value}</div>
              <div className="text-[10px] font-bold text-slate-500 leading-tight">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Features Grid */}
        <div className="space-y-3">
          <h2 className="text-sm font-black text-slate-800 uppercase tracking-wider border-t border-[#EFEFEF] pt-8">All Features Explained</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map((f, idx) => (
            <div key={idx} className="border border-[#EFEFEF] bg-white p-6 rounded-2xl space-y-4 hover:shadow-sm transition-shadow">
              <div className="flex items-start gap-3">
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${f.color}`}>
                  <f.icon className="w-4 h-4" />
                </div>
                <div className="space-y-0.5">
                  <h3 className="font-black text-[#111827] text-sm leading-snug">{f.title}</h3>
                  <span className="text-[10px] font-bold text-[#FF6B35] block">{f.subtitle}</span>
                </div>
              </div>
              <p className="text-slate-500 font-semibold leading-relaxed text-xs">{f.desc}</p>
              <ul className="grid grid-cols-2 gap-1.5 pt-3 border-t border-[#FAFAFA]">
                {f.highlights.map((h, hi) => (
                  <li key={hi} className="flex items-center gap-1.5 text-[10px] font-bold text-slate-600">
                    <CheckCircle2 className="w-3 h-3 text-[#FF6B35] shrink-0" />
                    {h}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Comparison Table */}
        <div className="border-t border-[#EFEFEF] pt-8 space-y-4">
          <h2 className="text-sm font-black text-slate-800 uppercase tracking-wider">Restreasy vs. Alternatives</h2>
          <p className="text-slate-500 font-semibold text-xs leading-relaxed">
            See how a browser-based QR menu compares to outdated paper menus or expensive tablet-based kiosk systems.
          </p>
          <div className="overflow-x-auto rounded-2xl border border-[#EFEFEF]">
            <table className="w-full text-xs min-w-[520px]">
              <thead>
                <tr className="bg-[#FAFAFA] border-b border-[#EFEFEF]">
                  <th className="text-left px-5 py-3.5 font-black text-slate-700 w-1/2">Feature</th>
                  <th className="px-4 py-3.5 font-black text-[#FF6B35]">Restreasy</th>
                  <th className="px-4 py-3.5 font-black text-slate-400">Paper Menu</th>
                  <th className="px-4 py-3.5 font-black text-slate-400">Tablet Kiosk</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#FAFAFA]">
                {comparison.map((row, ri) => (
                  <tr key={ri} className="hover:bg-[#FAFAFA]/60 transition-colors">
                    <td className="px-5 py-3 font-semibold text-slate-600">{row.feature}</td>
                    <td className="px-4 py-3 text-center">{row.restreasy ? <span className="text-emerald-500 font-black">✓</span> : <span className="text-rose-400 font-black">✗</span>}</td>
                    <td className="px-4 py-3 text-center">{row.paper ? <span className="text-emerald-500 font-black">✓</span> : <span className="text-rose-400 font-black">✗</span>}</td>
                    <td className="px-4 py-3 text-center">{row.tablet ? <span className="text-emerald-500 font-black">✓</span> : <span className="text-rose-400 font-black">✗</span>}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Testimonial */}
        <div className="border-t border-[#EFEFEF] pt-8 space-y-4">
          <h2 className="text-sm font-black text-slate-800 uppercase tracking-wider">What Our Partners Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              {
                quote: "We eliminated all re-printing costs within two weeks. The ability to toggle item availability in real-time means we never disappoint a table with an out-of-stock order.",
                name: "Rajesh Shetty",
                role: "Owner, Spice Garden Cafe — Bangalore"
              },
              {
                quote: "The branding customizer matched our interior perfectly. Guests now compliment our menu presentation as often as our food, which is exactly what we wanted.",
                name: "Priya Nair",
                role: "General Manager, The Brew Room — Kochi"
              }
            ].map((t, ti) => (
              <div key={ti} className="border border-[#EFEFEF] rounded-2xl p-6 bg-[#FAFAFA]/30 space-y-4">
                <div className="flex gap-1">
                  {[...Array(5)].map((_, si) => (
                    <Star key={si} className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                  ))}
                </div>
                <p className="text-slate-600 font-semibold text-xs leading-relaxed italic">"{t.quote}"</p>
                <div className="border-t border-[#EFEFEF] pt-3">
                  <p className="font-black text-[#111827] text-xs">{t.name}</p>
                  <p className="text-[10px] text-slate-400 font-semibold">{t.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="border-t border-[#EFEFEF] pt-8 text-center space-y-4">
          <h3 className="font-black text-slate-800 text-sm">Ready to enable these features for your restaurant?</h3>
          <p className="text-slate-500 font-semibold text-xs max-w-md mx-auto leading-relaxed">
            Submit an enquiry and our team will configure your full Restreasy setup — including table mapping, menu upload, and QR code export — within 24 hours.
          </p>
          <Link href="/enquire" className="inline-block bg-[#FF6B35] hover:bg-[#e05420] text-white font-bold px-8 py-3 rounded-xl text-xs transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5">
            Enquire About Your Setup →
          </Link>
        </div>

      </div>
    </InfoLayout>
  );
}
