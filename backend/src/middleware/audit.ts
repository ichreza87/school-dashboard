import { prisma } from '../lib/prisma.js';
import { AuthRequest } from './auth.js';
import { Response, NextFunction } from 'express';

export function audit(action: string, entity: string) {
  return async (req: AuthRequest, _res: Response, next: NextFunction) => {
    try {
      await prisma.auditLog.create({
        data: {
          userId: req.user?.id || null,
          action,
          entity,
          entityId: (req.params as any)?.id || null,
          detail: JSON.stringify({ body: req.body, query: req.query }).slice(0, 2000),
          ip: req.ip,
        },
      });
    } catch {}
    next();
  };
}
