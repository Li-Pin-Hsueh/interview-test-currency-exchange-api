const express = require('express');
const { query, validationResult } = require('express-validator');

const app = express();
const port = 3000;

app.get('/exchange', [
  query('source').notEmpty().withMessage('Source is required'),
  query('target').notEmpty().withMessage('Target is required'),
  query('amount').notEmpty().withMessage('Amount is required'),
], (req, res) => {
  // Validate request
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { source, target, amount } = req.query;

  // Sanitize amount
  const parsedAmount = parseFloat(amount.replace(/,/g, ''));
  if (isNaN(parsedAmount)) {
    return res.status(400).json({ error: "Invalid amount" });
  }

  try {
    // TODO: Implement currency exchange logic here
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Currency exchange API is running at http://localhost:${port}`);
});