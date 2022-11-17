const URL = `https://popularenlinea.com/_api/web/lists/getbytitle('Rates')/items?$filter=ItemID%20eq%20%271%27`
const { default: axios } = require('axios');
const { CookieJar } = require('tough-cookie');
const { wrapper } = require('axios-cookiejar-support');

async function fetcher(){
  const jar = new CookieJar();
  const client = wrapper(axios.create({ jar, validateStatus: () => true }));
  await client.options(URL)
  return await client.get(URL)
}
module.exports = fetcher
