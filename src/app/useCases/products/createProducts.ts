import type { Request, Response } from 'express';

import { Product } from '../../models/Product.ts';

export async function createProduct(req: Request, res: Response) {
  try {
    console.log('req file ', req.file)
    console.log('req body ', req.body)
    const imagePath = req.file?.filename ?? '';
    const { name, description, price, category, ingredients } = req.body;

    const product = await Product.create({
      name,
      description,
      imagePath,
      price: Number(price),
      category,
      ingredients: JSON.parse(ingredients),
    });

    res.status(201).json(product);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}
