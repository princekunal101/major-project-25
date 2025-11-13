import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { randomUUID } from 'crypto';

// initialize Prisma Client
const prisma = new PrismaClient();

async function main() {
  // create two dummy articles
  const community_user1 = await prisma.communityUser.upsert({
    where: { userId: 'asdfghjlwedfrfgrhjuae' },
    update: {},
    create: {
      userId: 'asdfghjlwedfrfgrhjuae',
      isAllowed: true,
      isPremium: false,
    },
  });
  const community_user2 = await prisma.communityUser.upsert({
    where: { userId: 'asdasdhjlwedfrfgrhjuae' },
    update: {isPremium: true},
    create: {
      userId: 'asdasdhjlwedfrfgrhjuae',
      isAllowed: true,
      isPremium: false,
    },
  });

  console.log({ community_user1, community_user2 });
}

// execute the main function
main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    // close Prisma Client at the end
    await prisma.$disconnect();
  });
