import { Router } from 'express';
import { ProductsController } from './products.controller';
import { authenticate } from '../../middlewares/auth.middleware';
import upload from '../../middlewares/upload.middleware';
import { productsService } from './products.service';
import { ProductDto } from './dto/product.dto';
import { validateDto } from '../../middlewares/validation.middleware';

const router = Router();
const productsController = new ProductsController(productsService);

router.use(authenticate);

// Define routes
router.post('/', upload.array('files'), validateDto(ProductDto), productsController.create.bind(productsController));
router.get('/', productsController.getAll.bind(productsController));
router.get('/:id', productsController.getById.bind(productsController));
router.delete('/:id', productsController.delete.bind(productsController));

export default router;
