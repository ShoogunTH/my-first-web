
import type { Metadata } from "next"; // ← import type!
export const metadata: Metadata = {
  title: "เกียวกับเรา | My App",
  description: "รายละเอียดของเรา",
  openGraph: {
    title: "เกียวกับเรา",
    images: ["/og-image.png"],
  },
};
export default function Home() {
  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold">สวัสดี Next.js + TS!</h1>
      <p>ชือ: [Sakkarin Seangarthit]</p>
      <p>วันที: {new Date().toLocaleDateString("th-TH")}</p>
    </main>
  );
}
