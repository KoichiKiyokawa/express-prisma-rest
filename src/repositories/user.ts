import { prisma } from "../modules/prisma"

export const UserRepository = {
  findByEmail(email: string) {
    return prisma.user.findUnique({ where: { email } })
  },
}
