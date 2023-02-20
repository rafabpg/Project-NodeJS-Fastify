import { FastifyReply, FastifyRequest } from "fastify";
import { CreateProductInput } from "../schema/product";
import { createProduct, getProducts } from "../services/product";


export async function createProductHandler(
  request: FastifyRequest<{
    Body: CreateProductInput;
  }>
) {
  const product = await createProduct({
    ...request.body,
    ownerId: request.user.id,
  });

  return product;
}

export async function getProductsHandler() {
  const products = await getProducts();

  return products;
}