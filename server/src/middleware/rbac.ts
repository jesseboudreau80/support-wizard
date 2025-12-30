import { Request, Response, NextFunction } from 'express';
import { Role } from '../types';

export function requireAuth(req: Request, res: Response, next: NextFunction) {
  if (!req.auth) {
    res.status(401).json({ error: 'Authentication required' });
    return;
  }
  next();
}

export function requireRole(roles: Role[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.auth || !roles.includes(req.auth.role)) {
      res.status(403).json({ error: 'Forbidden' });
      return;
    }
    next();
  };
}
