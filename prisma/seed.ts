import { PrismaClient } from "../src/generated/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export async function seed() {
  prisma.$connect();
  await prisma.user.create({
    data: {
      email: "hoge@example.com",
      password: bcrypt.hashSync("hogehoge"),
    },
  });
  await prisma.user.create({
    data: {
      email: "hoge2@example.com",
      password: bcrypt.hashSync("hogehoge2"),
    },
  });

  prisma.$disconnect();
}
