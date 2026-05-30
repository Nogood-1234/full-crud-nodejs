
const express = require('express');

const userRoutes = require('./routes/users');
const productRoutes = require('./routes/products');

const app = express();
app.use(express.json());

app.use('/users', userRoutes);
app.use('/products', productRoutes);

app.use((req, res) => res.status(404).json({ error: 'Not found' }));


app.listen(3000, () => console.log('Server running → http://localhost:3000'));
