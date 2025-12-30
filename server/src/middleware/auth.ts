import { Request, Response, NextFunction } from 'express';
import { AuthContext, Role } from '../types';

// Simple auth placeholder: in production, replace with OAuth/JWT validation
export function authMiddleware(req: Request, _res: Response, next: NextFunction) {
  const orgId = req.header('x-org-id');
  const userId = req.header('x-user-id');
  const role = (req.header('x-user-role') as Role) || 'USER';

  if (orgId && userId) {
    const authContext: AuthContext = { orgId, userId, role };
    req.auth = authContext;
  }

  next();
}
