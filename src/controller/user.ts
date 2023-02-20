import {FastifyRequest,FastifyReply} from 'fastify';
import { createUser, findUserByEmail, findUsers } from '../services/user';
import { CreateUserInput, LoginInput } from '../schema/user';
import { verifyPassword } from '../utils/hash';

export async function registerUserHandler(request:FastifyRequest<{
    Body:CreateUserInput;
}>,response:FastifyReply){
    const body = request.body;
    try{
        const user = await createUser(body);

        return response.code(201).send(user)
    }catch(e){
        console.log(e);
        return response.code(500).send(e);
    }
}
export async function loginHandler(
    request: FastifyRequest<{
      Body: LoginInput;
    }>,
    reply: FastifyReply
  ) {
    const body = request.body;
  
    // find a user by email
    const user = await findUserByEmail(body.email);
  
    if (!user) {
      return reply.code(401).send({
        message: "Invalid email or password",
      });
    }
  
    // verify password
    const correctPassword = verifyPassword({
      candidatePassword: body.password,
      salt: user.salt,
      hash: user.password,
    });
  
    if (correctPassword) {
      const { password, salt, ...rest } = user;
      // generate access token
      return { accessToken: request.jwt.sign(rest) };
    }
  
    return reply.code(401).send({
      message: "Invalid email or password",
    });
  }
  
  export async function getUsersHandler() {
    const users = await findUsers();
  
    return users;
  }