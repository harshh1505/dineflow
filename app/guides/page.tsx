import InfoLayout from '@/app/components/info-layout';
import Link from 'next/link';
import { BookOpen, CheckCircle2, Clock, ArrowRight, Star, Lightbulb, AlertTriangle } from 'lucide-react';

export default function GuidesPage() {
  const guides = [
    {
      title: 'Complete Onboarding Guide: From Zero to Live QR Menu',
      duration: '12 min read',
      difficulty: 'Beginner',
      diffColor: 'text-emerald-600 bg-emerald-50',
      icon: Star,
      featured: true,
      intro: 'This guide walks you through every step required to go from a blank DineFlow account to a fully live QR menu system at your dining tables — including menu build-out, branding, table setup, and printing.',
      steps: [
        { step: 'Request account access by submitting the enquiry form at dineflow.in/enquire with your restaurant name, number of tables, and contact details.' },
        { step: 'Our team will configure your base account and send credentials to your WhatsApp number within 24 hours of your enquiry submission.' },
        { step: 'Log in and begin by setting up Menu Categories. Think of these as tabs on your menu — Starters, Mains, Beverages, Desserts, Specials.' },
        { step: 'Add individual Menu Items under each category. Include name, description (1–2 sentences), price, dietary type (Veg/Non-Veg/Jain), and upload an image if available.' },
        { step: 'Set up your branding — upload your logo PNG and configure a primary accent color to match your restaurant\'s interior and signage.' },
        { step: 'Navigate to Tables, input each physical table at your venue (e.g. Table 1 through Table 18, Patio A, Bar Seat B), and generate unique QR codes for each.' },
        { step: 'Download the printable QR code PDF. Print on A4 paper or card stock at your local print shop and place QR standees or holders on each table.' },
        { step: 'Test the setup: scan each QR code from your phone, submit a test order, and verify it appears on your dashboard.' },
        { step: 'You\'re live! Inform your floor team about the new ordering flow and update any existing signage to reference QR menu scanning.' }
      ],
      tips: ['Double-check that each QR code points to the correct table before printing in bulk.', 'Test scanning under the lighting conditions of your actual dining room.']
    },
    {
      title: 'Guide to Table QR Standee Design & Placement',
      duration: '6 min read',
      difficulty: 'Beginner',
      diffColor: 'text-emerald-600 bg-emerald-50',
      icon: CheckCircle2,
      featured: false,
      intro: 'Getting the physical QR standee right is as important as the digital menu behind it. This guide covers print quality, placement strategies, and standee design to maximize scan rates.',
      steps: [
        { step: 'Choose an acrylic table-top holder (A6 or A7 size is ideal for most dining tables) from any office supply or restaurant supply store. Acrylic provides durability and a premium look.' },
        { step: 'Ensure your QR code is printed in high contrast — black code on white background. Avoid printing on colored paper as this reduces scan reliability under low dining-room lighting.' },
        { step: 'Add a short call-to-action below or above the QR code: "Scan to View Menu & Order" in legible font. Guests unfamiliar with QR menus appreciate the instructional text.' },
        { step: 'For outdoor or patio seating, use laminated or waterproof QR card holders. Standard paper prints will degrade rapidly from humidity or accidental spills.' },
        { step: 'Place standees at the center of each table or near the condiment tray where they are easily visible from any seat position. Avoid tucking them against walls or behind centerpieces.' },
        { step: 'Test scan distance: verify the code scans correctly from at least 30–40cm away (arm\'s length) under the ambient lighting of your venue at its dimmest point (usually evening dinner service).' },
        { step: 'If using individual table name labels (e.g., "Table 4"), print these clearly on the standee so guests can mention their table ID correctly when placing additional waiter orders.' }
      ],
      tips: ['Laminate outdoor QR cards to prevent water damage.', 'Print at 300 DPI or above for best scan reliability.']
    },
    {
      title: 'Menu Category Optimization for Higher Order Values',
      duration: '8 min read',
      difficulty: 'Intermediate',
      diffColor: 'text-amber-600 bg-amber-50',
      icon: Star,
      featured: false,
      intro: 'Menu engineering is the science of placing items strategically to maximize both guest satisfaction and restaurant revenue. This guide applies menu engineering principles specifically to digital QR menu ordering.',
      steps: [
        { step: 'Place your highest-margin or signature dish categories at the top. Guest scroll behavior on mobile shows that the first and second categories receive 60% of all browsing time.' },
        { step: 'Use "Bestseller" tags sparingly — highlight only 2–4 items per category. Overuse dilutes the effect. Reserve these for dishes with both high margins and genuine guest popularity.' },
        { step: 'If your cafe does high coffee and beverage volumes, lead with Beverages before Food. Many customers decide on a drink first and then select food accordingly, not the reverse.' },
        { step: 'Keep category names short and intuitive. "Mains" is better than "Main Course Selection." "Brews" is better than "Hot and Cold Beverage Options." Guests scan, not read.' },
        { step: 'Limit items per category to 8–12. Beyond 12 options, research shows guests experience "choice overload" and take longer to decide or abandon ordering entirely.' },
        { step: 'Group complementary upsell items near each other. If pasta dishes are popular, place garlic bread and dessert options in the categories immediately following the pasta section.' },
        { step: 'For seasonal menus, create a dedicated "Today\'s Specials" category and place it at position 2 (after your signature category). This directs attention to high-priority promotional items.' }
      ],
      tips: ['Run A/B tests by changing category order on different weeks and comparing order values.', 'Ask your kitchen team which items have the highest profit margin and prioritize those.']
    },
    {
      title: 'Managing Kitchen Operations with a Live Digital Order Feed',
      duration: '6 min read',
      difficulty: 'Beginner',
      diffColor: 'text-emerald-600 bg-emerald-50',
      icon: CheckCircle2,
      featured: false,
      intro: 'The transition from verbal orders to a digital order feed is an operational shift that requires training your kitchen and floor teams. This guide walks you through setting up efficient workflows.',
      steps: [
        { step: 'Set up a central kitchen display screen (a basic Android tablet or old iPad works well) mounted in a visible position for all kitchen staff. Keep the DineFlow dashboard open and stay logged in during service.' },
        { step: 'Create a simple order acknowledgment flow: when a new order appears, the head of station marks it "In Progress" to signal acknowledgment to the floor manager\'s dashboard view.' },
        { step: 'Train floor staff to monitor the "Ready" status on their own dashboard view. When a kitchen station marks an order "Ready," a floor attendant picks up and delivers to the table.' },
        { step: 'Keep availability toggles updated in real-time. Assign one team member per shift the responsibility of toggling items off when they sell out. This prevents kitchen rejection of already-submitted orders.' },
        { step: 'Use the order feed\'s table filter to track how long each table has been waiting. Tables with orders marked "In Progress" for more than 15 minutes should be checked by a floor manager.' },
        { step: 'At shift end, review the daily order summary to identify which items sold fastest, which tables ordered most, and which peak windows saw the highest order volume. Use this data for next-shift prep.' }
      ],
      tips: ['Keep a secondary mobile phone with the dashboard open as a backup display.', 'Brief staff at the start of every shift on any menu items that are low in stock.']
    },
    {
      title: 'Photography Guide: Capturing Menu Item Photos That Convert',
      duration: '7 min read',
      difficulty: 'Intermediate',
      diffColor: 'text-amber-600 bg-amber-50',
      icon: Lightbulb,
      featured: false,
      intro: 'Menus with high-quality food photography see 30–40% more items ordered from those sections compared to text-only menus. You don\'t need professional equipment — just the right approach with your smartphone.',
      steps: [
        { step: 'Shoot in natural daylight wherever possible. Position your dish near a window with indirect natural light for the most flattering and accurate color rendering. Avoid overhead fluorescent kitchen lighting.' },
        { step: 'Use a plain white or neutral surface as the background. A white plate on a white tablecloth, or a white cutting board, creates the cleanest look. Busy or patterned backgrounds distract from the food.' },
        { step: 'Shoot from directly above (overhead / bird\'s eye view) for dishes served in bowls, plates, or spreads. Shoot at a 45-degree angle for layered items like burgers, sandwiches, or tall drinks.' },
        { step: 'Ensure your lens is clean. Phone camera smudges are the number one cause of blurry, low-quality food photos. Wipe with a microfiber cloth before every session.' },
        { step: 'Avoid using your phone\'s digital zoom. Instead, physically move the phone closer to the dish. Zooming in digitally degrades image quality and sharpness significantly.' },
        { step: 'Crop your final image to a square (1:1) ratio before uploading. This ensures consistent layout sizing across the menu card interface regardless of the guest\'s phone model.' },
        { step: 'Keep file size under 2MB by exporting at 72 DPI or using a free image compression tool (TinyPNG, Squoosh). Large images slow down menu load times on guest devices with slower connections.' }
      ],
      tips: ['Take 5–10 shots of each dish from different angles and choose the best one.', 'Update photos seasonally to keep the menu looking fresh and current.']
    },
    {
      title: 'Integrating DineFlow with Your Existing Billing Counter Workflow',
      duration: '5 min read',
      difficulty: 'Beginner',
      diffColor: 'text-emerald-600 bg-emerald-50',
      icon: CheckCircle2,
      featured: false,
      intro: 'DineFlow handles the ordering step — guests scan, select, and submit. The final billing and payment step remains with your existing cash or card terminal process. This guide explains the handoff workflow.',
      steps: [
        { step: 'DineFlow does not replace your billing system. Think of it as a digital order-taking layer that sits between the guest and your existing counter workflow. Payments still go through your POS, cash register, or card terminal as before.' },
        { step: 'When a guest submits an order, it appears on your dashboard feed with the table number, items, and quantities. Your counter or floor manager views this and prepares the kitchen ticket (or tickets to the kitchen display screen).' },
        { step: 'When guests are ready to pay, they signal a staff member (or walk to the counter). The billing team refers to the table\'s order feed in the dashboard to prepare the final bill total.' },
        { step: 'For restaurants using standard printed receipts, continue generating receipts from your existing billing software. DineFlow order data can be referenced on a separate screen alongside your billing system.' },
        { step: 'Mark the table as "Cleared" on the DineFlow dashboard when the guests leave. This clears the order feed and resets the table for the next occupants.' },
        { step: 'At end of day, use the DineFlow daily order export (CSV) to cross-reference with your billing system\'s revenue records. This provides a full audit trail of orders versus bills settled.' }
      ],
      tips: ['Train your billing staff to reference DineFlow order IDs when handling disputed or unclear bills.', 'Consider placing a small printed instruction card at the billing counter for staff new to the flow.']
    }
  ];

  return (
    <InfoLayout
      title="Guides & Documentation"
      subtitle="Step-by-step guides to help you set up, optimize, and grow your restaurant's digital menu experience."
      category="Onboarding Guides"
      icon={BookOpen}
      accentColor="text-indigo-600 bg-indigo-50 border-indigo-150"
    >
      <div className="space-y-12 font-sans">

        {/* Intro */}
        <div className="space-y-3">
          <h2 className="text-sm font-black text-slate-800 uppercase tracking-wider">Guides Directory</h2>
          <p className="text-slate-500 font-semibold text-xs leading-relaxed">
            Our documentation team maintains detailed guides on every aspect of the DineFlow setup and operation process. Whether you are setting up for the first time or looking to optimize your existing menu for better ordering patterns, you'll find step-by-step instructions below.
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-4">
          {[
            { value: `${guides.length}`, label: 'Guides available' },
            { value: 'Beginner → Expert', label: 'All skill levels covered' },
            { value: 'Free', label: 'All guides, no paywall' },
          ].map((s, si) => (
            <div key={si} className="border border-[#EFEFEF] rounded-xl p-4 text-center bg-[#FAFAFA]/50">
              <div className="text-sm font-black text-indigo-600">{s.value}</div>
              <div className="text-[10px] font-bold text-slate-400 mt-1 leading-tight">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Featured Guide */}
        {guides.filter(g => g.featured).map((g, gi) => (
          <div key={gi} className="border-t border-[#EFEFEF] pt-8 space-y-4">
            <h3 className="text-xs font-black text-slate-400 uppercase tracking-wider flex items-center gap-2">
              <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" /> Recommended Starting Point
            </h3>
            <div className="border border-indigo-200 bg-indigo-50/30 rounded-2xl p-6 space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                <div className="space-y-1">
                  <h3 className="font-black text-[#111827] text-sm leading-snug">{g.title}</h3>
                  <div className="flex items-center gap-2 text-[10px] font-bold">
                    <span className={`px-2 py-0.5 rounded-full ${g.diffColor}`}>{g.difficulty}</span>
                    <span className="text-slate-400 flex items-center gap-1"><Clock className="w-3 h-3" />{g.duration}</span>
                  </div>
                </div>
              </div>
              <p className="text-slate-500 font-semibold text-xs leading-relaxed">{g.intro}</p>
              <div className="border-t border-indigo-100 pt-4 space-y-2">
                <h4 className="text-[10px] font-black text-slate-700 uppercase tracking-wider">Step-by-step:</h4>
                <ol className="space-y-3">
                  {g.steps.map((s, si) => (
                    <li key={si} className="flex items-start gap-3">
                      <span className="w-5 h-5 rounded-full bg-indigo-600 text-white font-black text-[10px] flex items-center justify-center shrink-0 mt-0.5">{si + 1}</span>
                      <p className="text-slate-500 font-semibold text-xs leading-relaxed">{s.step}</p>
                    </li>
                  ))}
                </ol>
              </div>
              {g.tips && (
                <div className="border-t border-indigo-100 pt-3 space-y-2">
                  <h4 className="text-[10px] font-black text-amber-600 uppercase tracking-wider flex items-center gap-1.5">
                    <AlertTriangle className="w-3 h-3" /> Pro Tips:
                  </h4>
                  <ul className="space-y-1.5">
                    {g.tips.map((tip, ti) => (
                      <li key={ti} className="flex items-start gap-2 text-slate-500 font-semibold text-xs leading-relaxed">
                        <Lightbulb className="w-3 h-3 text-amber-500 shrink-0 mt-0.5" />
                        {tip}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        ))}

        {/* All Other Guides */}
        <div className="border-t border-[#EFEFEF] pt-8 space-y-8">
          <h2 className="text-sm font-black text-slate-800 uppercase tracking-wider">All Guides</h2>
          {guides.filter(g => !g.featured).map((g, idx) => (
            <div key={idx} className="space-y-4 border border-[#EFEFEF] rounded-2xl p-6 bg-[#FAFAFA]/30 hover:bg-white hover:shadow-sm transition-all">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                <div className="space-y-1">
                  <h3 className="font-black text-[#111827] text-sm leading-snug">{g.title}</h3>
                  <div className="flex items-center gap-2 text-[10px] font-bold">
                    <span className={`px-2 py-0.5 rounded-full ${g.diffColor}`}>{g.difficulty}</span>
                    <span className="text-slate-400 flex items-center gap-1"><Clock className="w-3 h-3" />{g.duration}</span>
                  </div>
                </div>
              </div>
              <p className="text-slate-500 font-semibold text-xs leading-relaxed">{g.intro}</p>
              <div className="border-t border-[#EFEFEF]/60 pt-3 space-y-2">
                <h4 className="text-[10px] font-black text-slate-700 uppercase tracking-wider">Steps:</h4>
                <ul className="space-y-2">
                  {g.steps.map((s, si) => (
                    <li key={si} className="flex items-start gap-2 text-slate-500 font-semibold text-xs leading-relaxed">
                      <CheckCircle2 className="w-3 h-3 text-indigo-500 shrink-0 mt-0.5" />
                      {s.step}
                    </li>
                  ))}
                </ul>
              </div>
              {g.tips && (
                <div className="border-t border-[#EFEFEF]/60 pt-3 space-y-1.5">
                  <h4 className="text-[10px] font-black text-amber-600 uppercase tracking-wider flex items-center gap-1.5">
                    <AlertTriangle className="w-3 h-3" /> Tips:
                  </h4>
                  {g.tips.map((tip, ti) => (
                    <p key={ti} className="flex items-start gap-2 text-slate-400 font-semibold text-xs">
                      <Lightbulb className="w-3 h-3 text-amber-500 shrink-0 mt-0.5" />
                      {tip}
                    </p>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Request Custom Guide */}
        <div className="border-t border-[#EFEFEF] pt-8 space-y-4">
          <h2 className="text-sm font-black text-slate-800 uppercase tracking-wider">Need a Custom Walkthrough?</h2>
          <p className="text-slate-500 font-semibold text-xs leading-relaxed max-w-lg">
            If your setup has a unique requirement — such as a large multi-floor venue, a hotel property, or an outdoor rooftop cafe — our onboarding team can schedule a live walkthrough session via video call. Submit an enquiry with your specific scenario.
          </p>
          <Link href="/enquire" className="inline-flex items-center gap-1.5 bg-[#FF6B35] hover:bg-[#e05420] text-white font-bold px-8 py-3 rounded-xl text-xs transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5">
            Request a Live Walkthrough <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

      </div>
    </InfoLayout>
  );
}
