const router = require('express').Router();
const jwt = require('jsonwebtoken');
const JWT_SECRET = "weak-secret";

router.get('/admin-data-secure', (req, res) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(403).send('No token provided');
  
    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      if (decoded.role !== 'admin') {
        return res.status(403).send('Access denied');
      }
      res.send("Welcome to the admin panel");
    } catch (err) {
      res.status(401).send('Invalid token');
    }
  });
  module.exports = router;