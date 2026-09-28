import { z } from 'zod';

export const messageSchema = z.object({
  name: z.string().min(2, 'ชื่อสั้นเกินไป (อย่างน้อย 2 ตัวอักษร)').max(100),
  email: z.string().email('รูปแบบอีเมลไม่ถูกต้อง'),
  message: z.string().min(5, 'ข้อความสั้นเกินไป (อย่างน้อย 5 ตัวอักษร)').max(1000),
  tag: z.string().optional(),
});

export const updateMessageSchema = z.object({
  name: z.string().min(2, 'ชื่อสั้นเกินไป').optional(),
  email: z.string().email('รูปแบบอีเมลไม่ถูกต้อง').optional(),
  message: z.string().min(5, 'ข้อความสั้นเกินไป').optional(),
  tag: z.string().optional(),
});

export const commentSchema = z.object({
  postId: z.string().min(1, 'ระบุ postId'),
  author: z.string().min(2, 'ชื่อผู้เขียนสั้นเกินไป'),
  text: z.string().min(2, 'ข้อความคอมเมนต์สั้นเกินไป'),
});

export const userSchema = z.object({
  email: z.string().email('รูปแบบอีเมลไม่ถูกต้อง'),
  password: z.string().min(4, 'รหัสผ่านต้องมีอย่างน้อย 4 ตัวอักษร'),
});

export const changePasswordSchema = z.object({
  oldPassword: z.string().min(1, 'ระบุรหัสผ่านเดิม'),
  newPassword: z.string().min(8, 'รหัสผ่านใหม่ต้องมีอย่างน้อย 8 ตัวอักษร'),
});
