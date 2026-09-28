'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

export interface MessageItem {
  id: string;
  name: string;
  email: string;
  message: string;
  authorId: string | null;
  createdAt: string | Date;
}

export interface CommentItem {
  id: string;
  postId: string;
  author: string;
  authorId: string | null;
  text: string;
  createdAt: string | Date;
}

export interface UserSession {
  id: string;
  email: string;
}

interface DashboardClientProps {
  initialMessages: MessageItem[];
}

export default function DashboardClient({ initialMessages }: DashboardClientProps) {
  const router = useRouter();
  const [messages, setMessages] = useState<MessageItem[]>(initialMessages);
  const [user, setUser] = useState<UserSession | null>(null);
  const [loadingUser, setLoadingUser] = useState(true);

  // Comments map indexed by message.id
  const [commentsMap, setCommentsMap] = useState<Record<string, CommentItem[]>>({});
  const [replyInputs, setReplyInputs] = useState<Record<string, string>>({});
  const [submittingReply, setSubmittingReply] = useState<Record<string, boolean>>({});

  // Editing state for messages
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editMessageText, setEditMessageText] = useState('');
  const [isSubmittingEdit, setIsSubmittingEdit] = useState(false);

  // Global Toast / Alert message for notifications
  const [toast, setToast] = useState<{ type: 'error' | 'success' | 'info'; message: string } | null>(null);

  // Fetch logged-in user profile
  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await fetch('/api/me');
        if (res.ok) {
          const data = await res.json();
          setUser(data.user);
        }
      } catch (err) {
        console.error('Failed to fetch user session:', err);
      } finally {
        setLoadingUser(false);
      }
    }
    fetchUser();
  }, []);

  // Fetch comments for all messages
  const fetchCommentsForMessage = async (messageId: string) => {
    try {
      const res = await fetch(`/api/comments?postId=${messageId}`);
      if (res.ok) {
        const data = await res.json();
        setCommentsMap((prev) => ({ ...prev, [messageId]: data.comments || [] }));
      }
    } catch (err) {
      console.error(`Failed to fetch comments for ${messageId}:`, err);
    }
  };

  useEffect(() => {
    messages.forEach((m) => {
      fetchCommentsForMessage(m.id);
    });
  }, [messages]);

  // Show Toast notification helper
  const showToast = (type: 'error' | 'success' | 'info', message: string) => {
    setToast({ type, message });
    setTimeout(() => {
      setToast(null);
    }, 5000);
  };

  // Reload messages list
  const refreshMessages = async () => {
    try {
      const res = await fetch('/api/contact');
      if (res.ok) {
        const data = await res.json();
        setMessages(data.messages || []);
      }
    } catch (err) {
      console.error('Failed to refresh messages:', err);
    }
  };

  // Handle Logout
  const handleLogout = async () => {
    await fetch('/api/logout', { method: 'POST' });
    setUser(null);
    showToast('info', 'ออกจากระบบเรียบร้อยแล้ว');
    router.push('/login');
  };

  // Start Editing Message
  const handleStartEdit = (m: MessageItem) => {
    setEditingId(m.id);
    setEditMessageText(m.message);
  };

  // Save Edited Message
  const handleSaveEdit = async (id: string) => {
    if (!editMessageText.trim()) {
      showToast('error', 'ข้อความห้ามเป็นค่าว่าง');
      return;
    }

    setIsSubmittingEdit(true);
    try {
      const res = await fetch(`/api/messages/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: editMessageText }),
      });

      const data = await res.json();

      if (!res.ok) {
        showToast('error', data.error || 'คุณไม่มีสิทธิ์แก้ไขข้อความนี้');
        return;
      }

      showToast('success', 'แก้ไขข้อความสำเร็จ!');
      setEditingId(null);
      await refreshMessages();
    } catch (err) {
      console.error('Failed to edit message:', err);
      showToast('error', 'เกิดข้อผิดพลาดในการแก้ไขข้อความ');
    } finally {
      setIsSubmittingEdit(false);
    }
  };

  // Delete Message
  const handleDeleteMessage = async (id: string) => {
    if (!confirm('คุณแน่ใจหรือไม่ว่าต้องการลบข้อความนี้?')) return;

    try {
      const res = await fetch(`/api/messages/${id}`, {
        method: 'DELETE',
      });

      const data = await res.json();

      if (!res.ok) {
        showToast('error', data.error || 'คุณไม่มีสิทธิ์ลบข้อความนี้');
        return;
      }

      showToast('success', 'ลบข้อความสำเร็จ!');
      await refreshMessages();
    } catch (err) {
      console.error('Failed to delete message:', err);
      showToast('error', 'เกิดข้อผิดพลาดในการลบข้อความ');
    }
  };

  // Submit Reply (Comment)
  const handleAddReply = async (messageId: string) => {
    const text = replyInputs[messageId] || '';
    if (!text.trim()) {
      showToast('error', 'กรุณากรอกข้อความตอบกลับ');
      return;
    }

    setSubmittingReply((prev) => ({ ...prev, [messageId]: true }));
    try {
      const authorName = user ? user.email.split('@')[0] : 'ผู้เยี่ยมชม';
      const res = await fetch('/api/comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          postId: messageId,
          author: authorName,
          text: text,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        showToast('error', data.error || 'ไม่สามารถส่งข้อความตอบกลับได้');
        return;
      }

      showToast('success', 'เพิ่มข้อความตอบกลับสำเร็จ!');
      setReplyInputs((prev) => ({ ...prev, [messageId]: '' }));
      await fetchCommentsForMessage(messageId);
    } catch (err) {
      console.error('Failed to add reply:', err);
      showToast('error', 'เกิดข้อผิดพลาดในการส่งข้อความตอบกลับ');
    } finally {
      setSubmittingReply((prev) => ({ ...prev, [messageId]: false }));
    }
  };

  // Delete Reply
  const handleDeleteReply = async (replyId: string, messageId: string) => {
    if (!confirm('คุณแน่ใจหรือไม่ว่าต้องการลบคอมเมนต์นี้?')) return;

    try {
      const res = await fetch(`/api/comments/${replyId}`, {
        method: 'DELETE',
      });

      const data = await res.json();

      if (!res.ok) {
        showToast('error', data.error || 'คุณไม่มีสิทธิ์ลบคอมเมนต์นี้');
        return;
      }

      showToast('success', 'ลบคอมเมนต์สำเร็จ!');
      await fetchCommentsForMessage(messageId);
    } catch (err) {
      console.error('Failed to delete reply:', err);
      showToast('error', 'เกิดข้อผิดพลาดในการลบคอมเมนต์');
    }
  };

  return (
    <main className="py-6 max-w-5xl mx-auto space-y-8">
      {/* Toast Alert Notification */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: -30, scale: 0.85 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -30, scale: 0.85 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            className={`fixed top-6 right-6 z-50 max-w-md p-4 rounded-2xl shadow-2xl border flex items-center gap-3 backdrop-blur-2xl transition-all ${
              toast.type === 'error'
                ? 'bg-red-50 border-red-300 text-red-800 shadow-red-900/10'
                : toast.type === 'success'
                ? 'bg-emerald-50 border-emerald-300 text-emerald-900 shadow-emerald-900/10'
                : 'bg-sky-50 border-[#069CD5]/40 text-[#104887] shadow-sky-900/10'
            }`}
          >
            <span className="text-2xl">
              {toast.type === 'error' ? '🚫' : toast.type === 'success' ? '✅' : 'ℹ️'}
            </span>
            <div className="flex-1 font-bold text-sm">{toast.message}</div>
            <button
              onClick={() => setToast(null)}
              className="text-slate-400 hover:text-slate-700 text-xs p-1 font-bold"
            >
              ✕
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#069CD5]/20">
        <div>
          <span className="text-xs uppercase tracking-widest text-[#104887] font-extrabold bg-[#069CD5]/15 px-3.5 py-1 rounded-full border border-[#069CD5]/30 shadow-sm inline-block animate-pulse">
            Protected Dashboard • Shochan Edition
          </span>
          <h1 className="text-4xl font-black tracking-tight mt-2 ocean-gradient-text">
            📊 Shochan Security Dashboard
          </h1>
          <p className="text-slate-600 text-sm mt-1 font-medium">
            ระบบจัดการความปลอดภัย • สิทธิ์แก้ไข/ลบเฉพาะเจ้าของ และระบบตอบกลับ
          </p>
        </div>

        {/* User Session Info Box */}
        <div className="flex items-center gap-3 ocean-glass-panel p-3.5 rounded-2xl text-xs shadow-sm">
          {loadingUser ? (
            <span className="text-slate-500 animate-pulse font-medium">กำลังโหลดเซสชัน...</span>
          ) : user ? (
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2.5">
                <span className="w-3 h-3 rounded-full bg-[#069CD5] animate-ping shadow-sm shadow-[#069CD5]"></span>
                <div>
                  <span className="block font-bold text-[#104887]">{user.email}</span>
                  <span className="text-[10px] text-[#069CD5] font-mono font-semibold">ID: {user.id.slice(0, 10)}...</span>
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer shadow-sm active:scale-95"
              >
                ออกจากระบบ
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
              <span className="text-slate-600 font-semibold">ไม่ได้เข้าสู่ระบบ (Guest)</span>
              <button
                onClick={() => router.push('/login')}
                className="ocean-button px-3.5 py-1.5 rounded-xl font-bold text-xs transition-all cursor-pointer shadow-sm"
              >
                เข้าสู่ระบบ
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Stats Card */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div
          whileHover={{ scale: 1.02, y: -4 }}
          transition={{ type: 'spring', stiffness: 300 }}
          className="md:col-span-2 bg-gradient-to-br from-white via-sky-50 to-[#E0F2FE] backdrop-blur-2xl p-6 rounded-3xl border border-[#069CD5]/30 shadow-xl shadow-sky-900/5 flex justify-between items-center"
        >
          <div>
            <span className="text-xs font-extrabold text-[#104887] uppercase tracking-wider">
              ข้อความทั้งหมดในระบบ
            </span>
            <p className="text-4xl font-black text-[#104887] mt-1 flex items-baseline gap-2">
              {messages.length} <span className="text-sm font-bold text-[#069CD5]">รายการ</span>
            </p>
          </div>
          <div className="w-14 h-14 rounded-2xl bg-[#069CD5]/15 border border-[#069CD5]/30 text-[#104887] flex items-center justify-center text-3xl shadow-sm">
            📬
          </div>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02, y: -4 }}
          transition={{ type: 'spring', stiffness: 300 }}
          className="ocean-glass-panel p-6 rounded-3xl shadow-xl shadow-sky-900/5 flex justify-between items-center"
        >
          <div>
            <span className="text-xs font-extrabold text-[#104887] uppercase tracking-wider">
              นโยบายสิทธิ์ (Authorization)
            </span>
            <p className="text-xs font-bold text-[#069CD5] mt-2 flex items-center gap-1.5">
              <span>🔒</span> แก้ไข/ลบได้เฉพาะเจ้าของ
            </p>
            <p className="text-[11px] text-slate-500 mt-0.5 font-medium">
              💬 ผู้อื่นสามารถตอบกลับได้เท่านั้น
            </p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-[#52D9CB]/20 border border-[#52D9CB]/50 text-[#104887] flex items-center justify-center text-2xl shadow-sm">
            🛡️
          </div>
        </motion.div>
      </div>

      {/* Message List Section */}
      {messages.length > 0 ? (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-extrabold text-[#104887] flex items-center gap-2">
              <span>💬</span> รายการข้อความทั้งหมด:
            </h2>
            <button
              onClick={refreshMessages}
              className="text-xs text-[#104887] font-bold hover:text-[#069CD5] flex items-center gap-1.5 bg-white px-3.5 py-1.5 rounded-xl border border-[#069CD5]/30 hover:border-[#069CD5] transition-all cursor-pointer shadow-sm hover:scale-105 active:scale-95"
            >
              🔄 รีเฟรชข้อมูล
            </button>
          </div>

          <div className="grid grid-cols-1 gap-6">
            {messages.map((m, index) => {
              const isOwner = Boolean(user && m.authorId === user.id);
              const comments = commentsMap[m.id] || [];

              return (
                <motion.div
                  key={m.id}
                  initial={{ opacity: 0, scale: 0.92, y: 30 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ type: 'spring', stiffness: 220, damping: 18, delay: index * 0.05 }}
                  className="ocean-glass-panel ocean-glass-hover p-6 rounded-3xl space-y-4 group"
                >
                  {/* Card Header */}
                  <div className="flex flex-wrap justify-between items-start gap-3 pb-3 border-b border-[#069CD5]/15">
                    <div className="flex items-center gap-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-extrabold text-lg text-[#104887] group-hover:text-[#069CD5] transition-colors">
                            {m.name}
                          </h3>
                          {/* Owner Badge */}
                          {m.authorId ? (
                            isOwner ? (
                              <span className="text-[10px] font-bold bg-[#52D9CB]/25 text-[#104887] border border-[#52D9CB]/80 px-2.5 py-0.5 rounded-full flex items-center gap-1 shadow-sm animate-pulse">
                                ✨ ข้อความของคุณ (เจ้าของ)
                              </span>
                            ) : (
                              <span className="text-[10px] font-bold bg-slate-100 text-slate-600 border border-slate-200 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                                👤 ข้อความของผู้ใช้อื่น
                              </span>
                            )
                          ) : (
                            <span className="text-[10px] text-slate-400 font-mono font-medium">Guest</span>
                          )}
                        </div>
                        <p className="text-sm text-[#069CD5] font-bold">{m.email}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-xs text-slate-500 bg-white/90 px-3 py-1 rounded-full border border-[#069CD5]/20 font-mono font-medium shadow-xs">
                        🕒 {new Date(m.createdAt).toLocaleString('th-TH')}
                      </span>

                      {/* Action Buttons: Show Edit/Delete ONLY if isOwner === true. Otherwise show Reply Only Badge */}
                      <div className="flex items-center gap-1.5 ml-2">
                        {isOwner ? (
                          <>
                            <button
                              onClick={() => handleStartEdit(m)}
                              className="bg-[#104887] hover:bg-[#069CD5] text-white px-3 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1 shadow-sm hover:scale-110 active:scale-95"
                              title="แก้ไขข้อความของคุณ"
                            >
                              ✏️ แก้ไข
                            </button>
                            <button
                              onClick={() => handleDeleteMessage(m.id)}
                              className="bg-red-600 hover:bg-red-500 text-white px-3 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1 shadow-sm hover:scale-110 active:scale-95"
                              title="ลบข้อความของคุณ"
                            >
                              🗑️ ลบ
                            </button>
                          </>
                        ) : (
                          <span className="text-[11px] font-bold text-[#104887] bg-[#069CD5]/10 border border-[#069CD5]/30 px-2.5 py-1 rounded-xl flex items-center gap-1">
                            💬 ตอบกลับได้อย่างเดียว
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Message Content or Edit Input */}
                  {editingId === m.id ? (
                    <div className="bg-white p-4 rounded-2xl border border-[#069CD5] space-y-3 shadow-md">
                      <label className="block text-xs font-bold text-[#104887]">
                        แก้ไขข้อความของคุณ:
                      </label>
                      <textarea
                        rows={3}
                        value={editMessageText}
                        onChange={(e) => setEditMessageText(e.target.value)}
                        className="w-full px-3 py-2 bg-slate-50 border border-[#069CD5]/40 rounded-xl text-[#0F172A] text-sm focus:outline-none focus:ring-2 focus:ring-[#069CD5]"
                      />
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => setEditingId(null)}
                          className="px-3 py-1.5 rounded-xl bg-slate-200 text-slate-700 hover:bg-slate-300 text-xs font-bold transition-all cursor-pointer"
                        >
                          ยกเลิก
                        </button>
                        <button
                          onClick={() => handleSaveEdit(m.id)}
                          disabled={isSubmittingEdit}
                          className="px-4 py-1.5 rounded-xl ocean-button font-bold text-xs transition-all cursor-pointer shadow-md"
                        >
                          {isSubmittingEdit ? 'กำลังบันทึก...' : 'บันทึกการแก้ไข'}
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="bg-white/80 p-4 rounded-2xl border border-[#069CD5]/15 shadow-inner">
                      <p className="text-[#1E293B] text-sm whitespace-pre-wrap leading-relaxed font-medium">
                        {m.message}
                      </p>
                    </div>
                  )}

                  {/* Reply / Comments Section */}
                  <div className="mt-4 pt-4 border-t border-[#069CD5]/20 space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-[#104887] flex items-center gap-1.5">
                        <span>💬</span> การตอบกลับ ({comments.length})
                      </h4>
                    </div>

                    {/* Replies List */}
                    {comments.length > 0 && (
                      <div className="space-y-2.5 pl-3 border-l-2 border-[#069CD5]">
                        {comments.map((c) => {
                          const isCommentOwner = Boolean(user && c.authorId === user.id);
                          return (
                            <div
                              key={c.id}
                              className="bg-white/90 p-3 rounded-xl border border-[#069CD5]/20 text-xs flex justify-between items-start gap-2 shadow-xs"
                            >
                              <div className="space-y-1">
                                <div className="flex items-center gap-2">
                                  <span className="font-extrabold text-[#104887]">{c.author}</span>
                                  {isCommentOwner && (
                                    <span className="text-[9px] bg-[#52D9CB]/30 text-[#104887] border border-[#52D9CB] px-1.5 py-0.2 rounded font-bold">
                                      เจ้าของคำตอบ
                                    </span>
                                  )}
                                  <span className="text-[10px] text-slate-400 font-medium">
                                    {new Date(c.createdAt).toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' })}
                                  </span>
                                </div>
                                <div
                                  className="text-[#334155] font-medium leading-relaxed"
                                  dangerouslySetInnerHTML={{ __html: c.text }}
                                />
                              </div>
                              {/* Only show delete button for comment owner */}
                              {isCommentOwner && (
                                <button
                                  onClick={() => handleDeleteReply(c.id, m.id)}
                                  className="text-slate-400 hover:text-red-600 font-bold px-2 py-0.5 text-[10px] transition-colors cursor-pointer"
                                  title="ลบคอมเมนต์ของคุณ"
                                >
                                  ✕ ลบ
                                </button>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    )}

                    {/* Add Reply Input Form */}
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        value={replyInputs[m.id] || ''}
                        onChange={(e) => setReplyInputs({ ...replyInputs, [m.id]: e.target.value })}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') handleAddReply(m.id);
                        }}
                        placeholder="พิมพ์ข้อความตอบกลับที่นี่..."
                        className="flex-1 bg-white border border-[#069CD5]/30 px-4 py-2.5 rounded-xl text-xs text-[#0F172A] placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#069CD5] transition-all shadow-inner font-medium"
                      />
                      <button
                        onClick={() => handleAddReply(m.id)}
                        disabled={submittingReply[m.id]}
                        className="ocean-button font-bold text-xs px-4 py-2.5 rounded-xl shadow-md transition-all cursor-pointer whitespace-nowrap active:scale-95 flex items-center gap-1.5"
                      >
                        <span>💬</span>
                        {submittingReply[m.id] ? 'กำลังส่ง...' : 'ตอบกลับ'}
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="text-center py-16 ocean-glass-panel border-dashed border-[#069CD5]/40 rounded-3xl p-8">
          <div className="w-16 h-16 rounded-2xl bg-[#069CD5]/15 text-[#104887] flex items-center justify-center text-3xl mx-auto mb-4 border border-[#069CD5]/30 shadow-sm">
            📭
          </div>
          <h3 className="text-lg font-bold text-[#104887]">ยังไม่มีข้อความส่งเข้ามาในระบบ</h3>
          <p className="text-sm text-slate-500 mt-1 max-w-sm mx-auto font-medium">
            ลองไปที่หน้า &quot;ติดต่อเรา&quot; เพื่อกรอกและทดสอบส่งฟอร์มดูครับ ข้อมูลจะมาปรากฏที่นี่ทันที
          </p>
        </div>
      )}
    </main>
  );
}
