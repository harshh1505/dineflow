import InfoLayout from '@/app/components/info-layout';
import { Scale, CheckCircle2, Globe, CreditCard, FileText, Users, AlertTriangle } from 'lucide-react';

export default function CompliancePage() {
  const frameworks = [
    {
      icon: Globe,
      color: 'text-indigo-600 bg-indigo-50',
      title: 'GDPR (General Data Protection Regulation)',
      jurisdiction: 'European Union — applicable to all EU-resident users',
      status: 'Aligned',
      statusColor: 'text-emerald-600 bg-emerald-50 border-emerald-100',
      desc: 'Although DineFlow primarily serves Indian restaurants, we implement GDPR-aligned practices across all our data handling operations. Our guest QR menu interface collects zero PII from diners — no email, name, or phone is required to browse or order, which means the majority of our guest-facing interactions fall entirely outside GDPR\'s scope. For merchant accounts where EU-based individuals may submit enquiries, we process their data lawfully under the "legitimate interest" and "contractual necessity" bases.',
      points: [
        'Zero PII collected from dining guests at the menu level',
        'Merchant data processed under contractual necessity basis',
        'Data Subject Access Requests (DSARs) honored within 30 days',
        'Right to erasure requests processed within 72 hours',
        'Data Processing Agreements (DPAs) available for EU enterprise clients',
        'Privacy by design principles applied across all new features'
      ]
    },
    {
      icon: FileText,
      color: 'text-[#FF6B35] bg-[#FFF7F2]',
      title: 'India IT Act 2000 & DPDP Act 2023',
      jurisdiction: 'Republic of India — primary regulatory framework',
      status: 'Compliant',
      statusColor: 'text-emerald-600 bg-emerald-50 border-emerald-100',
      desc: 'DineFlow complies with the Information Technology Act, 2000 and its associated rules, and has aligned our data practices with India\'s Digital Personal Data Protection (DPDP) Act, 2023. All Indian restaurant account data is processed and stored within India. We maintain a legally registered entity in India (DineFlow Technologies Pvt. Ltd.) and appoint a Data Protection Officer (DPO) as required under applicable regulations.',
      points: [
        'All Indian merchant data stored within India (GCP Mumbai)',
        'Registered as an Indian company under Companies Act',
        'Designated Data Protection Officer (DPO) appointed',
        'Data localization requirements satisfied',
        'Merchant data portability provided via CSV export',
        'DPDP Act consent mechanisms implemented for data processing'
      ]
    },
    {
      icon: CreditCard,
      color: 'text-purple-600 bg-purple-50',
      title: 'PCI-DSS (Payment Card Industry Data Security Standard)',
      jurisdiction: 'International — applicable to payment data handling',
      status: 'Scoped Out',
      statusColor: 'text-blue-600 bg-blue-50 border-blue-100',
      desc: 'DineFlow is a menu presentation and ordering platform. We do not process, store, or transmit payment card data. Our system submits orders to the merchant dashboard — billing is handled offline at the restaurant\'s existing cash/card counter. This design means DineFlow is entirely out-of-scope for PCI-DSS compliance obligations. Merchants using third-party payment integrations connect their own PCI-DSS compliant payment processors independently.',
      points: [
        'No payment card data processed, stored, or transmitted',
        'Orders are submitted without any payment step in DineFlow',
        'PCI-DSS scope analysis confirmed with third-party assessor',
        'Merchants retain full control over their payment processors',
        'Razorpay / PayU integration guidelines provided for merchants who opt-in',
        'Out-of-scope declaration available for merchant compliance reviews'
      ]
    },
    {
      icon: Users,
      color: 'text-emerald-600 bg-emerald-50',
      title: 'Restaurant Industry-specific Compliance',
      jurisdiction: 'India (FSSAI, GST, State regulations)',
      status: 'Supportive',
      statusColor: 'text-amber-600 bg-amber-50 border-amber-100',
      desc: 'DineFlow supports restaurants in displaying FSSAI license information on their menu interfaces as required under food safety regulations. Merchants can add allergen disclosures, caloric information, and certification numbers to individual menu items. We generate GST-inclusive price display options and support proper menu categorization for businesses operating under FSSAI\'s food business operator license requirements.',
      points: [
        'FSSAI license number display on menu interface (optional)',
        'Allergen disclosure fields on each menu item',
        'GST-inclusive price display options in menu settings',
        'Vegetarian/Non-vegetarian FSSAI color coding supported',
        'Caloric / nutritional info fields available per item',
        'Halal and Kosher certification display options available'
      ]
    }
  ];

  const policies = [
    {
      title: 'Data Minimization',
      desc: 'We only collect data that is strictly necessary for the functioning of the service. Guest-facing menu experiences require zero data from diners. Merchant accounts collect only the information needed to configure and operate the restaurant profile.'
    },
    {
      title: 'Purpose Limitation',
      desc: 'Data collected during enquiry submission (restaurant name, POC details, WhatsApp) is used solely for account setup and support communication. We do not use this data for marketing to third parties or sell it to data brokers.'
    },
    {
      title: 'Storage Limitation',
      desc: 'Menu data, order records, and account configuration are retained for the duration of an active subscription plus 6 months post-cancellation. After this period, all data is permanently deleted unless the merchant requests earlier deletion.'
    },
    {
      title: 'Accuracy & Rectification',
      desc: 'Merchants can update all account information, menu data, and settings directly from their dashboard at any time. Incorrect data submitted during onboarding can be corrected by contacting support@dineflow.in.'
    },
    {
      title: 'Accountability & Governance',
      desc: 'DineFlow maintains an internal data governance register documenting all data categories processed, their purposes, retention periods, and the legal basis for processing. This register is available to enterprise clients for audit purposes under NDA.'
    },
    {
      title: 'Third-party Processor Standards',
      desc: 'We use only vetted third-party infrastructure providers (Google Cloud Platform, Supabase) who maintain their own comprehensive compliance certifications including SOC 2 Type II, ISO 27001, and relevant regional standards. Full sub-processor list available on request.'
    }
  ];

  const certStatus = [
    { name: 'GDPR-aligned practices', status: 'Active', color: 'text-emerald-600 bg-emerald-50 border-emerald-100' },
    { name: 'India IT Act 2000 compliant', status: 'Active', color: 'text-emerald-600 bg-emerald-50 border-emerald-100' },
    { name: 'DPDP Act 2023 aligned', status: 'Active', color: 'text-emerald-600 bg-emerald-50 border-emerald-100' },
    { name: 'PCI-DSS out of scope', status: 'Verified', color: 'text-blue-600 bg-blue-50 border-blue-100' },
    { name: 'FSSAI display support', status: 'Supported', color: 'text-amber-600 bg-amber-50 border-amber-100' },
    { name: 'ISO 27001 (via GCP)', status: 'Inherited', color: 'text-indigo-600 bg-indigo-50 border-indigo-100' },
  ];

  return (
    <InfoLayout
      title="Compliance Standards"
      subtitle="Detailed overview of our regulatory compliance posture across GDPR, India DPDP Act, PCI-DSS scope, and food industry regulations."
      category="Compliance & Safety"
      icon={Scale}
      accentColor="text-[#FF6B35] bg-[#FFF7F2] border-[#FF6B35]/20"
    >
      <div className="space-y-12 font-sans">

        {/* Intro */}
        <div className="space-y-3">
          <h2 className="text-sm font-black text-slate-800 uppercase tracking-wider">Our Compliance Overview</h2>
          <p className="text-slate-500 font-semibold text-xs leading-relaxed">
            DineFlow is designed as a privacy-first product that deliberately minimizes data collection at every layer. Our compliance posture reflects both the legal requirements of our operating jurisdictions and our own ethical commitments around responsible data handling. This page provides a transparent, detailed breakdown of each compliance framework we address.
          </p>
        </div>

        {/* Compliance Status Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {certStatus.map((c, ci) => (
            <div key={ci} className="border border-[#EFEFEF] rounded-xl px-4 py-3 bg-[#FAFAFA]/50">
              <p className="font-black text-[#111827] text-[10px]">{c.name}</p>
              <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full border mt-1 inline-block ${c.color}`}>{c.status}</span>
            </div>
          ))}
        </div>

        {/* Compliance Frameworks */}
        <div className="border-t border-[#EFEFEF] pt-8 space-y-6">
          <h2 className="text-sm font-black text-slate-800 uppercase tracking-wider">Regulatory Frameworks</h2>
          {frameworks.map((f, fi) => (
            <div key={fi} className="border border-[#EFEFEF] rounded-2xl p-6 space-y-4 bg-[#FAFAFA]/30 hover:bg-white hover:shadow-sm transition-all">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                <div className="flex items-start gap-3">
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${f.color}`}>
                    <f.icon className="w-4 h-4" />
                  </div>
                  <div className="space-y-0.5">
                    <h3 className="font-black text-[#111827] text-sm">{f.title}</h3>
                    <p className="text-[10px] font-bold text-slate-400">{f.jurisdiction}</p>
                  </div>
                </div>
                <span className={`text-[9px] font-bold px-2.5 py-1 rounded-full border shrink-0 ${f.statusColor}`}>{f.status}</span>
              </div>
              <p className="text-slate-500 font-semibold text-xs leading-relaxed">{f.desc}</p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 border-t border-[#EFEFEF]/60 pt-3">
                {f.points.map((pt, pti) => (
                  <li key={pti} className="flex items-start gap-2 text-slate-500 font-semibold text-xs leading-relaxed">
                    <CheckCircle2 className="w-3 h-3 text-[#FF6B35] shrink-0 mt-0.5" />
                    {pt}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Data Governance Principles */}
        <div className="border-t border-[#EFEFEF] pt-8 space-y-5">
          <h2 className="text-sm font-black text-slate-800 uppercase tracking-wider">Data Governance Principles</h2>
          <p className="text-slate-500 font-semibold text-xs leading-relaxed">
            Beyond specific regulatory frameworks, DineFlow applies these overarching data governance principles across all product decisions and system designs.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {policies.map((p, pi) => (
              <div key={pi} className="border border-[#EFEFEF] rounded-xl p-5 space-y-2 bg-[#FAFAFA]/50">
                <h3 className="font-black text-[#111827] text-xs flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#FF6B35]" /> {p.title}
                </h3>
                <p className="text-slate-500 font-semibold text-xs leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Compliance Contact */}
        <div className="border-t border-[#EFEFEF] pt-8 space-y-4">
          <h2 className="text-sm font-black text-slate-800 uppercase tracking-wider">Compliance & DPO Contact</h2>
          <p className="text-slate-500 font-semibold text-xs leading-relaxed max-w-lg">
            For compliance enquiries, data subject access requests, data processing agreements, or third-party audit facilitation, contact our compliance team directly. We respond to all compliance-related enquiries within 5 business days.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { label: 'Data Protection Officer', email: 'dpo@dineflow.in', desc: 'DSAR, GDPR, and DPDP Act requests' },
              { label: 'Legal & Compliance Team', email: 'legal@dineflow.in', desc: 'DPAs, audits, and regulatory enquiries' }
            ].map((c, ci) => (
              <div key={ci} className="border border-[#EFEFEF] rounded-xl p-5 bg-[#FAFAFA]/50 space-y-1">
                <p className="font-black text-[#111827] text-xs">{c.label}</p>
                <a href={`mailto:${c.email}`} className="text-[#FF6B35] font-bold text-xs hover:underline">{c.email}</a>
                <p className="text-[10px] text-slate-400 font-semibold">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </InfoLayout>
  );
}
