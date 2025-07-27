import express from 'express';
import { salesDataSource } from './salesDataSource';

const router = express.Router();

interface SaleEntry {
  product: string;
  quantity: number;
  price: number;
}

router.get('/:product', (req, res) => {
  try {
    const { product } = req.params;

    const filtered: SaleEntry[] = salesDataSource.filter(
      (entry: SaleEntry) => entry.product.toLowerCase() === product.toLowerCase()
    );

    if (!filtered.length) {
      return res.status(404).json({ message: `No sales data found for "${product}"` });
    }

    const quantities: number[] = filtered.map((entry: SaleEntry) => entry.quantity);
    const prices: number[] = filtered.map((entry: SaleEntry) => entry.price);

    const stats = {
      product,
      mostSold: Math.max(...quantities),
      leastSold: Math.min(...quantities),
      highestPrice: Math.max(...prices),
      lowestPrice: Math.min(...prices),
      averagePrice: Math.round(prices.reduce((a: number, b: number) => a + b, 0) / prices.length),
      recentPrice: prices[0] 
    };

    res.json(stats);
  } catch (err) {
    console.error(`Error fetching stats for ${req.params.product}:`, err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

export default router;