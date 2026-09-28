import { cookies } from 'next/headers';
import { prisma } from '@/lib/prisma';
import { withErrorHandling } from '@/lib/withErrorHandling';

export const GET = withErrorHandling(async () => {
  const cookieStore = await cookies();
  const sessionUserId = cookieStore.get('session')?.value;

  if (!sessionUserId) {
    return Response.json({ user: null });
  }

  const user = await prisma.user.findUnique({
    where: { id: sessionUserId },
    select: { id: true, email: true },
  });

  return Response.json({ user });
});
