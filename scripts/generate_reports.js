const { Document, Packer, Paragraph, TextRun, HeadingLevel, WidthType } = require('docx');
const fs = require('fs');
const path = require('path');

// ---------------------------------------------------------
// Week 8 Report Document
// ---------------------------------------------------------
function makeWeek8Doc() {
  return new Document({
    sections: [
      {
        properties: {},
        children: [
          new Paragraph({
            text: 'รายงานสรุปผลการปฏิบัติการ: Week 8',
            heading: HeadingLevel.TITLE,
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: 'เรื่อง: Server-side Development (Next.js API Routes & Layered Architecture)',
                bold: true,
                size: 26,
                color: '2E75B6',
              }),
            ],
          }),
          new Paragraph({ text: '' }),
          new Paragraph({
            children: [
              new TextRun({ text: '1. ภาพรวมและวัตถุประสงค์', bold: true, size: 24 }),
            ],
          }),
          new Paragraph({
            text: 'สัปดาห์นี้เน้นการปรับโครงสร้างระบบเซิร์ฟเวอร์แบบ 3 ชั้น (3-Layer Architecture) ได้แก่ Controller (Route Handlers) -> Service (Business Logic) -> Model (Data Access) เพื่อให้โค้ดอ่านง่าย แยกความรับผิดชอบชัดเจน และเพิ่มการจัดการ Error แบบรวมศูนย์ (Centralized Error Handling) เพื่อป้องกันเซิร์ฟเวอร์ล่ม',
          }),
          new Paragraph({ text: '' }),
          new Paragraph({
            children: [
              new TextRun({ text: '2. สรุปไฟล์ที่สร้าง/แก้ไขและการทำงานของโค้ด', bold: true, size: 24 }),
            ],
          }),

          new Paragraph({ text: '• lib/errors.ts', bold: true }),
          new Paragraph({ text: '  - สร้าง Custom Error Classes: NotFoundError (404), ValidationError (400), ForbiddenError (403) สืบทอดจาก Error Class เพื่อระบุ HTTP Status Code ประจำแต่ละสาเหตุได้อย่างถูกต้อง' }),

          new Paragraph({ text: '• lib/withErrorHandling.ts', bold: true }),
          new Paragraph({ text: '  - Wrapper function ที่ครอบ Route Handler ทุกตัว ทำหน้าที่ดักจับ Exception/Error ในระดับรวมศูนย์ อ่านค่า err.status และส่ง Response เป็น JSON Error พร้อม Status Code เหมาะสม ช่วยให้ไม่ต้องเขียน try/catch ซ้ำๆ ทุก API Route' }),

          new Paragraph({ text: '• lib/messageService.ts', bold: true }),
          new Paragraph({ text: '  - ชั้น Service Layer ควบคุม Logic ทางธุรกิจ เช่น การตรวจสอบความครบถ้วนของข้อมูล, การกรองคำค้นหา (Search Query), การค้นหาเจาะจงราย ID และการจัดการกรณีไม่พบข้อมูล โดยคั่นกลางระหว่าง Route Handler กับ Model' }),

          new Paragraph({ text: '• app/api/contact/route.ts', bold: true }),
          new Paragraph({ text: '  - Controller รับ HTTP GET (ค้นหาผ่าน ?search=) และ POST (สร้างข้อความใหม่) โดยเรียกผ่าน Service Layer และถูกครอบด้วย withErrorHandling()' }),

          new Paragraph({ text: '• app/api/messages/[id]/route.ts', bold: true }),
          new Paragraph({ text: '  - Dynamic API Route สำหรับข้อความรายรายการ รองรับ GET (อ่านรายชิ้น), PATCH (แก้ไขเฉพาะส่วน), DELETE (ลบข้อความ)' }),

          new Paragraph({ text: '• Workshop (Comments API)', bold: true }),
          new Paragraph({ text: '  - พัฒนาทรัพยากรใหม่ (Comment System) ได้แก่ lib/comments.ts, lib/commentService.ts, app/api/comments/route.ts และ app/api/comments/[id]/route.ts ตามโครงสร้าง 3-Layer Architecture สมบูรณ์' }),

          new Paragraph({ text: '' }),
          new Paragraph({
            children: [
              new TextRun({ text: '3. อภิปรายผล (Reflection): Hard Delete vs Soft Delete', bold: true, size: 24 }),
            ],
          }),
          new Paragraph({
            text: '• Hard Delete: ลบข้อมูลออกจากฐานข้อมูลหรือ Array จริง เหมาะกับข้อมูลชั่วคราว ข้อดีคือประหยัดพื้นที่ แต่กู้คืนไม่ได้\n• Soft Delete: ใช้การตั้ง Flag (เช่น isDeleted = true) โดยข้อมูลยังคงอยู่ใน DB เหมาะกับข้อมูลสำคัญที่ต้องเก็บบันทึกประวัติ (Audit log) แต่ต้องแก้ไขฟังก์ชันค้นหา (GET) ให้กรองข้อมูลที่ถูกลบออก',
          }),
        ],
      },
    ],
  });
}

// ---------------------------------------------------------
// Week 9 Report Document
// ---------------------------------------------------------
function makeWeek9Doc() {
  return new Document({
    sections: [
      {
        properties: {},
        children: [
          new Paragraph({
            text: 'รายงานสรุปผลการปฏิบัติการ: Week 9',
            heading: HeadingLevel.TITLE,
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: 'เรื่อง: Database Integration & CRUD Operations (PostgreSQL / SQLite + Prisma)',
                bold: true,
                size: 26,
                color: '2E75B6',
              }),
            ],
          }),
          new Paragraph({ text: '' }),
          new Paragraph({
            children: [
              new TextRun({ text: '1. ภาพรวมและวัตถุประสงค์', bold: true, size: 24 }),
            ],
          }),
          new Paragraph({
            text: 'สัปดาห์นี้เป็นการเปลี่ยนจากการเก็บข้อมูลชั่วคราวใน Memory Array ไปใช้ระบบฐานข้อมูลจริงผ่าน Prisma ORM ช่วยให้ข้อมูลคงอยู่ถาวร (Persistence) พร้อมใช้คำสั่ง Migration และ Seed Data',
          }),
          new Paragraph({ text: '' }),
          new Paragraph({
            children: [
              new TextRun({ text: '2. สรุปไฟล์ที่สร้าง/แก้ไขและการทำงานของโค้ด', bold: true, size: 24 }),
            ],
          }),

          new Paragraph({ text: '• prisma/schema.prisma', bold: true }),
          new Paragraph({ text: '  - กำหนด Schema สำหรับตาราง User, Message และ Comment กำหนด Primary Key เป็น CUID, เพิ่มเงื่อนไข @unique ใน email และตั้งค่า Default timestamps (createdAt)' }),

          new Paragraph({ text: '• lib/prisma.ts', bold: true }),
          new Paragraph({ text: '  - สร้าง PrismaClient Singleton บน globalThis เพื่อป้องกันปัญหาการเปิด Database Connection ซ้ำซ้อนจากการ Re-render ใน Next.js Development Mode' }),

          new Paragraph({ text: '• lib/messages.ts (Model Layer)', bold: true }),
          new Paragraph({ text: '  - ปรับปรุงชั้น Model จาก Array ไปเรียกใช้ Prisma Client (prisma.message.create, prisma.message.findMany, prisma.message.findUnique, prisma.message.update, prisma.message.delete)' }),

          new Paragraph({ text: '• lib/messageService.ts', bold: true }),
          new Paragraph({ text: '  - ปรับเป็น async/await และเพิ่มการดักจับ Prisma Error Codes เช่น P2025 (Record Not Found -> เปลี่ยนเป็น NotFoundError) และ P2002 (Unique Constraint Violation -> เปลี่ยนเป็น ValidationError)' }),

          new Paragraph({ text: '• prisma/seed.ts', bold: true }),
          new Paragraph({ text: '  - สคริปต์เติมข้อมูลเริ่มต้น (Seed script) ลงในฐานข้อมูลอัตโนมัติ สำหรับใช้ทดสอบระบบ' }),

          new Paragraph({ text: '• Workshop (Prisma Comment CRUD)', bold: true }),
          new Paragraph({ text: '  - ปรับปรุง Comment System ทั้งหมดใน lib/comments.ts และ lib/commentService.ts ให้ทำงานกับ Prisma ORM ครบทั้ง 4 Operations (Create, Read, Update, Delete)' }),

          new Paragraph({ text: '' }),
          new Paragraph({
            children: [
              new TextRun({ text: '3. สรุปการเชื่อมโยงสถาปัตยกรรม (Layer Mapping)', bold: true, size: 24 }),
            ],
          }),
          new Paragraph({ text: '• Controller: app/api/... (รับ HTTP Request/Response)\n• Service: lib/...Service.ts (Business Logic + Validate + Map Error Code)\n• Model: lib/...ts (เรียกใช้ Prisma API)\n• Database Schema: prisma/schema.prisma (โครงสร้างตารางจริง)' }),
        ],
      },
    ],
  });
}

// ---------------------------------------------------------
// Week 10 Report Document
// ---------------------------------------------------------
function makeWeek10Doc() {
  return new Document({
    sections: [
      {
        properties: {},
        children: [
          new Paragraph({
            text: 'รายงานสรุปผลการปฏิบัติการ: Week 10',
            heading: HeadingLevel.TITLE,
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: 'เรื่อง: Web Application Security & Secure Coding',
                bold: true,
                size: 26,
                color: '2E75B6',
              }),
            ],
          }),
          new Paragraph({ text: '' }),
          new Paragraph({
            children: [
              new TextRun({ text: '1. ภาพรวมและวัตถุประสงค์', bold: true, size: 24 }),
            ],
          }),
          new Paragraph({
            text: 'สัปดาห์นี้ยกระดับความปลอดภัยของเว็บแอปพลิเคชัน ครอบคลุม 4 เสาหลัก: Password Hashing, SQL Injection Prevention, XSS Prevention, Input Validation ด้วย Zod และ Authorization Check (ตรวจสอบสิทธิ์ความเป็นเจ้าของข้อมูล)',
          }),
          new Paragraph({ text: '' }),
          new Paragraph({
            children: [
              new TextRun({ text: '2. สรุปไฟล์ที่สร้าง/แก้ไขและการทำงานของโค้ด', bold: true, size: 24 }),
            ],
          }),

          new Paragraph({ text: '• lib/users.ts', bold: true }),
          new Paragraph({ text: '  - ใช้ bcrypt.hash(password, 10) เข้ารหัสผ่านแบบ One-way Hashing ก่อนบันทึกลงฐานข้อมูล และใช้ bcrypt.compare() สำหรับตรวจสอบรหัสผ่านเมื่อ Login' }),

          new Paragraph({ text: '• app/api/login/route.ts', bold: true }),
          new Paragraph({ text: '  - ระบบยืนยันตัวตน ตรวจสอบ bcrypt.compare() และตั้งค่า HTTP Response Header เป็น Set-Cookie: session=...; Path=/; HttpOnly; SameSite=Strict เพื่อป้องกันการถูกขโมย Cookie ผ่านสคริปต์ (XSS)' }),

          new Paragraph({ text: '• lib/sanitize.ts', bold: true }),
          new Paragraph({ text: '  - ใช้ sanitize-html กรองและตัดแท็กอันตราย เช่น <script> หรือ attribute onerror ออกจากข้อความ Rich Text เพื่อป้องกัน XSS Attack' }),

          new Paragraph({ text: '• lib/schemas.ts', bold: true }),
          new Paragraph({ text: '  - สร้าง Zod Validation Schemas (messageSchema, commentSchema, userSchema, changePasswordSchema) ตรวจสอบความถูกต้อง ชนิดข้อมูล และความยาวก่อนนำข้อมูลไปประมวลผล' }),

          new Paragraph({ text: '• lib/messageService.ts & lib/commentService.ts', bold: true }),
          new Paragraph({ text: '  - เพิ่มการตรวจ Authorization: ตรวจสอบว่า authorId ของข้อมูลตรงกับ sessionUserId ของผู้ใช้ที่ส่งมาหรือไม่ หากไม่ตรงจะโยน ForbiddenError (403 Forbidden)' }),

          new Paragraph({ text: '• Workshop Option 1 & 2 (Change Password & Comment Ownership)', bold: true }),
          new Paragraph({ text: '  - app/api/change-password/route.ts: ฟีเจอร์เปลี่ยนรหัสผ่านอย่างปลอดภัย ต้องยืนยันรหัสผ่านเดิมด้วย bcrypt.compare() และแฮชรหัสผ่านใหม่ที่ผ่าน Zod Validation\n  - Comment Ownership: กำหนดสิทธิ์ให้ผู้เขียนคอมเมนต์เท่านั้นที่สามารถ PATCH/DELETE คอมเมนต์ของตนเองได้' }),
        ],
      },
    ],
  });
}

async function buildAll() {
  const scriptsDir = __dirname;
  const outDir = path.join(scriptsDir, '..');

  const w8Doc = makeWeek8Doc();
  const w8Buf = await Packer.toBuffer(w8Doc);
  fs.writeFileSync(path.join(outDir, 'Week8_Lab_Report.docx'), w8Buf);
  console.log('Created Week8_Lab_Report.docx');

  const w9Doc = makeWeek9Doc();
  const w9Buf = await Packer.toBuffer(w9Doc);
  fs.writeFileSync(path.join(outDir, 'Week9_Lab_Report.docx'), w9Buf);
  console.log('Created Week9_Lab_Report.docx');

  const w10Doc = makeWeek10Doc();
  const w10Buf = await Packer.toBuffer(w10Doc);
  fs.writeFileSync(path.join(outDir, 'Week10_Lab_Report.docx'), w10Buf);
  console.log('Created Week10_Lab_Report.docx');
}

buildAll().catch(console.error);
