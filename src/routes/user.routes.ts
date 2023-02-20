import { FastifyInstance } from "fastify";
import { getUsersHandler, loginHandler, registerUserHandler } from "../controller/user";
import { $ref } from "../schema/user";

async function userRoutes(server:FastifyInstance){
    server.post('/users',{
        schema:{
            body:$ref("createUserSchema"),
            response:{
                201: $ref("createUserResponseSchema")

            }
        }
    },registerUserHandler);

    server.post(
        "/login",
        {
          schema: {
            body: $ref("loginSchema"),
            response: {
              200: $ref("loginResponseSchema"),
            },
          },
        },
        loginHandler
      );
    
      server.get(
        "/",
        {
          preHandler: [server.authenticate],
        },
        getUsersHandler
      );
}

export default userRoutes;