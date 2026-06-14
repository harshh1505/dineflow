import Link from 'next/link';
import { QrCode, ArrowLeft, ShieldCheck } from 'lucide-react';

interface InfoLayoutProps {
  title: string;
  subtitle: string;
  category: string;
  icon: any;
  accentColor: string;
  children: React.ReactNode;
}

export default function InfoLayout({
  title,
  subtitle,
  category,
  icon: Icon,
  accentColor,
  children,
}: InfoLayoutProps) {
  return (
    <div className="min-h-screen bg-[#FAFAFA] text-[#111827] antialiased selection:bg-[#FF6B35] selection:text-white font-sans flex flex-col justify-between">
      
      {/* Sticky Header */}
      <header className="bg-white border-b border-[#EFEFEF] w-full sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-6 py-4 flex justify-between items-center w-full">
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2 group cursor-pointer">
              <div className="bg-[#FF6B35] p-2 rounded-xl text-white transition-transform group-hover:scale-105 duration-200">
                <QrCode className="w-4 h-4 text-white" />
              </div>
              <span className="font-extrabold text-lg tracking-tight text-[#111827]">
                DineFlow
              </span>
            </Link>
            <div className="hidden min-[450px]:flex items-center self-center pl-3 border-l border-[#EFEFEF]">
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

          <Link
            href="/"
            className="text-slate-500 hover:text-[#FF6B35] text-xs font-bold transition-colors flex items-center gap-1.5"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </Link>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 w-full max-w-4xl mx-auto px-6 py-12 md:py-16">
        
        {/* Header Block */}
        <div className="border-b border-[#EFEFEF] pb-8 mb-10 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <span className="text-[9px] font-extrabold text-[#FF6B35] bg-[#FFF7F2] px-2.5 py-1 rounded-full uppercase tracking-wider">
              {category}
            </span>
            <h1 className="text-3xl font-black tracking-tight text-[#111827]">{title}</h1>
            <p className="text-slate-500 text-xs font-semibold leading-relaxed">{subtitle}</p>
          </div>
          <div className={`w-14 h-14 rounded-2xl border flex items-center justify-center shrink-0 ${accentColor} shadow-2xs`}>
            <Icon className="w-7 h-7" />
          </div>
        </div>

        {/* Dynamic Card Container */}
        <div className="bg-white border border-[#EFEFEF] rounded-2xl p-6 md:p-10 shadow-[0_8px_30px_rgba(0,0,0,0.01)] text-xs text-slate-650 space-y-8 font-medium leading-relaxed">
          {children}
        </div>

        {/* Bottom CTA Banner */}
        <div className="mt-12 text-center p-8 bg-white border border-[#EFEFEF] rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-6 shadow-[0_4px_20px_rgba(0,0,0,0.01)] animate-pulse-slow">
          <div className="text-left space-y-1">
            <h4 className="font-black text-[#111827] text-sm">Ready to deploy digital QR menus?</h4>
            <p className="text-slate-500 font-semibold">Request a demo setup, we will configure the tables for you.</p>
          </div>
          <Link href="/enquire" className="bg-[#FF6B35] hover:bg-[#e05420] text-white font-bold py-2.5 px-6 rounded-xl transition-all duration-300 text-xs shadow-2xs hover:shadow-md hover:-translate-y-0.5 shrink-0 block">
            Submit Custom Request
          </Link>
        </div>

      </main>

      {/* Footer Block */}
      <footer className="border-t border-[#EFEFEF] bg-white py-8 w-full">
        <div className="max-w-4xl mx-auto px-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-[10px] text-slate-400 font-semibold">
          <p>&copy; {new Date().getFullYear()} Tech Trend Go. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="/privacy-policy" className="hover:text-[#FF6B35]">Privacy</Link>
            <Link href="/terms-of-service" className="hover:text-[#FF6B35]">Terms</Link>
            <Link href="/contact" className="hover:text-[#FF6B35]">Contact</Link>
          </div>
        </div>
      </footer>

    </div>
  );
}
