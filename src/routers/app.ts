import {FastifyInstance} from 'fastify'

export function AppRouter(router: FastifyInstance) {
  router.get("/", (_req, res) => {
    res.status(200).send("ok");
  });
}
