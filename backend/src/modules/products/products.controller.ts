import { Request, Response } from 'express';
import { ProductsService } from './products.service';

export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  async getAllProducts(req: Request, res: Response) {
    const products = await this.productsService.getAllProducts();
    res.json(products);
  }

  async getProductById(req: Request, res: Response) {
    const productId = req.params.id;
    const product = await this.productsService.getProductById(productId);
    res.json(product);
  }
}
