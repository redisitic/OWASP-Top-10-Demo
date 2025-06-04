const express = require('express');
const router = express.Router();
const axios = require('axios');

router.get('/fetch', async (req, res) => {
  const url = req.query.url;
  if (!url) return res.status(400).send('Missing url parameter');

  try {
    const response = await axios.get(url);
    res.send(response.data);
  } catch (err) {
    res.status(500).send('Error fetching URL');
  }
});

router.get('/fetch-secure', async (req, res) => {
    const url = req.query.url;
    if (!url) return res.status(400).send('Missing url parameter');
    const allowedDomains = ['example.com', 'api.thecatapi.com'];
  
    try {
      const parsedUrl = new URL(url);
      if (!allowedDomains.includes(parsedUrl.hostname)) {
        return res.status(403).send('Domain not allowed');
      }
      const response = await axios.get(url);
      res.send(response.data);
    } catch (err) {
      res.status(500).send('Error fetching URL');
    }
  });

module.exports = router;