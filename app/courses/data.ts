export interface CourseInfo {
  id: string;
  nameTH: string;
  nameEN: string;
  credits: number;
  instructor: string;
  description: string;
  image: string;
}

export const coursesData: Record<string, CourseInfo> = {
  '0214321': {
    id: '0214321',
    nameTH: 'การออกแบบและพัฒนาเว็บแอปพลิเคชัน',
    nameEN: 'Web Application Design and Development',
    credits: 3,
    instructor: 'อ.ดร. นักพัฒนา มือฉมัง',
    description: 'ศึกษาหลักการและกระบวนการออกแบบและพัฒนาเว็บแอปพลิเคชันด้วยเทคโนโลยีสมัยใหม่ เช่น React, Next.js, Node.js รวมถึงการจัดการฐานข้อมูลและการปรับใช้ (Deployment) สำหรับระบบบนเครือข่าย',
    image: 'https://images.unsplash.com/photo-1547658719-da2b51169166?auto=format&fit=crop&w=1000&q=80'
  },
  '0214322': {
    id: '0214322',
    nameTH: 'ระบบฐานข้อมูลเบื้องต้น',
    nameEN: 'Introduction to Database Systems',
    credits: 3,
    instructor: 'ผศ.ดร. ฐานข้อมูล ล้ำเลิศ',
    description: 'การออกแบบฐานข้อมูลเชิงสัมพันธ์ โมเดล E-R การเขียนคำสั่ง SQL เพื่อสืบค้นและจัดการข้อมูล รวมถึงแนวคิดพื้นฐานเกี่ยวกับ NoSQL',
    image: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?auto=format&fit=crop&w=1000&q=80'
  },
  '0214323': {
    id: '0214323',
    nameTH: 'วิศวกรรมซอฟต์แวร์',
    nameEN: 'Software Engineering',
    credits: 3,
    instructor: 'รศ.ดร. วิศวกร ซอฟต์แวร์',
    description: 'ศึกษาวัฏจักรการพัฒนาซอฟต์แวร์ (SDLC) แบบ Agile และ Scrum การเก็บความต้องการ การออกแบบระบบ การทดสอบ และการประกันคุณภาพซอฟต์แวร์',
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1000&q=80'
  }
};
