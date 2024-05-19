const { CurrencyExchangeService } = require('../services/CurrencyExchangeService');

const exchangeRates = {
  'TWD': {
    'TWD': 1,
    'JPY': 3.669,
    'USD': 0.03281
  },
  'JPY': {
    'TWD': 0.26956,
    'JPY': 1,
  },
  'USD': {
    'TWD': 30.444,
    'JPY': 111.801,
    'USD': 1
  }
};

const currencyExchangeService = new CurrencyExchangeService(exchangeRates);

test('convert TWD to JPY', () => {
  expect(currencyExchangeService.convert('TWD', 'JPY', 1525)).toBe('5595.23');
});

test('convert USD to TWD', () => {
  expect(currencyExchangeService.convert('USD', 'TWD', 1)).toBe('30.44');
});

test('unsupported currency', () => {
  expect(() => currencyExchangeService.convert('EUR', 'TWD', 1)).toThrow('Unsupported currency');
});

test('unsupported currency pair', () => {
  expect(() => currencyExchangeService.convert('JPY', 'USD', 1)).toThrow('Missing exchange rate');
});

test('format number with commas', () => {
  expect(currencyExchangeService.formatNumber('12345.67')).toBe('12,345.67');
});

test('format number without decimals', () => {
  expect(currencyExchangeService.formatNumber('1234567')).toBe('1,234,567');
});
