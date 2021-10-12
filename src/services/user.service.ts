import { Initializer, Service } from "fastify-decorators"
import { sql, DatabasePoolType, QueryResultRowType } from "slonik"
import { ConnectionService } from "./connection.service"
import { UserNotFoundError, UserNotCreatedError } from "./user-serializer.service"

@Service()
export class UserService {
  pool!: DatabasePoolType

  constructor(private connectionService: ConnectionService) {}

  @Initializer([ConnectionService])
  async init(): Promise<void> {
    this.pool = this.connectionService.getPool()
  }

  async findAll() {
    const users = await this.pool.connect((connection) => {
      return connection.query(sql`SELECT id, email FROM users`)
    })

    if (users.rowCount === 0) {
      return false
    }

    return users.rows
  }

  async findById(id: string) {
    const user = await this.pool.connect((connection) => {
      return connection.one(sql`SELECT id, email FROM users WHERE id = ${id}`)
    })

    if (!user) {
      throw new UserNotFoundError(`User (id=${id}) Not Found`)
    }

    return user
  }

  async create(email: string): Promise<boolean> {
    try {
      const user = await this.pool.connect((connection) => {
        return connection.query(sql`INSERT INTO users (email) VALUES (${email})`)
      })

      if (user.rowCount === 1) {
        return true
      }
    } catch (err) {
      throw new UserNotCreatedError("email not unique")
    }

    return false
  }

  async delete(id: string): Promise<boolean> {
    const deleted = await this.pool.connect((connection) => {
      return connection.query(sql`DELETE FROM users WHERE id = ${id}`)
    })

    if (deleted.rowCount === 1) {
      return true
    }

    return false
  }
}
