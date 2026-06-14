import InfoLayout from '@/app/components/info-layout';
import Link from 'next/link';
import { Briefcase, CheckCircle2, MapPin, Clock, Users, Code, Palette, Heart, ArrowRight } from 'lucide-react';

export default function CareersPage() {
  const values = [
    {
      icon: Code,
      title: 'Build Things That Matter',
      desc: 'Every feature you ship ends up on real dining tables, used by real guests and restaurant teams every single day. The impact of your work is immediate and visible.'
    },
    {
      icon: Users,
      title: 'Small Team, Big Ownership',
      desc: 'We operate with a lean crew where every person owns their domain fully. No bureaucracy, no permission chains — just a talented group moving fast and making decisions.'
    },
    {
      icon: Palette,
      title: 'Premium Craft Standard',
      desc: 'We hold ourselves to a high design and engineering bar. We\'d rather ship one beautiful, reliable feature than ten mediocre ones. Quality and attention to detail are non-negotiable.'
    },
    {
      icon: Heart,
      title: 'Rooted in Local Business',
      desc: 'Our users are independent cafe owners, family restaurant managers, and passionate chefs — not enterprise IT departments. We stay close to them and build with empathy.'
    }
  ];

  const jobs = [
    {
      title: 'Senior Frontend Engineer (React / Next.js / TypeScript)',
      location: 'Remote (India) / Full-Time',
      type: 'Engineering',
      typeColor: 'text-indigo-600 bg-indigo-50',
      posted: 'June 12, 2026',
      salary: '₹18L – ₹28L per annum',
      desc: 'Lead the development of high-performance web menus and merchant administration backoffices. You will own the guest-facing menu rendering pipeline, optimize UI load speeds for 3G conditions, and architect component systems used across all restaurant accounts.',
      responsibilities: [
        'Build and maintain the core guest-facing QR menu web interface',
        'Develop the merchant backoffice dashboard (menu management, table controls, order feed)',
        'Optimize bundle sizes and rendering speeds for mobile-first experiences',
        'Implement micro-animations and premium interaction patterns',
        'Collaborate closely with the design team to translate Figma specs into pixel-perfect HTML/CSS',
        'Participate in architecture discussions and technical roadmap planning'
      ],
      requirements: [
        '4+ years of professional React development experience',
        'Deep expertise in TypeScript and Next.js (App Router)',
        'Track record of building responsive layouts optimized for mobile devices',
        'Proficiency in CSS layout systems (Flexbox, Grid) and animation (CSS transitions)',
        'Experience with real-time data handling (WebSocket / SSE)',
        'Strong attention to visual design quality and cross-browser compatibility'
      ]
    },
    {
      title: 'Product Designer (Figma / Web UI)',
      location: 'Hybrid (Mumbai, BKC) / Full-Time',
      type: 'Design',
      typeColor: 'text-[#FF6B35] bg-[#FFF7F2]',
      posted: 'June 5, 2026',
      salary: '₹12L – ₹18L per annum',
      desc: 'Define and craft the visual language of DineFlow — from the guest-facing QR menu interfaces to the merchant backoffice dashboard. You will own end-to-end design flows, from user research through to Figma prototypes and handoff to engineering.',
      responsibilities: [
        'Design mobile-first QR menu interfaces for guest-facing experiences',
        'Create merchant dashboard layouts (orders, menu management, analytics)',
        'Produce print-ready QR card standee templates for restaurant partners',
        'Conduct user research sessions with restaurant owners and managers',
        'Build and maintain a shared design system in Figma',
        'Review engineering implementations for design fidelity and suggest refinements'
      ],
      requirements: [
        '3+ years of experience designing mobile web apps in Figma',
        'Strong portfolio showcasing high aesthetic layouts and typography',
        'Understanding of HTML/CSS constraints to ensure implementation feasibility',
        'Experience designing for mobile-first, touch-based interactions',
        'Ability to design for data-dense interfaces (dashboards, tables, forms)',
        'Bonus: Experience in hospitality, F&B, or POS product design'
      ]
    },
    {
      title: 'Customer Success & Onboarding Specialist',
      location: 'Hybrid (Mumbai / Bangalore) / Full-Time',
      type: 'Operations',
      typeColor: 'text-emerald-600 bg-emerald-50',
      posted: 'May 28, 2026',
      salary: '₹7L – ₹11L per annum',
      desc: 'Act as the primary point of contact for every new restaurant partner during and after their onboarding experience. You will help them configure their menus, export QR sheets, resolve issues, and grow their confidence using DineFlow to serve their tables.',
      responsibilities: [
        'Onboard new restaurant accounts — from enquiry to first live QR scan',
        'Assist merchants in formatting their PDF menus into DineFlow categories',
        'Help configure table layouts, print QR code sheets, and place standees',
        'Resolve post-launch support tickets via WhatsApp, email, and video call',
        'Collect structured feedback from restaurant partners for the product team',
        'Maintain customer health metrics and proactively check in with at-risk accounts'
      ],
      requirements: [
        'Excellent communication skills in English and Hindi (Tamil or Telugu is a bonus)',
        'Comfort with spreadsheet tools (Excel, Google Sheets) for menu formatting',
        'Prior experience in restaurant operations, hospitality, or tech support',
        'Patient, empathetic approach to working with non-technical users',
        'Organized and self-directed in managing multiple accounts simultaneously',
        'Bonus: Experience with CRM tools like HubSpot or Zoho'
      ]
    },
    {
      title: 'Backend Engineer (Node.js / Supabase / PostgreSQL)',
      location: 'Remote (India) / Full-Time',
      type: 'Engineering',
      typeColor: 'text-indigo-600 bg-indigo-50',
      posted: 'May 15, 2026',
      salary: '₹16L – ₹24L per annum',
      desc: 'Own the server-side infrastructure powering DineFlow\'s order feeds, menu data APIs, and restaurant account management. You will work with real-time data pipelines and ensure that kitchen order updates reach dashboard clients within 500 milliseconds of submission.',
      responsibilities: [
        'Design and maintain RESTful APIs for menu CRUD, order management, and account provisioning',
        'Implement real-time WebSocket order feed delivery to merchant dashboards',
        'Optimize PostgreSQL query performance for high-frequency order read/write operations',
        'Build webhook integrations for WhatsApp order notification delivery',
        'Implement tenant isolation for multi-restaurant data security',
        'Monitor system health, response times, and set up alerting pipelines'
      ],
      requirements: [
        '3+ years of backend development experience with Node.js or similar runtimes',
        'Solid PostgreSQL skills including indexing, query optimization, and schema design',
        'Experience with Supabase or similar BaaS platforms is a strong plus',
        'Familiarity with WebSocket and real-time event streaming patterns',
        'Understanding of multi-tenant SaaS data isolation patterns',
        'Experience with API monitoring and observability tools (Datadog, Sentry, etc.)'
      ]
    }
  ];

  const perks = [
    'Competitive salary benchmarked against Indian startup standards',
    'Remote-first culture with flexible working hours',
    'Annual learning budget of ₹25,000 for courses, books, and conferences',
    'Health insurance coverage for you and your immediate family',
    'Quarterly team offsites in restaurant cities across India',
    'Monthly restaurant dining allowance (₹2,000) — you\'re building for them, you should eat like them',
    'ESOP participation for all full-time employees after 6-month cliff',
    'Access to DineFlow Pro plan for personal restaurant or cafe projects'
  ];

  return (
    <InfoLayout
      title="Careers & Openings"
      subtitle="Help us build the software engine that empowers tens of thousands of local dining rooms across India."
      category="Join Our Team"
      icon={Briefcase}
      accentColor="text-indigo-600 bg-indigo-50 border-indigo-150"
    >
      <div className="space-y-12 font-sans">

        {/* Intro */}
        <div className="space-y-3">
          <h2 className="text-sm font-black text-slate-800 uppercase tracking-wider">Join DineFlow</h2>
          <p className="text-slate-500 font-semibold text-xs leading-relaxed">
            We are a distributed team passionate about code, visual design, and supporting local restaurants that form the backbone of India's food culture. If you want to build products that are used directly on dining tables every single day, and you care deeply about craft and quality, we'd love to hear from you.
          </p>
          <p className="text-slate-500 font-semibold text-xs leading-relaxed">
            We are early-stage and growing, which means the work you do here will have a disproportionate impact on both the product and the company's direction. We move fast, but we do not sacrifice quality. Every engineer reviews real restaurant feedback. Every designer eats at partner restaurants before building features for them.
          </p>
        </div>

        {/* Company Values */}
        <div className="border-t border-[#EFEFEF] pt-8 space-y-5">
          <h2 className="text-sm font-black text-slate-800 uppercase tracking-wider">What We Stand For</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {values.map((v, vi) => (
              <div key={vi} className="border border-[#EFEFEF] rounded-xl p-5 bg-[#FAFAFA]/50 space-y-2 hover:bg-white hover:shadow-sm transition-all">
                <h3 className="font-black text-slate-800 text-xs flex items-center gap-2">
                  <v.icon className="w-4 h-4 text-indigo-500 shrink-0" /> {v.title}
                </h3>
                <p className="text-slate-500 font-semibold text-xs leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Job Listings */}
        <div className="border-t border-[#EFEFEF] pt-8 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-black text-slate-800 uppercase tracking-wider">Open Positions ({jobs.length})</h2>
            <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-100">Actively Hiring</span>
          </div>
          {jobs.map((j, idx) => (
            <div key={idx} className="border border-[#EFEFEF] rounded-2xl p-6 space-y-5 bg-[#FAFAFA]/30 hover:bg-white hover:shadow-sm transition-all">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3">
                <div className="space-y-1">
                  <h3 className="font-black text-[#111827] text-sm leading-snug">{j.title}</h3>
                  <div className="flex flex-wrap gap-2 text-[10px] font-bold text-slate-400">
                    <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{j.location}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" />Posted {j.posted}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span className={`text-[9px] font-bold px-2.5 py-1 rounded-full ${j.typeColor}`}>{j.type}</span>
                  <span className="text-[9px] font-bold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700">{j.salary}</span>
                </div>
              </div>

              <p className="text-slate-500 font-semibold leading-relaxed text-xs">{j.desc}</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border-t border-[#EFEFEF]/60 pt-4">
                <div className="space-y-2">
                  <h4 className="font-black text-slate-700 text-[10px] uppercase tracking-wider">Responsibilities:</h4>
                  <ul className="space-y-1.5">
                    {j.responsibilities.map((r, ri) => (
                      <li key={ri} className="flex items-start gap-1.5 text-slate-500 font-semibold text-xs leading-relaxed">
                        <CheckCircle2 className="w-3 h-3 text-indigo-500 shrink-0 mt-0.5" />
                        {r}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="space-y-2">
                  <h4 className="font-black text-slate-700 text-[10px] uppercase tracking-wider">Requirements:</h4>
                  <ul className="space-y-1.5">
                    {j.requirements.map((req, ri) => (
                      <li key={ri} className="flex items-start gap-1.5 text-slate-500 font-semibold text-xs leading-relaxed">
                        <CheckCircle2 className="w-3 h-3 text-[#FF6B35] shrink-0 mt-0.5" />
                        {req}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-2 flex justify-end">
                <Link href="/enquire" className="inline-flex items-center gap-1 text-xs font-black text-indigo-600 hover:text-indigo-700 hover:underline">
                  Submit Application Enquiry <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Perks */}
        <div className="border-t border-[#EFEFEF] pt-8 space-y-5">
          <h2 className="text-sm font-black text-slate-800 uppercase tracking-wider">Perks & Benefits</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {perks.map((p, pi) => (
              <div key={pi} className="flex items-start gap-2.5 border border-[#EFEFEF] rounded-xl px-4 py-3 bg-[#FAFAFA]/50">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                <p className="text-slate-500 font-semibold text-xs leading-relaxed">{p}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Open Application CTA */}
        <div className="border-t border-[#EFEFEF] pt-8 space-y-4">
          <h2 className="text-sm font-black text-slate-800 uppercase tracking-wider">Don't See a Role That Fits?</h2>
          <p className="text-slate-500 font-semibold text-xs leading-relaxed max-w-lg">
            We occasionally hire for roles not yet listed publicly. If you're passionate about what we're building and believe you can contribute meaningfully, send us an open application with your background and what you'd like to work on.
          </p>
          <Link href="/enquire" className="inline-flex items-center gap-1.5 bg-[#FF6B35] hover:bg-[#e05420] text-white font-bold px-8 py-3 rounded-xl text-xs transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5">
            Submit Open Application <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

      </div>
    </InfoLayout>
  );
}
