import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  for (let i: number = 1; i <= 5; i++) {
    const post = await prisma.company.create({
      data: {
        name: `Company${i}`,
        description: `This is a great company ${i}.`,
        address: `Address ${i}`,
      },
    });
    console.log({ post });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
