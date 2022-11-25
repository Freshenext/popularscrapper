const fetcher = require("./fetcher");

async function fetchXml() {
  const popularXml = await fetcher();
  const { DollarBuyRate = 0, DollarSellRate = 0 } = popularXml?.value?.[0] || 0;
  return { DollarBuyRate, DollarSellRate, ...(popularXml?.value?.[0] && popularXml.value[0]) };
}

module.exports = fetchXml