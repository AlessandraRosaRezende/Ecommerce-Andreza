import { IProduct } from "../interfaces/IProduct.js";
import { Product } from "../models/product.model.js";

export async function getProducts(): Promise<IProduct[] | null> {
  try {
    const products = await Product.find();
    return products;
  } catch (error) {
    console.log(error);
    return null
  }
}

export async function createProduct(product: IProduct): Promise<IProduct | null> {
  try {
    const createdProduct = await Product.create(product);
    return createdProduct;
  } catch (error) {
    console.log(error);
    return null
  }
}