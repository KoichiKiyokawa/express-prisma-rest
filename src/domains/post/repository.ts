import { prisma } from "../../modules/prisma";
import { TCreatePostDto } from "./dto/create-post.dto";

export const PostRepository = {
  all() {
    return prisma.post.findMany();
  },
  create(data: TCreatePostDto) {
    return prisma.post.create({ data });
  },
};
