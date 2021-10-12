import Fastify, { FastifyInstance } from "fastify"
import fastifySlonik from "fastify-slonik"
import { bootstrap } from "fastify-decorators"
import "reflect-metadata"
import loadConfig from "./config"

const server: FastifyInstance = Fastify({})

const start = async () => {
  const config = await loadConfig()

  // Setup Slonik
  server.register(fastifySlonik, { connectionString: config.databaseUrl })

  // Register handlers auto-bootstrap
  server.register(bootstrap, {
    // Specify directory with our controllers
    directory: config.paths.controllers,

    // Specify mask to match only our controllers
    mask: /\.controller\./,
  })

  try {
    await server.listen(config.httpPort)
    const address = server.server.address()
    const port = typeof address === "string" ? address : address?.port
    console.log(`Server listening on port ${port}`)
  } catch (err) {
    server.log.error(err)
    process.exit(1)
  }
}

start()
