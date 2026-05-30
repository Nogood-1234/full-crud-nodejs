// Day 5 Mini Project — app.js
// Refactor your Day 4 CRUD into Router files with validation and error handling
// npm install express mysql2 express-validator

const express = require('express');

const userRoutes = require('./routes/users');
const productRoutes = require('./routes/products');

const app = express();
app.use(express.json());

app.use('/users', userRoutes);
app.use('/products', productRoutes);

app.use((req, res) => res.status(404).json({ error: 'Not found' }));

app.use(require('./middleware/errorHandler'));

app.listen(3000, () => console.log('Server running → http://localhost:3000'));
