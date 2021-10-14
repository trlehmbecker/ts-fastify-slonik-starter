import { UserService } from "../services/user.service"
import { FastifyReply, FastifyRequest, FastifySchema } from "fastify"
import { Controller, GET, POST, DELETE } from "fastify-decorators"
import { userSerializer } from "../services/user-serializer.service"
import { Serializer } from "ts-japi"

const userIdSchema: FastifySchema = { params: { id: { type: "number" } } }

@Controller({ route: "/users" })
export default class SimpleController {
  serializer: Serializer

  constructor(private userService: UserService) {
    this.serializer = userSerializer
  }

  @GET("/")
  async getHandler(request: FastifyRequest, reply: FastifyReply): Promise<unknown> {
    const users = await this.userService.findAll()
    return this.serializer.serialize(users)
  }

  @GET("/:id", { schema: userIdSchema })
  async getSingleHandler(request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply): Promise<unknown> {
    const user = await this.userService.findById(request.params.id)
    return this.serializer.serialize(user)
  }

  @POST("/")
  async postHandler(request: FastifyRequest<{ Body: { email: string } }>, reply: FastifyReply): Promise<unknown> {
    const { email } = request.body
    await this.userService.create(email)
    reply.code(201)
    return ""
  }

  @DELETE("/:id", { schema: userIdSchema })
  async deleteHandler(request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply): Promise<unknown> {
    await this.userService.delete(request.params.id)
    reply.code(204)
    return
  }
}
