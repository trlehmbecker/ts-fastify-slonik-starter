import { FastifyInstance } from "fastify"
import { sql, createPool } from "slonik"
import { createServer } from "../index"
import loadConfig from "../config"

describe("Users", () => {
  let server: FastifyInstance

  const seedUsers = async () => {
    const { databaseUrl } = await loadConfig()
    const slonik = createPool(databaseUrl)

    await slonik.query(sql`
    INSERT INTO users (email)
    VALUES ('john.doe@example.com'), ('jane.smith@example.org')
    `)
  }

  beforeAll(async () => {
    server = await createServer()
    await seedUsers()
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
    expect(response.json().data).toEqual(
      expect.arrayContaining([expect.objectContaining({ id: 1 }), expect.objectContaining({ id: 2 })])
    )
  })
})
