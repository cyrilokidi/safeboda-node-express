const router = require('express').Router();

const driver = require('./driver');
const passenger = require('./passenger');

// Test API availaibility.
router.all('/', (req, res) => {
  res.status(200);
  res.send('API is ready.');
});

router.use(driver);
router.use(passenger);

module.exports = router;
