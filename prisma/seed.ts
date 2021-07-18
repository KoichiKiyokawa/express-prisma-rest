import { PrismaClient } from "@prisma/client"
import bcrypt from "bcryptjs"

const prisma = new PrismaClient()

export async function seed() {
  prisma.$connect()
  await prisma.user.create({
    data: {
      email: "hoge@example.com",
      password: bcrypt.hashSync("hogehoge", 10),
    },
  })

  prisma.$disconnect()
}
