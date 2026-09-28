'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial={{ opacity: 0, scale: 0.86, rotateX: 12, y: 60, filter: 'blur(12px)' }}
        animate={{ opacity: 1, scale: 1, rotateX: 0, y: 0, filter: 'blur(0px)' }}
        exit={{ opacity: 0, scale: 0.9, rotateX: -12, y: -50, filter: 'blur(10px)' }}
        transition={{
          type: 'spring',
          stiffness: 240,
          damping: 19,
          mass: 0.65,
        }}
        style={{ transformOrigin: 'top center' }}
        className="w-full"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
