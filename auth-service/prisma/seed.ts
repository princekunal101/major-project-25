import 'dotenv/config';
import { PrismaClient } from '@prisma/client';

// initialize Prisma Client
const prisma = new PrismaClient();

async function main() {
  // Create a user
  const user = await prisma.user.create({
    data: {
      email: 'jhon@gmail.com',
      isVerified: false,
    },
  });

  // Create Otp for the user
  const otp = await prisma.otp.create({
    data: {
      code: '123456',
      expiresAt: new Date(Date.now() + 15 * 60 * 1000), // 15 minutes from now
      userId: user.id,
    },
  });

  const token = await prisma.refreshToken.upsert({
    where: { userId: user.id },
    update: {
      token: 'sample-refresh-token',
      expiresAt: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days from now
    },
    create: {
      userId: user.id,
      token: 'sample-refresh-token',
      expiresAt: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days from now
    },
  });

  const resetPassword = await prisma.resetToken.upsert({
    where: { userId: user.id },
    update: {
      token: 'sample-token',
      expiresAt: new Date(Date.now() + 15 * 60 * 1000), // 15 minutes
    },
    create: {
      userId: user.id,
      token: 'reset-token',
      expiresAt: new Date(Date.now() + 15 * 60 * 1000), // 15 minutes
    },
  });

  console.log('Seeded user and otp', { user, otp, token });
}

// execute the main function
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
