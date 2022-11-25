var axios = require('axios');

var config = {
  method: 'get',
  url: 'https://popularenlinea.com/_api/web/lists/getbytitle(\'Rates\')/items?$filter=ItemID%20eq%20%271%27',
  headers: {
    'accept': 'application/json; odata=verbose',
    'accept-encoding': 'application/gzip',
    'X-Requested-With': 'XMLHttpRequest',
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36',
    'cache-control': 'no-cache',
  }
};

async function runAxios(){
  try {
    const response = await axios(config)
    return response.data
  } catch (error) {
    console.log('Error')
    return {
      error: error.toString(),
      trace: error.trace,
    }
  }
}

module.exports = runAxios