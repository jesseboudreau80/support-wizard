export type Role = 'SUPERADMIN' | 'ADMIN' | 'AGENT' | 'USER';

export interface AuthContext {
  userId: string;
  orgId: string;
  role: Role;
}

declare module 'express-serve-static-core' {
  interface Request {
    auth?: AuthContext;
  }
}
