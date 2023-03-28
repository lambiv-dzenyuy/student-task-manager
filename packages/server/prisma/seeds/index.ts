import { Logger } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { seedStudents } from './students';

const prisma = new PrismaClient();

// Prisma doesn't export a specific type for this. We need it because we are passing the client around within transactions.
export type PrismaTransactionClient = Omit<
  PrismaClient,
  '$connect' | '$disconnect' | '$on' | '$transaction' | '$use'
>;

// Be careful about the execution/completion order with relations
// Ideally create and connect the related entities in the same seed file
async function main() {
  Logger.log('Seeding');
  await seedStudents(prisma);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
