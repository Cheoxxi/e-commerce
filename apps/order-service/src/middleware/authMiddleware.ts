import { FastifyReply, FastifyRequest, preHandlerHookHandler } from "fastify";
import { getAuth } from "@clerk/fastify";

declare module "fastify" {
  interface FastifyRequest {
    userId?: string;
  }
}

export const shouldBeUser: preHandlerHookHandler = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  const { userId } = getAuth(request);
  if (!userId) {
    await reply.status(401).send({ message: "You are not loged in!" });
    return;
  }

  request.userId = userId;
};
