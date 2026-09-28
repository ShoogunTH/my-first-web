export class NotFoundError extends Error {
  status = 404;
  constructor(message = 'ไม่พบข้อมูลที่ต้องการ') {
    super(message);
    this.name = 'NotFoundError';
  }
}

export class ValidationError extends Error {
  status = 400;
  constructor(message = 'ข้อมูลไม่ถูกต้อง') {
    super(message);
    this.name = 'ValidationError';
  }
}

export class ForbiddenError extends Error {
  status = 403;
  constructor(message = 'คุณไม่มีสิทธิ์ดำเนินการนี้') {
    super(message);
    this.name = 'ForbiddenError';
  }
}
