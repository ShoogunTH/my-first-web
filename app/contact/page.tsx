import ContactForm from '../../components/ContactForm';

export default function ContactPage() {
  return (
    <main className="py-8 max-w-xl mx-auto flex flex-col items-center">
      <div className="text-center mb-8">
        <span className="text-xs uppercase tracking-widest text-indigo-400 font-bold bg-indigo-950/80 px-3 py-1 rounded-full border border-indigo-800/80">
          Get In Touch
        </span>
        <h1 className="text-4xl font-extrabold tracking-tight mt-3 bg-gradient-to-r from-white via-slate-200 to-indigo-300 bg-clip-text text-transparent">
          📬 ติดต่อเรา (Contact Us)
        </h1>
        <p className="text-slate-400 text-sm mt-2">
          กรอกข้อมูลด้านล่าง ข้อความจะถูกส่งไปยังระบบและแสดงบน Dashboard
        </p>
      </div>
      <ContactForm />
    </main>
  );
}
