import InfoLayout from '@/app/components/info-layout';
import Link from 'next/link';
import { FileText, ArrowDownToLine, CheckCircle2, Mail, ExternalLink } from 'lucide-react';

export default function PressKitPage() {
  const facts = [
    { label: 'Company Name', value: 'Restreasy Technologies Pvt. Ltd.' },
    { label: 'Founded', value: '2023 (Incorporated 2024)' },
    { label: 'Headquarters', value: 'BKC Finance Hub, Mumbai, Maharashtra, India — 400051' },
    { label: 'Founders', value: 'Vikram Malhotra (CEO) & Shreya Iyer (CTO)' },
    { label: 'Mission', value: 'Provide every restaurant and cafe with a beautiful, frictionless digital QR menu and ordering system — at a price accessible to independent operators.' },
    { label: 'Product Type', value: 'SaaS (Software as a Service) — B2B, sold per restaurant' },
    { label: 'Markets Served', value: 'India (primary), UAE & Singapore (expanding)' },
    { label: 'Current Stage', value: 'Seed-stage, actively onboarding restaurant partners' },
    { label: 'Pricing Model', value: '₹15,000-₹25,000 setup fee + Pro Fixed (₹999/mo) / Partner Share (₹2,999/mo) / Enterprise Suite (Custom Pricing)' },
    { label: 'Revenue Model', value: 'Flat monthly subscription options — zero monthly commissions on all tiers' },
  ];

  const colors = [
    { name: 'Restreasy Orange', hex: '#FF6B35', rgb: 'RGB(255, 107, 53)', use: 'Primary brand, buttons, CTAs' },
    { name: 'Deep Charcoal', hex: '#111827', rgb: 'RGB(17, 24, 39)', use: 'Primary text, headings' },
    { name: 'Platform Indigo', hex: '#4F46E5', rgb: 'RGB(79, 70, 229)', use: 'Dashboard accents, merchant UI' },
    { name: 'Neutral White', hex: '#FAFAFA', rgb: 'RGB(250, 250, 250)', use: 'Backgrounds, card surfaces' },
  ];

  const downloadAssets = [
    {
      title: 'Restreasy Logo Pack (SVG + PNG)',
      desc: 'Contains the horizontal lockup, standalone icon mark, and wordmark — all in SVG vector format and PNG exports at @1x, @2x, and @3x resolutions. Dark and light variants included.',
      format: 'ZIP, ~3.2MB'
    },
    {
      title: 'Brand Style Guide (PDF)',
      desc: 'Full brand usage guidelines including typography specifications (Inter typeface family), color palette values, spacing rules, logo clear zones, and usage restrictions.',
      format: 'PDF, ~8 pages'
    },
    {
      title: 'Product Screenshots Pack',
      desc: 'High-resolution screenshots of the guest QR menu interface and the merchant dashboard — covering desktop and mobile views. Suitable for editorial use in articles and reviews.',
      format: 'ZIP, ~12MB'
    },
    {
      title: 'Company Factsheet (PDF)',
      desc: 'A one-page summary of Restreasy\'s company background, product description, founding team, market focus, and key statistics — formatted for press and publication use.',
      format: 'PDF, ~1 page'
    },
    {
      title: 'Founder Headshots',
      desc: 'Professional headshot photos of Vikram Malhotra (CEO) and Shreya Iyer (CTO) in both color and black-and-white, at print-ready resolution (300 DPI, TIFF + JPEG).',
      format: 'ZIP, ~18MB'
    },
    {
      title: 'Product Video (B-roll)',
      desc: 'A 60-second B-roll video clip showing the guest QR scan flow, menu browsing, and merchant order dashboard — suitable for use in news segments or product review videos.',
      format: 'MP4, ~240MB'
    }
  ];

  const mediaQuotes = [
    {
      quote: "Restreasy has the potential to become the standard for QR-based digital ordering for independent restaurants in India's Tier 1 and Tier 2 cities.",
      source: 'RestaurantTech India Review',
      date: 'April 2026'
    },
    {
      quote: "What stands out about Restreasy is their commitment to a no-commission model — something the restaurant industry desperately needs after years of aggregator dependency.",
      source: 'Hospitality Business Weekly',
      date: 'March 2026'
    }
  ];

  const guidelines = [
    'Always use the provided logo files — do not recreate or trace the logo manually.',
    'Maintain minimum clear zone (equal to the height of the letter "D" in Restreasy) around the logo on all sides.',
    'Do not alter the logo colors, proportions, rotation, or add drop shadows or embossing effects.',
    'Do not use the logo on backgrounds where it lacks sufficient contrast. Use the white version on dark backgrounds.',
    'The company name is spelled "Restreasy" (one word, capital D and capital F). Do not write "Dine Flow", "restreasy", or "RESTREASY".',
    'Do not use Restreasy branding to imply endorsement of third-party products without written permission from our PR team.',
  ];

  return (
    <InfoLayout
      title="Press & Media Kit"
      subtitle="Official logos, brand assets, company factsheets, and media contact information for journalists and content creators."
      category="Press & Media"
      icon={FileText}
      accentColor="text-indigo-600 bg-indigo-50 border-indigo-150"
    >
      <div className="space-y-12 font-sans">

        {/* Intro */}
        <div className="space-y-3">
          <h2 className="text-sm font-black text-slate-800 uppercase tracking-wider">For Journalists & Content Creators</h2>
          <p className="text-slate-500 font-semibold text-xs leading-relaxed">
            If you are writing about Restreasy, the QR menu technology space, or the broader restaurant tech industry, this page provides all the brand assets and company information you need. For specific media enquiries, interview requests, or exclusive content, contact our PR team directly.
          </p>
        </div>

        {/* Company Factsheet */}
        <div className="border-t border-[#EFEFEF] pt-8 space-y-5">
          <h2 className="text-sm font-black text-slate-800 uppercase tracking-wider">Company Factsheet</h2>
          <div className="border border-[#EFEFEF] rounded-2xl overflow-hidden">
            {facts.map((f, fi) => (
              <div key={fi} className={`flex flex-col sm:flex-row sm:gap-4 px-5 py-3.5 text-xs ${fi % 2 === 0 ? 'bg-[#FAFAFA]/50' : 'bg-white'} border-b border-[#EFEFEF] last:border-0`}>
                <span className="font-black text-slate-700 shrink-0 sm:w-40">{f.label}</span>
                <span className="text-slate-500 font-semibold leading-relaxed">{f.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Brand Colors */}
        <div className="border-t border-[#EFEFEF] pt-8 space-y-5">
          <h2 className="text-sm font-black text-slate-800 uppercase tracking-wider">Brand Color Palette</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {colors.map((c, ci) => (
              <div key={ci} className="border border-[#EFEFEF] rounded-2xl overflow-hidden bg-white">
                <div className="h-16 w-full" style={{ backgroundColor: c.hex }} />
                <div className="p-4 space-y-1">
                  <h3 className="font-black text-[#111827] text-xs">{c.name}</h3>
                  <div className="flex gap-3 text-[10px] font-bold text-slate-400">
                    <span>{c.hex}</span>
                    <span>•</span>
                    <span>{c.rgb}</span>
                  </div>
                  <p className="text-[10px] text-slate-400 font-semibold">{c.use}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="text-slate-400 font-semibold text-xs">
            Our primary typeface is <strong className="text-slate-600">Inter</strong> (Google Fonts). Secondary typeface for data-dense UI: <strong className="text-slate-600">JetBrains Mono</strong>.
          </p>
        </div>

        {/* Downloadable Assets */}
        <div className="border-t border-[#EFEFEF] pt-8 space-y-5">
          <h2 className="text-sm font-black text-slate-800 uppercase tracking-wider">Downloadable Brand Assets</h2>
          <p className="text-slate-500 font-semibold text-xs leading-relaxed">
            All assets are available for editorial and journalistic use. Commercial use or modification of brand assets requires written permission. Contact press@restreasy.in to request access.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {downloadAssets.map((a, ai) => (
              <div key={ai} className="border border-[#EFEFEF] rounded-xl p-5 bg-[#FAFAFA]/50 space-y-3 hover:bg-white hover:shadow-sm transition-all">
                <div className="space-y-1">
                  <h3 className="font-black text-[#111827] text-xs">{a.title}</h3>
                  <span className="text-[9px] font-bold text-slate-400 bg-[#F1F1F1] px-2 py-0.5 rounded">{a.format}</span>
                </div>
                <p className="text-slate-400 font-semibold text-xs leading-relaxed">{a.desc}</p>
                <Link href="/enquire" className="text-indigo-600 font-black text-xs hover:underline flex items-center gap-1">
                  <ArrowDownToLine className="w-3.5 h-3.5" /> Request Download Access
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Brand Usage Guidelines */}
        <div className="border-t border-[#EFEFEF] pt-8 space-y-5">
          <h2 className="text-sm font-black text-slate-800 uppercase tracking-wider">Brand Usage Guidelines</h2>
          <div className="space-y-2">
            {guidelines.map((g, gi) => (
              <div key={gi} className="flex items-start gap-2 border border-[#EFEFEF] rounded-lg px-4 py-3 bg-[#FAFAFA]/50 text-xs">
                <CheckCircle2 className="w-3.5 h-3.5 text-indigo-500 shrink-0 mt-0.5" />
                <p className="text-slate-500 font-semibold leading-relaxed">{g}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Press Mentions */}
        <div className="border-t border-[#EFEFEF] pt-8 space-y-5">
          <h2 className="text-sm font-black text-slate-800 uppercase tracking-wider">Media Coverage & Mentions</h2>
          <div className="space-y-4">
            {mediaQuotes.map((q, qi) => (
              <div key={qi} className="border border-[#EFEFEF] rounded-xl p-5 bg-[#FAFAFA]/50 space-y-3">
                <p className="text-slate-600 font-semibold text-xs leading-relaxed italic">"{q.quote}"</p>
                <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400">
                  <ExternalLink className="w-3 h-3" />
                  <span>{q.source}</span>
                  <span>•</span>
                  <span>{q.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Media Contact */}
        <div className="border-t border-[#EFEFEF] pt-8 space-y-4">
          <h2 className="text-sm font-black text-slate-800 uppercase tracking-wider">Media Contact</h2>
          <p className="text-slate-500 font-semibold text-xs leading-relaxed">
            For interview requests, exclusive content, speaking engagements, or to receive advance product information under embargo, contact our communications team directly.
          </p>
          <div className="border border-[#EFEFEF] rounded-2xl p-6 bg-white space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              {[
                { label: 'PR & Communications Lead', value: 'Anjali Desai', email: 'press@restreasy.in' },
                { label: 'General Enquiries', value: 'Communications Team', email: 'media@restreasy.in' }
              ].map((c, ci) => (
                <div key={ci} className="space-y-1">
                  <p className="text-[9px] font-black text-slate-400 uppercase tracking-wider">{c.label}</p>
                  <p className="font-black text-[#111827]">{c.value}</p>
                  <a href={`mailto:${c.email}`} className="text-indigo-600 font-bold hover:underline flex items-center gap-1 text-[10px]">
                    <Mail className="w-3 h-3" /> {c.email}
                  </a>
                </div>
              ))}
            </div>
            <p className="text-[10px] text-slate-400 font-semibold border-t border-[#EFEFEF] pt-3">
              We typically respond to media enquiries within 4 business hours. For urgent time-sensitive requests, mention "PRESS - URGENT" in your email subject line.
            </p>
          </div>
        </div>

      </div>
    </InfoLayout>
  );
}
