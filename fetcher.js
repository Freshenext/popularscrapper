const URL = `https://popularenlinea.com/_api/web/lists/getbytitle('Rates')/items?$filter=ItemID%20eq%20%271%27`
const { default: axios } = require('axios');
const agents = require('random-useragent')

async function fetcher() {
  const { CookieJar } = await import('node-fetch-cookies')
  const jar = new CookieJar();
  const agent = agents.getRandom()
  console.log('Fetch first')
  await axios(URL, {
    jar,
    headers: {
      'User-Agent': agent
    }
  })
  console.log('Fetch second')
  const data = await axios(URL, {
    jar,
    headers: {
      'User-Agent': agent
    }
  });
  console.log(data.data)
  return data
}
module.exports = fetcher
