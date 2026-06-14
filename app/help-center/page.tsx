import InfoLayout from '@/app/components/info-layout';
import Link from 'next/link';
import { HelpCircle, MessageSquare, Book, ChevronRight, Wrench, Zap, Globe } from 'lucide-react';

export default function HelpCenterPage() {
  const categories = [
    {
      icon: Zap,
      color: 'text-[#FF6B35] bg-[#FFF7F2]',
      title: 'Getting Started',
      desc: 'First-time setup, account creation, and initial menu configuration.'
    },
    {
      icon: Book,
      color: 'text-indigo-600 bg-indigo-50',
      title: 'Menu Management',
      desc: 'Adding items, categories, photos, pricing, and dietary labels.'
    },
    {
      icon: Globe,
      color: 'text-emerald-600 bg-emerald-50',
      title: 'QR Codes & Tables',
      desc: 'Generating, downloading, and managing per-table QR code sheets.'
    },
    {
      icon: Wrench,
      color: 'text-slate-600 bg-slate-100',
      title: 'Technical Issues',
      desc: 'Troubleshooting scan failures, display bugs, and browser compatibility.'
    }
  ];

  const faqs = [
    {
      category: 'Menu Management',
      q: 'How do I add a new dish to my digital menu?',
      a: 'Go to your merchant dashboard and navigate to the "Menu Items" tab. Click "Add Menu Item" and fill in the name, description, price, food type tags (Veg/Non-Veg/Jain), and optionally upload a photo. The changes appear on all live table QR menus in real-time — no re-printing needed.'
    },
    {
      category: 'Menu Management',
      q: 'Can I reorder my menu categories?',
      a: 'Yes. In the "Menu Categories" section of your dashboard, you can drag and drop category rows to reorder them. The sequence shown in the backoffice is the exact sequence displayed to guests on their phones. Changes save automatically.'
    },
    {
      category: 'Menu Management',
      q: 'What image format and size should I upload for menu item photos?',
      a: 'We recommend square JPEG or PNG images (1:1 ratio) at 600×600px or higher. Keep file sizes under 2MB per image for fast loading on guest devices. Avoid using screenshots or low-resolution images as they render poorly on high-resolution phone displays.'
    },
    {
      category: 'Ordering',
      q: 'Do customers need to pay through the menu interface?',
      a: 'No. DineFlow is an ordering interface, not a payment gateway. Customers submit their order from their phone and you collect payment at your physical billing counter using your existing cash or card terminal. This keeps your payment flow unchanged while eliminating the pen-and-paper order step.'
    },
    {
      category: 'Ordering',
      q: 'What happens if a customer submits a duplicate order?',
      a: 'Each order submitted creates a new independent entry in your dashboard order feed with a unique order ID and timestamp. If a customer accidentally submits twice, you\'ll see two entries. Your floor staff can verify at the table and cancel the duplicate from the dashboard order management view.'
    },
    {
      category: 'QR Codes & Tables',
      q: 'Can I reuse printed QR codes if my menu changes?',
      a: 'Yes, absolutely. The printed QR codes point to a permanent table URL. When you update the menu list, pricing, or categories inside your dashboard, the guest web page pulls the latest changes instantly. You never have to re-print codes when food items change — only if your account URL or table structure changes.'
    },
    {
      category: 'QR Codes & Tables',
      q: 'What resolution are the exported QR code PDFs?',
      a: 'The QR code exporter generates PDF sheets at 300 DPI, rendered as vector graphics. This means they can be printed at any size — from small table card inserts to large laminated A4 standees — without any pixelation or loss of scan quality.'
    },
    {
      category: 'QR Codes & Tables',
      q: 'Can I add multiple QR codes for the same table?',
      a: 'Each table has one unique QR code. However, you can print multiple copies of the same QR sheet and place them at different spots on a large table (e.g., both ends of a long banquet table). All scans from duplicate QR prints will register the same table ID on incoming orders.'
    },
    {
      category: 'Technical',
      q: 'What happens if my restaurant WiFi goes down?',
      a: 'Since DineFlow is browser-based, customers load menus using their own cellular data (3G/4G/5G) — not your restaurant WiFi. However, your kitchen dashboard and order feed require an internet connection to receive new orders. We recommend keeping a backup mobile hotspot available during critical service hours.'
    },
    {
      category: 'Technical',
      q: 'Which browsers and phone models are supported?',
      a: 'DineFlow is tested and certified on Chrome (Android), Safari (iOS), Firefox, and Samsung Internet. It works correctly on iPhones running iOS 14 or later, and Android devices running Android 9 or later. The menu is optimized for screens from 320px wide (compact phones) up to tablet widths.'
    },
    {
      category: 'Technical',
      q: 'Can customers scan the QR code with a third-party QR scanner app?',
      a: 'Yes. While native camera apps on iOS (14+) and Android work without any extra app, any standard QR reader app (Google Lens, QR Code Reader, etc.) will also correctly open the menu URL in the device\'s default browser.'
    },
    {
      category: 'Billing',
      q: 'How do I upgrade or downgrade my plan?',
      a: 'Log in to your merchant dashboard and go to "Account → Billing & Plan". Select your desired plan and confirm the change. Upgrades take effect immediately. Downgrades apply at the end of your current billing cycle to avoid service disruption during an active month.'
    },
    {
      category: 'Billing',
      q: 'Is there a free trial on paid plans?',
      a: 'We offer a 14-day free trial on the Growth plan for new restaurant accounts. No credit card is required to start the trial. At the end of the 14 days, you can choose to subscribe or you will automatically revert to the Starter (free) plan.'
    },
    {
      category: 'Billing',
      q: 'What is your refund policy?',
      a: 'Monthly subscriptions are non-refundable once the billing cycle begins. Annual plan refunds are available within 14 days of the annual renewal date if you have not used the account during that period. Submit refund requests via email to billing@dineflow.in with your account details.'
    }
  ];

  const groupedFaqs: Record<string, typeof faqs> = {};
  faqs.forEach(f => {
    if (!groupedFaqs[f.category]) groupedFaqs[f.category] = [];
    groupedFaqs[f.category].push(f);
  });

  return (
    <InfoLayout
      title="Help Center"
      subtitle="Find detailed answers to common questions about setting up, running, and growing with DineFlow."
      category="Help & Support"
      icon={HelpCircle}
      accentColor="text-[#FF6B35] bg-[#FFF7F2] border-[#FF6B35]/20"
    >
      <div className="space-y-12 font-sans">

        {/* Intro */}
        <div className="space-y-3">
          <h2 className="text-sm font-black text-slate-800 uppercase tracking-wider">Welcome to the Help Center</h2>
          <p className="text-slate-500 font-semibold text-xs leading-relaxed">
            Whether you are setting up your restaurant for the first time or troubleshooting a specific issue during service, this page covers the most frequently asked questions from DineFlow merchants. Browse by category below or read through the full FAQ list.
          </p>
        </div>

        {/* Category Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categories.map((c, ci) => (
            <div key={ci} className={`border border-[#EFEFEF] rounded-2xl p-4 space-y-2 hover:shadow-sm hover:bg-white transition-all cursor-pointer`}>
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${c.color}`}>
                <c.icon className="w-4 h-4" />
              </div>
              <h3 className="font-black text-[#111827] text-xs">{c.title}</h3>
              <p className="text-[10px] text-slate-400 font-semibold leading-tight">{c.desc}</p>
            </div>
          ))}
        </div>

        {/* Grouped FAQs */}
        <div className="border-t border-[#EFEFEF] pt-8 space-y-10">
          <h2 className="text-sm font-black text-slate-800 uppercase tracking-wider">Frequently Asked Questions</h2>
          {Object.entries(groupedFaqs).map(([category, items]) => (
            <div key={category} className="space-y-4">
              <h3 className="text-xs font-black text-[#FF6B35] uppercase tracking-wider border-b border-[#EFEFEF] pb-2">{category}</h3>
              <div className="space-y-4">
                {items.map((faq, idx) => (
                  <div key={idx} className="border border-[#EFEFEF] rounded-xl p-5 bg-[#FAFAFA]/50 space-y-2 hover:bg-white hover:shadow-sm transition-all">
                    <h4 className="font-black text-[#111827] text-xs flex items-start gap-1.5">
                      <span className="text-[#FF6B35] font-black shrink-0">Q.</span>
                      {faq.q}
                    </h4>
                    <p className="text-slate-500 font-semibold pl-4 text-xs leading-relaxed">
                      {faq.a}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Still Need Help */}
        <div className="border-t border-[#EFEFEF] pt-8 space-y-4">
          <h2 className="text-sm font-black text-slate-800 uppercase tracking-wider">Still Have a Question?</h2>
          <p className="text-slate-500 font-semibold text-xs leading-relaxed">
            If your question isn't answered above, our support team is available via email and WhatsApp. For complex onboarding questions, the fastest path is a direct WhatsApp message with your restaurant name and question.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <a
              href="https://wa.me/919876543210"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 border border-emerald-200 bg-emerald-50/20 hover:bg-emerald-50 p-4 rounded-xl transition-all"
            >
              <MessageSquare className="w-5 h-5 text-emerald-500 shrink-0" />
              <div>
                <h4 className="font-black text-[#111827] text-xs">Chat on WhatsApp</h4>
                <p className="text-[10px] text-slate-400 font-semibold">Fastest response — usually within 1–3 hours</p>
              </div>
              <ChevronRight className="w-4 h-4 text-emerald-500 ml-auto" />
            </a>
            <Link
              href="/contact"
              className="flex items-center gap-3 border border-[#EFEFEF] bg-[#FAFAFA]/50 hover:bg-[#FFF7F2] hover:border-[#FF6B35]/30 p-4 rounded-xl transition-all"
            >
              <MessageSquare className="w-5 h-5 text-[#FF6B35] shrink-0" />
              <div>
                <h4 className="font-black text-[#111827] text-xs">Submit a Support Ticket</h4>
                <p className="text-[10px] text-slate-400 font-semibold">Email form — response within 12 business hours</p>
              </div>
              <ChevronRight className="w-4 h-4 text-[#FF6B35] ml-auto" />
            </Link>
          </div>
        </div>

      </div>
    </InfoLayout>
  );
}
