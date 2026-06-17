import InfoLayout from '@/app/components/info-layout';
import Link from 'next/link';
import { BookOpen, ShieldCheck, Users, Rocket, Heart, Globe, Award, Target } from 'lucide-react';

export default function AboutUsPage() {
  const principles = [
    {
      icon: ShieldCheck,
      title: 'Pixel-Perfect Aesthetics',
      desc: 'Hospitality is built on design. We construct menus and UI structures that feel premium, clean, and reflect the quality of the food you serve.'
    },
    {
      icon: Rocket,
      title: 'Frictionless Interaction',
      desc: 'No app installation requirements, no login forms, and no mandatory data collection. Just scan the code, browse dishes, and place the order.'
    },
    {
      icon: Heart,
      title: 'Zero Middleman',
      desc: 'We do not intervene between the diner and the kitchen. Direct connection, zero order commission fee models, and full revenue stays with the restaurant.'
    },
    {
      icon: Globe,
      title: 'Enterprise Reliability',
      desc: 'Menus operate on globally distributed databases to ensure they are available in milliseconds, even under poor network coverage in basements or crowded venues.'
    },
    {
      icon: Users,
      title: 'Local Business First',
      desc: 'We are built specifically for independent cafes, restaurants, dhabas, and small chains — not large enterprise chains with dedicated engineering teams.'
    },
    {
      icon: Target,
      title: 'Data Stays Yours',
      desc: 'We do not resell your restaurant data or customer order history to third parties. Your business data is private and stored exclusively within your account.'
    }
  ];

  const timeline = [
    {
      year: '2023',
      title: 'Concept & Research',
      desc: 'Our founders visited 40+ local cafes and restaurants in Mumbai and Bangalore to understand the core friction points in the analog ordering experience. We observed menus being shared between tables, customers unable to call for waiters, and restaurants reprinting menus every time they changed prices.'
    },
    {
      year: '2024',
      title: 'First Prototype Deployed',
      desc: 'The first QR menu prototype was tested at a 12-table rooftop cafe in Bandra, Mumbai. The core hypothesis — that guests would scan without downloading an app — was validated within the first weekend. Orders came through from 8 out of 12 tables within the first two hours of service.'
    },
    {
      year: '2025',
      title: 'Merchant Dashboard Launch',
      desc: 'After validating the guest-side experience, we built out the full merchant backoffice — menu management, table QR generator, dietary label system, and availability toggles. 30 restaurants were onboarded in the pilot phase across Tier 1 cities in India.'
    },
    {
      year: '2026',
      title: 'Restreasy SaaS Platform',
      desc: 'We rebranded and launched as Restreasy, opening up our platform to any restaurant or cafe that wants to digitize their table ordering experience. Our current waitlist spans hundreds of enquiries across 12+ cities in India and UAE.'
    }
  ];

  const teamMembers = [
    {
      name: 'Vikram Malhotra',
      role: 'Co-founder & CEO',
      bio: 'Previously led product at a major food delivery startup. Spent 5 years studying the psychology of restaurant ordering and dining economics across Southeast Asia.'
    },
    {
      name: 'Shreya Iyer',
      role: 'Co-founder & CTO',
      bio: 'Full-stack engineer with 8 years of experience building high-performance web systems. Passionate about mobile browser optimization and progressive web technologies.'
    },
    {
      name: 'Arjun Patel',
      role: 'Head of Partnerships',
      bio: 'Former regional sales head at a cloud POS company. Deep relationships across the restaurant and hospitality industry in India, UAE, and Singapore.'
    },
    {
      name: 'Meera Krishnan',
      role: 'Head of Design',
      bio: 'UI/UX designer with 6 years of experience crafting premium consumer interfaces. Previously designed dining apps used in hotel chains across Southeast Asia.'
    }
  ];

  const stats = [
    { value: '200+', label: 'Restaurants enquired' },
    { value: '12+', label: 'Cities across India & UAE' },
    { value: '0', label: 'Commission on orders' },
    { value: '< 2s', label: 'Menu load on mobile' },
  ];

  return (
    <InfoLayout
      title="About Restreasy"
      subtitle="Empowering hospitality businesses with clean, elegant, and frictionless digital table ordering tools."
      category="Our Profile"
      icon={BookOpen}
      accentColor="text-[#FF6B35] bg-[#FFF7F2] border-[#FF6B35]/20"
    >
      <div className="space-y-12 font-sans">

        {/* Mission Statement */}
        <div className="space-y-4">
          <h2 className="text-sm font-black text-slate-800 uppercase tracking-wider">Our Core Vision</h2>
          <p className="text-slate-500 font-semibold text-xs leading-relaxed">
            At Restreasy, we believe dining should be an effortless experience — for both the guest and the team behind the kitchen. Restaurants face increasing pressures from printing costs, menu item price adjustments, peak-hour staffing constraints, and the growing expectation for tech-enabled dining. Our goal is to supply every cafe and restaurant with their own fast, standalone QR menu and ordering system, enabling them to delight customers without relying on bloated marketplace applications or expensive tablet hardware.
          </p>
          <p className="text-slate-500 font-semibold text-xs leading-relaxed">
            By shifting from static paper booklets to interactive web interfaces, restaurants can instantly update menu pricing, indicate item availability, gather customer feedback, and monitor live order inflows — without printing a single sheet of paper. We exist so that a two-person cafe owner in Mysore has access to the same quality of digital ordering infrastructure that a five-star hotel chain uses.
          </p>
          <p className="text-slate-500 font-semibold text-xs leading-relaxed">
            We are not building for restaurants that already have large IT teams and enterprise POS integrations. We are specifically designed for the owner who manages their own floor, prints their own QR codes, and needs a system that just works — immediately, reliably, and beautifully.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 border-t border-[#EFEFEF] pt-8">
          {stats.map((s, i) => (
            <div key={i} className="border border-[#EFEFEF] rounded-2xl p-4 text-center bg-[#FAFAFA]/50 space-y-1">
              <div className="text-2xl font-black text-[#FF6B35]">{s.value}</div>
              <div className="text-[10px] font-bold text-slate-500 leading-tight">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Operating Principles */}
        <div className="border-t border-[#EFEFEF] pt-8 space-y-5">
          <h2 className="text-sm font-black text-slate-800 uppercase tracking-wider">Our Operating Principles</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {principles.map((p, pi) => (
              <div key={pi} className="space-y-2 border border-[#EFEFEF] bg-[#FAFAFA]/40 p-5 rounded-xl hover:bg-white hover:shadow-sm transition-all">
                <h3 className="font-black text-slate-800 text-xs flex items-center gap-2">
                  <p.icon className="w-4 h-4 text-[#FF6B35] shrink-0" /> {p.title}
                </h3>
                <p className="text-slate-500 font-semibold text-xs leading-relaxed">
                  {p.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Company Timeline */}
        <div className="border-t border-[#EFEFEF] pt-8 space-y-6">
          <h2 className="text-sm font-black text-slate-800 uppercase tracking-wider">Our Journey</h2>
          <div className="space-y-8">
            {timeline.map((t, ti) => (
              <div key={ti} className="flex gap-5 items-start">
                <div className="shrink-0 w-14 h-14 rounded-2xl bg-[#FFF7F2] border border-[#FF6B35]/20 flex flex-col items-center justify-center text-center">
                  <span className="text-[10px] font-black text-[#FF6B35] uppercase tracking-wider leading-none">{t.year}</span>
                </div>
                <div className="space-y-1.5">
                  <h3 className="font-black text-[#111827] text-sm">{t.title}</h3>
                  <p className="text-slate-500 font-semibold text-xs leading-relaxed">{t.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Team */}
        <div className="border-t border-[#EFEFEF] pt-8 space-y-5">
          <h2 className="text-sm font-black text-slate-800 uppercase tracking-wider">The Team Behind Restreasy</h2>
          <p className="text-slate-500 font-semibold text-xs leading-relaxed">
            We are a compact, distributed team combining experience in product development, hospitality operations, and design. Every member has spent time in real restaurant environments to understand the problem we are solving.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {teamMembers.map((m, mi) => (
              <div key={mi} className="border border-[#EFEFEF] rounded-2xl p-5 bg-[#FAFAFA]/40 space-y-2 hover:bg-white hover:shadow-sm transition-all">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#FFF7F2] border border-[#FF6B35]/20 flex items-center justify-center text-[#FF6B35] font-black text-sm shrink-0">
                    {m.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <h3 className="font-black text-[#111827] text-xs">{m.name}</h3>
                    <span className="text-[10px] font-bold text-[#FF6B35]">{m.role}</span>
                  </div>
                </div>
                <p className="text-slate-500 font-semibold text-xs leading-relaxed">{m.bio}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Values */}
        <div className="border-t border-[#EFEFEF] pt-8 space-y-4">
          <h2 className="text-sm font-black text-slate-800 uppercase tracking-wider">Why We Do This</h2>
          <div className="bg-[#FFF7F2] border border-[#FF6B35]/20 rounded-2xl p-6 space-y-3">
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5 text-[#FF6B35]" />
              <h3 className="font-black text-[#111827] text-sm">Our Commitment to Local Restaurants</h3>
            </div>
            <p className="text-slate-600 font-semibold text-xs leading-relaxed">
              India has over 7.5 million restaurants and food service establishments. The vast majority are independent family-run operations that do not have the resources to afford enterprise POS systems or dedicated technology teams. We believe every one of these restaurants deserves access to a beautiful, fast, and reliable digital menu that helps them serve their customers better, attract more guests, and grow their business — at a price that makes sense for them.
            </p>
            <p className="text-slate-600 font-semibold text-xs leading-relaxed">
              We also believe in responsible technology. We do not push unnecessary data collection from diners. We do not take commissions from orders. We do not lock restaurants into proprietary hardware. Our approach is simple: provide genuine value through software, charge fairly for it, and let restaurants focus on what they do best — cooking incredible food and creating memorable dining experiences.
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="border-t border-[#EFEFEF] pt-8 text-center space-y-4">
          <h3 className="font-black text-slate-800 text-sm">Want to learn more about our story?</h3>
          <p className="text-slate-500 font-semibold text-xs max-w-md mx-auto leading-relaxed">
            Reach out to our team directly via the contact form or submit a restaurant enquiry to see Restreasy in action at your venue.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/contact" className="inline-block bg-[#FF6B35] hover:bg-[#e05420] text-white font-bold px-8 py-3 rounded-xl text-xs transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5">
              Get in Touch →
            </Link>
            <Link href="/enquire" className="inline-block bg-white border border-[#EFEFEF] hover:bg-[#FFF7F2] hover:border-[#FF6B35]/30 text-slate-700 font-bold px-8 py-3 rounded-xl text-xs transition-all shadow-sm">
              Submit Restaurant Enquiry
            </Link>
          </div>
        </div>

      </div>
    </InfoLayout>
  );
}
