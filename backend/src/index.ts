import express from 'express';
import salesDataRouter from './salesData';

const app = express();

app.use('/api/sales-data', salesDataRouter);

app.get('/', (_, res) => res.send('Welcome to SakaMarket!'));

app.listen(3000, () => {
  console.log('Server running at http://localhost:3000');
});