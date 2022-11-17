const URL = `https://popularenlinea.com/_api/web/lists/getbytitle('Rates')/items?$filter=ItemID%20eq%20%271%27`
const agents = require('random-useragent')

async function fetcher() {
  const { fetch, CookieJar } = await import('node-fetch-cookies')
  const jar = new CookieJar();
  const agent = agents.getRandom()
  console.log('Fetch first')
  await fetch(jar, URL, {
    headers: {
      'User-Agent': agent,
      'Accept': 'application/json',
    }
  })
  console.log('Fetch second')
  await new Promise(res => setTimeout(res, 1000))
  const data = await fetch(jar, URL, {
    headers: {
      'User-Agent': agent,
      'Accept': 'application/json',
    }
  });
  const json = await data.json()
  return json
}
module.exports = fetcher
