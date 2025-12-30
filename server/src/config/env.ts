import dotenv from 'dotenv';

dotenv.config();

export const env = {
  port: process.env.PORT ? parseInt(process.env.PORT, 10) : 4000,
  databaseUrl: process.env.DATABASE_URL || '',
  jwtSecret: process.env.JWT_SECRET || 'changeme',
  reviewMode: process.env.REVIEW_MODE || 'all'
};
