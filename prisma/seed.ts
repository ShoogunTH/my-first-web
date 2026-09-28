import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash('1234', 10);

  // 1. Create multiple user accounts for testing authorization
  const admin = await prisma.user.upsert({
    where: { email: 'admin@tsu.ac.th' },
    update: { password: hashedPassword },
    create: {
      email: 'admin@tsu.ac.th',
      password: hashedPassword,
    },
  });

  const alice = await prisma.user.upsert({
    where: { email: 'alice@tsu.ac.th' },
    update: { password: hashedPassword },
    create: {
      email: 'alice@tsu.ac.th',
      password: hashedPassword,
    },
  });

  const bob = await prisma.user.upsert({
    where: { email: 'bob@tsu.ac.th' },
    update: { password: hashedPassword },
    create: {
      email: 'bob@tsu.ac.th',
      password: hashedPassword,
    },
  });

  const charlie = await prisma.user.upsert({
    where: { email: 'charlie@tsu.ac.th' },
    update: { password: hashedPassword },
    create: {
      email: 'charlie@tsu.ac.th',
      password: hashedPassword,
    },
  });

  console.log('Seeded Users:', [
    { email: admin.email, password: '1234 (hashed)' },
    { email: alice.email, password: '1234 (hashed)' },
    { email: bob.email, password: '1234 (hashed)' },
    { email: charlie.email, password: '1234 (hashed)' },
  ]);

  // 2. Clear old messages & comments
  await prisma.comment.deleteMany();
  await prisma.message.deleteMany();

  // 3. Seed messages with different owners
  const msg1 = await prisma.message.create({
    data: {
      name: 'Admin User',
      email: admin.email,
      message: 'สวัสดีครับ สอบถามข้อมูลเพิ่มเติมเกี่ยวกับการติดตั้งระบบความปลอดภัย',
      authorId: admin.id,
    },
  });

  const msg2 = await prisma.message.create({
    data: {
      name: 'Alice Smith',
      email: alice.email,
      message: 'สวัสดีค่ะ ฝากตัวด้วยนะคะ Alice เองค่ะ ลองทดสอบส่งข้อความในระบบ',
      authorId: alice.id,
    },
  });

  const msg3 = await prisma.message.create({
    data: {
      name: 'Bob Marley',
      email: bob.email,
      message: 'Hello World! System test from Bob. ลองทดสอบระบบแก้ไขและตอบกลับ',
      authorId: bob.id,
    },
  });

  const msg4 = await prisma.message.create({
    data: {
      name: 'Charlie Brown',
      email: charlie.email,
      message: 'ข้อความทดสอบจาก Charlie ครับ ห้ามคนอื่นมาแก้ไขข้อความนี้นะครับ!',
      authorId: charlie.id,
    },
  });

  console.log('Seeded Messages with distinct owners:', [msg1.id, msg2.id, msg3.id, msg4.id]);

  // 4. Seed sample replies (comments) on messages
  const c1 = await prisma.comment.create({
    data: {
      postId: msg1.id,
      author: 'alice',
      authorId: alice.id,
      text: '<b>รับทราบค่ะทีมงาน!</b> ยินดีช่วยเหลือค่ะ',
    },
  });

  const c2 = await prisma.comment.create({
    data: {
      postId: msg2.id,
      author: 'admin',
      authorId: admin.id,
      text: 'ยินดีต้อนรับคุณ Alice เข้าสู่ระบบครับ <script>alert("xss")</script>',
    },
  });

  console.log('Seeded Comments:', [c1.id, c2.id]);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
