'use client';

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import ContactForm from "@/components/ContactForm";
import PriceCalculator from "@/components/PriceCalculator";

export default function Home() {
  return (
    <main className="py-6 space-y-12 max-w-5xl mx-auto">
      {/* Profile Card */}
      <motion.section
        initial={{ opacity: 0, scale: 0.9, rotateX: 10 }}
        animate={{ opacity: 1, scale: 1, rotateX: 0 }}
        transition={{ type: 'spring', stiffness: 200, damping: 18 }}
        className="ocean-glass-panel ocean-glass-hover rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row border border-[#069CD5]/30 relative group"
      >
        <div className="md:w-2/5 bg-gradient-to-br from-white via-sky-50 to-[#E0F2FE] p-8 flex flex-col items-center justify-center text-[#104887] relative border-b md:border-b-0 md:border-r border-[#069CD5]/20">
          <motion.div 
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ type: 'spring', stiffness: 300 }}
            className="w-44 h-44 rounded-full bg-white p-1.5 border-4 border-[#069CD5]/60 overflow-hidden shadow-2xl mb-5 relative group cursor-pointer"
          >
            <Image 
              src="/images/s.jpg" 
              alt="Profile Photo"
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-300"
              onError={(e) => {
                (e.target as HTMLImageElement).src = "https://ui-avatars.com/api/?name=Shochan&background=069cd5&color=fff&size=200";
              }}
            />
          </motion.div>
          <h1 className="text-4xl font-black text-center tracking-tight ocean-gradient-text">
            Shochan
          </h1>
          <h2 className="text-xl font-bold text-center text-[#069CD5] mb-3">
            Seangarthit
          </h2>
          <motion.span 
            whileHover={{ scale: 1.08 }}
            className="bg-[#104887] text-[#F4F0DE] py-1.5 px-5 rounded-full text-xs font-black tracking-widest uppercase shadow-md animate-bounce"
          >
            ✨ NICKNAME: SHOCHAN ✨
          </motion.span>
        </div>

        <div className="md:w-3/5 p-8 flex flex-col justify-center space-y-6 bg-white/80">
          <div>
            <span className="text-xs font-extrabold uppercase tracking-widest text-[#104887]">Student ID</span>
            <p className="text-2xl font-black text-[#104887] mt-1 font-mono tracking-wider">6720210080</p>
          </div>
          <hr className="border-[#069CD5]/20" />
          <div>
            <span className="text-xs font-extrabold uppercase tracking-widest text-[#104887]">Life Goal</span>
            <p className="text-[#334155] leading-relaxed italic mt-1 font-medium bg-sky-50/80 p-4 rounded-2xl border border-[#069CD5]/20 shadow-xs">
              &quot;To become an expert full-stack developer and create applications that positively impact people&apos;s lives while continuously learning and growing.&quot;
            </p>
          </div>
          <div>
            <span className="text-xs font-extrabold uppercase tracking-widest text-[#104887]">Hobbies & Interests</span>
            <div className="flex flex-wrap gap-2 mt-2">
              <span className="bg-sky-100 text-[#104887] border border-[#069CD5]/30 px-3.5 py-1.5 rounded-full text-xs font-bold shadow-xs">🎮 Gaming (Fate, Dark Souls)</span>
              <span className="bg-sky-100 text-[#104887] border border-[#069CD5]/30 px-3.5 py-1.5 rounded-full text-xs font-bold shadow-xs">🦸‍♂️ Comics (DC Universe)</span>
              <span className="bg-sky-100 text-[#104887] border border-[#069CD5]/30 px-3.5 py-1.5 rounded-full text-xs font-bold shadow-xs">💻 Coding</span>
              <span className="bg-sky-100 text-[#104887] border border-[#069CD5]/30 px-3.5 py-1.5 rounded-full text-xs font-bold shadow-xs">🎬 Movies</span>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Navigation & Lab Demos */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="ocean-glass-panel p-8 rounded-3xl space-y-6"
      >
        <div className="flex items-center gap-3 border-b border-[#069CD5]/20 pb-4">
          <div className="w-12 h-12 rounded-2xl ocean-gradient-bg text-white border border-[#069CD5]/40 flex items-center justify-center text-2xl font-bold shadow-md">
            ⚡
          </div>
          <div>
            <h2 className="text-2xl font-black text-[#104887] tracking-tight">
              Shochan Lab Navigation & Security Demos
            </h2>
            <p className="text-xs text-slate-500 font-medium">ลิงก์เข้าสู่การทดสอบความปลอดภัยและการทำงานแต่ละระบบ</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <motion.div whileHover={{ scale: 1.05, y: -5 }} transition={{ type: 'spring', stiffness: 300 }}>
            <Link
              href="/contact"
              className="p-5 bg-white hover:bg-sky-50 text-[#104887] font-extrabold rounded-2xl transition-all border border-[#069CD5]/30 hover:border-[#069CD5] shadow-md flex flex-col items-center justify-center text-center gap-2 group h-full"
            >
              <span className="text-3xl group-hover:scale-125 transition-transform duration-300">📬</span>
              <span className="text-sm">Contact Form</span>
              <span className="text-xs font-mono text-slate-400">/contact</span>
            </Link>
          </motion.div>

          <motion.div whileHover={{ scale: 1.05, y: -5 }} transition={{ type: 'spring', stiffness: 300 }}>
            <Link
              href="/calculator"
              className="p-5 bg-white hover:bg-sky-50 text-[#104887] font-extrabold rounded-2xl transition-all border border-[#069CD5]/30 hover:border-[#069CD5] shadow-md flex flex-col items-center justify-center text-center gap-2 group h-full"
            >
              <span className="text-3xl group-hover:scale-125 transition-transform duration-300">🧮</span>
              <span className="text-sm">Calculator</span>
              <span className="text-xs font-mono text-slate-400">/calculator</span>
            </Link>
          </motion.div>

          <motion.div whileHover={{ scale: 1.05, y: -5 }} transition={{ type: 'spring', stiffness: 300 }}>
            <Link
              href="/login"
              className="p-5 bg-white hover:bg-sky-50 text-[#104887] font-extrabold rounded-2xl transition-all border border-[#069CD5]/30 hover:border-[#069CD5] shadow-md flex flex-col items-center justify-center text-center gap-2 group h-full"
            >
              <span className="text-3xl group-hover:scale-125 transition-transform duration-300">🔑</span>
              <span className="text-sm">Login & Register</span>
              <span className="text-xs font-mono text-slate-400">/login</span>
            </Link>
          </motion.div>

          <motion.div whileHover={{ scale: 1.05, y: -5 }} transition={{ type: 'spring', stiffness: 300 }}>
            <Link
              href="/dashboard"
              className="p-5 bg-white hover:bg-sky-50 text-[#104887] font-extrabold rounded-2xl transition-all border border-[#069CD5]/30 hover:border-[#069CD5] shadow-md flex flex-col items-center justify-center text-center gap-2 group h-full"
            >
              <span className="text-3xl group-hover:scale-125 transition-transform duration-300">📊</span>
              <span className="text-sm">Protected Dashboard</span>
              <span className="text-xs font-mono text-slate-400">/dashboard</span>
            </Link>
          </motion.div>
        </div>
      </motion.section>

      {/* Direct Interactive Preview Section */}
      <section className="space-y-6">
        <h2 className="text-2xl font-black text-[#104887] tracking-tight flex items-center gap-2">
          <span>⚡</span> Shochan Interactive Components
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          <div className="space-y-3">
            <h3 className="text-sm font-bold uppercase tracking-wider text-[#104887] flex items-center gap-2">
              <span>📬</span> ContactForm Component
            </h3>
            <ContactForm />
          </div>
          <div className="space-y-3">
            <h3 className="text-sm font-bold uppercase tracking-wider text-[#104887] flex items-center gap-2">
              <span>🧮</span> PriceCalculator Component
            </h3>
            <PriceCalculator />
          </div>
        </div>
      </section>
    </main>
  );
}
