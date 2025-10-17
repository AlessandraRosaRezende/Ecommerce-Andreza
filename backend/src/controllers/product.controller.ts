import { Request, Response } from "express";
import * as productService from "../services/product.service.js";

export async function getProducts(req: Request, res: Response) {
  try {
    const products = await productService.getProducts();
    return res.status(200).json(products);
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" }); 
  }
}

export async function createProduct(req: Request, res: Response) {
   const role = req.user?.role;

  if (role !== "admin") {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const product = await productService.createProduct(req.body);
    return res.status(201).json(product);
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" }); 
  }
}