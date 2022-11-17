const URL = `https://popularenlinea.com/_api/web/lists/getbytitle('Rates')/items?$filter=ItemID%20eq%20%271%27`
const { default: axios } = require('axios');
const { CookieJar } = require('tough-cookie');
const { wrapper } = require('axios-cookiejar-support');

async function fetcher() {
  const jar = new CookieJar();
  const client = wrapper(
    axios.create({
      jar,
      validateStatus: () => true,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:53.0) Gecko/20100101 Firefox/53.0'
      }
    }));
  await client.get(URL)
  await new Promise((res) => setTimeout(res, 1000))
  await client.get(URL)
  await new Promise((res) => setTimeout(res, 1000))
  return await client.get(URL)
}

module.exports = fetcher
