import { verifyUserPassword } from '@/lib/users';
import { withErrorHandling } from '@/lib/withErrorHandling';
import { ValidationError } from '@/lib/errors';

export const POST = withErrorHandling(async (request: Request) => {
  const { email, password } = await request.json();

  if (!email || !password) {
    throw new ValidationError('กรุณากรอกอีเมลและรหัสผ่าน');
  }

  const user = await verifyUserPassword(email, password);

  if (!user) {
    return Response.json(
      { error: 'อีเมล/รหัสผ่านไม่ถูกต้อง' },
      { status: 401 }
    );
  }

  const res = Response.json({ ok: true, userId: user.id });
  res.headers.set(
    'Set-Cookie',
    `session=${user.id}; Path=/; HttpOnly; SameSite=Strict`
  );
  return res;
});
