import { FastifyInstance } from "fastify";
import { $ref } from "../schema/product";
import { createProductHandler, getProductsHandler } from "../controller/product";

async function productRoutes(server: FastifyInstance) {
  server.post(
    "/",
    {
      preHandler: [server.authenticate],
      schema: {
        body: $ref("createProductSchema"),
        response: {
          201: $ref("productResponseSchema"),
        },
      },
    },
    createProductHandler
  );

  server.get(
    "/",
    {
      schema: {
        response: {
          200: $ref("productsResponseSchema"),
        },
      },
    },

    getProductsHandler
  );
}

export default productRoutes;