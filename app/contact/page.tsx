import InfoLayout from '@/app/components/info-layout';
import Link from 'next/link';
import { Mail, Phone, MessageSquare, Send, Clock, MapPin, HelpCircle, ArrowRight } from 'lucide-react';

export default function ContactPage() {
  const channels = [
    {
      icon: Mail,
      title: 'Customer Support Email',
      value: 'harsh@techtrendgo.com',
      note: 'General queries, billing, and account help',
      link: 'mailto:harsh@techtrendgo.com',
      color: 'text-[#FF6B35]',
      bg: 'hover:border-[#FF6B35]/30 hover:bg-[#FFF7F2]',
      responseTime: 'Responds within 12 hours'
    },
    {
      icon: MessageSquare,
      title: 'WhatsApp Business Chat',
      value: '+91 8777469721',
      note: 'Fastest response for onboarding or urgent issues',
      link: 'https://wa.me/918777469721',
      color: 'text-emerald-500',
      bg: 'hover:border-emerald-200 hover:bg-emerald-50/20',
      responseTime: 'Responds within 1–3 hours'
    },
    {
      icon: Phone,
      title: 'Sales & Partnerships',
      value: '+91 8777469721',
      note: 'Enterprise pricing, chains, and hotel enquiries',
      link: 'tel:+918777469721',
      color: 'text-indigo-500',
      bg: 'hover:border-indigo-200 hover:bg-indigo-50/20',
      responseTime: 'Available Mon–Sat, 10 AM–7 PM IST'
    },
    {
      icon: MapPin,
      title: 'Business Operations Office',
      value: 'BKC Finance Hub, Mumbai 400051',
      note: 'By appointment only — no walk-ins',
      link: 'https://maps.google.com',
      color: 'text-slate-500',
      bg: 'hover:border-slate-200',
      responseTime: 'Appointments via email only'
    }
  ];

  const topics = [
    { label: 'General product question', value: 'general' },
    { label: 'Pricing & billing enquiry', value: 'billing' },
    { label: 'Onboarding & setup help', value: 'onboarding' },
    { label: 'Technical issue or bug report', value: 'bug' },
    { label: 'Partnership or enterprise pricing', value: 'enterprise' },
    { label: 'Feature request or feedback', value: 'feature' },
    { label: 'Media or press enquiry', value: 'press' },
    { label: 'Other', value: 'other' }
  ];

  const faqs = [
    {
      q: 'How quickly do you respond to support messages?',
      a: 'Email queries are responded to within 12 business hours. WhatsApp messages are typically answered within 1–3 hours during business hours (Mon–Sat, 10 AM–7 PM IST). Enterprise partners have a dedicated SLA response window.'
    },
    {
      q: 'Do you offer live phone support?',
      a: 'Yes, but only for Sales and Partnerships enquiries. Our support team primarily operates via email and WhatsApp to maintain response quality and traceability. Phone calls for technical support are available on the Premium plan by appointment.'
    },
    {
      q: 'Can your team help me migrate my existing paper menu?',
      a: 'Yes. Our onboarding team can manually format and upload your menu from a PDF or Word document into your Restreasy profile. This is a paid service (see our add-ons on the Pricing page). Submit an enquiry to get started.'
    }
  ];

  return (
    <InfoLayout
      title="Contact & Support"
      subtitle="Have questions about Restreasy, your account, or table setups? Reach us through the channels below."
      category="Contact Channels"
      icon={Mail}
      accentColor="text-[#FF6B35] bg-[#FFF7F2] border-[#FF6B35]/20"
    >
      <div className="space-y-12 font-sans">

        {/* Intro */}
        <div className="space-y-3">
          <h2 className="text-sm font-black text-slate-800 uppercase tracking-wider">We're Here to Help</h2>
          <p className="text-slate-500 font-semibold text-xs leading-relaxed">
            Whether you're exploring Restreasy for the first time, working through an onboarding setup, or running into a technical issue during a dinner service — our team is reachable through multiple channels. We aim to respond to all messages within 12 hours on business days.
          </p>
        </div>

        {/* Contact Channels */}
        <div className="space-y-3">
          <h3 className="text-sm font-black text-slate-800 uppercase tracking-wider border-t border-[#EFEFEF] pt-6">Contact Channels</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {channels.map((c, ci) => (
              <a
                key={ci}
                href={c.link}
                target={c.link.startsWith('http') ? '_blank' : undefined}
                rel="noopener noreferrer"
                className={`flex items-start gap-4 border border-[#EFEFEF] p-5 rounded-2xl bg-[#FAFAFA]/50 transition-all ${c.bg} group`}
              >
                <div className={`w-10 h-10 rounded-full bg-white border border-[#EFEFEF] flex items-center justify-center shrink-0 ${c.color} group-hover:scale-105 transition-transform`}>
                  <c.icon className="w-4 h-4" />
                </div>
                <div className="space-y-0.5 min-w-0">
                  <h4 className="font-black text-[#111827] text-xs">{c.title}</h4>
                  <p className={`text-xs font-bold ${c.color} break-words`}>{c.value}</p>
                  <p className="text-[10px] text-slate-400 font-semibold">{c.note}</p>
                  <div className="flex items-center gap-1 mt-1 text-[10px] text-slate-400 font-bold">
                    <Clock className="w-3 h-3" /> {c.responseTime}
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* Contact Form */}
        <div className="border-t border-[#EFEFEF] pt-8 space-y-5">
          <h3 className="text-sm font-black text-slate-800 uppercase tracking-wider">Send a Direct Message</h3>
          <p className="text-slate-500 font-semibold text-xs leading-relaxed">
            Use this form to send us a structured message. Select the topic that best matches your question so we can route it to the right team quickly.
          </p>
          <div className="border border-[#EFEFEF] p-6 rounded-2xl bg-white shadow-2xs space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-1">Your Name *</label>
                <input
                  type="text"
                  className="w-full bg-[#FAFAFA] border border-[#EAEAEA] px-3.5 py-2.5 rounded-lg text-xs placeholder-slate-400 focus:outline-none focus:border-[#FF6B35]/50 transition-colors"
                  placeholder="Arjun Mehta"
                />
              </div>
              <div>
                <label className="block text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-1">Your Email *</label>
                <input
                  type="email"
                  className="w-full bg-[#FAFAFA] border border-[#EAEAEA] px-3.5 py-2.5 rounded-lg text-xs placeholder-slate-400 focus:outline-none focus:border-[#FF6B35]/50 transition-colors"
                  placeholder="arjun@myrestaurant.com"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-1">Restaurant / Company Name</label>
                <input
                  type="text"
                  className="w-full bg-[#FAFAFA] border border-[#EAEAEA] px-3.5 py-2.5 rounded-lg text-xs placeholder-slate-400 focus:outline-none focus:border-[#FF6B35]/50 transition-colors"
                  placeholder="The Brew Garden"
                />
              </div>
              <div>
                <label className="block text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-1">Message Topic *</label>
                <select className="w-full bg-[#FAFAFA] border border-[#EAEAEA] px-3.5 py-2.5 rounded-lg text-xs text-slate-600 focus:outline-none focus:border-[#FF6B35]/50 transition-colors">
                  <option value="">Select a topic...</option>
                  {topics.map((t) => (
                    <option key={t.value} value={t.value}>{t.label}</option>
                  ))}
                </select>
              </div>
            </div>
            <div>
              <label className="block text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-1">Your Message *</label>
              <textarea
                rows={5}
                className="w-full bg-[#FAFAFA] border border-[#EAEAEA] px-3.5 py-2.5 rounded-lg text-xs placeholder-slate-400 resize-none focus:outline-none focus:border-[#FF6B35]/50 transition-colors"
                placeholder="Please describe your question, issue, or request in as much detail as possible. If you are reporting a technical issue, include which device and browser you are using..."
              />
            </div>
            <div>
              <label className="block text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-1">Attach a file (optional)</label>
              <input
                type="file"
                accept=".pdf,.png,.jpg,.csv"
                className="w-full bg-[#FAFAFA] border border-[#EAEAEA] px-3.5 py-2.5 rounded-lg text-xs text-slate-500 focus:outline-none"
              />
              <p className="text-[10px] text-slate-400 font-semibold mt-1">PDF, PNG, JPG, or CSV. Max 10MB. Useful for menu uploads or screenshot bug reports.</p>
            </div>
            <button
              type="button"
              className="w-full bg-[#FF6B35] text-white font-bold py-3 rounded-xl text-xs hover:bg-[#e05420] flex items-center justify-center gap-1.5 shadow-2xs active:scale-98 transition-all hover:shadow-md"
            >
              Send Message <Send className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Support FAQs */}
        <div className="border-t border-[#EFEFEF] pt-8 space-y-5">
          <h3 className="text-sm font-black text-slate-800 uppercase tracking-wider">Common Support Questions</h3>
          <div className="space-y-4">
            {faqs.map((f, fi) => (
              <div key={fi} className="border border-[#EFEFEF] rounded-xl p-5 bg-[#FAFAFA]/50 space-y-2">
                <h4 className="font-black text-[#111827] text-xs flex items-start gap-1.5">
                  <HelpCircle className="w-3.5 h-3.5 text-[#FF6B35] shrink-0 mt-0.5" />
                  {f.q}
                </h4>
                <p className="text-slate-500 font-semibold text-xs leading-relaxed pl-5">{f.a}</p>
              </div>
            ))}
          </div>
          <div className="text-center">
            <Link href="/help-center" className="inline-flex items-center gap-1.5 text-xs font-black text-[#FF6B35] hover:underline">
              View Full Help Center <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Office Hours */}
        <div className="border-t border-[#EFEFEF] pt-8 space-y-4">
          <h3 className="text-sm font-black text-slate-800 uppercase tracking-wider">Office Hours & Availability</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { day: 'Monday – Friday', hours: '9:00 AM – 8:00 PM IST', status: 'Full support team available' },
              { day: 'Saturday', hours: '10:00 AM – 5:00 PM IST', status: 'Reduced team, email preferred' },
              { day: 'Sunday & Holidays', hours: 'Closed', status: 'Urgent issues via WhatsApp only' }
            ].map((o, oi) => (
              <div key={oi} className="border border-[#EFEFEF] rounded-xl p-4 bg-[#FAFAFA]/50 space-y-1 text-center">
                <h4 className="font-black text-[#111827] text-xs">{o.day}</h4>
                <p className="font-black text-[#FF6B35] text-xs">{o.hours}</p>
                <p className="text-[10px] text-slate-400 font-semibold">{o.status}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </InfoLayout>
  );
}
