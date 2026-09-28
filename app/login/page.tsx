'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

export default function LoginPage() {
  const router = useRouter();
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleQuickLogin = async (userEmail: string) => {
    setEmail(userEmail);
    setPassword('1234');
    setSubmitting(true);
    setError('');

    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: userEmail, password: '1234' }),
      });

      if (!res.ok) {
        setError('เข้าสู่ระบบไม่สำเร็จ');
        return;
      }

      router.push('/dashboard');
    } catch {
      setError('เกิดข้อผิดพลาดในการเชื่อมต่อเซิร์ฟเวอร์');
    } finally {
      setSubmitting(false);
    }
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setSuccessMsg('');
    setSubmitting(true);

    const endpoint = mode === 'login' ? '/api/login' : '/api/register';

    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || (mode === 'login' ? 'เข้าสู่ระบบไม่สำเร็จ' : 'สมัครสมาชิกไม่สำเร็จ'));
        return;
      }

      if (mode === 'register') {
        setSuccessMsg('สมัครสมาชิกสำเร็จแล้ว! กำลังพาท่านไปที่ Dashboard...');
        setTimeout(() => {
          router.push('/dashboard');
        }, 1500);
      } else {
        router.push('/dashboard');
      }
    } catch {
      setError('เกิดข้อผิดพลาดในการเชื่อมต่อเซิร์ฟเวอร์');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="py-12 flex flex-col justify-center items-center min-h-[75vh]">
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.35 }}
        className="w-full max-w-lg ocean-glass-panel p-8 rounded-3xl shadow-xl shadow-[#104887]/5 border border-[#069CD5]/20 space-y-6"
      >
        {/* Header */}
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[#069CD5]/15 text-[#104887] border border-[#069CD5]/30 text-3xl mb-3 shadow-sm">
            🔐
          </div>
          <h1 className="text-3xl font-black tracking-tight ocean-gradient-text">
            {mode === 'login' ? 'เข้าสู่ระบบ (Login)' : 'ลงทะเบียนผู้ใช้ใหม่ (Register)'}
          </h1>
          <p className="text-sm text-slate-500 mt-1 font-medium">
            {mode === 'login' ? 'ยินดีต้อนรับกลับเข้าสู่ระบบจัดการข้อมูล' : 'สร้างบัญชีผู้ใช้ใหม่สำหรับทดสอบ Authorization'}
          </p>
        </div>

        {/* Tab Selector */}
        <div className="flex bg-slate-100 p-1.5 rounded-2xl border border-[#069CD5]/20">
          <button
            type="button"
            onClick={() => { setMode('login'); setError(''); setSuccessMsg(''); }}
            className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              mode === 'login'
                ? 'bg-gradient-to-r from-[#104887] to-[#069CD5] text-white shadow-md'
                : 'text-slate-600 hover:text-[#104887]'
            }`}
          >
            เข้าสู่ระบบ (Login)
          </button>
          <button
            type="button"
            onClick={() => { setMode('register'); setError(''); setSuccessMsg(''); }}
            className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              mode === 'register'
                ? 'bg-gradient-to-r from-[#104887] to-[#069CD5] text-white shadow-md'
                : 'text-slate-600 hover:text-[#104887]'
            }`}
          >
            สมัครสมาชิกใหม่ (Register)
          </button>
        </div>

        {/* Quick Test Users Selection */}
        <div className="bg-sky-50/80 p-4 rounded-2xl border border-[#069CD5]/20 space-y-2">
          <span className="text-[11px] font-extrabold text-[#104887] uppercase tracking-wider block">
            ⚡ ทางด่วนทดสอบ (Quick Login): รหัสผ่านคือ <code className="text-[#069CD5] font-mono">1234</code> ทุกไอดี
          </span>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => handleQuickLogin('admin@tsu.ac.th')}
              className="bg-white hover:bg-sky-100 border border-[#069CD5]/30 text-left p-2.5 rounded-xl text-xs transition-all flex flex-col cursor-pointer hover:border-[#069CD5] shadow-xs"
            >
              <span className="font-extrabold text-[#104887]">👑 Admin</span>
              <span className="text-[10px] text-[#069CD5] font-mono font-semibold">admin@tsu.ac.th</span>
            </button>
            <button
              type="button"
              onClick={() => handleQuickLogin('alice@tsu.ac.th')}
              className="bg-white hover:bg-sky-100 border border-[#069CD5]/30 text-left p-2.5 rounded-xl text-xs transition-all flex flex-col cursor-pointer hover:border-[#069CD5] shadow-xs"
            >
              <span className="font-extrabold text-[#104887]">👩 Alice</span>
              <span className="text-[10px] text-[#069CD5] font-mono font-semibold">alice@tsu.ac.th</span>
            </button>
            <button
              type="button"
              onClick={() => handleQuickLogin('bob@tsu.ac.th')}
              className="bg-white hover:bg-sky-100 border border-[#069CD5]/30 text-left p-2.5 rounded-xl text-xs transition-all flex flex-col cursor-pointer hover:border-[#069CD5] shadow-xs"
            >
              <span className="font-extrabold text-[#104887]">👨 Bob</span>
              <span className="text-[10px] text-[#069CD5] font-mono font-semibold">bob@tsu.ac.th</span>
            </button>
            <button
              type="button"
              onClick={() => handleQuickLogin('charlie@tsu.ac.th')}
              className="bg-white hover:bg-sky-100 border border-[#069CD5]/30 text-left p-2.5 rounded-xl text-xs transition-all flex flex-col cursor-pointer hover:border-[#069CD5] shadow-xs"
            >
              <span className="font-extrabold text-[#104887]">👦 Charlie</span>
              <span className="text-[10px] text-[#069CD5] font-mono font-semibold">charlie@tsu.ac.th</span>
            </button>
          </div>
        </div>

        {/* Login / Register Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#104887] mb-2">อีเมลผู้ใช้</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="example@tsu.ac.th"
              className="w-full px-4 py-3 rounded-xl bg-white border border-[#069CD5]/30 text-[#0F172A] placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#069CD5] transition-all font-medium text-sm shadow-inner"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#104887] mb-2">
              รหัสผ่าน {mode === 'register' && '(อย่างน้อย 4 ตัวอักษร)'}
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="1234"
              className="w-full px-4 py-3 rounded-xl bg-white border border-[#069CD5]/30 text-[#0F172A] placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#069CD5] transition-all font-medium text-sm shadow-inner"
              required
            />
          </div>

          {error && (
            <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm font-semibold flex items-center gap-2">
              <span>⚠️</span> {error}
            </div>
          )}

          {successMsg && (
            <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm font-semibold flex items-center gap-2">
              <span>✅</span> {successMsg}
            </div>
          )}

          <motion.button
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={submitting}
            className="w-full py-3.5 px-4 rounded-xl ocean-button font-bold tracking-wide transition-all cursor-pointer shadow-md"
          >
            {submitting ? 'กำลังดำเนินการ...' : mode === 'login' ? 'เข้าสู่ระบบ' : 'สมัครสมาชิกใหม่'}
          </motion.button>
        </form>
      </motion.div>
    </main>
  );
}
