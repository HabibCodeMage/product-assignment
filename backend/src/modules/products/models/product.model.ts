import { Product } from '@prisma/client';

export class ProductModel {
  id: string;
  name: string;
  description: string | null;
  price: number;
  filePaths: string[];
  userId: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(product: Product) {
    this.id = product.id;
    this.name = product.name;
    this.description = product?.description || null;
    this.price = product.price;
    this.filePaths = product.filePaths;
    this.userId = product.userId;
    this.createdAt = product.createdAt;
    this.updatedAt = product.updatedAt;
  }
}
