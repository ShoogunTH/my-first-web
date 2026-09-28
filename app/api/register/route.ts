import { createUser } from '@/lib/users';
import { withErrorHandling } from '@/lib/withErrorHandling';

export const POST = withErrorHandling(async (request: Request) => {
  const body = await request.json();
  const newUser = await createUser(body);

  const res = Response.json({ ok: true, user: { id: newUser.id, email: newUser.email } }, { status: 201 });
  res.headers.set(
    'Set-Cookie',
    `session=${newUser.id}; Path=/; HttpOnly; SameSite=Strict`
  );
  return res;
});
