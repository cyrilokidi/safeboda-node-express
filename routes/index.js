const router = require('express').Router();

const driver = require('./driver');
const passenger = require('./passenger');
const ride = require('./ride');

// Test API availaibility.
router.all('/', (req, res) => {
  res.status(200);
  res.send('API is ready.');
});

router.use(driver);
router.use(passenger);
router.use(ride);

module.exports = router;
