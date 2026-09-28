'use client';

import { useState } from 'react';

export default function PriceCalculator() {
  const [quantity, setQuantity] = useState(1);
  const pricePerItem = 150;
  const total = quantity * pricePerItem; // ← คำนวณสด ไม่ใช่ state

  return (
    <div className="bg-white p-6 rounded-xl shadow border max-w-md">
      <h3 className="text-xl font-bold mb-4">🧮 Live Price Calculator</h3>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">จำนวนสินค้า (ชิ้นละ {pricePerItem} บาท):</label>
          <input
            type="number"
            value={quantity}
            min={1}
            onChange={(e) => setQuantity(Number(e.target.value))}
            className="border p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <p className="text-lg font-bold text-blue-600">
          ราคารวม: {total.toLocaleString()} บาท
        </p>
      </div>
    </div>
  );
}
