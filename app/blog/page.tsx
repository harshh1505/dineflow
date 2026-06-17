import InfoLayout from '@/app/components/info-layout';
import Link from 'next/link';
import { Newspaper, Star, Clock, ArrowRight, TrendingUp, Users, Utensils } from 'lucide-react';

export default function BlogPage() {
  const featured = {
    title: 'The Psychology of Digital Menu Layouts: How Bestseller Badges Lift Sales by 18%',
    date: 'June 10, 2026',
    read: '7 min read',
    author: 'Arjun Sharma',
    role: 'Product Strategy, Restreasy',
    category: 'Menu Engineering',
    categoryColor: 'text-[#FF6B35] bg-[#FFF7F2]',
    summary: 'When customer attention is split across fifty items in a dense menu, layout engineering acts as a subtle guide that directs eyes to the right places at the right moments. In this deep-dive, we examine how the strategic placement of Bestseller badges, Chef\'s Special callouts, and high-quality photography on specific items creates a hierarchy that nudges guests toward high-margin choices — without feeling manipulative. Our research across 8 partner restaurants shows an average 18% increase in order value after implementing structured layout changes.',
    tags: ['Menu Design', 'Conversion', 'Restaurant Psychology']
  };

  const posts = [
    {
      title: 'Why Requiring App Installs Kills Seated QR Order Conversions',
      date: 'May 28, 2026',
      read: '5 min read',
      author: 'Ananya Roy',
      role: 'Hospitality Success Lead',
      category: 'Industry Insight',
      categoryColor: 'text-indigo-600 bg-indigo-50',
      summary: 'Many QR menu platforms ask customers to download native iOS or Android apps, or complete registration pages just to view the drinks menu. Our research shows that any friction step drops order conversions by up to 40%. Direct mobile browser menus load under two seconds and require zero setup, preserving guest-side conversions at seated dining tables.',
      tags: ['QR Menus', 'Conversion', 'UX Research']
    },
    {
      title: 'Menu Engineering: Optimizing Category Order for High-Volume Cafes',
      date: 'May 12, 2026',
      read: '6 min read',
      author: 'Jane Smith',
      role: 'Restaurant Consultant',
      category: 'Operations',
      categoryColor: 'text-emerald-600 bg-emerald-50',
      summary: 'Cafes function differently than full-course dinner rooms. Drink orders and coffee selections have peak frequency during morning and late afternoon service. Placing your beverage category at the very top of the menu card, while grouping lunch mains below, aligns with your customers\' natural purchase paths and shortens table turnaround times by 8–12 minutes.',
      tags: ['Cafes', 'Category Design', 'Efficiency']
    },
    {
      title: 'How Restreasy Partners Reduced Print Spend by ₹48,000/Year',
      date: 'April 22, 2026',
      read: '4 min read',
      author: 'Vikram Malhotra',
      role: 'CEO, Restreasy',
      category: 'Case Study',
      categoryColor: 'text-amber-600 bg-amber-50',
      summary: 'A 22-table cafe in Koramangala, Bangalore was spending over ₹48,000 per year on printed menus — reprinting every time they updated a price, added a seasonal item, or redesigned their layout. After switching to Restreasy\'s digital QR system, their print budget dropped to near zero while customer feedback on the ordering experience improved significantly.',
      tags: ['Cost Savings', 'Case Study', 'Sustainability']
    },
    {
      title: 'Dietary Labeling in Indian Restaurants: Beyond the Green and Red Dot',
      date: 'April 8, 2026',
      read: '5 min read',
      author: 'Priya Nair',
      role: 'UX Research, Restreasy',
      category: 'Product Design',
      categoryColor: 'text-purple-600 bg-purple-50',
      summary: 'The traditional green/red dot system doesn\'t cover the full spectrum of dietary requirements in Indian dining contexts. Jain preferences, nut allergies, gluten sensitivities, and dairy exclusions require more nuanced labeling. We explore how digital menus can present richer dietary metadata without cluttering the visual layout or slowing the ordering flow.',
      tags: ['Dietary Labels', 'Accessibility', 'India Market']
    },
    {
      title: 'The Data Case for Real-Time Availability Toggles on QR Menus',
      date: 'March 25, 2026',
      read: '4 min read',
      author: 'Ravi Kumar',
      role: 'Data & Analytics, Restreasy',
      category: 'Data & Research',
      categoryColor: 'text-slate-600 bg-slate-100',
      summary: 'Out-of-stock orders — where a customer orders a dish that has already sold out — create a cascade of negative experiences: kitchen delays, waiter awkwardness, and guest disappointment. We analyzed 3,400 orders across our partner restaurants and found that real-time item toggles reduce out-of-stock incidents by 91% compared to static menus.',
      tags: ['Data', 'Kitchen Ops', 'Guest Experience']
    },
    {
      title: 'Peak Hour Ordering Patterns: What 10,000 QR Scans Taught Us',
      date: 'March 10, 2026',
      read: '8 min read',
      author: 'Shreya Iyer',
      role: 'CTO, Restreasy',
      category: 'Data & Research',
      categoryColor: 'text-slate-600 bg-slate-100',
      summary: 'After analyzing 10,000+ QR code scans across 30 partner restaurants, we found consistent ordering patterns: breakfast peaks between 8:30–10:00 AM, lunch between 12:30–1:45 PM, and dinner starting sharply at 7:30 PM. Understanding these windows helps restaurants pre-stage inventory, staff up efficiently, and time promotional item highlighting on their menus.',
      tags: ['Analytics', 'Operations', 'Peak Hours']
    }
  ];

  const categories = [
    { icon: TrendingUp, name: 'Menu Engineering', count: 14 },
    { icon: Utensils, name: 'Kitchen Operations', count: 9 },
    { icon: Users, name: 'Guest Experience', count: 11 },
    { icon: Newspaper, name: 'Industry Insights', count: 8 },
  ];

  return (
    <InfoLayout
      title="Restreasy Blog"
      subtitle="Industry insights, menu engineering research, and digital strategy guides for modern cafes and restaurants."
      category="Our Blog"
      icon={Newspaper}
      accentColor="text-[#FF6B35] bg-[#FFF7F2] border-[#FF6B35]/20"
    >
      <div className="space-y-12 font-sans">

        {/* Intro */}
        <div className="space-y-3">
          <h2 className="text-sm font-black text-slate-800 uppercase tracking-wider">Latest Articles</h2>
          <p className="text-slate-500 font-semibold text-xs leading-relaxed">
            Our team regularly publishes research-backed articles on menu psychology, digital ordering strategy, and operational best practices for independent cafes, restaurants, and food service businesses.
          </p>
        </div>

        {/* Category pills */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {categories.map((c, ci) => (
            <div key={ci} className="border border-[#EFEFEF] rounded-xl p-3 flex items-center gap-2.5 bg-[#FAFAFA]/50 hover:bg-white hover:shadow-sm transition-all cursor-pointer">
              <c.icon className="w-4 h-4 text-[#FF6B35] shrink-0" />
              <div>
                <div className="font-black text-[#111827] text-[10px]">{c.name}</div>
                <div className="text-[9px] text-slate-400 font-semibold">{c.count} articles</div>
              </div>
            </div>
          ))}
        </div>

        {/* Featured Post */}
        <div className="border-t border-[#EFEFEF] pt-8 space-y-3">
          <h3 className="text-xs font-black text-slate-400 uppercase tracking-wider flex items-center gap-2">
            <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" /> Featured Article
          </h3>
          <div className="border border-[#FF6B35]/30 rounded-2xl overflow-hidden bg-[#FFF7F2]/30 p-6 space-y-4">
            <div className="flex flex-wrap gap-2">
              <span className={`text-[9px] font-bold px-2.5 py-1 rounded-full ${featured.categoryColor}`}>{featured.category}</span>
              {featured.tags.map((tag, ti) => (
                <span key={ti} className="text-[9px] font-bold px-2.5 py-1 rounded-full bg-[#FAFAFA] text-slate-500 border border-[#EFEFEF]">{tag}</span>
              ))}
            </div>
            <h3 className="font-black text-[#111827] text-base leading-snug">{featured.title}</h3>
            <p className="text-slate-500 font-semibold leading-relaxed text-xs">{featured.summary}</p>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t border-[#FF6B35]/20">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#FF6B35] flex items-center justify-center text-white font-black text-[10px] shrink-0">
                  {featured.author.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <p className="font-black text-[#111827] text-[10px]">{featured.author}</p>
                  <p className="text-[9px] text-slate-400 font-semibold">{featured.role}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 text-[9px] font-bold text-slate-400">
                <span>{featured.date}</span>
                <span>•</span>
                <div className="flex items-center gap-1"><Clock className="w-3 h-3" />{featured.read}</div>
                <Link href="/enquire" className="text-[#FF6B35] font-black hover:underline flex items-center gap-1">
                  Read Full Article <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* All Posts Grid */}
        <div className="border-t border-[#EFEFEF] pt-8 space-y-4">
          <h3 className="text-xs font-black text-slate-800 uppercase tracking-wider">All Recent Articles</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {posts.map((post, idx) => (
              <div key={idx} className="border border-[#EFEFEF] rounded-2xl overflow-hidden bg-[#FAFAFA]/50 hover:bg-white hover:border-[#FF6B35]/20 hover:shadow-sm transition-all flex flex-col justify-between p-6 space-y-4">
                <div className="space-y-3">
                  <div className="flex flex-wrap gap-2">
                    <span className={`text-[9px] font-bold px-2.5 py-1 rounded-full ${post.categoryColor}`}>{post.category}</span>
                  </div>
                  <h3 className="font-black text-[#111827] text-sm leading-snug">{post.title}</h3>
                  <p className="text-slate-500 font-semibold leading-relaxed text-xs">{post.summary}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {post.tags.map((tag, ti) => (
                      <span key={ti} className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-[#FAFAFA] text-slate-400 border border-[#EFEFEF]">{tag}</span>
                    ))}
                  </div>
                </div>
                <div className="pt-3 border-t border-[#EFEFEF]/50 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-[#FFF7F2] border border-[#FF6B35]/20 flex items-center justify-center text-[#FF6B35] font-black text-[9px] shrink-0">
                      {post.author.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <p className="font-black text-[#111827] text-[10px]">{post.author}</p>
                      <div className="flex items-center gap-1.5 text-[9px] font-bold text-slate-400">
                        <span>{post.date}</span>
                        <span>•</span>
                        <Clock className="w-2.5 h-2.5" />
                        <span>{post.read}</span>
                      </div>
                    </div>
                  </div>
                  <Link href="/enquire" className="text-[#FF6B35] font-black text-xs hover:underline flex items-center gap-1 shrink-0">
                    Read <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Newsletter signup */}
        <div className="border-t border-[#EFEFEF] pt-8 space-y-4">
          <h2 className="text-sm font-black text-slate-800 uppercase tracking-wider">Subscribe to Our Newsletter</h2>
          <p className="text-slate-500 font-semibold text-xs leading-relaxed max-w-lg">
            Get our latest menu engineering research, product updates, and operational tips delivered directly to your inbox — twice a month. No spam, unsubscribe anytime.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-md">
            <input
              type="email"
              className="flex-1 bg-[#FAFAFA] border border-[#EAEAEA] px-3.5 py-2.5 rounded-xl text-xs placeholder-slate-400 focus:outline-none focus:border-[#FF6B35]/50 transition-colors"
              placeholder="your@email.com"
            />
            <button
              type="button"
              className="bg-[#FF6B35] text-white font-bold px-5 py-2.5 rounded-xl text-xs hover:bg-[#e05420] transition-colors flex items-center gap-1.5 shrink-0"
            >
              Subscribe <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
          <p className="text-[10px] text-slate-400 font-semibold">By subscribing, you agree to receive marketing emails from Restreasy. Unsubscribe at any time.</p>
        </div>

      </div>
    </InfoLayout>
  );
}
