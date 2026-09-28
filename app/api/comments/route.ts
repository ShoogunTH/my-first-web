import { listComments, createComment } from '@/lib/commentService';
import { withErrorHandling } from '@/lib/withErrorHandling';

export const GET = withErrorHandling(async (request: Request) => {
  const url = new URL(request.url);
  const postId = url.searchParams.get('postId') ?? '';
  const comments = await listComments(postId);
  return Response.json({ comments });
});

export const POST = withErrorHandling(async (request: Request) => {
  const body = await request.json();
  const cookieHeader = request.headers.get('cookie') || '';
  const sessionMatch = cookieHeader.match(/session=([^;]+)/);
  const sessionUserId = sessionMatch ? sessionMatch[1] : undefined;

  const saved = await createComment(body, sessionUserId);
  return Response.json({ ok: true, item: saved }, { status: 201 });
});
