// src/controllers/products.controller.ts
import { Request, Response } from 'express';
import { ProductsService } from './products.service';
import { UserModel } from '../users/models/user.modal';

export class ProductsController {
  constructor(private readonly productService: ProductsService) {}

  // Use multer middleware for handling file uploads
  async create(req: Request, res: Response) {
    const { name, description, price } = req.body;
    const user: UserModel = req.user; // Ensure `req.user` is properly typed

    try {
      const filePaths = (req.files as Express.Multer.File[] || []).map((file) => file.path) || [];
      
      const product = await this.productService.createProduct({ name, description, price: +price, filePaths, userId: user.id });
      res.status(201).json(product);
    } catch (error) {
      console.error('Error creating product:', error);
      res.status(500).json({ message: 'Error creating product' });
    }
  }

  async getAll(req: Request, res: Response) {
    try {
      const products = await this.productService.getProducts();
      res.json(products);
    } catch (error) {
      console.error('Error fetching products:', error);
      res.status(500).json({ message: 'Error fetching products' });
    }
  }

  async getById(req: Request, res: Response) {  
    try {
      const { id } = req.params;

      const product = await this.productService.getProductById(id);
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }
      res.json(product);
    } catch (error) {
      console.error('Error fetching product:', error);
      res.status(500).json({ message: 'Error fetching product' });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const product = await this.productService.getProductById(id);
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }
      
      await this.productService.deleteProduct(id);
      
      res.json({ message: 'Product deleted successfully' });
    } catch (error) {
      console.error('Error deleting product:', error);
      res.status(500).json({ message: 'Error deleting product' });
    }
  }
}
