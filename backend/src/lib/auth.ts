import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret-change-me-32-chars';
const JWT_EXPIRES = process.env.JWT_EXPIRES_IN || '7d';

export async function hashPassword(plain: string): Promise<string> {
  const rounds = parseInt(process.env.BCRYPT_ROUNDS || '10', 10);
  return bcrypt.hash(plain, rounds);
}
export async function verifyPassword(plain: string, hash: string): Promise<boolean> {
  return bcrypt.compare(plain, hash);
}
export function signToken(payload: object): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES } as any);
}
export function verifyToken(token: string): any {
  return jwt.verify(token, JWT_SECRET);
}
