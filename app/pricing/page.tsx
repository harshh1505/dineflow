import InfoLayout from '@/app/components/info-layout';
import Link from 'next/link';
import { Scale, CheckCircle2, X, HelpCircle, ArrowRight } from 'lucide-react';

export default function PricingPage() {
  const plans = [
    {
      plan: 'Pro Fixed',
      badge: null,
      price: '₹1,000 + ₹25,000',
      period: 'per month + one-time setup fee',
      desc: 'Ideal for growing family dining rooms and busy local cafes looking for predictable, fixed monthly billing with zero revenue commissions.',
      color: 'border-[#EFEFEF] bg-[#FAFAFA]/50',
      btnColor: 'bg-white text-slate-700 border border-[#EFEFEF] hover:bg-[#FFF7F2] hover:text-[#FF6B35]',
      features: [
        { text: 'Up to 100 orders/day', included: true },
        { text: 'Contactless QR Ordering', included: true },
        { text: 'Basic Kitchen Display (KDS)', included: true },
        { text: 'Zero-Wait UPI Payments', included: true },
        { text: 'Email Support', included: true },
      ]
    },
    {
      plan: 'Partner Share',
      badge: 'Most Popular',
      price: '2% + ₹25,000',
      period: 'of monthly revenue + one-time setup fee',
      desc: 'Our flagship option. ₹25,000 setup fee, then only pay 2% of digital revenue monthly. Comes with unlimited tables and almost all premium features.',
      color: 'border-[#FF6B35] bg-white shadow-lg relative',
      btnColor: 'bg-[#FF6B35] text-white hover:bg-[#e05420]',
      features: [
        { text: 'Unlimited Orders', included: true },
        { text: 'Advanced QR Branding', included: true },
        { text: 'Smart Station Routing KDS', included: true },
        { text: 'Frictionless OTP Login', included: true },
        { text: 'Conversational AI Waiter', included: true },
        { text: 'Semantic Taste Recommendations', included: true },
        { text: 'Priority WhatsApp Support', included: true },
      ]
    },
    {
      plan: 'Enterprise Suite',
      badge: 'Full Suite',
      price: '₹2,000 + ₹25,000',
      period: 'per month + one-time setup fee',
      desc: 'Designed for large multi-floor cafes, upscale hotels, and restaurant groups needing custom brand integrations, POS endpoints, and unlimited tables.',
      color: 'border-[#EFEFEF] bg-[#FAFAFA]/50',
      btnColor: 'bg-white text-slate-700 border border-[#EFEFEF] hover:bg-[#FFF7F2] hover:text-[#FF6B35]',
      features: [
        { text: 'Everything in Partner Share', included: true },
        { text: 'Multi-location Dashboard', included: true },
        { text: 'Centralized Cloud Kitchen', included: true },
        { text: 'Predictive AI Inventory', included: true },
        { text: '24/7 Dedicated Account Manager', included: true },
        { text: 'Custom API Integrations', included: true },
        { text: 'Custom Analytics Reports', included: true },
      ]
    }
  ];

  const faqs = [
    {
      q: 'Are there any setup fees or hidden charges?',
      a: 'No. We do not request setup charges, configuration fees, or onboarding consultation costs. The onboarding process is completely self-served and free on all plans. What you see on the pricing page is what you pay — nothing more.'
    },
    {
      q: 'Can I change my plan at any time?',
      a: 'Yes. You can upgrade, downgrade, or cancel your active subscription tier at any time directly through the merchant billing dashboard settings. Upgrades take effect immediately. Downgrades apply at the end of your current billing cycle.'
    },
    {
      q: 'Do you charge commission on orders placed through DineFlow?',
      a: 'Never. DineFlow charges a flat monthly subscription fee only. We do not take any percentage of orders, sales, or revenue. 100% of your revenue belongs to your restaurant, as it should be.'
    },
    {
      q: 'Is the Starter plan really free forever?',
      a: 'Yes. The Starter plan has no expiry date and does not require a credit card to sign up. It is designed for small setups wanting to test the system before committing to a paid tier. Some advanced features are limited or unavailable on the Starter plan.'
    },
    {
      q: 'What payment methods do you accept?',
      a: 'We accept UPI, credit/debit cards (Visa, Mastercard, Rupay), net banking, and NEFT transfers for annual plans. International restaurants can pay via Stripe using international cards. Invoices are issued within 24 hours of payment confirmation.'
    },
    {
      q: 'Do you offer custom enterprise pricing for hotel chains?',
      a: 'Yes. If you operate a chain of more than 5 restaurant locations or a hotel property with complex multi-outlet requirements, contact our partnerships team to discuss custom volume pricing, white-label configurations, and dedicated support SLAs.'
    },
    {
      q: 'Is there an annual billing discount?',
      a: 'Yes. Choosing annual billing gives you 2 months free on both the Growth and Premium plans — effectively a 16% saving. Annual plans can be activated from the billing dashboard after account setup. Annual payments are non-refundable but transferable to a different plan.'
    },
    {
      q: 'What happens if I exceed my table limit on the Starter plan?',
      a: 'If you try to create more QR codes than your plan allows, the system will prompt you to upgrade to the Growth plan to unlock additional tables. Existing tables and their QR codes remain fully functional and you are not locked out of your current setup.'
    }
  ];

  const addons = [
    { name: 'Additional Table Pack', price: '₹199 / 5 tables / month', desc: 'For Growth plan users who need slightly more tables without upgrading to Premium.' },
    { name: 'Custom Domain Branding', price: '₹499 / month', desc: 'Serve your menu on a custom domain like menu.yourrestaurant.com instead of the default DineFlow subdomain.' },
    { name: 'Menu Design Service', price: '₹2,999 one-time', desc: 'Our in-house design team will professionally photograph and format your full menu — item images, descriptions, and layout — into your DineFlow profile.' },
    { name: 'WhatsApp Order Notifications', price: '₹299 / month', desc: 'Automatically forward new table orders to a WhatsApp number for your kitchen or manager on duty.' },
  ];

  return (
    <InfoLayout
      title="Pricing Plans"
      subtitle="Spacious, transparent pricing structures designed to scale with your restaurant's growth."
      category="Licensing Tiers"
      icon={Scale}
      accentColor="text-[#FF6B35] bg-[#FFF7F2] border-[#FF6B35]/20"
    >
      <div className="space-y-12 font-sans">

        {/* Intro */}
        <div className="space-y-3">
          <h2 className="text-sm font-black text-slate-800 uppercase tracking-wider">Spacious, Tiered Subscriptions</h2>
          <p className="text-slate-500 font-semibold text-xs leading-relaxed">
            We do not levy hidden fees or demand setup charges. Switch plans at any point directly within your dashboard controls. All plans include our core browser-based QR menu system, printable QR code export, and real-time item availability toggles. Choose a package below or send a custom enquiry if you have specific requirements.
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((p, idx) => (
            <div
              key={idx}
              className={`border rounded-2xl p-6 flex flex-col justify-between transition-all hover:shadow-md ${p.color}`}
            >
              {p.badge && (
                <div className="absolute top-0 right-6 -translate-y-1/2 bg-[#FF6B35] text-white text-[9px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                  {p.badge}
                </div>
              )}
              <div className="space-y-5">
                <div>
                  <h3 className="font-black text-slate-800 text-sm">{p.plan}</h3>
                  <div className="flex items-baseline mt-2">
                    <span className="text-2xl font-black text-[#111827]">{p.price}</span>
                  </div>
                  <span className="text-slate-400 font-bold text-[10px]">{p.period}</span>
                  <p className="text-slate-500 font-semibold mt-3 text-xs leading-relaxed">{p.desc}</p>
                </div>

                <ul className="space-y-2 pt-4 border-t border-[#EFEFEF]/60">
                  {p.features.map((feat, fIdx) => (
                    <li key={fIdx} className={`flex items-center gap-2 font-semibold text-xs ${feat.included ? 'text-slate-600' : 'text-slate-300'}`}>
                      {feat.included
                        ? <CheckCircle2 className="w-3.5 h-3.5 text-[#FF6B35] shrink-0" />
                        : <X className="w-3.5 h-3.5 text-slate-300 shrink-0" />
                      }
                      {feat.text}
                    </li>
                  ))}
                </ul>
              </div>

              <Link
                href="/enquire"
                className={`w-full mt-8 text-center py-3 rounded-xl font-bold text-xs transition-colors block ${p.btnColor}`}
              >
                Enquire Now
              </Link>
            </div>
          ))}
        </div>

        {/* Add-ons Section */}
        <div className="border-t border-[#EFEFEF] pt-8 space-y-5">
          <h2 className="text-sm font-black text-slate-800 uppercase tracking-wider">Optional Add-ons</h2>
          <p className="text-slate-500 font-semibold text-xs leading-relaxed">
            Extend your plan with individual feature add-ons. Add-ons can be enabled from the billing settings of any paid plan.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {addons.map((a, ai) => (
              <div key={ai} className="border border-[#EFEFEF] rounded-2xl p-5 bg-[#FAFAFA]/50 space-y-2 hover:bg-white hover:shadow-sm transition-all">
                <div className="flex justify-between items-start gap-2">
                  <h3 className="font-black text-[#111827] text-xs">{a.name}</h3>
                  <span className="text-[10px] font-black text-[#FF6B35] whitespace-nowrap">{a.price}</span>
                </div>
                <p className="text-slate-500 font-semibold text-xs leading-relaxed">{a.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Annual Savings Banner */}
        <div className="bg-[#FFF7F2] border border-[#FF6B35]/20 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1">
            <h3 className="font-black text-[#111827] text-sm">Save 2 months with Annual Billing</h3>
            <p className="text-slate-500 font-semibold text-xs leading-relaxed max-w-sm">
              Switch to yearly billing on Growth or Premium and receive 2 months free — a 16% saving on your annual cost. Toggle in your billing settings after account setup.
            </p>
          </div>
          <div className="text-center shrink-0">
            <div className="text-2xl font-black text-[#FF6B35]">16% OFF</div>
            <div className="text-[10px] font-bold text-slate-400">on annual plans</div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="border-t border-[#EFEFEF] pt-8 space-y-5">
          <h2 className="text-sm font-black text-slate-800 uppercase tracking-wider">Frequently Asked Pricing Questions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {faqs.map((f, fi) => (
              <div key={fi} className="space-y-2 border border-[#EFEFEF] rounded-xl p-4 bg-[#FAFAFA]/50">
                <h3 className="font-black text-[#111827] text-xs flex items-start gap-1.5">
                  <HelpCircle className="w-3.5 h-3.5 text-[#FF6B35] shrink-0 mt-0.5" />
                  {f.q}
                </h3>
                <p className="text-slate-500 font-semibold text-xs leading-relaxed pl-5">{f.a}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Enterprise CTA */}
        <div className="border-t border-[#EFEFEF] pt-8 space-y-4">
          <h2 className="text-sm font-black text-slate-800 uppercase tracking-wider">Need Custom Enterprise Pricing?</h2>
          <p className="text-slate-500 font-semibold text-xs leading-relaxed max-w-lg">
            For hotel chains, multi-outlet restaurant groups, or banquet facilities with more than 5 locations, we offer custom white-label configurations, volume pricing discounts, and dedicated SLA-backed support. Submit an enquiry with your requirements and our partnerships team will respond within 24 hours.
          </p>
          <Link href="/enquire" className="inline-flex items-center gap-1.5 bg-[#FF6B35] hover:bg-[#e05420] text-white font-bold px-8 py-3 rounded-xl text-xs transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5">
            Contact for Custom Quote <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

      </div>
    </InfoLayout>
  );
}
