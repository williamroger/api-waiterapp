import { Router } from 'express';
import path from 'node:path';

import multer from 'multer';

import { listCategories } from './app/useCases/categories/listCategories.ts';
import { createCategory } from './app/useCases/categories/createCategory.ts';
import { listProducts } from './app/useCases/products/listProducts.ts';
import { createProduct } from './app/useCases/products/createProducts.ts';
import { listProductsByCategory } from './app/useCases/categories/listProductsByCategory.ts';
import { listOrders } from './app/useCases/orders/listOrders.ts';
import { createOrder } from './app/useCases/orders/createOrder.ts';
import { changeOrderStatus } from './app/useCases/orders/changeOrderStatus.ts';
import { cancelOrder } from './app/useCases/orders/cancelOrder.ts';

export const router = Router();

const currentDir = import.meta.dirname;

const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, callback) {
      callback(null, path.resolve(currentDir, '..', 'uploads'));
    },
    filename(req, file, callback) {
      callback(null, `${Date.now()}-${file.originalname}`);
    }
  })
});

// List categories
router.get('/categories', listCategories);

// Create category
router.post('/categories', createCategory);

// List products
router.get('/products', listProducts);

// Create product
router.post('/products', upload.single('image'), createProduct);

// Get products by category
router.get('/categories/:categoryId/products', listProductsByCategory);

// List orders
router.get('/orders', listOrders);

// Create order
router.post('/orders', createOrder);

// Change order status
router.patch('/orders/:orderId', changeOrderStatus);

// Delete/Cancel order
router.delete('/orders/:orderId', cancelOrder);
