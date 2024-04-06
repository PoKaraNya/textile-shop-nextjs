// eslint-disable-next-line import/no-extraneous-dependencies
import { PrismaClient } from '@prisma/client';

declare global {
  // allow global `var` declarations
  // eslint-disable-next-line no-var,vars-on-top
  var db: PrismaClient | undefined;
}

export const db = global.db
    || new PrismaClient({
      log: ['query'],
    });

if (process.env.NODE_ENV !== 'production') global.db = db;
