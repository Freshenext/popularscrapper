const URL = `https://popularenlinea.com/_api/web/lists/getbytitle('Rates')/items?$filter=ItemID%20eq%20%271%27`
const { default: axios } = require('axios');
const { CookieJar } = require('tough-cookie');
const { wrapper } = require('axios-cookiejar-support');

async function fetcher(){
  const jar = new CookieJar();
  const client = wrapper(axios.create({ jar, validateStatus: () => true, headers: {
      'User-Agent': `Mozilla/5.0 (Linux; Android 12; SM-S906N Build/QP1A.190711.020; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/80.0.3987.119 Mobile Safari/537.36`
    } }));
  await client.get(URL)
  return await client.get(URL)
}

module.exports = fetcher
