import Image from "next/image";
import Link from "next/link";

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  imageUrl: string;
  readTime: string;
}

const mockBlogs: BlogPost[] = [
  {
    id: "1",
    title: "ก้าวแรกสู่การเป็น Full-Stack Developer",
    excerpt: "แชร์ประสบการณ์และ Roadmap ของการเตรียมตัวเป็นนักพัฒนาซอฟต์แวร์ที่ต้องรู้ทั้ง Frontend และ Backend ภายในปีนี้...",
    category: "Career",
    date: "14 พ.ย. 2023",
    imageUrl: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80",
    readTime: "5 min read"
  },
  {
    id: "2",
    title: "ทำไมผมถึงชอบเล่น Dark Souls (ถึงจะตายบ่อยก็เถอะ)",
    excerpt: "เกมที่ขึ้นชื่อว่ายากที่สุด แต่กลับสอนปรัชญาชีวิตและความไม่ยอมแพ้ให้กับผู้เล่นอย่างลึกซึ้ง มาดูกันว่าทำไมถึงต้องลองเล่น...",
    category: "Gaming",
    date: "22 ต.ค. 2023",
    imageUrl: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=800&q=80",
    readTime: "8 min read"
  },
  {
    id: "3",
    title: "เจาะลึก 3 ฮีโร่ DC Trinity: Superman, Batman, Wonder Woman",
    excerpt: "บทวิเคราะห์ความสัมพันธ์และสัญลักษณ์ที่ซ่อนอยู่ใน 3 เสาหลักของจักรวาล DC ที่ทำให้พวกเขาเป็นตำนาน...",
    category: "Comics",
    date: "5 ก.ย. 2023",
    imageUrl: "https://images.unsplash.com/photo-1612036782180-6f0b6cd846fe?auto=format&fit=crop&w=800&q=80",
    readTime: "6 min read"
  }
];

export default function BlogsPage() {
  return (
    <main className="min-h-screen bg-[#FAFAFA] py-16 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto">
        <header className="mb-16 text-center">
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-4 tracking-tight">The <span className="text-blue-600">Shogun</span> Blog</h1>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto">Thoughts, stories and ideas about software development, gaming, and comics.</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {mockBlogs.map((post) => (
            <article key={post.id} className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 flex flex-col h-full border border-gray-100 group">
              <div className="relative h-56 w-full overflow-hidden">
                <Image 
                  src={post.imageUrl} 
                  alt={post.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur text-gray-900 px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                  {post.category}
                </div>
              </div>
              
              <div className="p-8 flex-1 flex flex-col">
                <div className="flex items-center text-sm text-gray-500 mb-4 gap-4 font-medium">
                  <time>{post.date}</time>
                  <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                  <span>{post.readTime}</span>
                </div>
                
                <h2 className="text-2xl font-bold text-gray-900 mb-4 line-clamp-2 leading-tight group-hover:text-blue-600 transition-colors">
                  {post.title}
                </h2>
                
                <p className="text-gray-600 line-clamp-3 mb-6 leading-relaxed flex-1">
                  {post.excerpt}
                </p>
                
                <div className="mt-auto pt-6 border-t border-gray-100">
                  <Link href="#" className="inline-flex items-center text-blue-600 font-semibold hover:text-blue-700 transition-colors">
                    Read Article 
                    <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}