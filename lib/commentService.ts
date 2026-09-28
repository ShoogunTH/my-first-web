import * as CommentModel from './comments';
import { commentSchema } from './schemas';
import { cleanRichText } from './sanitize';
import { NotFoundError, ValidationError, ForbiddenError } from './errors';
import { Prisma } from '@prisma/client';
import { ZodError } from 'zod';

export async function createComment(raw: unknown, authorId?: string) {
  let validated;
  try {
    validated = commentSchema.parse(raw);
  } catch (err) {
    if (err instanceof ZodError) {
      throw new ValidationError(err.issues[0].message);
    }
    throw err;
  }

  const safeText = cleanRichText(validated.text);

  return CommentModel.addComment({
    postId: validated.postId,
    author: validated.author,
    text: safeText,
    authorId,
  });
}

export async function listComments(postId: string) {
  if (!postId) {
    throw new ValidationError('ต้องระบุ postId');
  }
  return CommentModel.getCommentsByPostId(postId);
}

export async function getCommentById(id: string) {
  const item = await CommentModel.getCommentById(id);
  if (!item) {
    throw new NotFoundError('ไม่พบความคิดเห็นนี้');
  }
  return item;
}

export async function editComment(id: string, text: string, sessionUserId?: string) {
  const existing = await getCommentById(id);

  if (sessionUserId && existing.authorId && existing.authorId !== sessionUserId) {
    throw new ForbiddenError('คุณไม่มีสิทธิ์แก้ไขความคิดเห็นนี้');
  }

  if (!text || text.trim() === '') {
    throw new ValidationError('ข้อความห้ามเป็นค่าว่าง');
  }

  const safeText = cleanRichText(text);

  try {
    return await CommentModel.updateComment(id, safeText);
  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === 'P2025') {
      throw new NotFoundError('ไม่พบความคิดเห็นนี้');
    }
    throw err;
  }
}

export async function removeComment(id: string, sessionUserId?: string) {
  const existing = await getCommentById(id);

  if (sessionUserId && existing.authorId && existing.authorId !== sessionUserId) {
    throw new ForbiddenError('คุณไม่มีสิทธิ์ลบความคิดเห็นนี้');
  }

  try {
    return await CommentModel.deleteComment(id);
  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === 'P2025') {
      throw new NotFoundError('ไม่พบความคิดเห็นนี้');
    }
    throw err;
  }
}
