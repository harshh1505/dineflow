import InfoLayout from '@/app/components/info-layout';
import Link from 'next/link';
import { ShieldCheck, Lock, Database, Eye, Globe, Key, Server, AlertTriangle, CheckCircle2, Mail } from 'lucide-react';

export default function SecurityPage() {
  const practices = [
    {
      icon: Lock,
      title: 'Secure Data Transmission (TLS 1.3)',
      desc: 'All connections between guest browsers, merchant dashboards, and our API servers are encrypted using TLS 1.3 (HTTPS). This protects order data, menu configurations, and account credentials from interception in transit. We enforce HTTPS strictly — HTTP connections are automatically upgraded and rejected at the gateway level.',
      points: [
        'TLS 1.3 enforced on all API and CDN connections',
        'HSTS (HTTP Strict Transport Security) headers enabled',
        'Certificate pinning on mobile dashboard clients',
        'All subdomains covered under wildcard SSL certificate'
      ]
    },
    {
      icon: Database,
      title: 'Database Encryption & Backup',
      desc: 'Restaurant menu data, table configurations, and order records are stored in PostgreSQL databases encrypted at rest using AES-256. Automated hourly snapshots are taken and retained for 30 rolling days. Daily backups are retained for 90 days. All backup files are stored in geographically separate cloud storage buckets with restricted access IAM policies.',
      points: [
        'AES-256 encryption at rest on all database volumes',
        'Hourly automated snapshots retained for 30 days',
        'Daily backup export retained for 90 days',
        'Off-site replica storage in secondary GCP region'
      ]
    },
    {
      icon: Server,
      title: 'Infrastructure Isolation (Multi-tenant)',
      desc: 'Each restaurant account operates with strict data isolation at the database row level. Restaurant A can never access, view, or modify the menu, orders, or settings of Restaurant B. Row-level security (RLS) policies are enforced at the database layer — not just at the application layer — providing defense in depth against misconfigured query access.',
      points: [
        'Row-level security (RLS) on all restaurant data tables',
        'Separate API authentication tokens per restaurant account',
        'No cross-tenant data leakage validated by automated tests',
        'Logical partition isolation enforced at DB layer'
      ]
    },
    {
      icon: Key,
      title: 'Access Control & Authentication',
      desc: 'Merchant dashboard access requires secure authentication with hashed password storage (bcrypt, salt rounds 12). Admin accounts support role-based access controls that limit which team members can view orders, edit menus, or access billing settings. All session tokens expire after 24 hours of inactivity and are rotated on each login.',
      points: [
        'Passwords hashed using bcrypt (12 rounds)',
        'Role-based access: Owner, Manager, Kitchen-only views',
        'Session tokens expire after 24h of inactivity',
        'Failed login attempt rate limiting (5 attempts/15min)'
      ]
    },
    {
      icon: Eye,
      title: 'No Guest Data Collection',
      desc: 'The guest QR menu interface does not collect any personally identifiable information from diners. No registration, no email, no phone number is required to browse or submit a table order. Order submissions contain only the table ID, selected item IDs, and quantities. We deliberately architect our guest experience to be privacy-preserving by default.',
      points: [
        'Zero PII collected from dining guests',
        'No cookies tracking guests across sessions',
        'Orders contain only: table ID, items, quantities',
        'No third-party analytics on the guest menu page'
      ]
    },
    {
      icon: Globe,
      title: 'Data Residency & Sovereignty',
      desc: 'Primary production data for Indian restaurant accounts is stored within India (GCP Mumbai, asia-south1 region). We do not transfer Indian restaurant data outside of India unless explicitly requested and consented to for backup redundancy purposes. Accounts in UAE are hosted on GCP Dubai (me-central1). We comply with applicable data localization requirements.',
      points: [
        'Indian data stored in GCP Mumbai (asia-south1)',
        'UAE data stored in GCP Dubai (me-central1)',
        'No cross-border data transfers without consent',
        'Data residency certificates available on request'
      ]
    },
    {
      icon: AlertTriangle,
      title: 'Vulnerability Disclosure Program',
      desc: 'We operate a responsible disclosure program for security researchers who identify vulnerabilities in our systems. Researchers who report valid security issues in good faith will not face legal action. We aim to acknowledge reports within 48 hours and release patches for critical vulnerabilities within 5 business days.',
      points: [
        'Responsible disclosure policy in place',
        '48-hour acknowledgment SLA for reported issues',
        'Critical patches deployed within 5 business days',
        'Contact: security@restreasy.in for reports'
      ]
    },
    {
      icon: ShieldCheck,
      title: 'Security Audits & Penetration Testing',
      desc: 'We commission annual penetration testing from an independent third-party security firm. The testing scope covers our API gateway, authentication systems, database access controls, and admin dashboard interfaces. Findings are remediated before the next release cycle, and executive summaries are available to enterprise partners on request under NDA.',
      points: [
        'Annual third-party penetration tests',
        'OWASP Top 10 vulnerability coverage',
        'Bug bounty scope includes all public APIs',
        'Audit summaries available to enterprise clients (NDA)'
      ]
    }
  ];

  const certifications = [
    { name: 'HTTPS / TLS 1.3', status: 'Active' },
    { name: 'OWASP Top 10 Compliant', status: 'Verified' },
    { name: 'India IT Act 2000 Compliant', status: 'Active' },
    { name: 'GDPR-aligned practices', status: 'Active' },
    { name: 'AES-256 at-rest encryption', status: 'Active' },
    { name: 'Penetration Test (Q1 2026)', status: 'Passed' },
  ];

  return (
    <InfoLayout
      title="Security Practices"
      subtitle="Industry-standard encryption, access controls, and infrastructure isolation protecting your restaurant's data."
      category="Compliance & Safety"
      icon={ShieldCheck}
      accentColor="text-indigo-600 bg-indigo-50 border-indigo-150"
    >
      <div className="space-y-12 font-sans">

        {/* Intro */}
        <div className="space-y-3">
          <h2 className="text-sm font-black text-slate-800 uppercase tracking-wider">Our Security Commitment</h2>
          <p className="text-slate-500 font-semibold text-xs leading-relaxed">
            Security is a foundational requirement, not an optional feature. Restreasy is designed from the ground up with security as a core architectural constraint — not bolted on after the fact. We apply defense-in-depth principles across all layers: network transmission, database storage, access control, and application logic.
          </p>
          <p className="text-slate-500 font-semibold text-xs leading-relaxed">
            This page provides a transparent overview of the security measures we have implemented. If you are a security researcher, an enterprise customer evaluating Restreasy, or a restaurant owner with specific concerns, the information below and our contact channel is available to you.
          </p>
        </div>

        {/* Certification Overview */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {certifications.map((c, ci) => (
            <div key={ci} className="border border-[#EFEFEF] rounded-xl px-4 py-3 bg-[#FAFAFA]/50 flex items-center gap-2.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
              <div>
                <p className="font-black text-[#111827] text-[10px]">{c.name}</p>
                <p className="text-[9px] font-bold text-emerald-600">{c.status}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Security Practices */}
        <div className="border-t border-[#EFEFEF] pt-8 space-y-6">
          <h2 className="text-sm font-black text-slate-800 uppercase tracking-wider">Security Practices in Detail</h2>
          {practices.map((p, pi) => (
            <div key={pi} className="border border-[#EFEFEF] rounded-2xl p-6 space-y-4 bg-[#FAFAFA]/30 hover:bg-white hover:shadow-sm transition-all">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-indigo-50 flex items-center justify-center shrink-0">
                  <p.icon className="w-4 h-4 text-indigo-600" />
                </div>
                <h3 className="font-black text-[#111827] text-sm">{p.title}</h3>
              </div>
              <p className="text-slate-500 font-semibold text-xs leading-relaxed">{p.desc}</p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 border-t border-[#EFEFEF]/60 pt-3">
                {p.points.map((pt, pti) => (
                  <li key={pti} className="flex items-start gap-2 text-slate-500 font-semibold text-xs leading-relaxed">
                    <CheckCircle2 className="w-3 h-3 text-indigo-500 shrink-0 mt-0.5" />
                    {pt}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Report Vulnerability */}
        <div className="border-t border-[#EFEFEF] pt-8 space-y-4">
          <h2 className="text-sm font-black text-slate-800 uppercase tracking-wider">Report a Security Issue</h2>
          <p className="text-slate-500 font-semibold text-xs leading-relaxed max-w-lg">
            If you have discovered a potential security vulnerability in Restreasy's systems, please contact our security team immediately. We take all reports seriously and commit to acknowledging your report within 48 hours.
          </p>
          <div className="border border-[#EFEFEF] rounded-2xl p-5 bg-white space-y-3">
            <div className="flex items-center gap-3 text-xs">
              <Mail className="w-4 h-4 text-indigo-600 shrink-0" />
              <div>
                <p className="font-black text-[#111827]">Security Team Contact</p>
                <a href="mailto:security@restreasy.in" className="text-indigo-600 font-bold hover:underline">security@restreasy.in</a>
              </div>
            </div>
            <p className="text-[10px] text-slate-400 font-semibold border-t border-[#EFEFEF] pt-3">
              Please include: a clear description of the issue, the affected component (API / dashboard / menu page), steps to reproduce, and your contact details for follow-up. Encrypt sensitive reports using our PGP public key (available on request).
            </p>
          </div>
          <Link href="/contact" className="inline-flex items-center gap-1.5 text-xs font-black text-indigo-600 hover:underline">
            Contact Security Team →
          </Link>
        </div>

      </div>
    </InfoLayout>
  );
}
