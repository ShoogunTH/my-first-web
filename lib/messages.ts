import { prisma } from './prisma';

export interface ContactMessageData {
  name: string;
  email: string;
  message: string;
  authorId?: string;
}

export async function addMessage(data: ContactMessageData) {
  return prisma.message.create({
    data: {
      name: data.name,
      email: data.email,
      message: data.message,
      authorId: data.authorId || null,
    },
  });
}

export async function getMessages(search?: string) {
  if (search) {
    return prisma.message.findMany({
      where: {
        OR: [
          { name: { contains: search } },
          { message: { contains: search } },
        ],
      },
      orderBy: { createdAt: 'desc' },
    });
  }
  return prisma.message.findMany({
    orderBy: { createdAt: 'desc' },
  });
}

export async function getMessageById(id: string) {
  return prisma.message.findUnique({
    where: { id },
  });
}

export async function updateMessage(id: string, updates: Partial<ContactMessageData>) {
  return prisma.message.update({
    where: { id },
    data: updates,
  });
}

export async function deleteMessage(id: string) {
  return prisma.message.delete({
    where: { id },
  });
}
