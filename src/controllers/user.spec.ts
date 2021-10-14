import { FastifyInstance } from "fastify"
import { createServer } from "../index"

describe("Users", () => {
  let server: FastifyInstance

  beforeAll(async () => {
    const server = await createServer()
  })

  afterAll(async () => {
    await server.close()
  })

  it("GET All users", async () => {
    const response = await server.inject({
      method: "GET",
      path: "/users",
    })
    expect(response.statusCode).toBe(200)
    expect(response.json()).toEqual({ hello: "world" })
  })
})
