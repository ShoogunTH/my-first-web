import Link from 'next/link';
import Image from 'next/image';
import { coursesData } from '../data';

export default async function CourseDetails({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const course = coursesData[id];

  if (!course) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">ไม่พบวิชานี้</h1>
        <Link href="/courses" className="text-blue-600 hover:underline">
          กลับไปหน้ารายวิชาทั้งหมด
        </Link>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 pb-16">
      {/* Hero Banner */}
      <div className="w-full h-[40vh] relative">
        <Image 
          src={course.image} 
          alt={course.nameEN} 
          fill
          className="object-cover brightness-50"
          priority
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white px-4 text-center">
          <span className="bg-blue-600/80 backdrop-blur px-4 py-1 rounded-full text-sm font-bold tracking-widest mb-4">
            {course.id}
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">{course.nameTH}</h1>
          <h2 className="text-xl md:text-2xl font-light text-gray-200">{course.nameEN}</h2>
        </div>
      </div>

      <div className="max-w-4xl mx-auto -mt-16 relative z-10 px-4">
        <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8 pb-8 border-b border-gray-100">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600 font-bold text-xl">
                {course.credits}
              </div>
              <div>
                <div className="text-sm text-gray-500 font-semibold uppercase tracking-wider mb-1">หน่วยกิต (Credits)</div>
                <div className="text-xl font-bold text-gray-900">{course.credits} หน่วยกิต</div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600 text-2xl">
                👨‍🏫
              </div>
              <div>
                <div className="text-sm text-gray-500 font-semibold uppercase tracking-wider mb-1">ผู้สอน (Instructor)</div>
                <div className="text-xl font-bold text-gray-900">{course.instructor}</div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">คำอธิบายรายวิชา (Course Description)</h3>
            <p className="text-lg text-gray-600 leading-relaxed">
              {course.description}
            </p>
          </div>

          <div className="mt-12 pt-8 border-t border-gray-100 flex justify-center">
            <Link 
              href="/courses" 
              className="px-8 py-3 bg-gray-900 text-white rounded-full font-semibold hover:bg-gray-800 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 inline-block"
            >
              ← ย้อนกลับ
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}