import { changeUserPassword } from '@/lib/users';
import { changePasswordSchema } from '@/lib/schemas';
import { withErrorHandling } from '@/lib/withErrorHandling';
import { ForbiddenError, ValidationError } from '@/lib/errors';
import { ZodError } from 'zod';

export const POST = withErrorHandling(async (request: Request) => {
  const cookieHeader = request.headers.get('cookie') || '';
  const sessionMatch = cookieHeader.match(/session=([^;]+)/);
  const sessionUserId = sessionMatch ? sessionMatch[1] : undefined;

  if (!sessionUserId) {
    throw new ForbiddenError('กรุณาเข้าสู่ระบบก่อนเปลี่ยนรหัสผ่าน');
  }

  const body = await request.json();

  let validated;
  try {
    validated = changePasswordSchema.parse(body);
  } catch (err) {
    if (err instanceof ZodError) {
      throw new ValidationError(err.issues[0].message);
    }
    throw err;
  }

  await changeUserPassword(sessionUserId, validated.oldPassword, validated.newPassword);

  return Response.json({ ok: true, message: 'เปลี่ยนรหัสผ่านสำเร็จ' });
});
