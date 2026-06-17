import Link from 'next/link';
import { 
  ArrowRight, 
  QrCode, 
  Smartphone, 
  BarChart3, 
  ShieldCheck, 
  Users, 
  Heart, 
  Megaphone,
  Check,
  Star,
  Plus,
  Play,
  ClipboardList,
  TrendingUp,
  LayoutGrid,
  ShoppingBag,
  PieChart,
  LineChart
} from 'lucide-react';

// Custom stroke-only restaurant doodles for organic visual layers
const CoffeeCupDoodle = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 8h1a4 4 0 1 1 0 8h-1" />
    <path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z" />
    <line x1="6" x2="6" y1="2" y2="4" />
    <line x1="10" x2="10" y1="2" y2="4" />
    <line x1="14" x2="14" y1="2" y2="4" />
  </svg>
);

const PizzaDoodle = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 11h.01M11 15h.01M16 16h.01" strokeWidth="2" />
    <path d="M2 20h18a2 2 0 0 0 2-2V3.34a.5.5 0 0 0-.79-.41L2.21 18.79A1 1 0 0 0 2 20Z" />
    <path d="M22 18c-3 0-6-1-8-3-2-2-3-5-3-8" />
  </svg>
);

const LeafDoodle = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 3.5 1 9.8a7 7 0 0 1-9 8.2Z" />
    <path d="M19 2C14 7 11.5 9.5 9 14" />
  </svg>
);

const ForkSpoonDoodle = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2" />
    <path d="M7 2v4M5 2v4M9 2v4M7 11v11" />
    <path d="M17 20h.01M17 2v10a4 4 0 0 0 4 4v6" />
  </svg>
);

const SparkleDoodle = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
  </svg>
);

const ChefHatDoodle = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 18V9a6 6 0 0 1 12 0v9" />
    <path d="M3 18h18a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1v-2a1 1 0 0 1 1-1Z" />
    <path d="M12 3a4.5 4.5 0 0 1 3.5 1.5M8.5 4.5A4.5 4.5 0 0 1 12 3" />
  </svg>
);

// Localized Dot Grid component matching mockup
const DotGrid = ({ className }: { className?: string }) => (
  <svg width="80" height="80" viewBox="0 0 80 80" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
    {Array.from({ length: 5 }).map((_, r) =>
      Array.from({ length: 5 }).map((_, c) => (
        <circle key={`${r}-${c}`} cx={8 + c * 16} cy={8 + r * 16} r="1.5" fill="#FF6B35" className="opacity-15" />
      ))
    )}
  </svg>
);

// Top Right concentric curved strokes with sparkle
const TopRightCurves = ({ className }: { className?: string }) => (
  <svg width="240" height="240" viewBox="0 0 240 240" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
    <circle cx="240" cy="0" r="100" stroke="#FF6B35" strokeWidth="1.2" strokeDasharray="3 3" className="opacity-15" />
    <circle cx="240" cy="0" r="150" stroke="#FF6B35" strokeWidth="1.2" className="opacity-10" />
    <circle cx="240" cy="0" r="200" stroke="#FF6B35" strokeWidth="1.2" className="opacity-10" />
    {/* Small circle outline */}
    <circle cx="150" cy="60" r="5" stroke="#FF6B35" strokeWidth="1.2" className="opacity-15" />
    {/* Sparkle/Star outline */}
    <path d="M190,120 L191.5,114 L197,112.5 L191.5,111 L190,105 L188.5,111 L183,112.5 L188.5,114 Z" stroke="#FF6B35" strokeWidth="1.2" className="opacity-20" />
  </svg>
);

// Bottom Left concentric curved strokes
const BottomLeftCurves = ({ className }: { className?: string }) => (
  <svg width="240" height="240" viewBox="0 0 240 240" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
    <circle cx="0" cy="240" r="100" stroke="#FF6B35" strokeWidth="1.2" className="opacity-10" />
    <circle cx="0" cy="240" r="150" stroke="#FF6B35" strokeWidth="1.2" strokeDasharray="3 3" className="opacity-15" />
    <circle cx="0" cy="240" r="200" stroke="#FF6B35" strokeWidth="1.2" className="opacity-10" />
  </svg>
);

export default async function LandingPage() {

  return (
    <div className="flex flex-col min-h-screen bg-white text-[#111827] antialiased selection:bg-[#FF6B35] selection:text-white font-sans overflow-x-hidden relative">
      
      {/* Background Composition for Hero Section */}
      <div className="absolute top-0 right-0 pointer-events-none select-none z-0">
        <TopRightCurves className="w-[240px] h-[240px]" />
      </div>
      <div className="absolute top-8 left-6 pointer-events-none select-none z-0">
        <DotGrid />
      </div>
      <div className="absolute top-[32%] right-[10%] pointer-events-none select-none z-0 opacity-15 animate-float-y-rotate">
        <LeafDoodle className="w-8 h-8 text-[#FF6B35]" />
      </div>
      <div className="absolute top-[48%] left-[4%] pointer-events-none select-none z-0 opacity-15 animate-float-y-slow">
        <CoffeeCupDoodle className="w-8 h-8 text-[#FF6B35]" />
      </div>

      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/70 backdrop-blur-md border-b border-[#EFEFEF] w-full transition-all duration-300">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center w-full">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 group cursor-pointer">
              <div className="bg-[#FF6B35] p-2 rounded-xl text-white transition-transform group-hover:scale-105 duration-300">
                <ForkSpoonDoodle className="w-4 h-4 text-white" />
              </div>
              <span className="font-extrabold text-lg tracking-tight text-[#111827]">
                Restreasy
              </span>
            </div>
            <div className="flex items-center self-center pl-2 sm:pl-3 border-l border-[#EFEFEF]">
              <a 
                href="https://techtrendgo.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-[10px] text-slate-400 hover:text-[#FF6B35] font-semibold transition-colors leading-none"
              >
                an initiative by <span className="font-extrabold text-slate-500 hover:text-[#FF6B35]">tech trend go</span>
              </a>
            </div>
          </div>
          
          <nav className="flex items-center gap-5">
            <Link
              href="/enquire"
              className="bg-[#FF6B35] hover:bg-[#e05420] text-white px-5 py-2.5 rounded-xl font-bold text-xs transition-all duration-300 shadow-sm hover:shadow-md hover:-translate-y-0.5 active:scale-98"
            >
              Enquire Now
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1 z-10 relative">
        <section className="px-6 pt-16 pb-12 max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-5 text-left space-y-7 relative">
              <h1 className="text-4xl md:text-5xl lg:text-[52px] font-black tracking-tight text-[#111827] leading-[1.12]">
                Run, manage & <br />
                grow <span className="text-[#FF6B35]">your restaurant</span>
              </h1>
              
              <p className="text-[#6B7280] text-sm md:text-[14.5px] leading-relaxed font-medium max-w-md">
                QR menu, digital ordering, customers, analytics and more — all in one beautiful platform.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 pt-1 items-center relative">
                <Link
                  href="/enquire"
                  className="w-full sm:w-auto bg-[#FF6B35] hover:bg-[#e05420] text-white px-7 py-3.5 rounded-xl font-bold text-xs transition-all duration-300 shadow-sm hover:shadow-md hover:-translate-y-0.5 active:scale-98 flex items-center justify-center"
                >
                  Enquire Now
                </Link>
                <Link
                  href="/live-demo"
                  className="w-full sm:w-auto bg-white hover:bg-[#FAFAFA] border border-[#111827]/10 hover:border-[#111827]/30 text-[#111827] px-7 py-3.5 rounded-xl font-bold text-xs transition-all duration-300 flex items-center justify-center"
                >
                  View Demo
                </Link>

                {/* Hand-drawn Orange Arrow pointing to the dashboard */}
                <div className="absolute left-[85%] top-1/2 -translate-y-1/2 hidden lg:block z-20 pointer-events-none select-none text-[#FF6B35] animate-float-y">
                  <svg width="50" height="32" viewBox="0 0 50 32" fill="none" className="transform rotate-[-10deg]">
                    <path d="M2 25 C15 32, 30 18, 44 8" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" fill="none" />
                    <path d="M36 5 L44 8 L39 17" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                  </svg>
                </div>
              </div>

              {/* 2x2 Capabilities Grid */}
              <div className="grid grid-cols-2 gap-x-6 gap-y-6 pt-6 border-t border-[#EFEFEF]">
                
                {/* QR Menu & Ordering */}
                <div className="flex gap-3 items-start group">
                  <div className="w-8 h-8 rounded-full border border-[#FF6B35]/25 bg-[#FFF7F2] text-[#FF6B35] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform duration-300">
                    <QrCode className="w-3.5 h-3.5" />
                  </div>
                  <div className="space-y-0.5">
                    <h4 className="text-[11.5px] font-black text-[#111827]">QR Menu & Ordering</h4>
                    <p className="text-[9.5px] text-[#6B7280] font-medium leading-normal">Beautiful digital menus that sell more</p>
                  </div>
                </div>

                {/* Analytics */}
                <div className="flex gap-3 items-start group">
                  <div className="w-8 h-8 rounded-full border border-[#FF6B35]/25 bg-[#FFF7F2] text-[#FF6B35] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform duration-300">
                    <BarChart3 className="w-3.5 h-3.5" />
                  </div>
                  <div className="space-y-0.5">
                    <h4 className="text-[11.5px] font-black text-[#111827]">Analytics</h4>
                    <p className="text-[9.5px] text-[#6B7280] font-medium leading-normal">Real-time insights to grow faster</p>
                  </div>
                </div>

                {/* Customer CRM */}
                <div className="flex gap-3 items-start group">
                  <div className="w-8 h-8 rounded-full border border-[#FF6B35]/25 bg-[#FFF7F2] text-[#FF6B35] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform duration-300">
                    <Users className="w-3.5 h-3.5" />
                  </div>
                  <div className="space-y-0.5">
                    <h4 className="text-[11.5px] font-black text-[#111827]">Customer CRM</h4>
                    <p className="text-[9.5px] text-[#6B7280] font-medium leading-normal">Build relationships that last</p>
                  </div>
                </div>

                {/* Marketing & Loyalty */}
                <div className="flex gap-3 items-start group">
                  <div className="w-8 h-8 rounded-full border border-[#FF6B35]/25 bg-[#FFF7F2] text-[#FF6B35] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform duration-300">
                    <Megaphone className="w-3.5 h-3.5" />
                  </div>
                  <div className="space-y-0.5">
                    <h4 className="text-[11.5px] font-black text-[#111827]">Marketing & Loyalty</h4>
                    <p className="text-[9.5px] text-[#6B7280] font-medium leading-normal">Run campaigns that bring customers back</p>
                  </div>
                </div>

              </div>
              
              {/* Floating outlines at the bottom left section */}
              <div className="absolute -bottom-16 left-1/4 pointer-events-none opacity-[0.08] animate-float-y z-0">
                <CoffeeCupDoodle className="w-16 h-16 text-[#FF6B35]" />
              </div>
              <div className="absolute -bottom-20 left-6 pointer-events-none opacity-[0.08] animate-float-y-slow z-0">
                <LeafDoodle className="w-14 h-14 text-[#FF6B35]" />
              </div>
            </div>

            {/* Right Product Mockup Visuals (Restreasy inspired dashboard & phone mockup overlay) */}
            <div className="lg:col-span-7 relative flex items-center justify-center pt-6 lg:pt-0">
              
              {/* Floating Chef Hat Doodle at top of dashboard */}
              <div className="absolute -top-10 left-12 pointer-events-none opacity-10 animate-float-y-rotate z-20">
                <ChefHatDoodle className="w-14 h-14 text-[#FF6B35]" />
              </div>

              {/* Decorative background shadow blur */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-[110%] bg-[#FFF7F2] rounded-full filter blur-3xl opacity-60 pointer-events-none -z-10" />
              
              {/* Dashboard Wrapper */}
              <div className="w-full bg-white border border-[#EFEFEF] rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.02)] overflow-hidden transition-all duration-300 hover:border-[#FF6B35]/25">
                
                {/* Dashboard Header/Top bar */}
                <div className="border-b border-[#EFEFEF] bg-[#FAFAFA] px-4 py-3 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#EFEFEF]" />
                      <span className="w-2.5 h-2.5 rounded-full bg-[#EFEFEF]" />
                      <span className="w-2.5 h-2.5 rounded-full bg-[#EFEFEF]" />
                    </div>
                    {/* Branding */}
                    <div className="flex items-center gap-1.5 text-[10px] font-bold text-[#111827] pl-3 border-l border-[#EFEFEF]">
                      <ForkSpoonDoodle className="w-3.5 h-3.5 text-[#FF6B35]" /> Restreasy
                    </div>
                  </div>

                  <div className="flex items-center gap-3.5">
                    {/* Select Cafe */}
                    <div className="flex items-center gap-2 bg-white border border-[#EFEFEF] rounded-lg px-2.5 py-1 text-[9px] font-bold text-[#111827]">
                      The Coffee Corner
                      <span className="text-[#6B7280] text-[8px]">▼</span>
                    </div>

                    {/* Notification Bell */}
                    <div className="relative cursor-pointer text-slate-500 hover:text-[#FF6B35] transition-colors">
                      <svg viewBox="0 0 24 24" className="w-4.5 h-4.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
                        <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
                      </svg>
                      <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full border border-white" />
                    </div>

                    {/* Profile Avatar */}
                    <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-[#FF6B35] to-orange-300 text-white font-extrabold text-[8px] flex items-center justify-center border border-white shadow-xs">
                      AS
                    </div>
                  </div>
                </div>

                {/* Dashboard Main Grid Area */}
                <div className="grid grid-cols-12 h-[460px]">
                  
                  {/* Dashboard Sidebar */}
                  <div className="col-span-3 border-r border-[#EFEFEF] p-3 space-y-1 bg-white hidden sm:block">
                    <div className="bg-[#FFF7F2] text-[#FF6B35] rounded-lg px-2.5 py-1.5 text-[9px] font-bold flex items-center gap-2">
                      <BarChart3 className="w-3.5 h-3.5" /> Overview
                    </div>
                    {[
                      { name: 'Menu', icon: <QrCode className="w-3 h-3 text-[#6B7280]" /> },
                      { name: 'Orders', icon: <Smartphone className="w-3 h-3 text-[#6B7280]" /> },
                      { name: 'Tables', icon: <ForkSpoonDoodle className="w-3 h-3 text-[#6B7280]" /> },
                      { name: 'Customers', icon: <Users className="w-3 h-3 text-[#6B7280]" /> },
                      { name: 'Marketing', icon: <Megaphone className="w-3 h-3 text-[#6B7280]" /> },
                      { name: 'Analytics', icon: <BarChart3 className="w-3 h-3 text-[#6B7280]" /> },
                      { name: 'Reviews', icon: <Star className="w-3 h-3 text-[#6B7280]" /> },
                      { name: 'Settings', icon: <ForkSpoonDoodle className="w-3 h-3 text-[#6B7280]" /> }
                    ].map((item, idx) => (
                      <div key={idx} className="text-[#6B7280] hover:text-[#111827] rounded-lg px-2.5 py-1.5 text-[9px] font-semibold flex items-center gap-2 cursor-pointer transition-colors hover:bg-[#FAFAFA]">
                        {item.icon} {item.name}
                      </div>
                    ))}
                  </div>

                  {/* Dashboard Main Screen */}
                  <div className="col-span-12 sm:col-span-9 p-4 bg-[#FAFAFA] space-y-3.5 overflow-y-auto no-scrollbar">
                    <div>
                      <h3 className="text-xs font-bold text-[#111827]">Good morning, Arjun 👋</h3>
                      <p className="text-[9.5px] text-[#6B7280]">Here's what's happening with your restaurant today.</p>
                    </div>

                    {/* Metric Blocks */}
                    <div className="grid grid-cols-2 xs:grid-cols-4 gap-2">
                      {[
                        { label: "Today's Revenue", val: "₹24,350", change: "▲ 18.2%", color: "text-[#16A34A] bg-[#16A34A]/5" },
                        { label: "Orders", val: "162", change: "▲ 12.5%", color: "text-[#16A34A] bg-[#16A34A]/5" },
                        { label: "Avg. Order Value", val: "₹512", change: "▲ 9.1%", color: "text-[#16A34A] bg-[#16A34A]/5" },
                        { label: "Active Tables", val: "12 / 20", change: "62%", color: "text-[#FF6B35] bg-[#FF6B35]/5" }
                      ].map((metric, idx) => (
                        <div key={idx} className="bg-white border border-[#EFEFEF] rounded-lg p-2 space-y-1 hover:shadow-2xs duration-300">
                          <span className="text-[8px] font-semibold text-[#6B7280] uppercase tracking-wider block">{metric.label}</span>
                          <span className="text-[11.5px] font-black text-[#111827] block">{metric.val}</span>
                          <span className={`text-[8px] font-bold px-1 py-0.5 rounded block w-max ${metric.color}`}>{metric.change}</span>
                        </div>
                      ))}
                    </div>

                    {/* Sales Overview Line Chart SVG */}
                    <div className="bg-white border border-[#EFEFEF] rounded-lg p-3 space-y-1.5">
                      <div className="flex justify-between items-center">
                        <span className="text-[9.5px] font-bold text-[#111827]">Sales Overview</span>
                        <span className="text-[8.5px] text-[#6B7280]">Today</span>
                      </div>
                      <div className="h-20 w-full relative">
                        <svg className="w-full h-full text-[#FF6B35]" viewBox="0 0 300 100" preserveAspectRatio="none">
                          <defs>
                            <linearGradient id="chartGradHero" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="0%" stopColor="currentColor" stopOpacity="0.12" />
                              <stop offset="100%" stopColor="currentColor" stopOpacity="0.0" />
                            </linearGradient>
                          </defs>
                          {/* Smooth curved chart wave */}
                          <path d="M0,85 Q40,70 80,60 T160,45 T240,65 T300,20" fill="none" stroke="currentColor" strokeWidth="1.5" />
                          <path d="M0,85 Q40,70 80,60 T160,45 T240,65 T300,20 L300,100 L0,100 Z" fill="url(#chartGradHero)" />
                          <circle cx="160" cy="45" r="3" fill="#FF6B35" className="animate-ping" />
                          <circle cx="160" cy="45" r="1.5" fill="#FF6B35" />
                        </svg>
                      </div>
                    </div>

                    {/* Grid columns side-by-side inside main panel */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pb-2">
                      
                      {/* Recent Orders */}
                      <div className="bg-white border border-[#EFEFEF] rounded-lg p-3.5 space-y-3">
                        <div className="flex items-center justify-between border-b border-[#EFEFEF] pb-1.5">
                          <span className="text-[9.5px] font-bold text-[#111827]">Recent Orders</span>
                          <span className="text-[8px] text-[#FF6B35] font-bold cursor-pointer">View all</span>
                        </div>
                        <div className="space-y-1.5">
                          {[
                            { table: "Table 7", id: "#1245 · 2 items", status: "Preparing", statusColor: "text-amber-600 bg-amber-50" },
                            { table: "Table 3", id: "#1244 · 4 items", status: "Ready", statusColor: "text-emerald-600 bg-emerald-50" },
                            { table: "Table 12", id: "#1243 · 3 items", status: "Served", statusColor: "text-slate-600 bg-slate-100" }
                          ].map((order, idx) => (
                            <div key={idx} className="flex justify-between items-center border-b border-[#EFEFEF] last:border-0 pb-1.5 last:pb-0">
                              <div className="space-y-0.5">
                                <div className="text-[9px] font-bold text-[#111827]">{order.table}</div>
                                <div className="text-[7.5px] text-[#6B7280]">{order.id}</div>
                              </div>
                              <span className={`text-[7.5px] font-bold px-1.5 py-0.5 rounded ${order.statusColor}`}>{order.status}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Top Selling Items Donut Chart */}
                      <div className="bg-white border border-[#EFEFEF] rounded-lg p-3.5 space-y-3">
                        <div className="flex items-center justify-between border-b border-[#EFEFEF] pb-1.5">
                          <span className="text-[9.5px] font-bold text-[#111827]">Top Selling Items</span>
                        </div>
                        <div className="flex items-center justify-between gap-3">
                          {/* Donut chart visual using SVG */}
                          <div className="relative shrink-0">
                            <svg className="w-14 h-14 transform -rotate-90" viewBox="0 0 36 36">
                              <circle cx="18" cy="18" r="15.915" fill="none" stroke="#F5F5F5" strokeWidth="4" />
                              <circle cx="18" cy="18" r="15.915" fill="none" stroke="#FF6B35" strokeWidth="4" strokeDasharray="32 68" strokeDashoffset="100" />
                              <circle cx="18" cy="18" r="15.915" fill="none" stroke="#fdba74" strokeWidth="4" strokeDasharray="24 76" strokeDashoffset="68" />
                              <circle cx="18" cy="18" r="15.915" fill="none" stroke="#cbd5e1" strokeWidth="4" strokeDasharray="18 82" strokeDashoffset="44" />
                            </svg>
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
                              <span className="text-[9px] font-black text-[#111827] block leading-none">162</span>
                              <span className="text-[6px] text-[#6B7280] font-bold uppercase tracking-wider block">Orders</span>
                            </div>
                          </div>
                          {/* Legend */}
                          <div className="space-y-1 text-[8px] font-bold w-full">
                            <div className="flex justify-between items-center">
                              <div className="flex items-center gap-1.5 text-slate-700">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B35]" /> Cappuccino
                              </div>
                              <span className="text-[#111827]">32%</span>
                            </div>
                            <div className="flex justify-between items-center">
                              <div className="flex items-center gap-1.5 text-slate-700">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#fdba74]" /> Sandwich
                              </div>
                              <span className="text-[#111827]">24%</span>
                            </div>
                            <div className="flex justify-between items-center">
                              <div className="flex items-center gap-1.5 text-slate-700">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#cbd5e1]" /> Brownie
                              </div>
                              <span className="text-[#111827]">18%</span>
                            </div>
                          </div>
                        </div>
                      </div>

                    </div>

                  </div>
                </div>
              </div>

              {/* Floating Mobile Phone Mockup Overlay */}
              <div className="absolute -right-4 -bottom-6 w-44 bg-white border border-[#EFEFEF] rounded-2xl shadow-[0_12px_40px_rgb(0,0,0,0.06)] p-2.5 space-y-2.5 animate-float-y-slow hidden md:block z-25 hover:scale-105 duration-300">
                {/* Speaker/Notch */}
                <div className="flex justify-center">
                  <span className="w-8 h-1 rounded-full bg-[#EFEFEF]" />
                </div>
                {/* Mini App Branding */}
                <div className="flex items-center justify-between border-b border-[#EFEFEF] pb-1.5">
                  <div className="text-[9px] font-black text-[#111827]">The Coffee Corner</div>
                  <div className="flex items-center gap-2">
                    <div className="text-[7px] text-[#FF6B35] font-bold flex items-center gap-0.5">
                      <Star className="w-2.5 h-2.5 fill-current text-[#FF6B35]" /> 4.7
                      <span className="text-slate-400 font-medium text-[6px]">(320)</span>
                    </div>
                    {/* Mini Cart icon */}
                    <div className="relative text-slate-600">
                      <Smartphone className="w-3 h-3 text-[#6B7280]" />
                      <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-[#FF6B35] text-white font-extrabold text-[5px] flex items-center justify-center rounded-full">3</span>
                    </div>
                  </div>
                </div>
                {/* Search Bar */}
                <div className="bg-[#FAFAFA] border border-[#EFEFEF] rounded px-1.5 py-0.5 text-[7px] text-slate-400">Search for dishes...</div>
                {/* Categories */}
                <div className="flex gap-1 overflow-x-auto no-scrollbar pb-0.5 text-[7px] font-bold">
                  <span className="bg-[#FF6B35] text-white px-2 py-0.5 rounded-lg">All</span>
                  <span className="text-[#6B7280] px-1.5 py-0.5">Coffee</span>
                  <span className="text-[#6B7280] px-1.5 py-0.5">Breakfast</span>
                  <span className="text-[#6B7280] px-1.5 py-0.5">Desserts</span>
                </div>
                {/* Mini Food Items */}
                <div className="space-y-2 max-h-[140px] overflow-hidden">
                  {[
                    { name: "Cappuccino", desc: "Classic cappuccino with rich espresso & steamed milk", price: "₹180" },
                    { name: "Cheese Sandwich", desc: "Grilled sandwich with cheese & veggies", price: "₹220" },
                    { name: "Chocolate Brownie", desc: "Warm brownie with chocolate sauce & ice cream", price: "₹160" }
                  ].map((food, idx) => (
                    <div key={idx} className="flex justify-between items-center gap-2 border-b border-[#EFEFEF] pb-1.5 last:border-0 last:pb-0">
                      <div className="space-y-0.5">
                        <div className="text-[7.5px] font-bold text-[#111827]">{food.name}</div>
                        <div className="text-[6px] text-[#6B7280] font-medium line-clamp-1">{food.desc}</div>
                        <div className="text-[7.5px] font-black text-[#111827]">{food.price}</div>
                      </div>
                      <div className="border border-[#FF6B35]/30 text-[#FF6B35] text-[7.5px] font-black px-2 py-0.5 rounded bg-white hover:bg-[#FFF7F2] cursor-pointer shrink-0 active:scale-95 duration-150">
                        ADD +
                      </div>
                    </div>
                  ))}
                </div>
                {/* Cart Float Drawer */}
                <div className="bg-[#FF6B35] text-white rounded-xl p-1.5 flex justify-between items-center text-[7.5px] font-extrabold shadow-sm animate-pulse-slow">
                  <span>3 items · ₹550</span>
                  <span className="bg-white text-[#FF6B35] rounded-lg px-2 py-0.5">View Cart</span>
                </div>
              </div>
            </div>
          </div>

          {/* Trust Ribbon */}
          <div className="border-t border-[#EFEFEF] mt-16 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-[10.5px] font-bold text-[#6B7280]">
            <div className="flex flex-wrap justify-center sm:justify-start items-center gap-x-8 gap-y-2">
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#FF6B35] stroke-[2.5]" /> Minimal Setup Fee
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#FF6B35] stroke-[2.5]" /> Cancel Anytime
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#FF6B35] stroke-[2.5]" /> 7-Day Free Trial
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#FF6B35]" /> Secure & Reliable
            </div>
          </div>
        </section>

        {/* Features / Capabilities Ribbon (Directly matching visual references) */}
        <section className="px-6 py-12 bg-white border-y border-[#EFEFEF] relative">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-5 gap-6 lg:gap-8">
              {[
                { 
                  icon: <QrCode className="w-4.5 h-4.5" />, 
                  title: "QR Menu & Ordering", 
                  desc: "Beautiful digital menu & seamless ordering" 
                },
                { 
                  icon: <Users className="w-4.5 h-4.5" />, 
                  title: "Customer CRM", 
                  desc: "Build customer relationships that last" 
                },
                { 
                  icon: <Heart className="w-4.5 h-4.5" />, 
                  title: "Loyalty & Rewards", 
                  desc: "Turn first-time customers into regulars" 
                },
                { 
                  icon: <BarChart3 className="w-4.5 h-4.5" />, 
                  title: "Analytics", 
                  desc: "Make data-driven decisions to grow" 
                },
                { 
                  icon: <Megaphone className="w-4.5 h-4.5" />, 
                  title: "Marketing", 
                  desc: "Reach customers with the right offers" 
                }
              ].map((item, idx) => (
                <div key={idx} className="space-y-2.5 col-span-1">
                  <div className="w-9 h-9 rounded-xl bg-[#FFF7F2] text-[#FF6B35] flex items-center justify-center border border-[#FF6B35]/10 shrink-0">
                    {item.icon}
                  </div>
                  <h4 className="text-[12px] font-extrabold text-[#111827] tracking-tight">{item.title}</h4>
                  <p className="text-[10.5px] text-[#6B7280] leading-normal font-medium">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works Section (Connected timeline matching visual reference image) */}
        <section className="px-6 py-24 max-w-6xl mx-auto relative overflow-hidden">
          {/* Background decorations matching reference */}
          <div className="absolute top-4 left-6 pointer-events-none select-none z-0">
            <DotGrid />
          </div>
          <div className="absolute top-6 right-8 pointer-events-none select-none z-0">
            <TopRightCurves className="w-48 h-48" />
          </div>
          <div className="absolute top-[60%] left-[-2%] pointer-events-none select-none z-0 opacity-[0.08] animate-float-y-rotate">
            <ChefHatDoodle className="w-16 h-16 text-[#FF6B35]" />
          </div>
          <div className="absolute top-[55%] right-2 pointer-events-none select-none z-0 opacity-[0.08] animate-float-y-slow">
            <LeafDoodle className="w-12 h-12 text-[#FF6B35]" />
          </div>

          <div className="text-center space-y-2 mb-16 relative z-10">
            <span className="text-[10px] font-extrabold text-[#FF6B35] bg-[#FFF7F2] px-3.5 py-1.5 rounded-full uppercase tracking-wider">Workflow</span>
            <h2 className="text-3.5xl font-black text-[#111827] tracking-tight">Deploy in three simple steps</h2>
            <p className="text-[#6B7280] text-xs max-w-md mx-auto font-semibold">Get your interactive menu live on dining tables in minutes.</p>
          </div>

          {/* Timeline Grid Container */}
          <div className="relative flex flex-col md:flex-row gap-6 items-stretch justify-between">
            
            {/* Step 1 */}
            <div className="bg-white border border-[#EFEFEF] rounded-3xl p-8 flex items-start gap-5 flex-1 relative shadow-[0_8px_30px_rgba(0,0,0,0.01)] hover:-translate-y-1 duration-300">
              {/* Floating numeric badge */}
              <div className="absolute -top-4 left-10 w-8 h-8 rounded-full bg-white border border-[#FFF7F2] text-[#FF6B35] font-black text-xs flex items-center justify-center shadow-[0_2px_10px_rgba(255,107,53,0.08)]">
                1
              </div>
              <div className="w-16 h-16 rounded-full bg-[#FFF7F2] text-[#FF6B35] flex items-center justify-center shrink-0">
                <ClipboardList className="w-7 h-7" />
              </div>
              <div className="space-y-3 pt-1">
                <h3 className="text-base font-black text-[#111827]">Design & Customize Menu</h3>
                <p className="text-[#6B7280] text-[11px] leading-relaxed font-semibold">
                  Set up categories, add food items, descriptions, tags (Veg/Non-veg/Jain), and custom brand colors.
                </p>
                <div className="text-[11px] font-black text-[#FF6B35] flex items-center gap-1 cursor-pointer hover:underline pt-1">
                  &gt; Get Started
                </div>
              </div>
            </div>

            {/* Arrow Badge 1 */}
            <div className="hidden md:flex w-8 h-8 rounded-full border border-[#EFEFEF] bg-white items-center justify-center text-[#FF6B35] shadow-xs self-center shrink-0">
              <span className="text-xs font-black">→</span>
            </div>

            {/* Step 2 */}
            <div className="bg-white border border-[#EFEFEF] rounded-3xl p-8 flex items-start gap-5 flex-1 relative shadow-[0_8px_30px_rgba(0,0,0,0.01)] hover:-translate-y-1 duration-300">
              {/* Floating numeric badge */}
              <div className="absolute -top-4 left-10 w-8 h-8 rounded-full bg-white border border-[#FFF7F2] text-[#FF6B35] font-black text-xs flex items-center justify-center shadow-[0_2px_10px_rgba(255,107,53,0.08)]">
                2
              </div>
              <div className="w-16 h-16 rounded-full bg-[#FFF7F2] text-[#FF6B35] flex items-center justify-center shrink-0">
                <QrCode className="w-7 h-7" />
              </div>
              <div className="space-y-3 pt-1">
                <h3 className="text-base font-black text-[#111827]">Print Table QR Codes</h3>
                <p className="text-[#6B7280] text-[11px] leading-relaxed font-semibold">
                  Configure dining tables in bulk and download custom print-ready QR codes mapped to each table.
                </p>
                <div className="text-[11px] font-black text-[#FF6B35] flex items-center gap-1 cursor-pointer hover:underline pt-1">
                  &gt; Generate QR Codes
                </div>
              </div>
            </div>

            {/* Arrow Badge 2 */}
            <div className="hidden md:flex w-8 h-8 rounded-full border border-[#EFEFEF] bg-white items-center justify-center text-[#FF6B35] shadow-xs self-center shrink-0">
              <span className="text-xs font-black">→</span>
            </div>

            {/* Step 3 */}
            <div className="bg-white border border-[#EFEFEF] rounded-3xl p-8 flex items-start gap-5 flex-1 relative shadow-[0_8px_30px_rgba(0,0,0,0.01)] hover:-translate-y-1 duration-300">
              {/* Floating numeric badge */}
              <div className="absolute -top-4 left-10 w-8 h-8 rounded-full bg-white border border-[#FFF7F2] text-[#FF6B35] font-black text-xs flex items-center justify-center shadow-[0_2px_10px_rgba(255,107,53,0.08)]">
                3
              </div>
              <div className="w-16 h-16 rounded-full bg-[#FFF7F2] text-[#FF6B35] flex items-center justify-center shrink-0">
                <TrendingUp className="w-7 h-7" />
              </div>
              <div className="space-y-3 pt-1">
                <h3 className="text-base font-black text-[#111827]">Track & Grow Sales</h3>
                <p className="text-[#6B7280] text-[11px] leading-relaxed font-semibold">
                  Customers scan QR code, view menu and order. Track active statistics on your dashboard layout.
                </p>
                <div className="text-[11px] font-black text-[#FF6B35] flex items-center gap-1 cursor-pointer hover:underline pt-1">
                  View Dashboard &gt;
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* Benefits Section (Interactive growth modules - 6 column cards layout matching reference) */}
        <section className="px-6 py-20 bg-[#FAFAFA] border-y border-[#EFEFEF] relative overflow-hidden">
          {/* Background composition matching reference */}
          <div className="absolute inset-0 pointer-events-none select-none z-0">
            {/* Concentric arcs bottom left */}
            <BottomLeftCurves className="absolute bottom-0 left-0 w-48 h-48" />
            {/* Dotted grid block bottom right */}
            <DotGrid className="absolute bottom-8 right-6" />
            {/* Dotted grid top left */}
            <DotGrid className="absolute top-8 left-6" />
            {/* Chef Hat doodle top left */}
            <ChefHatDoodle className="absolute top-16 left-12 w-14 h-14 text-[#FF6B35] opacity-[0.08] animate-float-y-rotate" />
            {/* Leaf doodle bottom right */}
            <LeafDoodle className="absolute bottom-16 right-16 w-12 h-12 text-[#FF6B35] opacity-[0.08] animate-float-y-slow" />
            {/* Fork & spoon bottom left */}
            <ForkSpoonDoodle className="absolute bottom-12 left-10 w-16 h-16 text-[#FF6B35] opacity-[0.08] animate-float-y" />
            
            {/* Sweeping curve line wave */}
            <svg className="absolute left-0 right-0 top-[20%] w-full h-[180px] text-[#FF6B35] opacity-[0.05]" fill="none" viewBox="0 0 1440 180" preserveAspectRatio="none">
              <path d="M-100,80 C320,160 680,20 1080,80 C1280,110 1480,160 1580,120" stroke="currentColor" strokeWidth="1.5" />
              <path d="M-100,110 C340,180 660,40 1060,100 C1260,130 1460,180 1560,140" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" />
            </svg>
          </div>
          
          <div className="max-w-7xl mx-auto space-y-16 relative z-10">
            
            {/* Section Header */}
            <div className="text-center space-y-2">
              <span className="text-[10px] font-extrabold text-[#FF6B35] bg-[#FFF7F2] px-3.5 py-1.5 rounded-full uppercase tracking-wider">Benefits</span>
              <h2 className="text-3.5xl font-black text-[#111827] tracking-tight">Interactive growth modules</h2>
              <p className="text-[#6B7280] text-xs max-w-md mx-auto font-semibold">All tools integrated seamlessly within your dashboard layout.</p>
            </div>

            {/* Grid of 6 modules */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5">
              {[
                {
                  title: "Create QR for Table",
                  desc: "Generate and download QR codes for your restaurant tables in one click.",
                  icon: <LayoutGrid className="w-4 h-4" />,
                  color: "text-[#FF6B35] bg-[#FFF7F2] border-[#FF6B35]/20 hover:border-[#FF6B35]"
                },
                {
                  title: "Recent Orders",
                  desc: "View and manage all incoming orders in real-time with smart status tracking.",
                  icon: <ShoppingBag className="w-4 h-4" />,
                  color: "text-[#16A34A] bg-[#16A34A]/5 border-[#16A34A]/20 hover:border-[#16A34A]"
                },
                {
                  title: "Top Selling Items",
                  desc: "Discover your best performing dishes and track revenue contributors.",
                  icon: <PieChart className="w-4 h-4" />,
                  color: "text-[#8B5CF6] bg-[#8B5CF6]/5 border-[#8B5CF6]/20 hover:border-[#8B5CF6]"
                },
                {
                  title: "Customer Insights",
                  desc: "Understand customer behavior, favorites, and repeat visit patterns.",
                  icon: <Users className="w-4 h-4" />,
                  color: "text-[#FF6B35] bg-[#FFF7F2] border-[#FF6B35]/20 hover:border-[#FF6B35]"
                },
                {
                  title: "Marketing & Offers",
                  desc: "Create campaigns, send offers and bring customers back to your restaurant.",
                  icon: <Megaphone className="w-4 h-4" />,
                  color: "text-[#3B82F6] bg-[#3B82F6]/5 border-[#3B82F6]/20 hover:border-[#3B82F6]"
                },
                {
                  title: "Analytics Overview",
                  desc: "Track sales, orders, peak hours and growth with beautiful analytics.",
                  icon: <LineChart className="w-4 h-4" />,
                  color: "text-[#EF4444] bg-[#EF4444]/5 border-[#EF4444]/20 hover:border-[#EF4444]"
                }
              ].map((card, idx) => (
                <div key={idx} className="bg-white border border-[#EFEFEF] rounded-2xl p-5 flex flex-col justify-between hover:shadow-xs hover:scale-[1.02] duration-300 transition-all cursor-pointer">
                  <div className="space-y-4">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 border ${card.color.split(' ')[2]} ${card.color.split(' ')[1]} ${card.color.split(' ')[0]}`}>
                      {card.icon}
                    </div>
                    <div className="space-y-2">
                      <h4 className="text-[11.5px] font-black text-[#111827] leading-tight">{card.title}</h4>
                      <p className="text-[#6B7280] text-[9.5px] leading-relaxed font-semibold">{card.desc}</p>
                    </div>
                  </div>
                  {/* Left aligned circle arrow */}
                  <div className="pt-5">
                    <div className={`w-6 h-6 rounded-full bg-white border border-[#EFEFEF] flex items-center justify-center shadow-2xs text-[9px] font-bold ${card.color.split(' ')[0]}`}>
                      →
                    </div>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* Human-focused Testimonials section */}
        <section className="px-6 py-24 max-w-6xl mx-auto relative overflow-hidden">
          
          {/* Background decorations for Testimonials */}
          <div className="absolute inset-0 pointer-events-none select-none z-0">
            {/* Dot grid top right */}
            <DotGrid className="absolute top-4 right-8" />
            {/* Concentric curves bottom right */}
            <BottomLeftCurves className="absolute bottom-[-10%] right-[-5%] w-56 h-56 transform rotate-[-90deg] text-[#FF6B35] opacity-10" />
            {/* Pizza doodle floating left */}
            <PizzaDoodle className="absolute top-[40%] left-4 w-10 h-10 text-[#FF6B35] opacity-[0.08] animate-float-y" />
            {/* Sparkle doodle floating right */}
            <SparkleDoodle className="absolute top-[60%] right-8 w-6 h-6 text-[#FF6B35] opacity-15 animate-float-y-slow" />
            {/* Concentric curves top left */}
            <BottomLeftCurves className="absolute top-[-10%] left-[-5%] w-48 h-48 text-[#FF6B35] opacity-[0.08]" />
          </div>

          <div className="text-center space-y-2 mb-16 relative z-10">
            <span className="text-[10px] font-extrabold text-[#FF6B35] bg-[#FFF7F2] px-3.5 py-1.5 rounded-full uppercase tracking-wider">Testimonials</span>
            <h2 className="text-3.5xl font-black text-[#111827] tracking-tight">Loved by modern restaurateurs</h2>
            <p className="text-[#6B7280] text-xs max-w-md mx-auto font-semibold">See how digital menus accelerate orders and delight dining guests.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 relative z-10">
            
            {/* Testimonial 1 */}
            <div className="bg-white border border-[#EFEFEF] rounded-3xl p-8 space-y-6 flex flex-col justify-between hover:border-[#FF6B35]/30 hover:shadow-[0_12px_30px_rgba(255,107,53,0.03)] hover:-translate-y-1 transition-all duration-300 cursor-pointer relative overflow-hidden group">
              {/* Huge background double quote symbol */}
              <span className="absolute right-6 top-4 text-7xl font-serif text-[#FF6B35]/5 select-none transition-colors duration-300 group-hover:text-[#FF6B35]/10">“</span>
              
              <div className="space-y-4">
                {/* 5 Stars */}
                <div className="flex gap-0.5 text-[#FF6B35]">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                  ))}
                </div>
                
                <p className="text-sm font-medium leading-relaxed text-[#111827] relative z-10 pr-4">
                  "Restreasy completely transformed our ordering workflow. Customers scan the QR, add drinks, and submit instantly. The interface looks like a premium custom-built app. Wait times decreased by 15 minutes per table!"
                </p>
              </div>
              
              <div className="flex items-center gap-3.5 pt-4 border-t border-[#EFEFEF]/60">
                <div className="w-10 h-10 rounded-full bg-[#FFF7F2] text-[#FF6B35] font-extrabold text-xs flex items-center justify-center border border-[#FF6B35]/10 shrink-0">
                  MC
                </div>
                <div>
                  <h4 className="text-xs font-black text-[#111827]">Marco Cassandro</h4>
                  <p className="text-[10px] text-[#6B7280] font-semibold">Owner, Pizza Palace Bistro</p>
                </div>
              </div>
            </div>

            {/* Testimonial 2 */}
            <div className="bg-white border border-[#EFEFEF] rounded-3xl p-8 space-y-6 flex flex-col justify-between hover:border-[#FF6B35]/30 hover:shadow-[0_12px_30px_rgba(255,107,53,0.03)] hover:-translate-y-1 transition-all duration-300 cursor-pointer relative overflow-hidden group">
              {/* Huge background double quote symbol */}
              <span className="absolute right-6 top-4 text-7xl font-serif text-[#FF6B35]/5 select-none transition-colors duration-300 group-hover:text-[#FF6B35]/10">“</span>
              
              <div className="space-y-4">
                {/* 5 Stars */}
                <div className="flex gap-0.5 text-[#FF6B35]">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                  ))}
                </div>
                
                <p className="text-sm font-medium leading-relaxed text-[#111827] relative z-10 pr-4">
                  "Configuring item availability (out-of-stock items) is real-time. If an item runs out, it fades on the menu instantly. The Stripe-like manager panels are exceptionally clean and simple for my managers to control."
                </p>
              </div>
              
              <div className="flex items-center gap-3.5 pt-4 border-t border-[#EFEFEF]/60">
                <div className="w-10 h-10 rounded-full bg-[#FFF7F2] text-[#FF6B35] font-extrabold text-xs flex items-center justify-center border border-[#FF6B35]/10 shrink-0">
                  AR
                </div>
                <div>
                  <h4 className="text-xs font-black text-[#111827]">Ananya Roy</h4>
                  <p className="text-[10px] text-[#6B7280] font-semibold">Manager, The Coffee Corner Cafe</p>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* Pricing Tiers - Apple style cards */}
        <section className="px-6 py-20 bg-[#FAFAFA] border-y border-[#EFEFEF] relative">
          <div className="absolute inset-0 bg-dot-grid opacity-[0.02] pointer-events-none" />
          
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16 space-y-2">
              <span className="text-[10px] font-extrabold text-[#FF6B35] bg-[#FFF7F2] px-3 py-1 rounded-full uppercase tracking-wider">Pricing</span>
              <h2 className="text-3xl font-extrabold text-[#111827] tracking-tight">Spacious, transparent pricing</h2>
              <p className="text-[#6B7280] text-xs font-semibold">Choose a plan that fits your growth. Switch plan tiers directly in the settings.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 items-stretch max-w-4xl mx-auto pt-2">
              
              {/* Pro Fixed */}
              <div className="bg-[#FFFFFF] border border-[#EFEFEF] rounded-2xl p-7 flex flex-col justify-between hover:border-slate-300 transition-colors shadow-[0_4px_20px_rgba(0,0,0,0.01)]">
                <div>
                  <span className="text-[9px] font-extrabold text-[#6B7280] uppercase tracking-wider bg-[#FAFAFA] border border-[#EFEFEF] px-2.5 py-0.5 rounded-lg">Pro Fixed</span>
                  <div className="flex flex-col mt-4">
                    <span className="text-3xl font-black text-[#111827]">₹999 + ₹15k</span>
                    <span className="text-slate-500 text-[10px] font-semibold mt-1">per month + setup fee</span>
                  </div>
                  <p className="text-[#6B7280] text-xs mt-3 leading-relaxed">Ideal for established cafes and dining rooms looking for flat pricing.</p>
                  <ul className="mt-8 space-y-3.5 text-xs text-[#111827] font-semibold">
                    <li className="flex items-center gap-2"><CheckIcon /> Up to 100 orders/day</li>
                    <li className="flex items-center gap-2"><CheckIcon /> Contactless QR Ordering</li>
                    <li className="flex items-center gap-2"><CheckIcon /> Basic Kitchen Display (KDS)</li>
                    <li className="flex items-center gap-2"><CheckIcon /> Zero-Wait UPI Payments</li>
                    <li className="flex items-center gap-2"><CheckIcon /> Email Support</li>
                  </ul>
                </div>
                <Link
                  href="/enquire"
                  className="mt-8 w-full bg-[#FAFAFA] hover:bg-[#FFF7F2] text-[#111827] hover:text-[#FF6B35] border border-[#EFEFEF] hover:border-[#FF6B35]/30 py-3 rounded-xl font-bold text-center text-xs transition-colors"
                >
                  Enquire Now
                </Link>
              </div>

              {/* Partner Share */}
              <div className="bg-[#FFFFFF] border-2 border-[#FF6B35] rounded-2xl p-7 flex flex-col justify-between relative shadow-[0_10px_30px_rgba(255,107,53,0.04)]">
                <div className="absolute top-0 right-6 -translate-y-1/2 bg-[#FF6B35] text-white text-[9px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                  Popular
                </div>
                <div>
                  <span className="text-[9px] font-extrabold text-[#FF6B35] uppercase tracking-wider bg-[#FFF7F2] px-2.5 py-0.5 rounded-lg">Partner Share</span>
                  <div className="flex flex-col mt-4">
                    <span className="text-3xl font-black text-[#111827]">₹2,999 + ₹25k</span>
                    <span className="text-slate-500 text-[10px] font-semibold mt-1">per month + setup fee</span>
                  </div>
                  <p className="text-[#6B7280] text-xs mt-3 leading-relaxed">Comes with unlimited dining tables and almost all premium features included.</p>
                  <ul className="mt-8 space-y-3.5 text-xs text-[#111827] font-semibold">
                    <li className="flex items-center gap-2"><CheckIcon /> Unlimited Orders</li>
                    <li className="flex items-center gap-2"><CheckIcon /> Advanced QR Branding</li>
                    <li className="flex items-center gap-2"><CheckIcon /> Smart Station Routing KDS</li>
                    <li className="flex items-center gap-2"><CheckIcon /> Frictionless OTP Login</li>
                    <li className="flex items-center gap-2"><CheckIcon /> Conversational AI Waiter</li>
                    <li className="flex items-center gap-2"><CheckIcon /> Semantic Taste Recommendations</li>
                    <li className="flex items-center gap-2"><CheckIcon /> Priority WhatsApp Support</li>
                  </ul>
                </div>
                <Link
                  href="/enquire"
                  className="mt-8 w-full bg-[#FF6B35] hover:bg-[#e05420] text-white py-3 rounded-xl font-bold text-center text-xs transition-colors shadow-2xs"
                >
                  Enquire Now
                </Link>
              </div>

              {/* Enterprise Suite */}
              <div className="bg-[#FFFFFF] border border-[#EFEFEF] rounded-2xl p-7 flex flex-col justify-between hover:border-slate-300 transition-colors shadow-[0_4px_20px_rgba(0,0,0,0.01)]">
                <div>
                  <span className="text-[9px] font-extrabold text-indigo-600 uppercase tracking-wider bg-indigo-50 border border-indigo-100 px-2.5 py-0.5 rounded-lg">Enterprise Suite</span>
                  <div className="flex flex-col mt-4">
                    <span className="text-3xl font-black text-[#111827]">Custom Pricing</span>
                    <span className="text-slate-500 text-[10px] font-semibold mt-1">tailored to your scale</span>
                  </div>
                  <p className="text-[#6B7280] text-xs mt-3 leading-relaxed">All-inclusive platform for hotels, chains, and large food courts.</p>
                  <ul className="mt-8 space-y-3.5 text-xs text-[#111827] font-semibold">
                    <li className="flex items-center gap-2"><CheckIcon /> Everything in Partner Share</li>
                    <li className="flex items-center gap-2"><CheckIcon /> Multi-location Dashboard</li>
                    <li className="flex items-center gap-2"><CheckIcon /> Centralized Cloud Kitchen</li>
                    <li className="flex items-center gap-2"><CheckIcon /> Predictive AI Inventory</li>
                    <li className="flex items-center gap-2"><CheckIcon /> 24/7 Dedicated Account Manager</li>
                    <li className="flex items-center gap-2"><CheckIcon /> Custom API Integrations</li>
                    <li className="flex items-center gap-2"><CheckIcon /> Custom Analytics Reports</li>
                  </ul>
                </div>
                <Link
                  href="/enquire"
                  className="mt-8 w-full bg-[#FAFAFA] hover:bg-[#FFF7F2] text-[#111827] hover:text-[#FF6B35] border border-[#EFEFEF] hover:border-[#FF6B35]/30 py-3 rounded-xl font-bold text-center text-xs transition-colors"
                >
                  Enquire Now
                </Link>
              </div>

            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-[#EFEFEF] bg-white pt-20 pb-12 w-full z-10 relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-6 gap-10">
            
            {/* Logo and Tagline Column */}
            <div className="col-span-2 space-y-4">
              <div className="flex items-center gap-2">
                <div className="bg-[#FF6B35] p-2 rounded-xl text-white">
                  <ForkSpoonDoodle className="w-4 h-4 text-white" />
                </div>
                <span className="font-extrabold text-base tracking-tight text-[#111827]">
                  Restreasy
                </span>
              </div>
              <p className="text-[#6B7280] text-[11px] leading-relaxed max-w-[240px] font-medium">
                The digital QR menu and restaurant growth platform built for modern hospitality and seamless table ordering.
              </p>
              <div className="flex gap-3 text-slate-400 text-xs font-semibold">
                <span className="hover:text-[#FF6B35] cursor-pointer transition-colors">Twitter</span>
                <span className="hover:text-[#FF6B35] cursor-pointer transition-colors">GitHub</span>
                <span className="hover:text-[#FF6B35] cursor-pointer transition-colors">LinkedIn</span>
              </div>
            </div>

            {/* Product Links */}
            <div className="space-y-3 col-span-1">
              <h4 className="text-[11px] font-extrabold text-[#111827] uppercase tracking-wider">Product</h4>
              <ul className="space-y-2 text-[11px] font-medium text-[#6B7280]">
                <li><Link href="/features" className="hover:text-[#FF6B35] transition-colors">Features</Link></li>
                <li><Link href="/pricing" className="hover:text-[#FF6B35] transition-colors">Pricing</Link></li>
                <li><Link href="/how-it-works" className="hover:text-[#FF6B35] transition-colors">How it Works</Link></li>
                <li><Link href="/live-demo" className="hover:text-[#FF6B35] transition-colors">Live Demo</Link></li>
              </ul>
            </div>

            {/* Company Links */}
            <div className="space-y-3 col-span-1">
              <h4 className="text-[11px] font-extrabold text-[#111827] uppercase tracking-wider">Company</h4>
              <ul className="space-y-2 text-[11px] font-medium text-[#6B7280]">
                <li><Link href="/about-us" className="hover:text-[#FF6B35] transition-colors">About Us</Link></li>
                <li><Link href="/careers" className="hover:text-[#FF6B35] transition-colors">Careers</Link></li>
                <li><Link href="/press-kit" className="hover:text-[#FF6B35] transition-colors">Press Kit</Link></li>
                <li><Link href="/contact" className="hover:text-[#FF6B35] transition-colors">Contact</Link></li>
              </ul>
            </div>

            {/* Resources Links */}
            <div className="space-y-3 col-span-1">
              <h4 className="text-[11px] font-extrabold text-[#111827] uppercase tracking-wider">Resources</h4>
              <ul className="space-y-2 text-[11px] font-medium text-[#6B7280]">
                <li><Link href="/help-center" className="hover:text-[#FF6B35] transition-colors">Help Center</Link></li>
                <li><Link href="/guides" className="hover:text-[#FF6B35] transition-colors">Guides</Link></li>
                <li><Link href="/api-status" className="hover:text-[#FF6B35] transition-colors">API Status</Link></li>
                <li><Link href="/blog" className="hover:text-[#FF6B35] transition-colors">Blog</Link></li>
              </ul>
            </div>

            {/* Legal Links */}
            <div className="space-y-3 col-span-1">
              <h4 className="text-[11px] font-extrabold text-[#111827] uppercase tracking-wider">Legal</h4>
              <ul className="space-y-2 text-[11px] font-medium text-[#6B7280]">
                <li><Link href="/privacy-policy" className="hover:text-[#FF6B35] transition-colors">Privacy Policy</Link></li>
                <li><Link href="/terms-of-service" className="hover:text-[#FF6B35] transition-colors">Terms of Service</Link></li>
                <li><Link href="/security" className="hover:text-[#FF6B35] transition-colors">Security</Link></li>
                <li><Link href="/compliance" className="hover:text-[#FF6B35] transition-colors">Compliance</Link></li>
              </ul>
            </div>

          </div>

          {/* Large Big Brand Name */}
          <div className="w-full text-center mt-20 pt-10 border-t border-[#EFEFEF] select-none">
            <div className="text-[10vw] font-black tracking-tighter text-[#111827] uppercase leading-none block">
              {"RESTREASY".split("").map((letter, index) => (
                <span 
                  key={index} 
                  className="inline-block opacity-[0.06] hover:opacity-100 hover:text-[#FF6B35] transition-all duration-300 cursor-pointer"
                >
                  {letter}
                </span>
              ))}
            </div>
          </div>

          {/* Copyright block */}
          <div className="flex flex-col sm:flex-row justify-between items-center mt-6 text-[10px] text-slate-400 font-semibold gap-2">
            <p>&copy; {new Date().getFullYear()} Tech Trend Go. All rights reserved.</p>
            <p className="flex items-center gap-1">Built with <span className="text-[#FF6B35]">♥</span> for restaurateurs everywhere.</p>
          </div>
          
        </div>
      </footer>
    </div>
  );
}

function CheckIcon() {
  return <ShieldCheck className="w-4 h-4 text-[#FF6B35] shrink-0" />;
}
