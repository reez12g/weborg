import { PrismaClient } from '@prisma/client';
import { hash } from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  // company seed
  for (let i: number = 100; i <= 105; i++) {
    const password = await hash(`password${i}`, 12);
    const company = await prisma.company.create({
      data: {
        name: `Company${i}`,
        description: `This is a great company ${i}.`,
        address: `Address ${i}`,
        administrators: {
          create: {
            name: `Admin${i}`,
            email: `abc${i}@abc.com`,
            password: password,
          }
        }
      },
    });
    console.log({ company });
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
