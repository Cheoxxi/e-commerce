import Fastify from "fastify";
import { request } from "http";
import { clerkPlugin, getAuth } from '@clerk/fastify'


const fastify = Fastify();

fastify.register(clerkPlugin);

fastify.get("/health" , (request , reply) =>{
  return reply.status(200).send({
    status:"ok",
    uptime:process.uptime(),
    timeStamp:Date.now(),
  });
});

fastify.get("/test" , (request , reply) =>{
   const  { userId } = getAuth(request)
   if(!userId){
    return reply.send({message:"You are not login !"})
   }
  return reply.send({message:"Order service is authenticated !"})
});

const start = async () => {
  try {
    await fastify.listen({ port: 8001 }); 
    console.log("Order service is running on port 8001");
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};
start();

