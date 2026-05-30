// routes/users.js
// Add validation using express-validator on POST and PUT
// Use next(err) instead of inline if (err) blocks

const express = require('express');
const mysql = require('mysql2');
const { body, validationResult } = require('express-validator');
const router = express.Router();

const db = mysql.createConnection({
  host: 'localhost', user: 'root', password: 'root123', port: 3308, database: 'nodejsclass'
});
db.connect(err => { if (err) throw err; });

const validateUser = [
  body('name').notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Valid email required'),
];

router.get('/', (req, res, next) => {
  db.query('SELECT * FROM users', (err, results) => {
    if (err) return next(err);
    res.json(results);
  });
});

router.get('/:id', (req, res, next) => {
  db.query('SELECT * FROM users WHERE id = ?', [req.params.id], (err, results) => {
    if (err) return next(err);
    if (results.length === 0) return res.status(404).json({ error: 'User not found' });
    res.json(results[0]);
  });
});

router.post('/', validateUser, (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  const { name, email } = req.body;
  db.query('INSERT INTO users (name, email) VALUES (?, ?)', [name, email], (err, result) => {
    if (err) return next(err);
    res.status(201).json({ id: result.insertId, name, email });
  });
});

router.put('/:id', validateUser, (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  const { name, email } = req.body;
  db.query(
    'UPDATE users SET name = ?, email = ? WHERE id = ?',
    [name, email, req.params.id],
    (err, result) => {
      if (err) return next(err);
      if (result.affectedRows === 0) return res.status(404).json({ error: 'User not found' });
      res.json({ id: Number(req.params.id), name, email });
    }
  );
});

router.delete('/:id', (req, res, next) => {
  db.query('DELETE FROM users WHERE id = ?', [req.params.id], (err, result) => {
    if (err) return next(err);
    if (result.affectedRows === 0) return res.status(404).json({ error: 'User not found' });
    res.json({ message: 'User deleted' });
  });
});

module.exports = router;
