const router = require('express').Router();

const driver = require('./driver');

// Test API availaibility.
router.all('/', (req, res) => {
  res.status(200);
  res.send('API is ready.');
});

router.use(driver);

module.exports = router;
