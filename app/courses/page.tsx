import Link from 'next/link';
import Image from 'next/image';
import { coursesData } from './data';

export default function CoursesPage() {
  const coursesList = Object.values(coursesData);

  return (
    <main className="min-h-screen bg-gray-50 p-8 md:p-12">
      <div className="max-w-6xl mx-auto">
        <header className="mb-12 text-center">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-4">รายวิชาที่น่าสนใจ</h1>
          <p className="text-lg text-gray-600">เลือกดูรายละเอียดรายวิชาในหลักสูตร</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {coursesList.map((course) => (
            <Link key={course.id} href={`/courses/${course.id}`} className="group block h-full">
              <div className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 flex flex-col h-full transform group-hover:-translate-y-1">
                <div className="relative h-48 w-full overflow-hidden">
                  <Image 
                    src={course.image} 
                    alt={course.nameEN} 
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-bold text-blue-600">
                    {course.credits} Credits
                  </div>
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <div className="text-sm font-semibold text-blue-600 mb-2">{course.id}</div>
                  <h2 className="text-xl font-bold text-gray-900 mb-1">{course.nameTH}</h2>
                  <h3 className="text-sm text-gray-500 mb-4">{course.nameEN}</h3>
                  <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between text-sm text-gray-600">
                    <span className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-xs">👤</span>
                      {course.instructor}
                    </span>
                    <span className="text-blue-500 group-hover:translate-x-1 transition-transform inline-block">
                      ดูรายละเอียด →
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
