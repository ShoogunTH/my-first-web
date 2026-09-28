import { reactToComment } from '@/lib/commentService';
import { withErrorHandling } from '@/lib/withErrorHandling';

export const POST = withErrorHandling(async (request: Request, context?: { params?: Promise<{ id: string }> }) => {
  const params = context?.params ? await context.params : { id: '' };
  const id = params.id;
  const body = await request.json();
  const emoji = body.emoji;

  const item = await reactToComment(id, emoji);
  return Response.json({ ok: true, item });
});
