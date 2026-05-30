// routes/products.js
// Add validation: name required, price must be a number

const express = require('express');
const mysql = require('mysql2');
const { body, validationResult } = require('express-validator');
const router = express.Router();

const db = mysql.createConnection({
  host: 'localhost', user: 'root', password: 'root123', port: 3308, database: 'nodejsclass'
});
db.connect(err => { if (err) throw err; });

const validateProduct = [
  body('name').notEmpty().withMessage('Name is required'),
  body('price')
    .custom(value => typeof value === 'number' && Number.isFinite(value) && value >= 0)
    .withMessage('Price must be a non-negative number'),
];

// const validateProduct = [
//   body('name').notEmpty().withMessage('Name is required'),
//   body('price').isFloat({ min: 0 }).withMessage('Price must be a positive number'),
// ];

router.get('/', (req, res, next) => {
  db.query('SELECT * FROM products', (err, results) => {
    if (err) return next(err);
    res.json(results);
  });
});

router.get('/:id', (req, res, next) => {
  db.query('SELECT * FROM products WHERE id = ?', [req.params.id], (err, results) => {
    if (err) return next(err);
    if (results.length === 0) return res.status(404).json({ error: 'Product not found' });
    res.json(results[0]);
  });
});

router.post('/', validateProduct, (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  const { name, price } = req.body;
  db.query('INSERT INTO products (name, price) VALUES (?, ?)', [name, price], (err, result) => {
    if (err) return next(err);
    res.status(201).json({ id: result.insertId, name, price });
  });
});

router.put('/:id', validateProduct, (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  const { name, price } = req.body;
  db.query(
    'UPDATE products SET name = ?, price = ? WHERE id = ?',
    [name, price, req.params.id],
    (err, result) => {
      if (err) return next(err);
      if (result.affectedRows === 0) return res.status(404).json({ error: 'Product not found' });
      res.json({ id: Number(req.params.id), name, price });
    }
  );
});

router.delete('/:id', (req, res, next) => {
  db.query('DELETE FROM products WHERE id = ?', [req.params.id], (err, result) => {
    if (err) return next(err);
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Product not found' });
    res.json({ message: 'Product deleted' });
  });
});

module.exports = router;
