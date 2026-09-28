type Handler<T = any> = (req: Request, ctx: T) => Promise<Response>;

export function withErrorHandling<T = any>(handler: Handler<T>): Handler<T> {
  return async (req: Request, ctx: T) => {
    try {
      return await handler(req, ctx);
    } catch (err: unknown) {
      console.error('API Error:', err);
      const errorObj = err as { status?: number; message?: string };
      const status = typeof errorObj?.status === 'number' ? errorObj.status : 500;
      const message = errorObj?.message || 'เกิดข้อผิดพลาดที่ไม่คาดคิด';
      return Response.json(
        { error: message },
        { status }
      );
    }
  };
}
