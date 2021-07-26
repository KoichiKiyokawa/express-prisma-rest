import { FastifyInstance, FastifyPluginAsync } from "fastify";
import { PostCreate, PostIndex } from "./controller";
import { CreatePostDto } from "./dto/create-post.dto";

export function PostRouter(router: FastifyInstance) {
  router.register(setup, { prefix: "posts" });
}

const setup: FastifyPluginAsync = async (router) => {
  router.get("/", PostIndex);
  router.post("/", { schema: { body: CreatePostDto } }, PostCreate);
};
