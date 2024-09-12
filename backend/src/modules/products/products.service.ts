import { ProductModel } from './models/product.model';
import prisma from "../../config/database.config";

export class ProductsService {
  async createProduct(data: {
    name: string;
    description?: string;
    price: number;
    filePaths: string[];
    userId: string;
  }): Promise<ProductModel> {
    return await prisma.product.create({
      data,
    });
  }

  async getProducts(page: number, limit: number): Promise<ProductModel[]> {
    const skip = (page - 1) * limit;
    return await prisma.product.findMany({
      skip: skip,
      take: limit,
    });
  }  

  async getProductById(id: string): Promise<ProductModel | null> {
    return await prisma.product.findUnique({
      where: { id },
    });
  }

  async updateProduct(id: string, data: {
    name?: string;
    description?: string;
    price?: number;
    filePaths?: string[];
  }): Promise<ProductModel | null> {
    return await prisma.product.update({
      where: { id },
      data,
    });
  }

  async deleteProduct(id: string): Promise<ProductModel> {
    return await prisma.product.delete({
      where: { id },
    });
  }
}

export const productsService = new ProductsService();
