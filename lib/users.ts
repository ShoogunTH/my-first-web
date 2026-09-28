import bcrypt from 'bcrypt';
import { prisma } from './prisma';
import { userSchema } from './schemas';
import { ValidationError } from './errors';
import { ZodError } from 'zod';

export async function findUserByEmail(email: string) {
  return prisma.user.findUnique({ where: { email } });
}

export async function findUserById(id: string) {
  return prisma.user.findUnique({ where: { id } });
}

export async function createUser(raw: unknown) {
  let validated;
  try {
    validated = userSchema.parse(raw);
  } catch (err) {
    if (err instanceof ZodError) {
      throw new ValidationError(err.issues[0].message);
    }
    throw err;
  }

  const existing = await findUserByEmail(validated.email);
  if (existing) {
    throw new ValidationError('อีเมลนี้ถูกใช้งานแล้ว');
  }

  // Hash password using bcrypt (cost factor 10)
  const hashedPassword = await bcrypt.hash(validated.password, 10);

  return prisma.user.create({
    data: {
      email: validated.email,
      password: hashedPassword,
    },
  });
}

export async function verifyUserPassword(email: string, plainPassword: string) {
  const user = await findUserByEmail(email);
  if (!user) return null;

  const isValid = await bcrypt.compare(plainPassword, user.password);
  if (!isValid) return null;

  return user;
}

export async function changeUserPassword(userId: string, oldPassword: string, newPassword: string) {
  const user = await findUserById(userId);
  if (!user) {
    throw new ValidationError('ไม่พบข้อมูลผู้ใช้');
  }

  const isValid = await bcrypt.compare(oldPassword, user.password);
  if (!isValid) {
    throw new ValidationError('รหัสผ่านเดิมไม่ถูกต้อง');
  }

  if (newPassword.length < 8) {
    throw new ValidationError('รหัสผ่านใหม่ต้องมีอย่างน้อย 8 ตัวอักษร');
  }

  const newHashedPassword = await bcrypt.hash(newPassword, 10);

  return prisma.user.update({
    where: { id: userId },
    data: { password: newHashedPassword },
  });
}
