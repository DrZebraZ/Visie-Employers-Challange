import fastify from "fastify";
import _env from './env/index'
import fastifyCors from "@fastify/cors";

const app = fastify();

app.register(fastifyCors,{
  origin: true,
})

export default app