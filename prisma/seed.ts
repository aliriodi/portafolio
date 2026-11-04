import 'dotenv/config';
import {PrismaClient} from '../src/generated/prisma/client';
import {PrismaBetterSqlite3} from '@prisma/adapter-better-sqlite3';
const prisma = new PrismaClient({adapter: new PrismaBetterSqlite3({url: process.env.DATABASE_URL!})});
async function main() {
  for (const slug of ['web-development', 'electrical-engineering']) {
    await prisma.portfolio.upsert({where: {slug}, update: {}, create: {slug}});
  }
}
main().catch((error: unknown) => {console.error(error); process.exitCode = 1;}).finally(() => prisma.$disconnect());
