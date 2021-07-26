import { FastifyRequest } from "fastify";
import { validateAuth } from "../core/controller";
import { TCreatePostDto } from "./dto/create-post.dto";
import { PostRepository } from "./repository";

export const PostIndex = async (req: FastifyRequest) => {
  validateAuth(req);

  try {
    const posts = await PostRepository.all();
    return posts;
  } catch (err) {
    console.error(err);
    throw Error("failed to fetch posts");
  }
};

export const PostCreate = async (
  req: FastifyRequest<{ Body: TCreatePostDto }>
) => {
  // validateAuth(req);

  return await PostRepository.create(req.body);
};
