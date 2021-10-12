import { Initializer, Service, Destructor } from "fastify-decorators"
import { createPool, DatabasePoolType } from "slonik"
import loadConfig from "../config"

@Service()
export class ConnectionService {
  pool!: DatabasePoolType

  @Initializer()
  async init(): Promise<void> {
    const { databaseUrl } = await loadConfig()
    this.pool = createPool(databaseUrl)
  }

  @Destructor()
  async destroy(): Promise<void> {
    await this.pool.end()
  }

  getPool(): DatabasePoolType {
    return this.pool
  }
}
