import { cuts, users } from './data';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function insertSeedData() {
  // Keystone API changed, so we need to check for both versions to get keystone

  console.log(
    `🌱 Inserting Seed Data: ${cuts.length} total cuts & ${users.length} total users`
  );
  for (const cut of cuts) {
    console.log(`🛍️ Adding cut: ${cut.name}`);
    await prisma.cut.create({
      data: {
        name: cut.name,
        description: cut.description,
        status: cut.status,
        price: cut.price,
        photo: {
          create: { image: cut.photo, altText: cut.description },
        },
      },
    });
  }
  console.log(`✅ Cuts data inserted: ${cuts.length} cuts`);

  console.log(`🐤 Starting user seed now.....`);
  for (const user of users) {
    console.log(`👽 Adding user: ${user.firstName} ${user.lastName}`);
    await prisma.user.create({
      data: {
        name: user.name,
        lastName: user.lastName,
        email: user.email,
        password: user.password,
        address: {
          street: user.street,
          city: user.city,
          state: user.state,
          zip: user.zip,
        },
      },
    });
  }
  console.log(`✅ User data inserted: ${users.length} users`);
  console.log(
    `👋 Please start the process with \`yarn dev\` or \`npm run dev\``
  );
  process.exit();
}
