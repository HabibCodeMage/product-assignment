import { Router } from 'express';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';

const router = Router();
const productsService = new ProductsService();
const productsController = new ProductsController(productsService);

// Define routes
router.get('/', productsController.getAllProducts.bind(productsController));
router.get('/:id', productsController.getProductById.bind(productsController));

export default router;
