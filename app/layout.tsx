import Link from 'next/link';
import type { Metadata } from 'next';
import './globals.css';
import PageTransition from '@/components/PageTransition';

export const metadata: Metadata = {
  title: {
    template: '%s | Shochan Security App',
    default: 'Shochan Security App',
  },
  description: 'Shochan Next.js Web Application Security & Secure Coding',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="th" className="light">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&family=Sarabun:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen text-[#0F172A] flex flex-col antialiased relative selection:bg-[#069CD5] selection:text-white">
        
        {/* Over-The-Top Floating Ambient Particles & Glow Orbs */}
        <div className="fixed top-[-15%] left-[5%] w-[650px] h-[650px] bg-gradient-to-br from-[#069CD5]/30 via-[#52D9CB]/25 to-[#E0F2FE]/50 rounded-full blur-[140px] pointer-events-none z-0 animate-epic-glow-1" />
        <div className="fixed bottom-[0%] right-[0%] w-[700px] h-[700px] bg-gradient-to-tr from-[#52D9CB]/25 via-[#069CD5]/20 to-[#104887]/20 rounded-full blur-[160px] pointer-events-none z-0 animate-epic-glow-2" />

        {/* Sticky Light Mode Navbar */}
        <header className="sticky top-0 z-50 backdrop-blur-2xl bg-white/85 border-b border-[#069CD5]/25 shadow-md shadow-[#104887]/5">
          <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between gap-6 flex-wrap">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-11 h-11 rounded-2xl ocean-gradient-bg flex items-center justify-center font-black text-2xl text-white shadow-lg shadow-[#069CD5]/40 group-hover:rotate-12 group-hover:scale-110 transition-all duration-300">
                🌊
              </div>
              <span className="font-black text-2xl tracking-tight ocean-gradient-text drop-shadow-sm">
                Shochan Security App
              </span>
            </Link>

            <nav className="flex items-center gap-1.5 flex-wrap text-sm font-medium">
              <Link
                href="/"
                className="px-3.5 py-2 rounded-xl text-[#1E293B] hover:text-[#104887] hover:bg-[#069CD5]/10 transition-all font-semibold"
              >
                🏠 หน้าแรก
              </Link>
              <Link
                href="/about"
                className="px-3.5 py-2 rounded-xl text-[#1E293B] hover:text-[#104887] hover:bg-[#069CD5]/10 transition-all font-semibold"
              >
                ℹ️ เกี่ยวกับเรา
              </Link>
              <Link
                href="/blog1/1"
                className="px-3.5 py-2 rounded-xl text-[#1E293B] hover:text-[#104887] hover:bg-[#069CD5]/10 transition-all font-semibold"
              >
                📝 บล็อก
              </Link>
              <Link
                href="/contact"
                className="px-3.5 py-2 rounded-xl text-[#1E293B] hover:text-[#104887] hover:bg-[#069CD5]/10 transition-all font-semibold"
              >
                📬 ติดต่อเรา
              </Link>
              <Link
                href="/blog-spa"
                className="px-3.5 py-2 rounded-xl text-[#104887] bg-[#069CD5]/15 border border-[#069CD5]/30 hover:bg-[#069CD5]/25 transition-all font-bold shadow-sm"
              >
                🧩 Blog SPA
              </Link>
              <Link
                href="/login"
                className="px-4 py-2 rounded-xl ocean-button font-bold transition-all active:scale-95 cursor-pointer ml-2 shadow-md"
              >
                🔑 เข้าสู่ระบบ
              </Link>
              <Link
                href="/dashboard"
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#069CD5] via-[#52D9CB] to-[#069CD5] text-[#104887] font-extrabold shadow-md shadow-[#069CD5]/30 transition-all hover:scale-105 active:scale-95 cursor-pointer"
              >
                📊 Dashboard
              </Link>
            </nav>
          </div>
        </header>

        {/* Animated Page Content */}
        <main className="flex-1 max-w-7xl w-full mx-auto p-6 md:p-8 z-10">
          <PageTransition>{children}</PageTransition>
        </main>

        <footer className="border-t border-[#069CD5]/20 bg-white/80 backdrop-blur-xl py-6 text-center text-xs text-[#64748B] z-10 font-medium">
          <p>© 0214321 Web Application Security & Secure Coding • Shochan Edition ✨</p>
        </footer>
      </body>
    </html>
  );
}