class CurrencyExchangeService {
  constructor(exchangeRates) {
      this.exchangeRates = exchangeRates;
  }

  convert(source, target, amount) {
      amount = amount.toFixed(2);
      if (!this.exchangeRates[source] || !this.exchangeRates[target]) {
          throw new Error("Unsupported currency");
      }

      const rate = this.exchangeRates[source][target];
      if (!rate) {
          throw new Error("Missing exchange rate");
      }

      return (amount * rate).toFixed(2);
  }

  formatNumber(number) {
      return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
}

module.exports = {
  CurrencyExchangeService
};