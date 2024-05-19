const express = require('express');
const { query, validationResult } = require('express-validator');
const { CurrencyExchangeService } = require('./services/CurrencyExchangeService');

const app = express();
const port = 3000;

const EXCHANGE_RATES = {
  'TWD': {
    'TWD': 1,
    'JPY': 3.669,
    'USD': 0.03281
  },
  'JPY': {
    'TWD': 0.26956,
    'JPY': 1,
    'USD': 0.00885
  },
  'USD': {
    'TWD': 30.444,
    'JPY': 111.801,
    'USD': 1
  }
};

const currencyExchangeService = new CurrencyExchangeService(EXCHANGE_RATES);

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
    const convertedAmount = currencyExchangeService.convert(source, target, parsedAmount);
    const formattedAmount = currencyExchangeService.formatNumber(convertedAmount);
    res.json({ msg: "success", amount: formattedAmount });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Currency exchange API is running at http://localhost:${port}`);
});