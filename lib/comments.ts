import { prisma } from './prisma';

export interface CommentData {
  postId: string;
  author: string;
  text: string;
  authorId?: string;
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
