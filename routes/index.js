const router = require('express').Router();

// Test API availaibility.
router.all('/', (req, res) => {
  res.status(200);
  res.send('API is ready.');
});

module.exports = router;
