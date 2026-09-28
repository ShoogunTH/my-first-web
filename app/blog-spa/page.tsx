'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import type { ExternalItem } from '@/lib/external';

function BlogSpaContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // อ่านค่าเริ่มต้นจาก URL Query Parameters
  const initialSource = searchParams.get('source') === 'news' ? 'news' : 'products';
  const initialQuery = searchParams.get('q') || '';
  const initialDetail = searchParams.get('detail') || null;

  const [source, setSource] = useState<'products' | 'news'>(initialSource);
  const [searchQuery, setSearchQuery] = useState<string>(initialQuery);
  const [selectedId, setSelectedId] = useState<string | null>(initialDetail);
  const [items, setItems] = useState<ExternalItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>([]);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // ฟังก์ชัน helper อัปเดต URL state
  const updateUrlState = (
    newSource: 'products' | 'news',
    newQuery: string,
    newDetail: string | null
  ) => {
    const params = new URLSearchParams();
    params.set('source', newSource);
    if (newQuery.trim()) {
      params.set('q', newQuery);
    }
    if (newDetail) {
      params.set('detail', newDetail);
    }
    router.replace(`/blog-spa?${params.toString()}`);
  };

  // โหลดข้อมูลเมื่อ source เปลี่ยน
  useEffect(() => {
    setIsLoading(true);
    fetch(`/api/aggregate?source=${source}`)
      .then((r) => r.json())
      .then((data: { external: ExternalItem[] }) => {
        setItems(data.external);
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
      });
  }, [source]);

  // เปลี่ยน source (Tab)
  const handleSourceChange = (newSource: 'products' | 'news') => {
    setSource(newSource);
    updateUrlState(newSource, searchQuery, selectedId);
  };

  // เปลี่ยนคำค้นหา (Real-time Search)
  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    updateUrlState(source, query, selectedId);
  };

  // เปิด Modal รายละเอียด
  const handleOpenDetail = (id: string) => {
    setSelectedId(id);
    updateUrlState(source, searchQuery, id);
  };

  // ปิด Modal
  const handleCloseDetail = () => {
    setSelectedId(null);
    updateUrlState(source, searchQuery, null);
  };

  // ระบบบันทึก (Bookmark)
  const toggleBookmark = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (bookmarkedIds.includes(id)) {
      setBookmarkedIds(bookmarkedIds.filter((item) => item !== id));
      showToast('ยกเลิกการบันทึกเรียบร้อย');
    } else {
      setBookmarkedIds([...bookmarkedIds, id]);
      showToast('บันทึกรายการเรียบร้อย! ⭐️');
    }
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // กรองรายการฝั่ง Client (Real-time Search)
  const filteredItems = items.filter((item) => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return true;
    return (
      item.title.toLowerCase().includes(q) ||
      (item.subtitle && item.subtitle.toLowerCase().includes(q))
    );
  });

  const selectedItem = items.find((item) => item.id === selectedId);

  return (
    <main className="p-8 max-w-5xl mx-auto min-h-screen relative">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 bg-slate-800 text-white px-4 py-2 rounded-lg shadow-lg z-50 animate-bounce">
          {toastMessage}
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold text-blue-900">
            🧩 Blog Aggregator (SPA)
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            ระบบรวบรวมข้อมูลแบบ Single Page Application ไม่มีการ Reload หน้าเว็บ
          </p>
        </div>

        {/* Bookmark Counter Badge */}
        <div className="bg-blue-50 text-blue-800 border border-blue-200 px-3 py-1.5 rounded-full text-sm font-medium self-start md:self-auto">
          ⭐️ บันทึกไว้: {bookmarkedIds.length} รายการ
        </div>
      </div>

      {/* Control Bar: Categories & Search Box */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6 items-stretch sm:items-center justify-between bg-white p-4 rounded-xl shadow-sm border border-gray-100">
        {/* Category Buttons */}
        <div className="flex gap-2">
          <button
            onClick={() => handleSourceChange('products')}
            className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-all ${
              source === 'products'
                ? 'bg-blue-600 text-white shadow-md shadow-blue-200'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            🛍️ Products
          </button>
          <button
            onClick={() => handleSourceChange('news')}
            className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-all ${
              source === 'news'
                ? 'bg-blue-600 text-white shadow-md shadow-blue-200'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            📰 News
          </button>
        </div>

        {/* Feature 1: Real-time Search Box */}
        <div className="relative flex-1 sm:max-w-xs">
          <input
            type="text"
            placeholder="🔍 ค้นหาในหมวดนี้..."
            value={searchQuery}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="w-full pl-9 pr-8 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <span className="absolute left-3 top-2.5 text-gray-400 text-sm">🔍</span>
          {searchQuery && (
            <button
              onClick={() => handleSearchChange('')}
              className="absolute right-2.5 top-2 text-gray-400 hover:text-gray-600 text-sm"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* Items Section */}
      {isLoading ? (
        <div className="text-center py-16 bg-white rounded-xl border border-gray-100">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-blue-600 border-t-transparent mb-3"></div>
          <p className="text-gray-500 text-sm">กำลังโหลดข้อมูลล่าสุด...</p>
        </div>
      ) : filteredItems.length === 0 ? (
        /* Feature 3: Empty State Handling */
        <div className="text-center py-16 bg-white rounded-xl border border-dashed border-gray-300 p-8">
          <div className="text-5xl mb-3">🔍</div>
          <h3 className="text-lg font-semibold text-gray-800 mb-1">
            ไม่พบข้อมูลที่ตรงกับคำค้นหา &quot;{searchQuery}&quot;
          </h3>
          <p className="text-gray-500 text-sm mb-4">
            ลองค้นหาด้วยคำอื่น หรือกดล้างการค้นหาเพื่อดูรายการทั้งหมด
          </p>
          <button
            onClick={() => handleSearchChange('')}
            className="px-4 py-2 bg-blue-50 text-blue-600 rounded-lg text-sm font-medium hover:bg-blue-100 transition-colors"
          >
            ล้างการค้นหา (Clear Search)
          </button>
        </div>
      ) : (
        /* Items Grid */
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredItems.map((item) => {
            const isBookmarked = bookmarkedIds.includes(item.id);
            return (
              <div
                key={item.id}
                onClick={() => handleOpenDetail(item.id)}
                className="p-5 bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md hover:border-blue-200 transition-all cursor-pointer flex flex-col justify-between group"
              >
                <div>
                  {item.image && (
                    <div className="w-full h-40 mb-3 bg-gray-50 rounded-lg overflow-hidden flex items-center justify-center p-2">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="h-full object-contain group-hover:scale-105 transition-transform"
                      />
                    </div>
                  )}
                  <div className="flex items-start justify-between gap-2">
                    <h2 className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2">
                      {item.title}
                    </h2>
                    <button
                      onClick={(e) => toggleBookmark(item.id, e)}
                      title={isBookmarked ? 'ยกเลิกการบันทึก' : 'บันทึกรายการ'}
                      className="text-lg hover:scale-125 transition-transform p-1"
                    >
                      {isBookmarked ? '⭐️' : '☆'}
                    </button>
                  </div>
                  <p className="text-gray-500 text-sm mt-1">{item.subtitle}</p>
                </div>

                <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-xs text-blue-600 font-medium">
                  <span>กดเพื่อดูรายละเอียดเพิ่มเติม ➔</span>
                  <span className="text-gray-400">ID: {item.id}</span>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Feature 2: Modal Detail View Popup */}
      {selectedItem && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={handleCloseDetail}
        >
          <div
            className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl relative animate-in fade-in zoom-in duration-150"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={handleCloseDetail}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center font-bold"
            >
              ✕
            </button>

            <div className="inline-block px-2.5 py-1 rounded bg-blue-50 text-blue-700 text-xs font-semibold uppercase mb-3">
              {source} Detail
            </div>

            {selectedItem.image && (
              <div className="w-full h-48 bg-gray-50 rounded-xl mb-4 p-4 flex items-center justify-center">
                <img
                  src={selectedItem.image}
                  alt={selectedItem.title}
                  className="h-full object-contain"
                />
              </div>
            )}

            <h2 className="text-xl font-bold text-gray-900 mb-2">
              {selectedItem.title}
            </h2>
            <p className="text-gray-600 text-sm mb-4">{selectedItem.subtitle}</p>

            <div className="bg-gray-50 p-4 rounded-xl mb-4 text-xs text-gray-600 space-y-1">
              <div><strong className="text-gray-800">Item ID:</strong> {selectedItem.id}</div>
              <div><strong className="text-gray-800">Source:</strong> {source}</div>
              <div><strong className="text-gray-800">Status:</strong> โหลดข้อมูลแบบ Client-Side SPA เรียบร้อย</div>
            </div>

            {/* Feature Action Buttons (Coming Soon Page Navigation / Action) */}
            <div className="flex gap-2">
              <button
                onClick={() => {
                  showToast('🔗 ปุ่มไปยังหน้ารายละเอียดฉบับเต็ม (กำลังพัฒนา / Coming Soon)!');
                }}
                className="flex-1 py-2.5 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors shadow-sm"
              >
                🔗 อ่านเนื้อหาเต็ม (ยังไม่ได้ทำ)
              </button>
              <button
                onClick={handleCloseDetail}
                className="px-4 py-2.5 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors"
              >
                ปิด
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

export default function BlogSpaPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-gray-500">กำลังโหลดระบบ...</div>}>
      <BlogSpaContent />
    </Suspense>
  );
}