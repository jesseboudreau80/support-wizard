import { PrismaClient } from '@prisma/client';
import { databaseUrl } from '../../prisma.config';

const createPrismaClient = (): PrismaClient => {
  if (!databaseUrl) {
    return new PrismaClient();
  }

  try {
    // These imports are required only when the PG driver is available.
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const { Pool } = require('pg') as typeof import('pg');
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const { PrismaPg } = require('@prisma/adapter-pg') as typeof import('@prisma/adapter-pg');

    const pool = new Pool({ connectionString: databaseUrl });
    const adapter = new PrismaPg(pool);

    return new PrismaClient({ adapter } as unknown as Parameters<typeof PrismaClient>[0]);
  } catch (error) {
    const fallbackMessage =
      error instanceof Error ? error.message : 'Unable to load @prisma/adapter-pg and pg dependencies.';

    // eslint-disable-next-line no-console
    console.warn(`Falling back to default PrismaClient without driver adapter: ${fallbackMessage}`);
    return new PrismaClient();
  }
};

export const prisma = createPrismaClient();
