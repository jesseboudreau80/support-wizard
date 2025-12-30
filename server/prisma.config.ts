import dotenv from 'dotenv';

dotenv.config();

export const prismaConfig = {
  schema: './prisma/schema.prisma',
  datasources: {
    db: {
      provider: 'postgresql',
      url: process.env.DATABASE_URL || '',
    },
  },
  generators: {
    client: {
      provider: 'prisma-client-js',
    },
  },
};

export const databaseUrl = prismaConfig.datasources.db.url;

export default prismaConfig;
