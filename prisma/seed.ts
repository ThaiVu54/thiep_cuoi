import { PrismaClient } from "@prisma/client";
import { createGuestSlug } from "../lib/slug";

const prisma = new PrismaClient();

async function main() {
  const names = ["Nguyễn Văn A", "Trần Thị B", "Lê Văn C"];

  for (const name of names) {
    const slug = createGuestSlug(name);
    await prisma.guest.upsert({
      where: { slug },
      update: {},
      create: {
        name,
        slug,
        maxSeats: 2,
      },
    });
  }

  await prisma.wish.createMany({
    data: [
      { name: "Nguyễn Văn Minh", content: "Chúc hai bạn trăm năm hạnh phúc!", approved: true },
      { name: "Trần Thị Hạnh", content: "Mãi hạnh phúc nhé!", approved: true },
    ],
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
