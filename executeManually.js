const axios = require("axios");
const fetchXml = require('./fetchXml')
async function executeManually() {
  try {
    const popularXml = await fetchXml();
    await axios.post('https://popularscrapper.francis.center/insert', {
      compra: popularXml.DollarBuyRate,
      venta: popularXml.DollarSellRate,
      ...popularXml })
    return {
      post: 'successful',
    }
  } catch (error) {
    return {
      post: 'unsuccessful',
      error: error.toString(),
      stack: error.stack,
    }
  }
}

executeManually()