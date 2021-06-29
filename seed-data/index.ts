import { cuts } from './data';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function insertSeedData() {
  // Keystone API changed, so we need to check for both versions to get keystone

  console.log(`🌱 Inserting Seed Data: ${cuts.length} Cuts`);
  for (const cut of cuts) {
    console.log(` 🛍️ Adding cut: ${cut.name}`);
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
  console.log(`✅ Seed Data Inserted: ${cuts.length} Products`);
  console.log(
    `👋 Please start the process with \`yarn dev\` or \`npm run dev\``
  );
  process.exit();
}
