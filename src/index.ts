import Fastify, { FastifyInstance } from "fastify"
import fastifySlonik from "fastify-slonik"
import { bootstrap } from "fastify-decorators"
import "reflect-metadata"
import loadConfig from "./config"

export async function createServer(): Promise<FastifyInstance> {
  const config = await loadConfig()
  const server: FastifyInstance = Fastify({})
  server.decorate("config", config)

  // Setup Slonik
  server.register(fastifySlonik, { connectionString: server.config.databaseUrl })

  // Register handlers auto-bootstrap
  server.register(bootstrap, {
    // Specify directory with our controllers
    directory: server.config.paths.controllers,

    // Specify mask to match only our controllers
    mask: /\.controller\./,
  })

  await server.ready()
  return server
}

export async function start(): Promise<void> {
  const server = await createServer()

  try {
    await server.listen(server.config.httpPort)
    const address = server.server.address()
    const port = typeof address === "string" ? address : address?.port
    console.log(`Server listening on port ${port}`)
  } catch (err) {
    server.log.error(err)
    process.exit(1)
  }
}

if (process.env.NODE_ENV !== "test") {
  start()
}
