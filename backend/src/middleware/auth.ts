import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../lib/auth.js';

export interface AuthRequest extends Request {
  user?: { id: string; username: string; role: string; name: string };
}

export function authMiddleware(req: AuthRequest, res: Response, next: NextFunction) {
  const header = req.headers.authorization;
  if (!header?.startsWith('Bearer ')) return res.status(401).json({ error: 'Unauthorized' });
  const token = header.slice(7);
  try {
    const payload = verifyToken(token);
    req.user = payload;
    next();
  } catch {
    return res.status(401).json({ error: 'Token tidak valid' });
  }
}

export function requireRole(...roles: string[]) {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user) return res.status(401).json({ error: 'Unauthorized' });
    if (!roles.includes(req.user.role)) return res.status(403).json({ error: 'Forbidden: role tidak diizinkan' });
    next();
  };
}
