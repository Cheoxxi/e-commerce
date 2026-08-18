import { FastifyReply, FastifyRequest, preHandlerHookHandler } from "fastify";
import { getAuth } from "@clerk/fastify";
import type { CustomJwtSessionClaims } from "@repo/types";

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

export const shouldBeAdmin: preHandlerHookHandler = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  const auth = getAuth(request);
  if (!auth.userId) {
    await reply.status(401).send({ message: "You are not loged in!" });
    return;
  }

  const claims = auth.sessionClaims as CustomJwtSessionClaims;

  if (claims.metadata?.role !== "admin") {
    return reply.status(403).send({ message: "You are not authorized to perform this action!" });
  }

  request.userId = auth.userId;
};
