import { getCommentById, editComment, removeComment } from '@/lib/commentService';
import { withErrorHandling } from '@/lib/withErrorHandling';

export const GET = withErrorHandling(async (
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) => {
  const { id } = await params;
  const comment = await getCommentById(id);
  return Response.json({ comment });
});

export const PATCH = withErrorHandling(async (
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) => {
  const { id } = await params;
  const body = await request.json();

  const cookieHeader = request.headers.get('cookie') || '';
  const sessionMatch = cookieHeader.match(/session=([^;]+)/);
  const sessionUserId = sessionMatch ? sessionMatch[1] : undefined;

  const updated = await editComment(id, body.text, sessionUserId);
  return Response.json({ ok: true, item: updated });
});

export const DELETE = withErrorHandling(async (
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) => {
  const { id } = await params;

  const cookieHeader = request.headers.get('cookie') || '';
  const sessionMatch = cookieHeader.match(/session=([^;]+)/);
  const sessionUserId = sessionMatch ? sessionMatch[1] : undefined;

  await removeComment(id, sessionUserId);
  return Response.json({ ok: true }, { status: 200 });
});
