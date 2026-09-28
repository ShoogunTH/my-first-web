'use client';

import { useState } from 'react';

export default function PriceCalculator() {
  const [quantity, setQuantity] = useState(1);
  const pricePerItem = 150;
  const total = quantity * pricePerItem; // ← คำนวณสด ไม่ใช่ state

  return (
    <div className="py-8 max-w-xl mx-auto flex flex-col items-center">
      <div className="text-center mb-8">
        <span className="text-xs uppercase tracking-widest text-indigo-400 font-bold bg-indigo-950/80 px-3 py-1 rounded-full border border-indigo-800/80">
          Derived State Demo
        </span>
        <h1 className="text-3xl font-extrabold tracking-tight mt-3 bg-gradient-to-r from-white via-slate-200 to-indigo-300 bg-clip-text text-transparent">
          🧮 Live Price Calculator
        </h1>
        <p className="text-slate-400 text-sm mt-2">
          คำนวณราคารวมแบบเรียลไทม์โดยใช้ Derived State จาก React
        </p>
      </div>

      <div className="w-full bg-slate-900/90 backdrop-blur-2xl text-slate-100 p-8 rounded-3xl shadow-2xl shadow-indigo-950/40 border border-slate-800/80 space-y-6">
        <div className="flex justify-between items-center bg-slate-950/60 p-4 rounded-2xl border border-slate-800/60">
          <span className="text-sm font-semibold text-slate-300">ราคาต่อชิ้น</span>
          <span className="text-lg font-bold text-indigo-400">{pricePerItem.toLocaleString()} บาท</span>
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
            จำนวนสินค้า (ชิ้น)
          </label>
          <input
            type="number"
            value={quantity}
            min={1}
            onChange={(e) => setQuantity(Number(e.target.value))}
            className="w-full px-4 py-3 rounded-xl bg-slate-950/80 border border-slate-700/80 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all font-bold text-lg"
          />
        </div>

        <div className="bg-gradient-to-r from-indigo-950/90 to-purple-950/90 p-6 rounded-2xl border border-indigo-500/30 text-center shadow-lg">
          <span className="text-xs uppercase tracking-widest text-indigo-300 font-bold">ราคารวมทั้งหมด</span>
          <p className="text-4xl font-extrabold text-white mt-1">
            {total.toLocaleString()} <span className="text-xl font-medium text-indigo-200">บาท</span>
          </p>
        </div>
      </div>
    </div>
  );
}
