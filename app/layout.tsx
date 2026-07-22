import Link from 'next/link';
import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata = {
  title: { template: '%s | My Blog',
            default: 'My Blog' },
  description: 'TypeScript Next.js',
};
export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="th">
      <body>
        <nav className="bg-gradient-to-r from-gray-900 to-gray-800 p-6 flex gap-8 items-center shadow-lg">
          <div className="text-white font-bold text-2xl">My App</div>
          <div className="flex gap-6 flex-1">
            <Link 
              href="/" 
              className="text-gray-300 hover:text-white font-semibold transition-colors"
            >
              🏠 Home
            </Link>
            <Link 
              href="/about" 
              className="text-gray-300 hover:text-white font-semibold transition-colors"
              title="เกี่ยวกับเรา"
            >
              ℹ️ About
            </Link>
            <Link 
              href="/blog1/1" 
              className="text-gray-300 hover:text-white font-semibold transition-colors"
              title="อ่านบทความ"
            >
              📝 Blog
            </Link>
            <Link 
              href="/courses/0214321" 
              className="text-gray-300 hover:text-white font-semibold transition-colors"
              title="ดูวิชาเรียน"
            >
              📚 Courses
            </Link>
            <Link 
              href="/posts" 
              className="text-gray-300 hover:text-white font-semibold transition-colors"
            >
              📰 Posts
            </Link>
            <Link 
              href="/blog-spa" 
              className="text-blue-400 hover:text-blue-300 font-semibold transition-colors bg-blue-900/50 px-3 py-1 rounded-lg border border-blue-700/50 flex items-center gap-1"
              title="Blog Aggregator SPA"
            >
              🧩 Blog SPA
            </Link>
          </div>
        </nav>
        <main>{children}</main>
      </body>
    </html>
  );
}