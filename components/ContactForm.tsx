'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

export default function ContactForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  function validate() {
    if (name.trim().length < 2) return 'กรุณากรอกชื่ออย่างน้อย 2 ตัวอักษร';
    if (!email.includes('@')) return 'รูปแบบอีเมลไม่ถูกต้อง';
    if (message.trim().length < 5) return 'ข้อความสั้นเกินไป (อย่างน้อย 5 ตัวอักษร)';
    return '';
  }

  const isValid =
    name.trim().length >= 2 &&
    email.includes('@') &&
    message.trim().length >= 5;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const msg = validate();
    if (msg) { setError(msg); return; }
    setError('');
    setStatus('sending');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message }),
      });

      if (!res.ok) { setStatus('error'); return; }
      setStatus('success');
      setName('');
      setEmail('');
      setMessage('');
    } catch {
      setStatus('error');
    }
  }

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      onSubmit={handleSubmit}
      className="space-y-5 w-full ocean-glass-panel p-8 rounded-3xl shadow-xl shadow-[#104887]/5 border border-[#069CD5]/20"
    >
      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-[#104887] mb-2">ชื่อ-นามสกุล</label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="เช่น สมชาย ใจดี"
          className="w-full px-4 py-3 rounded-xl bg-white border border-[#069CD5]/30 text-[#0F172A] placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#069CD5] transition-all font-medium text-sm shadow-inner"
        />
      </div>

      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-[#104887] mb-2">อีเมล</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="example@domain.com"
          className="w-full px-4 py-3 rounded-xl bg-white border border-[#069CD5]/30 text-[#0F172A] placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#069CD5] transition-all font-medium text-sm shadow-inner"
        />
      </div>

      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-[#104887] mb-2">ข้อความของคุณ</label>
        <textarea
          rows={4}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="พิมพ์ข้อความรายละเอียดติดต่อที่นี่ (อย่างน้อย 5 ตัวอักษร)..."
          className="w-full px-4 py-3 rounded-xl bg-white border border-[#069CD5]/30 text-[#0F172A] placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#069CD5] transition-all font-medium resize-none text-sm shadow-inner"
        />
      </div>

      {error && (
        <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-semibold flex items-center gap-2">
          <span>⚠️</span> {error}
        </div>
      )}

      <motion.button
        whileHover={isValid ? { scale: 1.02 } : {}}
        whileTap={isValid ? { scale: 0.98 } : {}}
        type="submit"
        disabled={!isValid}
        className={`w-full py-3.5 px-4 rounded-xl font-bold tracking-wide transition-all shadow-md text-sm ${
          isValid
            ? 'ocean-button cursor-pointer'
            : 'bg-slate-200 text-slate-400 border border-slate-300 cursor-not-allowed shadow-none'
        }`}
      >
        ส่งข้อความ
      </motion.button>

      {/* Status Messages */}
      {status === 'sending' && (
        <div className="p-3.5 rounded-xl bg-sky-50 border border-sky-200 text-[#104887] text-sm font-semibold flex items-center justify-center gap-2 animate-pulse">
          ⏳ กำลังส่งข้อมูลไปยังเซิร์ฟเวอร์...
        </div>
      )}
      {status === 'success' && (
        <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm font-semibold flex items-center justify-center gap-2">
          ✅ ส่งข้อความสำเร็จ ขอบคุณครับ/ค่ะ!
        </div>
      )}
      {status === 'error' && (
        <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-800 text-sm font-semibold flex items-center justify-center gap-2">
          ❌ ส่งไม่สำเร็จ ลองใหม่อีกครั้ง
        </div>
      )}
    </motion.form>
  );
}
