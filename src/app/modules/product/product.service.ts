import type { IProduct } from "./product.interface";
import { Product } from "./product.model";

const createProduct = async (payload: IProduct) => {
  const product = await Product.create(payload);
  return product;
};

const getAllProducts = async () => {
  const products = await Product.find();
  return products;
};

const getProductById = async (productId: string) => {
  const product = await Product.findById(productId);
  return product;
};

export const ProductServices = {
  createProduct,
  getAllProducts,
  getProductById,
};
