import * as MessageModel from './messages';
import { messageSchema, updateMessageSchema } from './schemas';
import { cleanRichText } from './sanitize';
import { NotFoundError, ValidationError, ForbiddenError } from './errors';
import { Prisma } from '@prisma/client';
import { ZodError } from 'zod';

export async function createMessage(raw: unknown, authorId?: string) {
  let validated;
  try {
    validated = messageSchema.parse(raw);
  } catch (err) {
    if (err instanceof ZodError) {
      throw new ValidationError(err.issues[0].message);
    }
    throw err;
  }

  const safeMessage = cleanRichText(validated.message);

  try {
    return await MessageModel.addMessage({
      name: validated.name,
      email: validated.email,
      message: safeMessage,
      tag: validated.tag,
      authorId,
    });
  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === 'P2002') {
      throw new ValidationError('อีเมลนี้ถูกใช้แล้ว');
    }
    throw err;
  }
}

export async function listMessages(search?: string, tag?: string) {
  const all = await MessageModel.getMessages();
  let filtered = all;

  if (search) {
    const q = search.toLowerCase();
    filtered = filtered.filter((m) =>
      m.name.toLowerCase().includes(q) ||
      m.message.toLowerCase().includes(q)
    );
  }

  if (tag) {
    filtered = filtered.filter((m) => (m as { tag?: string | null }).tag === tag);
  }

  return filtered;
}

export async function getMessageById(id: string) {
  const item = await MessageModel.getMessageById(id);
  if (!item) {
    throw new NotFoundError('ไม่พบข้อความนี้');
  }
  return item;
}

export async function editMessage(id: string, updates: unknown, sessionUserId?: string) {
  const existing = await getMessageById(id);

  if (sessionUserId && existing.authorId && existing.authorId !== sessionUserId) {
    throw new ForbiddenError('คุณไม่มีสิทธิ์แก้ไขข้อความนี้');
  }

  let validated;
  try {
    validated = updateMessageSchema.parse(updates);
  } catch (err) {
    if (err instanceof ZodError) {
      throw new ValidationError(err.issues[0].message);
    }
    throw err;
  }

  if (validated.message !== undefined) {
    if (validated.message.trim() === '') {
      throw new ValidationError('ข้อความห้ามเป็นค่าว่าง');
    }
    validated.message = cleanRichText(validated.message);
  }

  try {
    return await MessageModel.updateMessage(id, validated);
  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === 'P2025') {
      throw new NotFoundError('ไม่พบข้อความนี้');
    }
    throw err;
  }
}

export async function removeMessage(id: string, sessionUserId?: string) {
  const existing = await getMessageById(id);

  if (sessionUserId && existing.authorId && existing.authorId !== sessionUserId) {
    throw new ForbiddenError('คุณไม่มีสิทธิ์ลบข้อความนี้');
  }

  try {
    return await MessageModel.deleteMessage(id);
  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === 'P2025') {
      throw new NotFoundError('ไม่พบข้อความนี้');
    }
    throw err;
  }
}
