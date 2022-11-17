const fetcher = require('./fetcher');
const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;
const mysql = require('mysql2/promise');
const axios = require("axios");

app.use(express.json())
const DB = {
  host: 'localhost',
  user: 'frandev_popular',
  password: 'Popular123!',
  database: 'frandev_popular',
  port: 3306
};

async function getCon() {
  return mysql.createConnection(DB);
}

async function insertTc({ compra, venta, ...rest }) {
  const conn = await getCon();
  return conn.query("insert into tc (compra, venta, json) VALUES (?, ?, ?)", [compra, venta, JSON.stringify({
    ...rest,
    compra,
    venta
  })])
}

async function queryLastTc() {
  const conn = await getCon();
  const [rows] = await conn.execute("select * from tc order by id desc limit 1");
  const { compra, venta, json, ...rest } = rows[0];
  return {
    ...JSON.parse(json),
    compra,
    venta,
    ...rest,
  }
}

async function fetchXml() {
  const popularXml = await fetcher();
  const { DollarBuyRate = 0, DollarSellRate = 0 } = popularXml?.value?.[0] || 0;
  return { DollarBuyRate, DollarSellRate, ...(popularXml?.value?.[0] && popularXml.value[0]) };
}


async function getTc() {
  let xml = await fetchXml();
  const { DollarBuyRate, DollarSellRate } = xml;
  let isInserted = false;
  if (DollarBuyRate && DollarBuyRate !== 0) {
    await insertTc({ compra: DollarBuyRate, venta: DollarSellRate, ...xml });
    isInserted = true
  }
  return {
    isInserted,
  }
}


app.get('/tc', async (req, res) => {
  try {
    const done = await getTc();
    return res.json(done);
  } catch (err) {
    return res.json({ isInserted: false, error: 1, message: err.toString(), trace: err.stack });
  }

})

app.get('/json', async (req, res) => {
  const json = await queryLastTc();
  res.send(json);
});


app.get('/csv', async (req, res) => {
  const json = await queryLastTc();
  for (const key of Object.keys(json)) {
    res.write(`${key},${json[key]}\n`);
    console.log(json[key]);
  }
  res.end();
});

app.get('/test', async (req, res) => {
  try {
    const popularXml = await fetcher();
    res.json(popularXml)
  } catch (error) {
    res.json({ error: true, message: error.toString(), trace: error.stack })
  }
})

app.get('/man', async (req,res) => {
  try {
    const popularXml = await fetchXml();
    await axios.post('https://popularscrapper.francis.center/insert', {
      compra: popularXml.DollarBuyRate,
      venta: popularXml.DollarSellRate,
      ...popularXml })
    return res.json({
      post: 'successful',
    })
  } catch (error) {
    return res.json({
      post: 'unsuccessful',
      error: error.toString(),
      stack: error.stack,
    })
  }

})

app.post('/insert', async (req, res) => {
  await insertTc({ ...req.body })
  res.json({ inserted: true, ...req.body })
})

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
})
