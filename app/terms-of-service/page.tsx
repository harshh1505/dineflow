import InfoLayout from '@/app/components/info-layout';
import { FileText } from 'lucide-react';

export default function TermsOfServicePage() {
  const lastUpdated = 'June 1, 2026';

  const sections = [
    {
      number: '1',
      title: 'Acceptance of Terms',
      content: `By accessing or using DineFlow's services — including the DineFlow website (dineflow.in), the merchant administration dashboard, and any associated QR menu interfaces — you agree to be bound by these Terms of Service ("Terms") and our Privacy Policy.

These Terms constitute a legally binding agreement between you and DineFlow Technologies Pvt. Ltd. ("DineFlow", "we", "our"). If you are entering into this agreement on behalf of a restaurant, cafe, or business entity, you represent that you have authority to bind that entity to these Terms.

If you do not agree to these Terms, you must not access or use DineFlow's services. Continued use of the platform after changes to these Terms are posted constitutes your acceptance of the revised Terms.`
    },
    {
      number: '2',
      title: 'Definitions',
      content: `"Service" refers to DineFlow's software platform, including the merchant administration dashboard, guest QR menu interfaces, QR code export tools, and all associated APIs and features.

"Merchant" refers to any restaurant, cafe, food truck, or food service business that has submitted an enquiry, received an account, or uses the DineFlow platform to manage their digital menu.

"Guest" refers to any dining customer who accesses a restaurant's menu by scanning a DineFlow-generated QR code — without creating an account.

"Account" refers to the registered merchant profile associated with a specific restaurant or venue.

"Content" refers to all menu items, descriptions, photos, pricing, and other data that merchants upload or configure within the DineFlow system.

"Subscription" refers to a paid plan (Growth or Premium) that unlocks additional platform features beyond the free Starter tier.`
    },
    {
      number: '3',
      title: 'Eligibility & Account Registration',
      content: `To create and use a DineFlow merchant account, you must:

• Be at least 18 years of age
• Be an authorized representative of the restaurant, cafe, or food service business
• Provide accurate, current, and complete information during the enquiry and onboarding process
• Operate a lawful food service business compliant with applicable local food safety regulations (FSSAI, municipal health codes, etc.)

You are responsible for maintaining the confidentiality of your account login credentials. You agree to immediately notify DineFlow if you become aware of any unauthorized use of your account. DineFlow is not liable for losses resulting from unauthorized account access due to your failure to secure credentials.

Each restaurant location or outlet must have its own separate DineFlow account. Multiple locations under a single merchant group may be managed under a custom enterprise arrangement by contacting our partnerships team.`
    },
    {
      number: '4',
      title: 'Merchant Responsibilities & Content Standards',
      content: `As a DineFlow merchant, you are solely responsible for:

Menu Content Accuracy:
• Ensuring that all menu item prices, descriptions, dietary labels (Veg/Non-Veg/Jain), allergen information, and availability status are accurate and up to date.
• Updating item availability in real-time during service to prevent guest orders for items that are out of stock.
• Ensuring that advertised prices match what guests are billed at the physical counter.

Legal Compliance:
• Holding all required food service licenses (FSSAI and applicable state or municipal permits).
• Complying with applicable food safety, hygiene, and labeling standards for all items listed on your digital menu.
• Ensuring that your restaurant's operations comply with GST and applicable tax regulations.

Content Restrictions:
You must not upload or configure content that:
• Is false, misleading, or deceptive in describing food items
• Infringes the intellectual property rights of any third party (e.g., using copyrighted images without permission)
• Violates any applicable law or regulation
• Contains offensive, discriminatory, or inappropriate material

DineFlow reserves the right to remove content that violates these standards and, in severe cases, to suspend or terminate an account.`
    },
    {
      number: '5',
      title: 'Subscription Plans & Billing',
      content: `Plan Tiers:
DineFlow offers a free Starter plan and paid Growth and Premium subscription plans. Features available on each plan are described on the Pricing page (dineflow.in/pricing) and may be updated from time to time with reasonable notice.

Billing Cycle:
Paid subscriptions are billed on a recurring monthly or annual basis depending on the plan selected. The billing cycle begins on the date of plan activation and renews automatically on the same date each subsequent month or year.

Payment:
All payments are processed through Razorpay. By providing payment information, you authorize DineFlow to charge your selected payment method on the applicable billing cycle. DineFlow does not store credit or debit card details — all card data is handled securely by Razorpay (PCI-DSS Level 1 certified).

Price Changes:
DineFlow reserves the right to change subscription pricing. You will be notified of price changes at least 30 days before they take effect. If you do not wish to continue under the new pricing, you may cancel your subscription before the next billing cycle.

Refund Policy:
Monthly subscriptions: Non-refundable once the billing period has begun.
Annual subscriptions: Refunds available within 14 days of annual renewal if no meaningful account activity has occurred during that period. Contact billing@dineflow.in to request a refund review.
Starter (free) plan: No charges apply, no refund process.`
    },
    {
      number: '6',
      title: 'Service Availability & Uptime',
      content: `DineFlow aims to maintain 99.95% uptime for all core services, including the guest QR menu delivery, merchant dashboard, and order feed. However, DineFlow does not guarantee uninterrupted service.

Planned maintenance windows will be communicated at least 48 hours in advance via email and dashboard notification. We schedule maintenance during low-traffic periods (typically between 2:00 AM and 4:00 AM IST) to minimize disruption to dining service hours.

DineFlow is not liable for service interruptions caused by:
• Third-party infrastructure failures (cloud provider outages)
• Force majeure events (natural disasters, widespread internet outages, government-mandated restrictions)
• Merchant-side internet connectivity issues
• Actions of third parties (DDoS attacks, DNS hijacking)

In the event of an extended outage (more than 2 hours of downtime in a single calendar month), affected merchants may request a prorated service credit applied to their next billing cycle. Credits are issued at DineFlow's discretion and do not apply to the free Starter plan.`
    },
    {
      number: '7',
      title: 'Intellectual Property',
      content: `DineFlow Platform:
DineFlow owns all intellectual property rights in and to the platform, including its software, design systems, branding, and documentation. These Terms do not grant you any ownership rights in the DineFlow platform. You receive a limited, non-exclusive, non-transferable license to use the platform for its intended purpose during an active account period.

Your Content:
You retain full ownership of all menu content you upload, including item names, descriptions, photos, and pricing. By uploading content to DineFlow, you grant us a limited license to store, display, and transmit your content as necessary to operate the service. This license terminates when you delete the content or close your account.

Restrictions:
You may not:
• Copy, reverse-engineer, decompile, or extract the source code of the DineFlow platform
• Scrape or extract menu data from other restaurants' public QR menu pages for commercial purposes
• Resell or sublicense DineFlow software access without written authorization
• Represent the DineFlow platform as your own product

DineFlow Brand:
Use of the DineFlow logo, name, or brand marks in marketing materials requires prior written consent from our PR team (press@dineflow.in). Refer to our Press Kit (dineflow.in/press-kit) for approved brand usage guidelines.`
    },
    {
      number: '8',
      title: 'Limitation of Liability',
      content: `To the maximum extent permitted by applicable law:

DineFlow shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising out of or related to your use of the service, including but not limited to:
• Loss of revenue or profit resulting from service downtime
• Incorrect orders submitted through the guest menu interface
• Guest ordering of items marked incorrectly in the merchant dashboard
• Printing errors in exported QR code PDFs
• Loss of menu data resulting from merchant-caused accidental deletion

DineFlow's total cumulative liability to you for any claims arising from or related to these Terms shall not exceed the total subscription fees paid by you to DineFlow in the 3-month period immediately preceding the event giving rise to the claim.

Merchants are responsible for verifying that all menu content, prices, dietary labels, and table configurations are accurate before going live with table QR codes. DineFlow provides tools to manage this content but does not independently verify its accuracy.`
    },
    {
      number: '9',
      title: 'Termination',
      content: `By Merchant:
You may cancel your DineFlow subscription at any time by going to Account → Billing in your merchant dashboard and selecting "Cancel Subscription." Your account remains active until the end of the current billing period. After that, your account reverts to the Starter (free) plan limits. Your data is retained for 6 months post-cancellation and then permanently deleted, unless you request earlier deletion.

By DineFlow:
DineFlow reserves the right to suspend or terminate your account immediately if you:
• Violate these Terms of Service
• Use the platform for any unlawful purpose
• Engage in fraudulent billing or payment disputes
• Repeatedly upload content that violates our content standards after warnings

DineFlow may also terminate accounts with 30 days written notice if we discontinue a specific service tier or the platform entirely. In the event of platform discontinuation, DineFlow will provide merchants with a data export of their menu and account data.`
    },
    {
      number: '10',
      title: 'Governing Law & Dispute Resolution',
      content: `These Terms are governed by and construed in accordance with the laws of the Republic of India, specifically the Information Technology Act, 2000 and the Indian Contract Act, 1872, without regard to conflict of law principles.

Any dispute arising out of or in connection with these Terms — including disputes about validity, breach, termination, or interpretation — shall first be attempted to be resolved through good-faith negotiation between the parties. If negotiation does not resolve the dispute within 30 days, the parties agree to submit to binding arbitration under the Arbitration and Conciliation Act, 1996 (India), with the seat of arbitration in Mumbai, Maharashtra.

Nothing in this clause prevents either party from seeking urgent interlocutory relief from a competent court to prevent irreparable harm.

For any disputes or concerns regarding these Terms, contact our legal team at legal@dineflow.in before initiating formal proceedings.`
    },
    {
      number: '11',
      title: 'Changes to These Terms',
      content: `DineFlow reserves the right to update or modify these Terms at any time. When material changes are made, we will:

• Update the "Last Updated" date at the top of this page
• Notify active merchant accounts via email at least 14 days before changes take effect
• Display a prominent notice in the merchant dashboard for 30 days following the update

Material changes include any modifications that expand DineFlow's rights, reduce merchant rights, or significantly affect how the platform operates. Minor clarifications or grammar corrections may be made without advance notice.

Your continued use of DineFlow after the effective date of updated Terms constitutes your acceptance. If you do not agree with revised Terms, you must close your account before the effective date.

The current version of these Terms is always available at dineflow.in/terms-of-service.`
    },
    {
      number: '12',
      title: 'Contact & Legal Notices',
      content: `For questions, concerns, or legal notices regarding these Terms:

Legal & Compliance Team: legal@dineflow.in
Billing Disputes: billing@dineflow.in
General Support: support@dineflow.in

Postal Address:
DineFlow Technologies Pvt. Ltd.
BKC Finance Hub
Mumbai, Maharashtra, India — 400051

Legal notices submitted by post are considered received 7 business days after the date of posting via registered courier with tracking confirmation.`
    }
  ];

  return (
    <InfoLayout
      title="Terms of Service"
      subtitle="The legal terms and conditions governing use of DineFlow's restaurant menu platform and associated services."
      category="Legal Documents"
      icon={FileText}
      accentColor="text-[#FF6B35] bg-[#FFF7F2] border-[#FF6B35]/20"
    >
      <div className="space-y-8 font-sans">

        {/* Header meta */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-6 border-b border-[#EFEFEF]">
          <div className="space-y-1">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Last Updated</p>
            <p className="text-xs font-black text-[#111827]">{lastUpdated}</p>
          </div>
          <div className="space-y-1 text-right">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Governing Entity</p>
            <p className="text-xs font-black text-[#111827]">DineFlow Technologies Pvt. Ltd.</p>
          </div>
        </div>

        {/* ToC */}
        <div className="border border-[#EFEFEF] rounded-2xl p-5 bg-[#FAFAFA]/50 space-y-3">
          <h3 className="font-black text-[#111827] text-xs uppercase tracking-wider">Table of Contents</h3>
          <ol className="space-y-1.5">
            {sections.map((s) => (
              <li key={s.number} className="text-xs font-semibold text-[#FF6B35] hover:underline cursor-pointer">
                {s.number}. {s.title}
              </li>
            ))}
          </ol>
        </div>

        {/* Sections */}
        <div className="space-y-8">
          {sections.map((s) => (
            <div key={s.number} className="space-y-3 border-t border-[#EFEFEF] pt-6 first:border-0 first:pt-0">
              <h2 className="font-black text-[#111827] text-sm">
                {s.number}. {s.title}
              </h2>
              <div className="text-slate-500 font-semibold text-xs leading-relaxed whitespace-pre-line">
                {s.content}
              </div>
            </div>
          ))}
        </div>

      </div>
    </InfoLayout>
  );
}
