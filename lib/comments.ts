import { prisma } from './prisma';

export interface ReactionRecord {
  [emoji: string]: number;
}

export interface CommentData {
  postId: string;
  author: string;
  text: string;
  authorId?: string;
  reactions?: string;
}

export async function addComment(data: CommentData) {
  return prisma.comment.create({
    data: {
      postId: data.postId,
      author: data.author,
      text: data.text,
      authorId: data.authorId || null,
    },
  });
}

export async function getCommentsByPostId(postId: string) {
  return prisma.comment.findMany({
    where: { postId },
    orderBy: { createdAt: 'desc' },
  });
}

export async function getCommentById(id: string) {
  return prisma.comment.findUnique({
    where: { id },
  });
}

export async function updateComment(id: string, text: string) {
  return prisma.comment.update({
    where: { id },
    data: { text },
  });
}

export async function deleteComment(id: string) {
  return prisma.comment.delete({
    where: { id },
  });
}

export async function toggleCommentReaction(id: string, emoji: string) {
  const comment = await prisma.comment.findUnique({ where: { id } });
  if (!comment) return null;

  let currentReactions: Record<string, number> = {};
  try {
    currentReactions = comment.reactions ? JSON.parse(comment.reactions) : {};
  } catch {
    currentReactions = {};
  }

  currentReactions[emoji] = (currentReactions[emoji] || 0) + 1;

  return prisma.comment.update({
    where: { id },
    data: {
      reactions: JSON.stringify(currentReactions),
    },
  });
}

