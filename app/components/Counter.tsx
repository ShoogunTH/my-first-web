// components/Counter.tsx
'use client';
import { useState } from 'react';
export default function Counter() {
  const [n, setN] =
    useState<number>(0);
  return (
    <button
      onClick={() => setN(c => c+1)}
      className="px-4 py-2 bg-blue-500
                 text-white rounded">
      Count: {n}
    </button>
  );
}